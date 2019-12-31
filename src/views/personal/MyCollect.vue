<template>
  <div class="order">
    <div class="order-wrap">
      <div class="order-header">收藏列表</div>
      <div class="order-none" v-show="collectData.length == 0">暂无收藏列表</div>

      <div
        class="order-item"
        v-show="collectData.length != 0"
        v-for="(item,index) in collectData"
        :key="index"
      >
        <router-link tag="div" :to="{name: 'houseDetail',params:{id: item.BuildId}}" class="item-left">
          <img :src="item.BuildImage.split(',')[0]" alt />
        </router-link>
        <div class="item-center">
          <p>
            房源名:
            <span>{{ item.BuildName }}</span>
          </p>
          <p>
            房源地址:
            <span>{{ item.BuildAddress }}</span>
          </p>
          <p>
            房源区域:
            <span>{{ item.BuildLocation }}</span>
          </p>
        </div>
        <div class="item-right">
          <p>
            房源价格:
            <span>{{ item.BuildPrice }}￥</span>
          </p>
          <p>
            上架时间:
            <span>{{ item.BuildTime }}</span>
          </p>
          <p>
            房间数量:
            <span>{{ item.BuildRoom }}</span>
          </p>
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
      collectData: [], //收藏列表
    };
  },

  mounted() {
    // 传递当前用户的id获取当前用户的订单
    api
      .GetCollectListByUserId(this.$store.state.currentLoginUser.UserId)
      .then(res => {
        this.collectData = res.data;
        console.log(res, "收藏列表");
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang='less' scoped>
.order {
  width: 100%;
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