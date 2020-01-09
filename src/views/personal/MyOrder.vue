<template>
  <div class="order">
    <div class="order-wrap" v-loading="loading" element-loading-text="加载数据中...">
      <div class="order-header">订单详情</div>
      <div class="order-none" v-show="orderData.length == 0">暂无订单详情</div>
      <div
        class="order-item"
        v-show="orderData.length != 0"
        v-for="(item,index) in orderData"
        :key="index"
      >
        <div class="item-left">
          <img :src="item.BuildImage.split(',')[0]" alt />
        </div>
        <div class="item-center">
          <div class="center-house">
            <p>
              房间名:
              <span>{{ item.BuildName }}</span>
            </p>
            <p>
              管家名:
              <span>{{ item.ButlerName }}</span>
            </p>
            <p>
              支付状态:
              <span style="color: red">{{ item.ConStatus }}</span>
            </p>
          </div>
          <div
            class="center-tips"
            v-show="$store.state.needPay.some(obj => obj.ConId == item.ConId)"
          >
            <el-popover
              placement="top-start"
              title="账单提醒"
              width="200"
              trigger="hover"
              content="本期账单即将到期,请及时支付。"
            >
              <i class="el-icon-warning-outline" slot="reference">温馨提示</i>
            </el-popover>
          </div>
          <div class="center-tips"></div>
        </div>
        <div class="item-right" v-show="item.ConStatus == '已签约'">
          <el-button type="primary" plain ref="orderBtn" @click="handPay(item)">立即支付</el-button>
          <el-button
            type="primary"
            :disabled="isRepair"
            plain
            ref="repairBtn"
            @click="handRepair(item)"
          >申请报修</el-button>
        </div>
        <div class="item-right" v-show="item.ConStatus !== '已签约'">
          <p>
            支付时间:
            <span>{{ item.PayRentTime ? item.PayRentTime : '暂未支付' }}</span>
          </p>
          <p>
            应付金额:
            <span>￥{{ item.PayRentTotal }}</span>
          </p>
        </div>
        <!-- 弹框 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="60%"
          :before-close="handleClose"
          :close-on-click-modal="false"
        >
          <!-- 文本框 -->
          <span class="repair-span">请输入报修原因:</span>
          <el-input type="textarea" :rows="2" placeholder="请输入报修原因" v-model="textarea"></el-input>
          <!-- 图片 -->
          <span class="repair-span">请上传文件:</span>
          <el-upload
            class="upload-demo"
            drag
            action="http://192.168.3.7:8081/upImg/upload"
            multiple
            :before-upload="beforeUpload"
            name="file"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>

          <span slot="footer" class="dialog-footer">
            <el-button @click="cancleRepair">取 消</el-button>
            <el-button type="primary" @click="handleRepair">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>

    <div :class="['order-modal',{hide: hideModal == true}]" @click="hideM">
      <div class="modal-wrap" @click.stop="noHide">
        <div class="modal-head">
          <span>支付期数</span>
          <span>支付状态</span>
          <span>支付时间</span>
          <span>支付金额</span>
          <span></span>
        </div>
        <div class="modal-item" v-for="(item,index) in modalData" :key="index">
          <span>{{ item.AccountDate }}</span>
          <span style="color: red">{{ item.AccountStatus }}</span>
          <span>{{ item.AccountPayTime }}</span>
          <span>{{ item.AccountPay }}</span>
          <span v-if="item.AccountStatus != '未支付'" class="btn-pay">
            <el-button type="primary" disabled>线上支付</el-button>
            <el-button type="danger" disabled>线下支付</el-button>
          </span>
          <span v-else class="btn-pay">
            <el-button
              type="primary"
              @click="goToPay(item.AccountId,item.AccountPay,item.AccountDate)"
            >线上支付</el-button>
            <el-button type="danger" @click="goToPayOffline(item.AccountId)">线下支付</el-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
import Axios from "axios";
export default {
  data() {
    return {
      orderData: [], //订单列表
      modalData: [], //弹框渲染的数据
      hideModal: true, //默认隐藏弹框
      dialogVisible: false, //是否展示弹出框
      textarea: "", //文本框默认内容
      repairInfo: {}, //报修传递的参数
      files: "", //上传的文件
      isRepair: false, //是否已经报修
      loading: true,//加载中
    };
  },

  created() {
    // 传递当前用户的id获取当前用户的订单
    let queryOrderList = async () => {
      let queryListRes = await api.UserQueryOrderList(
        this.$store.state.currentLoginUser.UserId
      );
      this.orderData = queryListRes.data._Items;
      this.loading = false;
      // console.log(this.orderData, "ppppppppppppppppppp");
    };
    queryOrderList();
  },

  methods: {
    // 点击取消弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    // 点击立即支付 弹出弹框
    handPay(item) {
      const UserId = this.$store.state.currentLoginUser.UserId;
      const ConId = item.ConId;
      this.hideModal = false;
      api
        .FindAccountmore({ UserId, ConId })
        .then(res => {
          this.modalData = res.data._Items;

          console.log(res, "用户账单");
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击报修出现弹框
    handRepair(item) {
      this.repairInfo = {
        BuildId: item.BuildId,
        UserId: item.UserId,
        ButlerId: item.ButlerId
      };
      this.dialogVisible = true;
    },
    // 确定报修
    handleRepair() {
      const RepairReason = this.textarea;
      const repairInfo = {
        ...this.repairInfo,
        RepairReason
      };

      // 上传其余信息
      let repairFunc = async () => {
        let repairRes = await api.AddRepair(repairInfo);
        console.log(repairRes, "维修结果");
        if (repairRes.data == "报修成功") {
          this.dialogVisible = false;
          this.isRepair = true;
        }
      };
      repairFunc();
    },
    //上传文件之前
    beforeUpload(file) {
      this.files = file;
      return true;
    },

    // 取消报修
    cancleRepair() {
      this.dialogVisible = false;
    },

    // 点击蒙层隐藏
    hideM() {
      this.hideModal = true;
    },

    // 点击非蒙层不隐藏
    noHide() {
      this.hideModal = false;
    },

    // 点击线上支付跳转到支付宝页面
    goToPay(AccountId, AccountPay, AccountDate) {
      this.$router.push({
        name: "alipay",
        params: { AccountId, AccountPay, AccountDate }
      });
      this.willDated()
    },

    // 点击线下支付
    goToPayOffline(AccountId) {
      api
        .OfflinePayment(AccountId)
        .then(res => {
          if (res.data == "请求管家确定") {
            this.$message({
              message: res.data,
              type: "success",
              duration: "2000",
              center: true
            });
            this.willDated();
          }
        })
        .catch(err => {
          console.log(err);
        });
        
    },

    // 查看是否已经到期
    willDated() {
      const that = this;
      let needPay = async () => {
        let needPayRes = await api.NeedPayAccount(
          that.$store.state.currentLoginUser.UserId
        );
        window.localStorage.removeItem('needPay');
        console.log(needPayRes, "都会塞大神哦");
        that.$store.commit("setNeedPay", []); //设置要到期的账单
      };
      needPay();
    }
  }
};
</script>

<style lang='less' scoped>
html,
body {
  position: relative;
}
.order {
  width: 100%;
  .order-modal {
    &.hide {
      display: none;
    }
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .modal-wrap {
      overflow: scroll;
      background-color: #fff;
      position: absolute;
      width: 900px;
      height: 400px;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      z-index: 99;
      .modal-head {
        display: flex;
        justify-content: space-around;
        color: #000;
        font-weight: 600;
        height: 60px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        span {
          display: inline-block;
          width: 25%;
        }
      }
      .modal-item {
        span {
          display: inline-block;
          width: 25%;
          &.btn-pay {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-button {
              width: 100px;
              height: 40px;
            }
          }
        }
        display: flex;
        justify-content: space-around;
        color: #000;
        height: 60px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        text-align: center;
      }
    }
  }
  .order-wrap {
    width: 80%;
    height: 300px;
    margin: 0 auto;
    margin-top: 30px;
    .order-header {
      width: 100%;
      height: 60px;
      color: #353535;
      font-size: 16px;
      font-weight: 700;
    }
    .order-none {
      width: 100%;
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 15px;
      box-sizing: border-box;
      text-align: center;
      font-weight: 500;
    }
    .order-item {
      width: 100%;
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .item-left {
        img {
          width: 300px;
          height: 150px;
          display: block;
        }
      }
      .item-center {
        width: 350px;
        display: flex;
        flex-direction: center;
        justify-content: space-around;
        .center-house {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p {
            font-size: 16px;
            color: #353535;
            span {
              color: #000;
              font-weight: bold;
              margin-left: 10px;
            }
          }
        }
        .center-tips {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          color: red;
          font-size: 20px;
          .el-icon-warning-outline {
            font-weight: bold;
            font-style: italic;
          }
        }
      }
      .item-right {
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .el-button {
          margin: 0;
        }
        p {
          font-size: 16px;
          color: #353535;
          span {
            color: #000;
            font-weight: bold;
            margin-left: 10px;
          }
        }
      }
      .el-dialog {
        span.repair-span {
          display: inline-block;
          margin: 15px 0;
          font-size: 16px;
        }
      }
    }
  }
}
</style>