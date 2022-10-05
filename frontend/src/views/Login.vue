<template>
  <div class="home">
    <div>
      <img src="../assets/seldom-platform.gif" class="home-logo" />
    </div>
    <div class="background-img">
        <img src="../assets/home-bg.png" width="100%" height="100%" alt="" />
      </div>
    <div class="main-window">
      <span style="float: left; width: 300px;">
        <h1><span style="color: #335eea">Seldom</span> Platform.</h1>
        <p style="color: #869ab8">基于Seldom框架的测试平台.</p>
      </span>
      <span style="float: right">
        <el-tabs v-model="activeName" class="border-card" type="border-card" :stretch="true" style="margin: auto" >
        <el-tab-pane label="登录" name="first">
          <span slot="label"><i class="el-icon-user-solid"></i> 登陆</span>
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            label-position="left"
            class="demo-loginForm"
          >
            <el-form-item label="" prop="username">
              <el-input
                v-model="loginForm.username"
                cy-data="LoginUsername"
                placeholder="账号"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                cy-data="LoginPassword"
                v-model="loginForm.password"
                type="password"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 180px; text-align: center;"
                @click="submitLogin('loginForm')"
                cy-data="loginButton"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <span slot="label"><i class="el-icon-s-order"></i> 注册</span>
          <el-form
            :model="registerForm"
            :rules="rules"
            ref="registerForm"
            class="demo-registerForm"
            label-position="left"
          >
            <el-form-item label="" prop="username">
              <el-input v-model="registerForm.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="设置密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password2">
              <el-input
                v-model="registerForm.password2"
                type="password"
                placeholder="确认密码"
              ></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button
                type="primary"
                @click="submitRegister('registerForm')"
                style="width: 180px; text-align: center;"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      </span>
    </div>
    <div class="main-desc">

      <div style="width: 30%; float: left;">
        <div class="icon text-primary mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h24v24H0z"></path>
              <path d="M7 3h10a4 4 0 110 8H7a4 4 0 110-8zm0 6a2 2 0 100-4 2 2 0 000 4z" fill="#335EEA"></path>
              <path d="M7 13h10a4 4 0 110 8H7a4 4 0 110-8zm10 6a2 2 0 100-4 2 2 0 000 4z" fill="#335EEA" opacity=".3">
              </path>
            </g>
          </svg>
        </div>
        <h3>
          支持git
        </h3>
        <p class="text-muted mb-6 mb-md-0">
          seldom-platform 可以接入任意git管理的自动化项目, 克隆和拉取项目代码。
        </p>
      </div>
      <div style="width: 30%; float: left; margin-left: 3%;">
        <div class="icon text-primary mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h24v24H0z"></path>
              <path d="M17.272 8.685a1 1 0 111.456-1.37l4 4.25a1 1 0 010 1.37l-4 4.25a1 1 0 01-1.456-1.37l3.355-3.565-3.355-3.565zm-10.544 0L3.373 12.25l3.355 3.565a1 1 0 01-1.456 1.37l-4-4.25a1 1 0 010-1.37l4-4.25a1 1 0 011.456 1.37z" fill="#335EEA"></path>
              <rect fill="#335EEA" opacity=".3" transform="rotate(15 12 12)" x="11" y="4" width="2" height="16" rx="1"></rect>
            </g>
          </svg>
        </div>
        <h3> 解析用例 </h3>
        <p class="text-muted mb-0">
          seldom-platform 可以自动解析seldom自动化项目的“用例”, 并且在平台上展示。
        </p>
      </div>
      <div style="width: 30%; float: right;">
        <div class="icon text-primary mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h24v24H0z"></path>
              <path d="M5.5 4h4A1.5 1.5 0 0111 5.5v1A1.5 1.5 0 019.5 8h-4A1.5 1.5 0 014 6.5v-1A1.5 1.5 0 015.5 4zm9 12h4a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 011.5-1.5z" fill="#335EEA"></path>
              <path d="M5.5 10h4a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 019.5 20h-4A1.5 1.5 0 014 18.5v-7A1.5 1.5 0 015.5 10zm9-6h4A1.5 1.5 0 0120 5.5v7a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-7A1.5 1.5 0 0114.5 4z" fill="#335EEA" opacity=".3"></path>
            </g>
          </svg>
        </div>
        <h3>平台化</h3>
        <p class="text-muted mb-6 mb-md-0">
          借助于平台的能力，可以方便的管理用例的执行、创建定时任务、展示统计结果。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import UserApi from '../request/user'

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
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 用户登录
    submitLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          UserApi.login(this.loginForm).then(resp => {
            if (resp.success === true) {
              sessionStorage.token = resp.result.token
              sessionStorage.user = resp.result.username
              this.$router.push({ path: '/main/settings' })
              Message.success('登陆成功！')
            } else {
              this.$message.error(resp.error.message)
            }
          });
        } else {
          console.log('错误提交')
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
              this.$message.success('注册成功！')
            } else {
              this.$message.error(resp.error.message)
            }
          });
        } else {
          console.log('错误提交')
          return false
        }
      });
    }
  }
};
</script>

<style>
.home {
  margin: auto;
}

.background-img {
  z-index: -1;
  position: absolute;
  width: 600px;
  top: 20%;
  left: 20%;
}

.home-logo {
  float: left;
  display: inline-block;
  vertical-align: middle;
  height: 45px;
}

.border-card {
  width: 350px;
}

.main-window {
  position: absolute;
  top: 35%;
  left: 50%;
  width: 800px;
  height: 300px;
  margin: -150px 0 0 -300px;
}

.main-desc {
  position: absolute;
  top: 75%;
  left: 40%;
  width: 1000px;
  height: 100px;
  margin: -150px 0 0 -300px;
}


.login-window {
  width: 100%;
  margin: 0 auto;
}
</style>
