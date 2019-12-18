<template>
  <div class="personal">
    <!-- 个人中心导航 -->
    <div class="personal-header">
      <img src="../assets/logo.png" alt="" @click="handToHome">
      <div class="header-title">
        <router-link tag="span" to="/personal/myInformation">我的资料</router-link>
        <router-link tag="span" to="/personal/myAccount">我的合同</router-link>
        <router-link tag="span" to="/personal/myOrder">我的订单</router-link>
      </div>
      <p>Hi! <span>{{ this.$store.state.currentLoginUser.UserName }}</span> <span @click="loginOut">退出</span></p>
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
    // 点击退出登录
    loginOut() {
      // 清除用户信息
      this.$store.commit('setCurrentLoginUser',{})
      // 清除已经登录的标识
      window.localStorage.removeItem('login')
      // 跳转到首页
      this.$router.push('/index')
    },
    // 点击logo跳转首页
    handToHome() {
      this.$router.push('/index')
    }
  }
}
</script>

<style lang='less' scoped>
.personal{
  width: 100%;
  .personal-header{
    background-color: #fff;
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
      span{
        cursor: pointer;
      }
    }
    p{
      span:nth-of-type(1){
        font-size: 20px;
        font-weight: bold;
      }
      span:nth-of-type(2){
        font-size: 14px;
        color: rgba(240, 110, 94, 1);
        cursor: pointer;
      }
    }
  }
}
</style>