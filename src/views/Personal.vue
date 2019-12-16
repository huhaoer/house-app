<template>
  <div class="personal">
    <!-- 个人中心导航 -->
    <div class="personal-header">
      <img src="../assets/logo.png" alt="">
      <div class="header-title">
        <span>我的资料</span>
        <span>我的订单</span>
        <span>我的账户</span>
      </div>
      <p>Hi! <span>{{ this.$store.state.userName }}</span> <span @click="loginOut">退出</span></p>
    </div>
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    loginOut() {
      this.$store.commit('setUserName','')
      this.$router.push('/index/home')
    }
  }
}
</script>

<style lang='less' scoped>
.personal{
  width: 100%;
  .personal-header{
    background-color: red;
    width: 80%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    img{
      width: 160px;
      height: 35px;
    }
    .header-title{
      width: 300px;
      display: flex;
      justify-content: space-between;
      color: #000;
    }
    p{
      span:nth-of-type(1){
        font-size: 20px;
        font-weight: bold;
      }
      span:nth-of-type(2){
        font-size: 14px;
        color: red;
        cursor: pointer;
      }
    }
  }
}
</style>