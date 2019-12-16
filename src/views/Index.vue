<template>
  <div class="index">
    <!-- 头部导航菜单栏 -->
    <header class="house-header">
      <div class="header-wrap">
        <div class="header-left">
          <img src="../assets/logo.png" alt />
        </div>
        <div class="header-middle">
          <router-link tag="span" to="/index/home">首页</router-link>
          <router-link tag="span" to="/index/rent">我要租房</router-link>
        </div>
        <div class="header-right" v-if="!this.$store.state.userName">
          <router-link tag="span" to="/login">登陆</router-link>
          <span>|</span>
          <router-link tag="span" to="/register">注册</router-link>
        </div>
        <div class="header-hi" v-else>
          <p>Hi! <span @click="enterPersonal">{{ this.$store.state.userName }}</span> <span @click="loginOut">退出</span></p>
        </div>
      </div>
    </header>

    <!-- 路由出口 -->
    <router-view />

    <!-- 底部信息栏部分 -->
    <footer class="house-footer">
      <div class="footer-modal">
        <p>Copyright © 2012-2018 zufang.com. All Rights Reserved</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    // 退出登录
    loginOut() {
      this.$store.commit('setUserName','')
    },
    // 点击姓名进入个人中心
    enterPersonal() {
      this.$router.push('/personal')
    }
  }
};
</script>
<style lang="less" scoped>
html,
body {
  position: relative;
  width: 100%;
  background-color: #333;
  .index {
    width: 100%;
    // 头部导航菜单部分
    .house-header {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 60px;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 99;
      .header-wrap {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .header-left {
          display: flex;
          align-items: center;
          img {
            width: 160px;
            height: 35px;
          }
        }
        .header-middle {
          color: #fff;
          line-height: 60px;
          width: 800px;
          span:hover {
            cursor: pointer;
          }
          span:nth-of-type(2) {
            margin-left: 40px;
          }
        }
        .header-right {
          line-height: 60px;
          color: #fff;
          font-size: 15px;
          span {
            display: inline-block;
            margin-right: 15px;
            &:nth-of-type(1),
            &:nth-of-type(3) {
              cursor: pointer;
            }
            &:nth-of-type(1):hover {
              text-decoration: underline;
            }
            &:nth-of-type(3):hover {
              text-decoration: underline;
            }
          }
        }
        .header-hi{
          color: #fff;
          p{
            line-height: 60px;
            font-size: 16px;
            span:nth-of-type(1){
              font-size: 20px;
              font-weight: bold;
              cursor: pointer;
            }
            span:nth-of-type(2){
              font-size: 12px;
              color: #41cbc0;
              cursor: pointer;
            }
          }
        }
      }
    }
    // 底部信息栏部分
    .house-footer {
      width: 100%;
      height: 200px;
      background-color: #41cbc0;
      position: relative;
      .footer-modal {
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        p {
          text-align: center;
          line-height: 50px;
          color: #fff;
        }
      }
    }
  }
}
</style>
