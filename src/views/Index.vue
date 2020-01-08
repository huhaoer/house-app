<template>
  <div class="index">
    <!-- 头部导航菜单栏 -->
    <header class="house-header">
      <div class="header-wrap">
        <div class="header-left">
          <img src="../assets/logo.png" />
        </div>
        <div class="header-middle">
          <div>
            <router-link tag="span" to="/index/home">首页</router-link>
            <router-link tag="span" to="/index/rent">我要租房</router-link>
          </div>
          <div>
            <el-input placeholder="请输入查询内容" v-model="inpValue"></el-input>
            <el-button :disabled="inpValue == ''" @click="handKeyword">找房</el-button>
          </div>
        </div>
        <div class="header-right" v-if="!this.$store.state.currentLoginUser.UserName">
          <router-link tag="span" to="/login">登陆</router-link>
          <span>|</span>
          <router-link tag="span" to="/register">注册</router-link>
        </div>
        <div class="header-hi" v-else>
          <p v-show="this.$store.state.needPay.length == 0">
            <i class="el-icon-user-solid"></i>
            <span @click="enterPersonal">{{ this.$store.state.currentLoginUser.UserName }}</span>
            <span @click="loginOut">退出</span>
          </p>
          
          <p v-show="this.$store.state.needPay.length != 0">
            <i class="el-icon-user-solid"></i>
            <el-badge :value="this.$store.state.needPay.length" class="item">
              <span
                @click="enterPersonal"
                class="tips_span"
              >{{ this.$store.state.currentLoginUser.UserName }}</span>
            </el-badge>
            <span @click="loginOut">退出</span>
          </p>
        </div>
      </div>
    </header>

    <!-- 路由出口 -->
    <router-view />

    <!-- 底部信息栏部分 -->
    <footer class="house-footer">
      <div class="footer-title">
        <div class="title-item">关于我们</div>
        <div class="title-item">联系我们</div>
        <div class="title-item">平台服务协议</div>
        <div class="title-item">房客服务协议</div>
        <div class="title-item">房东服务协议</div>
      </div>
      <div class="footer-logo">
        <div class="weixin"></div>
        <div class="weibo"></div>
        <div class="qq"></div>
        <!-- <div class="logo-show">
          <img src="../assets/qq.png" alt="">
        </div>-->
      </div>
      <div class="footer-modal">
        <p>Copyright © 2012-2018 zufang.com. All Rights Reserved</p>
      </div>
    </footer>
  </div>
</template>

<script>
import api from "../api/index";
export default {
  name: "home",
  data() {
    return {
      erweima: "", //当前显示二维码的路径
      inpValue: "" //输入框的输入内容
    };
  },
  methods: {
    // 退出登录
    loginOut() {
      // 清空本地的用户信息
      this.$store.commit("setCurrentLoginUser", {});
      // 清除已经登录的标识
      window.localStorage.removeItem("login");
      // 跳转到首页
      this.$router.push("/index");
    },
    // 点击姓名进入个人中心
    enterPersonal() {
      this.$router.push("/personal");
    },

    // 点击查询关键字
    handKeyword() {
      api
        .GetBuildInfoByLike({
          str: this.inpValue,
          BuildId: 12
        })
        .then(res => {
          if (res.data._Items.length > 0) {
            //存在查询结果
            this.$router.push({
              name: "rent",
              params: { likeData: res.data._Items }
            });
          } else {
            //没有数据
            this.$message({
              message: "查询结果不存在",
              type: "error",
              duration: "1500",
              center: true
            });
          }
          this.inpValue = ""; //置空查询关键字
        })
        .catch(err => {
          console.log(err);
        });
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
      background-color: rgba(0, 0, 0, 0.5);
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
          display: flex;
          justify-content: space-between;
          color: #fff;
          line-height: 60px;
          width: 750px;
          .el-input {
            width: 200px;
          }
          .el-button {
            width: 65px;
            margin-left: 5px;
          }
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
        .header-hi {
          color: #fff;
          .el-icon-user-solid {
            font-size: 20px;
          }
          p {
            line-height: 50px;
            font-size: 16px;
            display: flex;
            box-sizing: border-box;
            justify-content: space-between;
            align-items: center;
            .item {
              margin-top: 10px;
              margin-right: 15px;
              .el-badge__content.is-fixed {
                position: absolute;
                top: 7px !important;
                right: 10px;
              }
              .tips_span{
                margin-bottom: 10px;
              }
            }
            span:nth-of-type(1) {
              font-size: 20px;
              font-weight: bold;
              cursor: pointer;
            }
            span:nth-of-type(2) {
              font-size: 12px;
              // color: rgba(240, 110, 94, 1);
              color: #f56c6c;
              cursor: pointer;
              margin-left: 15px;
            }
          }
        }
      }
    }
    // 底部信息栏部分
    .house-footer {
      width: 100%;
      height: 200px;
      background-color: rgba(0, 0, 0, 0.3);
      // background-color: rgba(255, 150, 30, 1);
      // background-color: #f06e5e;
      margin-top: 50px;
      position: relative;
      .footer-title {
        height: 100px;
        display: flex;
        justify-content: space-around;
        line-height: 100px;
        border-bottom: 1px solid #fff;
        .title-item {
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
      .footer-logo {
        position: relative;
        width: 200px;
        margin: 0 auto;
        height: 50px;
        display: flex;
        justify-content: space-around;
        div {
          width: 40px;
          height: 40px;
          margin-top: 5px;
        }
        .weixin {
          background: url("../assets/f_logo.png");
          background-repeat: no-repeat;
          background-position: 0px 0px;
          background-size: 120px 40px;
        }
        .weibo {
          background: url("../assets/f_logo.png");
          background-repeat: no-repeat;
          background-position: -40px 0px;
          background-size: 120px 40px;
        }
        .qq {
          background: url("../assets/f_logo.png");
          background-repeat: no-repeat;
          background-position: -80px 0px;
          background-size: 120px 40px;
        }
        .logo-show {
          position: absolute;
          top: -90px;
          left: 60px;
          img {
            width: 80px;
            height: 80px;
          }
        }
      }
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
