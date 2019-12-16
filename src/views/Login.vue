<template>
  <div class="login">
    <!-- 登录界面的表单 -->
    <div class="login-form">
      <img src="../assets/logo.png" alt="">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            v-model.number="ruleForm.account"
            autocomplete="off"
            :required="true"
            placeholder="请输入11位手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="new-password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>

      <!-- 进入注册页面 -->
      <div class="login-register">
        <p>
          还没有账号?&nbsp;&nbsp;
          <router-link tag="span" to="/register">点我注册</router-link>
        </p>
      </div>
    </div>
    <!-- 登录界面的右侧图片 -->
    <div class="login-img">
      <img src="../assets/login.png" alt />
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
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        // 用户名是非数字
        if (!Number.isInteger(value)) {
          callback(new Error("请输入正确手机号"));
        } else {
          if (value.toString().length < 11 || value.toString().length > 11) {
            callback(new Error("请输入正确11位手机号"));
          } else if (value.toString()[0] !== "1") {
            callback(new Error("请输入正确11位手机号"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    // 2.校验第一次密码
    var validatePass = (rule, value, callback) => {
      // 第一次密码为空就提示
      if (value === "") {
        callback(new Error("请输入密码"));
      } //密码至少6位
      else if (value.toString().length < 6) {
        callback(new Error("密码至少为6位"));
      } //密码最多16位
      else if (value.toString().length > 16) {
        callback(new Error("密码最多为16位"));
      } else {
        // 再次输入密码不为空 就检验第二次密码
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 3.校验第二次密码
    var validatePass2 = (rule, value, callback) => {
      // 第二次密码为空 提示输入密码
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } //两次密码不一致 提示密码不一致
      else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 绑定input框信息
      ruleForm: {
        account: "", //账号
        pass: "", //第一次密码
        checkPass: "" //第二次密码
      },
      // 校验规则
      rules: {
        account: [{ required: true, validator: checkAccount, trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击提交 对整个表单进行校验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return;
        } else {
          if(this.ruleForm.account == 12311111111 && this.ruleForm.pass.toString() == '123456'){
            alert("登录成功")
            this.$store.commit('setUserName',this.ruleForm.account)//讲用户登录后保存到state里面
            this.$router.push('/index/home')
          }else{
            alert("账户名或密码错误");
          }
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  // 登录界面表单
  .login-form {
    width: 50%;
    img {
      width: 160px;
      height: 35px;
      margin-left: 120px;
      margin-top: 30px;
    }
    .el-form {
      width: 60%;
      margin-top: 110px;
      margin-left: 120px;
      .el-form-item {
        margin-top: 30px;
      }
      .el-button {
        width: 305px;
      }
    }
    // 跳转到注册界面
    .login-register {
      margin-left: 220px;
      p {
        color: #999;
        font-size: 16px;
        span {
          color: #409eff;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
  // 登录界面的图片
  .login-img {
    img {
      width: 500px;
    }
  }
  // 注册页面底部部分
  .register-footer {
    background-color: #fff;
    width: 100%;
    height: 85px;
    p {
      text-align: center;
      line-height: 85px;
      color: #999;
      font-size: 18px;
    }
  }
}
</style>