<template>
  <div class="personal">
    <!-- 个人中心导航 -->
    <div class="personal-header">
      <img src="../assets/logo.png" alt @click="handToHome" />
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <router-link tag="span" to="/personal/myCollect">我的收藏</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link tag="span" to="/personal/myOrder">我的订单</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link tag="span" to="/personal/myBook">我的预约</router-link>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <router-link tag="span" to="/personal/outRent">退租续租</router-link>
          </template>
          <el-menu-item index="4-1">
            <router-link tag="span" to="/personal/outRentList">退租列表</router-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="5">
          <router-link tag="span" to="/personal/myInformation">我的资料</router-link>
        </el-menu-item>
      </el-menu>
      <p>
        <i class="el-icon-user-solid"></i>
        <span>{{ this.$store.state.currentLoginUser.UserName }}</span>
        <span @click="loginOut">退出</span>
      </p>
    </div>

    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    // 点击退出登录
    loginOut() {
      // 清除用户信息
      this.$store.commit("setCurrentLoginUser", {});
      // 清除已经登录的标识
      window.localStorage.removeItem("login");
      // 跳转到首页
      this.$router.push("/index");
    },
    // 点击logo跳转首页
    handToHome() {
      this.$router.push("/index");
    },
    // 点击切换下拉框触发事件
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>

<style lang='less' scoped>
.personal {
  width: 100%;
  .personal-header {
    background-color: #fff;
    width: 80%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    img {
      width: 160px;
      height: 35px;
    }
    .header-title {
      width: 500px;
      display: flex;
      justify-content: space-between;
      color: #000;
      span {
        cursor: pointer;
      }
    }
    p {
      .el-icon-user-solid {
        font-size: 20px;
        margin-right: 10px;
      }
      span:nth-of-type(1) {
        font-size: 20px;
        font-weight: bold;
      }
      span:nth-of-type(2) {
        font-size: 14px;
        color: #f56c6c;
        cursor: pointer;
      }
    }
  }
}
</style>