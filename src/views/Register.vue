<template>
  <div class="register">
    <!-- 注册页面头部分 -->
    <div class="register-header">
      <div class="header-wrap">
        <div class="header-img">
          <img src="../assets/logo.png" alt />
        </div>
        <div class="header-login">
          <span>已有租房账号?</span>
          <router-link tag="button" to="/login">登录</router-link>
        </div>
      </div>
    </div>
    <!-- 注册页面主体部分 -->
    <div class="register-form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model.number="ruleForm.account" autocomplete="off" :required="true" placeholder="请输入11位手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="new-password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="new-password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册页面底部部分 -->
    <div class="register-footer">
      <p>Copyright © 2012-2018 zufang.com. All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 1.校验用户手机账号
    var checkAccount = (rule, value, callback) => {
      // 用户名不能为空
      if (!value) {
        return callback(new Error("账号不能为空"))
      }
      setTimeout(() => {
        // 用户名是非数字
        if (!Number.isInteger(value)) {
          callback(new Error("请输入正确手机号"))
        } else {
          if (value.toString().length < 11 || value.toString().length > 11) {
            callback(new Error("请输入正确11位手机号"))
          }else if (value.toString()[0] !== '1') {
            callback(new Error("请输入正确11位手机号"))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    // 2.校验第一次密码
    var validatePass = (rule, value, callback) => {
      // 第一次密码为空就提示
      if (value === "") {
        callback(new Error("请输入密码"))
      } //密码至少6位
      else if(value.toString().length < 6) {
        callback(new Error("密码至少为6位"))
      } //密码最多16位
      else if(value.toString().length > 16) {
        callback(new Error("密码最多为16位"))
      }
      else{
        // 再次输入密码不为空 就检验第二次密码
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    }
    // 3.校验第二次密码
    var validatePass2 = (rule, value, callback) => {
      // 第二次密码为空 提示输入密码
      if (value === "") {
        callback(new Error("请再次输入密码"))
      }//两次密码不一致 提示密码不一致 
      else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback()
      }
    }
    return {
      // 绑定input框信息
      ruleForm: {
        account: "",//账号
        pass: "",//第一次密码
        checkPass: "",//第二次密码
      },
      // 校验规则
      rules: {
        account: [{required: true, validator: checkAccount, trigger: "blur" }],
        pass: [{ required: true,validator: validatePass, trigger: "blur" }],
        checkPass: [{ required: true,validator: validatePass2, trigger: "blur" }],
      }
    }
  },
  methods: {
    // 点击提交 对整个表单进行校验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return
        } else {
          alert('submit')
        }
      })
    }
  }
};
</script>

<style lang='less' scoped>
.register {
  width: 100%;
  position: relative;
  // 注册页面头部分
  .register-header {
    width: 100%;
    background-color: rgba(0, 0, 0, .7);
    border-bottom: 2px solid #ccc;
    .header-wrap {
      width: 90%;
      height: 60px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-img {
        img {
          width: 160px;
          height: 35px;
        }
      }
      .header-login {
        color: #fff;
        span {
          font-size: 20px;
          font-weight: bold;
        }
        button {
          border: 1px solid transparent;
          outline: none;
          width: 60px;
          height: 30px;
          background-color: #409eff;
          margin-right: 50px;
          margin-left: 30px;
          cursor: pointer;
          color: #fff;
        }
      }
    }
  }
  // 注册页面主体部分
  .register-form{
    width: 100%;
    padding: 50px;
    box-sizing: border-box;
    .el-form{
      width: 33%;
      margin-top: 50px;
      .el-form-item{
        margin-top: 30px;
      }
      .el-button{
        width: 312px;
      }
    }
  }
  // 注册页面底部部分
  .register-footer{
    background-color: #fff;
    width: 100%;
    height: 85px;
      p{
        text-align: center;
        line-height: 85px;
        color: #999;
        font-size: 18px;
      }
  }
}
</style>