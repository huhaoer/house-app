<template>
  <div class="order">
    <div class="order-wrap">
      <div class="order-header">
        订单详情
      </div>
      <div class="order-none" v-show="orderData.length == 0">
        暂无订单详情
      </div>
      <div class="order-item" v-show="orderData.length != 0" v-for="(item,index) in orderData" :key="index">
        <div class="item-left">
          <img :src="item.BuildImage" alt="">
        </div>
        <div class="item-center">
          <p>房间名:<span>{{ item.BuildName }}</span></p>
          <p>管家名:<span>{{ item.ButlerName }}</span></p>
        </div>
        <div class="item-right">
          <p>支付时间:<span>{{ item.PayRentTime }}</span></p>
          <p>支付金额:<span>￥{{ item.PayRentTotal }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/index'
export default {
  data() {
    return {
      orderData: [],//订单列表
    }
  },

  mounted() {
    // 传递当前用户的id获取当前用户的订单
    api.UserQueryOrderList(this.$store.state.currentLoginUser.UserId)
      .then(res => {
        this.orderData = res.data._Items
        console.log(res,'用户订单')
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang='less' scoped>
.order{
  width: 100%;
  .order-wrap{
    width: 80%;
    height: 300px;
    margin: 0 auto;
    margin-top: 30px;
    .order-header{
      width: 100%;
      height: 60px;
      color: #353535;
      font-size: 16px;
      font-weight: 700;
    }
    .order-none{
      width: 100%;
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 15px;
      box-sizing: border-box;
      text-align: center;
      font-weight: 500;
    }
    .order-item{
      width: 100%;
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .item-left{
        img{
          width: 300px;
          height: 150px;
          display: block;
        }
      }
      .item-center{
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p{
          font-size: 16px;
          color: #353535;
          span{
            color: #000;
            font-weight: bold;
            margin-left: 10px;
          }
        }
      }
      .item-right{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p{
          font-size: 16px;
          color: #353535;
          span{
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