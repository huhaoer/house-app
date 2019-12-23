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
          <img :src="item.BuildImage" alt />
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
          <el-button type="primary" plain ref="orderBtn" @click="handPay">立即支付</el-button>
        </div>
      </div>
    </div>

    <div class="order-modal" v-if="showModal">
      <div class="modal-wrap">
        <div class="modal-head">
          <span>支付期数</span>
          <span>支付状态</span>
          <span>支付时间</span>
          <span>支付金额</span>
          <span></span>
        </div>
        <div class="modal-item" v-for="(item,index) in modalData" :key="index">
          <span>{{ item.AccountDate }}</span>
          <span>{{ item.AccountStatus }}</span>
          <span>{{ item.AccountPayTime }}</span>
          <span>{{ item.AccountPay }}</span>
          <span><el-button type="primary" plain>支付</el-button></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/index";
export default {
  data() {
    return {
      orderData: [], //订单列表
      modalData: [],//弹框渲染的数据
      showModal: false
    };
  },

  mounted() {
    // 传递当前用户的id获取当前用户的订单
    api
      .UserQueryOrderList(this.$store.state.currentLoginUser.UserId)
      .then(res => {
        console.log(res, "合同");
        this.orderData = res.data._Items;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    // 点击立即支付 弹出弹框
    handPay() {
      const UserId = this.$store.state.currentLoginUser.UserId;
      this.showModal = true;
      api
        .FindAccount({ UserId })
        .then(res => {
          this.modalData = res.data._Items;
          console.log(res, "用户账单");
        })
        .catch(err => {
          console.log(err);
        });
    },

    //
    hideModal() {
      this.showModal = false;
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .modal-wrap {
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