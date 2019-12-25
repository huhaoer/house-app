<template>
  <div class="register">
    <!-- 注册页面头部分 -->
    <div class="register-header">
      <div class="header-wrap">
        <div class="header-img">
          <img src="../assets/logo.png" @click="handToHome" />
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
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="ruleForm.name"
            autocomplete="off"
            :required="true"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account" class="yzm">
          <el-input
            v-model.number="ruleForm.account"
            autocomplete="off"
            :required="true"
            :maxlength="11"
            placeholder="请输入11位手机号码"
          ></el-input>
          <el-button class="btn" type="primary" @click="getCode" :class="{isClick: isClick}" :disabled="isClick">验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code" v-if="showCode">
          <el-input
            v-model="ruleForm.code"
            autocomplete="off"
            :required="true"
            placeholder="请输入验证码"
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
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="new-password"
            placeholder="请再次输入密码"
          ></el-input>
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
import api from "../api/index";
import { red } from "color-name";
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
    // 4.校验姓名
    var checkName = (rule, value, callback) => {
      // 姓名不能为空
      if (!value) {
        return callback(new Error("姓名不能为空"));
      }
      setTimeout(() => {
        // 用户名是非数字
        if (Number.isInteger(value)) {
          callback(new Error("请输入正确姓名"));
        } else {
          if (value.toString().length < 2 || value.toString().length > 4) {
            callback(new Error("请输入正确姓名"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    // 4.校验验证码
    var checkCode = (rule, value, callback) => {
      // 姓名不能为空
      if (!value) {
        return callback(new Error("请填写验证码"));
      }
      setTimeout(() => {
        // 用户名是非数字
        if (Number.isInteger(value)) {
          callback(new Error("请输入正确验证码"));
        } else {
          if (value.toString().length != 6) {
            callback(new Error("请输入正确验证码"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      // 绑定input框信息
      ruleForm: {
        name: "", //姓名
        account: "", //账号
        pass: "", //第一次密码
        checkPass: "", //第二次密码
        code: "" //短信验证码
      },
      // 校验规则
      rules: {
        account: [
          { required: true, validator: checkAccount, trigger: "blur" },
          {
            required: true,
            pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        code: [{ required: true, validator: checkCode, trigger: "blur" }]
      },

      showCode: false, //是否展示验证码框
      nowCode: null, //当前验证码
      isClick: false,//当前验证码按钮是否被点击
    };
  },
  methods: {
    // 点击提交 对整个表单进行校验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return;
        } else {
          console.log(this.nowCode == null, "当前验证码是否为空");
          console.log(this.nowCode, "当前的验证码");
          console.log(this.ruleForm.code, "表单的验证码");
          if (this.nowCode == null) {
            this.$message({
              message: "请先获取验证码",
              type: "warning",
              duration: "1500",
              center: true
            });
            return;
          } else {
            const UserNumber = this.ruleForm.account; //手机号
            const UserPwd = this.ruleForm.pass; //密码
            const UserName = this.ruleForm.name; //姓名
            const isRegister = false; //标记是否被注册过

            if (parseInt(this.nowCode) == parseInt(this.ruleForm.code)) {
              //验证码相同
              // 判断电话是否被注册过
              api
                .FindUserInfo({ UserNumber })
                .then(res => {
                  // 电话已经存在
                  if (res.data._Items.length > 0) {
                    // 提示信息
                    this.$message({
                      message: "该用户已经被注册",
                      type: "error",
                      duration: "2000",
                      center: true,
                      offset: 60
                    });
                    return;
                  } //电话不存在
                  else {
                    api
                      .AddUserInfo({ UserNumber, UserPwd, UserName })
                      .then(res => {
                        console.log(res, "注册成功");
                        // 上传成功
                        if (res.data == UserNumber) {
                          // 提示信息
                          this.$message({
                            message: "注册成功",
                            type: "success",
                            duration: "1500",
                            center: true,
                            offset: 60
                          });
                          this.$router.push("/login"); //跳转到登录页面
                        }
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              this.$message({
                message: "验证码错误",
                type: "error",
                duration: "1500",
                center: true
              });
            }
          }
        }
      });
    },
    // 点击logo跳转首页
    handToHome() {
      this.$router.push("/index");
    },

    // 点击获取验证码
    getCode() {  
      // 获取验证码
      api
        .Getcode(this.ruleForm.account)
        .then(res => {
          if (res.data) {
            this.nowCode = res.data; //当前验证码赋值
            this.isClick = true//设置已经获取了验证码
            this.showCode = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    background-color: rgba(0, 0, 0, 0.7);
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
  .register-form {
    width: 100%;
    padding: 50px;
    box-sizing: border-box;
    .el-form {
      width: 33%;
      margin-top: 50px;
      .el-form-item {
        margin-top: 30px;
        &.yzm {
          position: relative;
          .btn {
            width: 90px;
            height: 40px;
            position: absolute;
            right: -110px;
            &.isClick {
              background-color: #ccc;
            }
          }
        }
      }
      .el-button {
        width: 312px;
      }
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