<template>
  <div class="outrent">
    <div class="outrent-title">退租续租</div>
    <div class="outrent-wrap" v-loading="loading" element-loading-text="加载数据中...">
      <el-table :data="data" style="width: 100%" stripe>
        <el-table-column label="签约日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.PayRentTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="管家姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.ButlerName }}</p>
              <p>住址: {{ scope.row.BuildName }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.ButlerName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="签约房源" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.BuildName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="支付总价" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.PayRentTotal }}￥</span>
          </template>
        </el-table-column>

        <el-table-column label="房源操作">
          <template slot-scope="scope">
            <!-- 退租 -->
            <el-button
              size="mini"
              type="primary"
              :disabled="scope.row.ConStatus !== '已签约'"
              @click="handleEdit(scope.$index, scope.row)"
            >退租</el-button>

            <!-- 续租 -->
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.ConStatus !== '已签约'"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <el-dialog
                title="请选择租房月数"
                :visible.sync="xuzugDialog"
                width="70%"
                custom-class="xuzu-dialog"
              >
                <el-input
                  placeholder="请选择租房月数"
                  prefix-icon="el-icon-time"
                  v-model="inpValue"
                  type="number"
                  :clearable="true"
                  :min="1"
                ></el-input>
                <span slot="footer" class="dialog-footer">
                  <el-button @click.stop="cancleXuzu">取 消</el-button>
                  <el-button type="primary" @click.stop="handleXuzu">确 定</el-button>
                </span>
              </el-dialog>续租
            </el-button>

            <!-- 打印合同 -->
            <el-button size="mini" @click.stop="handlePrint(scope.$index, scope.row)">
              <el-dialog
                title="合同详情"
                :visible.sync="hetongDialog"
                width="70%"
                :show-close="false"
                :close-on-click-modal="false"
              >
                <el-image :src="src" class="modal-img"></el-image>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click.stop="hetongDialog = false">确 定</el-button>
                </span>
              </el-dialog>打印合同
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
import { async } from "q";
export default {
  data() {
    return {
      data: [], //初始账单列表
      hetongDialog: false, //打印合同展示弹框
      xuzugDialog: false, //续租展示弹框
      src: "", //合同图片路径
      inpValue: 12, //输入框默认选择租房月数
      info: {}, //当前请求续租的参数对象
      loading: true
    };
  },
  methods: {
    // 取消续租
    cancleXuzu() {
      this.xuzugDialog = false;
    },
    // 确认续租
    handleXuzu() {
      // 判断是否已经续租下单
      let getGoingRent = async () => {
        // 点击续租 重新生成订单
        let addOrder = await api.AddOrder(this.info);
        if (addOrder.data == "订单生成，请尽快联系管家签约哦") {
          //成功下单
          this.$message({
            message: "续租成功",
            type: "success",
            duration: "1500",
            center: true,
            offset: 60
          });
        } else {
          this.$message({
            message: addOrder.data,
            type: "warning",
            duration: "1500",
            center: true,
            offset: 60
          });
        }
        this.xuzugDialog = false;
      };
      getGoingRent();
    },

    // 点击退租
    handleEdit(index, row) {
      const outRent = {
        ConId: row.ConId,
      };
      const that = this;

      async function tuizu() {
        // 改变合同状态
        let ourRentStatus = await api.UpdateOrderStatus({
          orderId: row.OrderId,
          status: "请求退租"
        });
        row.ConStatus = "请求退租";

        // 添加退租
        let addOutRent = await api.AddOutRent(outRent);
        that.$message({
          message: addOutRent.data,
          type: "success",
          duration: "1500",
          center: true
        });
      }
      tuizu();
    },

    // 点击续租
    handleDelete(index, row) {
      const that = this;
      console.log(this.inpValue)
      // console.log(row, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;");
      that.xuzugDialog = true;
      this.info = {
        BuildId: row.BuildId,
        UserId: row.UserId,
        ButlerId: row.ButlerId,
        PayRentTotal: parseInt(that.inpValue * row.BuildPrice),
        UserNumber: row.UserNumber,
        ConStatus: "请求续租"
      };
      console.log(this.info)
    },

    // 点击打印合同
    handlePrint(index, row) {
      const ConId = row.ConId; //合同id
      const that = this;
      that.hetongDialog = true;
      async function printHT() {
        try {
          const res = await api.FindPhotoUrl(ConId);

          if (res.data.indexOf("pdf") != -1) {
            window.open(res.data, "_blank");
            that.hetongDialog = false;
          } else {
            that.src = res.data;
          }
        } catch (err) {
          console.log(err);
        }
      }
      printHT();
    }
  },
  mounted() {
    // 传递当前用户的id获取当前用户的订单
    api
      .UserQueryOrderList(this.$store.state.currentLoginUser.UserId)
      .then(res => {
        let result = res.data._Items.filter(item => {
          return item.ConStatus !== "未签约";
        });
        this.data = result;
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang='less' scoped>
.outrent {
  width: 80%;
  margin: 0 auto;
  height: 300px;
  // background-color: red;
  .outrent-title {
    width: 100%;
    height: 60px;
    font-size: 16px;
    line-height: 60px;
    color: #353535;
    font-weight: 700;
    margin-top: 30px;
  }
  .outrent-wrap {
    border: 1px solid #ccc;
    .el-input {
      width: 200px;
    }
  }
}
</style>