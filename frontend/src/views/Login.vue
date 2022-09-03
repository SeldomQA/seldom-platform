<template>
  <div class="home">
    <div class="main-window">
      <div class="main-desc">
      </div>
      <div class="login-window">
          <img src="../assets/seldom-platform.gif" class="img-logo" />
          <div style="font-size:45px; margin:5px auto;">Seldom平台</div>
          <el-tabs v-model="activeName" class="border-card" type="border-card" @tab-click="handleClick" :stretch="true" style="margin: auto" >
            <el-tab-pane label="登录" name="first">
               <span slot="label"><i class="el-icon-user-solid"></i>登陆</span>
              <el-form
                :model="loginForm"
                :rules="rules"
                ref="loginForm"
                label-position="left"
                class="demo-loginForm"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input
                    v-model="loginForm.username"
                    cy-data="LoginUsername"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    cy-data="LoginPassword"
                    v-model="loginForm.password"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="width: 180px;text-align: center;"
                    @click="submitLogin('loginForm')"
                    cy-data="loginButton"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">
              <span slot="label"><i class="el-icon-s-order"></i>注册</span>
              <el-form
                :model="registerForm"
                :rules="rules"
                ref="registerForm"
                class="demo-registerForm"
                label-position="left"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item label="设置密码" prop="password">
                  <el-input
                    v-model="registerForm.password"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                  <el-input
                    v-model="registerForm.password2"
                    type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item size="large">
                  <el-button
                    type="primary"
                    @click="submitRegister('registerForm')"
                    style="width: 180px;text-align: center;"
                    >创建</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';


import UserApi from '../request/user';

export default {
  data() {
    return {
      stretch: true,
      activeName: 'first',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        password2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 用户登录
    submitLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          console.log('登陆测')
          UserApi.login(this.loginForm).then(resp => {
            if (resp.success === true) {
              sessionStorage.token = resp.result.token;
              sessionStorage.user = resp.result.username;
              this.$router.push({ path: '/main/Setting' });
              // this.$message.success("登录成功！");
              Message.success('登陆成功');
            } else {
              this.$message.error('登录失败！');
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 用户注册
    submitRegister(formName) {
      console.log(this.$refs[formName].validate());
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          UserApi.register(this.registerForm).then(resp => {
            if (resp.success === true) {
              this.$message.success('注册成功！');
            } else {
              this.$message.error(resp.error.msg);
            }
          });
        } else {
          console.log('错误提交');
          return false;
        }
      });
    }
  }
};
</script>

<style>
.home{
  margin: auto;
}
.border-card {
  width: 350px;
}
.main-window {
  /* text-align: center;
  margin: auto auto; */
  /* display:table-cell */
  position: absolute;
  top: 35%;
  left: 50%;
  width: 600px;
  height: 100px;
  margin: -150px 0 0 -300px;
}
.main-desc {
  width: 200px;
}
.login-window {
  width: 100%;
  margin: 0 auto;
}
</style>
