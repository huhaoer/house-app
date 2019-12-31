<template>
  <div class="order">
    <div class="order-wrap">
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
            <span style="color: red">{{ item.ConId == 0 ? '暂未签约' : '已签约' }}</span>
          </p>
        </div>
        <div class="item-right" v-if="item.ConId == 0">
          <p>
            支付时间:
            <span>{{ item.PayRentTime ? item.PayRentTime : '暂未支付' }}</span>
          </p>
          <p>
            应付金额:
            <span>￥{{ item.PayRentTotal }}</span>
          </p>
        </div>
        <div class="item-right" v-else>
          <el-button type="primary" plain ref="orderBtn" @click="handPay(item)">立即支付</el-button>
        </div>
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
            <el-button type="primary"  disabled>线上支付</el-button>
            <el-button type="danger"  disabled>线下支付</el-button>
          </span>
          <span v-else class="btn-pay">
            <el-button
              type="primary"
              
              @click="goToPay(item.AccountId,item.AccountPay,item.AccountDate)"
            >线上支付</el-button>
            <el-button type="danger"  @click="goToPayOffline(item.AccountId)">线下支付</el-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  data() {
    return {
      orderData: [], //订单列表
      modalData: [], //弹框渲染的数据
      hideModal: true //默认隐藏弹框
    };
  },

  mounted() {
    // 传递当前用户的id获取当前用户的订单
    api
      .UserQueryOrderList(this.$store.state.currentLoginUser.UserId)
      .then(res => {
        this.orderData = res.data._Items;
        console.log(this.orderData,'0000000000000000000000')
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    // 点击立即支付 弹出弹框
    handPay(item) {
      const UserId = this.$store.state.currentLoginUser.UserId;
      const ConId = item.ConId;
      this.hideModal = false;
      api
        .FindAccountmore({ UserId, ConId })
        .then(res => {
          console.log(res, "==============================");
          this.modalData = res.data._Items;

          console.log(res, "用户账单");
        })
        .catch(err => {
          console.log(err);
        });
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
    },

    // 点击线下支付
    goToPayOffline(AccountId) {
      api
        .OfflinePayment(AccountId)
        .then(res => {
          console.log(res, "线下支付");
          if (res.data == "请求管家确定") {
            this.$message({
              message: res.data,
              type: "success",
              duration: "2000",
              center: true,
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
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
        width: 300px;
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
      .item-right {
        width: 200px;
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
    }
  }
}
</style>