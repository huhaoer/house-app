<template>
  <div class="myInformation">
    <div class="info-wrap">
      <!-- 左侧信息 -->
      <div class="info-left">
        <img src="http://pic.ziroom.com.cn/static/images/default.png" alt />
        <p>{{ this.$store.state.currentLoginUser.UserName }}</p>
      </div>
      <!-- 右侧信息 -->
      <div class="info-right">
        <!-- 右侧顶部信息 -->
        <div class="right-header">个人信息</div>
        <!-- 右侧主体信息 -->
        <div class="right-main">
          <div class="main-item">
            <label for="userName">用户名</label>
            <el-input v-model="userName" placeholder="请输入内容" id="userName" auto-complete="off"></el-input>
          </div>
          <div class="main-item">
            <label for="userPhone">手机号</label>
            <el-input
              v-model="userPhone"
              placeholder="请输入内容"
              id="userPhone"
              readonly
              auto-complete="off"
            ></el-input>
          </div>
          <div class="main-item">
            <label for="userPass">密码</label>
            <el-input
              v-model="userPass"
              placeholder="请输入内容"
              id="userPass"
              auto-complete="off"
            ></el-input>
          </div>
          <div class="main-item">
            <label for="userSex">性别</label>
            <el-radio v-model="userSex" label="1">男</el-radio>
            <el-radio v-model="userSex" label="2">女</el-radio>
          </div>
          <div class="main-item">
            <label for="userAddress">地址</label>
            <el-input
              v-model="userAddress"
              placeholder="请输入内容"
              id="userAddress"
              auto-complete="off"
            ></el-input>
          </div>
          <div class="main-item">
            <label for="userEmail">邮箱</label>
            <el-input v-model="userEmail" placeholder="请输入内容" id="userEmail" auto-complete="off"></el-input>
          </div>
          <div class="main-item">
            <label for="userIdCard">身份证</label>
            <el-input v-model="userIdCard" placeholder="请输入内容" id="userIdCard" auto-complete="off"></el-input>
          </div>
          <div class="main-item">
            <label for="userLike">爱好</label>
            <el-input v-model="userLike" placeholder="请输入内容" id="userLike" auto-complete="off"></el-input>
          </div>
          <el-button @click="saveData">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/index'
export default {
  // to 去到的那个路径信息  from从哪个路径来  next是否跳转,执行就跳转,不执行就不跳转
  beforeRouteLeave(to, from, next) {
    // 当前保存了信息 或者是直接点击退出按钮的话就跳转到对应页面
    if (this.isSave || to.fullPath == '/index/home') {
      next(); //点击保存按钮后 可以离开该页面
    } else {
      this.$confirm("还未保存信息,是否离开?",'提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then( _ => {
        next()
      })
      .catch( _ =>{
        return
      })
    }
  },
  data() {
    return {
      userName: "", //用户名
      userPhone: "", //用户手机
      userPass: "", //用户密码
      userSex: "1", //用户性别
      userAddress: "", //用户地址
      userEmail: "", //用户邮箱
      userIdCard: "", //用户身份证
      userLike: "", //用户爱好
      userId: "", //用户id
      isSave: false, //是否点击保存页面
    }
  },

  // 从state拿取当前用户的数据
  mounted() {
    this.userName = this.$store.state.currentLoginUser.UserName
    this.userPhone = this.$store.state.currentLoginUser.UserNumber
    this.userPass = this.$store.state.currentLoginUser.UserPwd
    this.userSex = this.$store.state.currentLoginUser.UserSex == '女' ? '2' : '1'//性别不传默认为男
    this.userAddress = this.$store.state.currentLoginUser.UserAddress
    this.userEmail = this.$store.state.currentLoginUser.UserEmail
    this.userIdCard = this.$store.state.currentLoginUser.UserIdcard
    this.userLike = this.$store.state.currentLoginUser.UserLike
    this.userId = this.$store.state.currentLoginUser.UserId
  },

  methods: {
    saveData() {
      api.UpdateUserInfo({
        UserName: this.userName,
        UserNumber: this.userPhone,
        UserPwd: this.userPass,
        UserSex: this.userSex == '2' ? '女' : '男',
        UserAddress: this.userAddress,
        UserEmail: this.userEmail,
        UserIdcard: this.userIdCard,
        UserLike: this.userLike,
        UserId: this.userId
      })
        .then(res => {
          // 修改成功之后重新获取用户的信息
          api.FindUserInfo({UserNumber: this.userPhone})
            .then(res => {
              this.$store.commit('setCurrentLoginUser',res.data._Items[0])//重新给当前登录用户的数据更新
              // 提示信息
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: '1500',
                center: true,
                offset: 60
              })
            })
            .catch(err => {
              console.log(err)
            })

          //点击保存之后 将isSave状态保存为true
          this.isSave = true
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.myInformation {
  width: 100%;
  border-top: 2px solid #ffa000;
  .info-wrap {
    width: 80%;
    height: 600px;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    // 左侧信息
    .info-left {
      width: 200px;
      height: 200px;
      border: 1px solid #ddd;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 100px;
        height: 100px;
      }
      p {
        margin-top: 15px;
        font-size: 14px;
        color: #393939;
      }
    }
    // 右侧信息
    .info-right {
      width: 840px;
      border: 1px solid #ddd;
      margin-top: 40px;
      .right-header {
        border-bottom: 1px solid #ddd;
        height: 50px;
        line-height: 50px;
        text-align: left;
        box-sizing: border-box;
        padding-left: 50px;
        font-size: 16px;
        color: #353535;
      }
      .right-main {
        padding-left: 50px;
        .main-item {
          margin-top: 15px;
          display: flex;
          justify-content: left;
          label {
            color: #000;
            font-size: 16px;
            text-align: left;
            line-height: 40px;
            width: 100px;
            // border: 1px solid red;
          }
          .el-input {
            width: 280px;
          }
        }
        .el-button {
          background-color: #ffa000;
          color: #fff;
          width: 75px;
          height: 40px;
          margin-left: 100px;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>