<template>
  <div class="outrent">
    <div class="outrent-title">退租续租</div>
    <div class="outrent-wrap">
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
            <el-button
              size="mini"
              type="primary"
              :disabled="scope.row.ConStatus == '请求退租'"
              @click="handleEdit(scope.$index, scope.row)"
            >退租</el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.ConStatus == '已续租'"
              @click="handleDelete(scope.$index, scope.row)"
            >续租</el-button>
            <el-button size="mini" @click="handlePrint(scope.$index, scope.row)">打印合同</el-button>
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
      data: []
    };
  },
  methods: {
    // 点击退租
    handleEdit(index, row) {
      const outRent = {
        ConId: row.ConId,
        UserId: row.UserId
      };
      const that = this;
      async function tuizu() {
        let addOutRent = await api.AddOutRent(outRent);
        console.log(addOutRent)
        that.$message({
          message: addOutRent.data,
          type: "success",
          duration: "1500",
          center: true,
        });
        // row.ConStatus = "请求退租";
      }
      tuizu();
    },

    // 点击续租
    handleDelete(index, row) {
      async function getGoingRent() {
        let goingResult = await api.GoingContract(row.ConId);
        console.log(goingResult, "续租详情");
        row.ConStatus = "已续租";
      }
      getGoingRent();
    },

    // 点击打印合同
    handlePrint(index, row) {
      const ConId = row.ConId; //合同id
      async function printHT() {
        try {
          const res = await api.FindPhotoUrl(ConId);
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
        this.data = res.data._Items;
        console.log(this.data, "--");
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
  }
}
</style>