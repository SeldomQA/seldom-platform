<script setup lang="ts">
import UserApi from "~/request/user";
import { useRouter } from "vue-router";

import { ref } from "vue";
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules,
} from "naive-ui";
import { GitBranch, Search, AppsSharp } from '@vicons/ionicons5'

interface TSignin {
  username: string | null;
  password: string | null;
}

interface TSignup {
  username: string | null;
  password: string | null;
  password2: string | null;
}


const router = useRouter();
const formRef = ref<FormInst | null>(null);
const rPasswordFormItemRef = ref<FormItemInst | null>(null);
const message = useMessage();

const signinForm = ref<TSignin>({
  username: null,
  password: null,
});

const signupRef = ref<TSignup>({
  username: null,
  password: null,
  password2: null,
});

function validatePasswordStartWith(
  rule: FormItemRule,
  value: string
): boolean {
  return (
    !!signupRef.value.password &&
    signupRef.value.password.startsWith(value) &&
    signupRef.value.password.length >= value.length
  );
}

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === signupRef.value.password;
}

const signupRules: FormRules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: ["blur"],
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: ["blur"],
    },
  ],
  password2: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordStartWith,
      message: "两次密码输入不一致",
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      message: "两次密码输入不一致",
      trigger: ["blur", "password-input"],
    },
  ],
};

// 用户登录
const submitLogin = () => {
  if (signinForm.value.username == null || signinForm.value.password == null) {
    message.error("用户名或密码不能为空！");
    return;
  }
  UserApi.login(signinForm.value).then((resp: any) => {
    if (resp.success === true) {
      sessionStorage.token = resp.result.token;
      sessionStorage.user = resp.result.username;
      router.push({ path: "/main/project" });
      message.success("登陆成功！");
    } else {
      message.error(resp.error.message);
    }
  });
};

// 用户注册
const submitRegister = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      UserApi.register(signupRef.value).then((resp: any) => {
        if (resp.success === true) {
          message.success("注册成功！");
        } else {
          message.error(resp.error.message);
        }
      });
    } else {
      console.log(errors);
      message.error("请正确填写信息");
    }
  });
};

const handlePasswordInput = () => {
  if (signupRef.value.password2) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
  }
};
</script>

<template>
  <div class="main">
    <header>
      <div class="features">
        <div>
          <h1>Seldom Platform.</h1>
          <span style="color: #869ab8">基于Seldom框架的测试平台.</span>
          <a href="https://github.com/SeldomQA/seldom" target="_blank">
            <n-button type="primary" quaternary>GitHub</n-button>
          </a>
          <a href="https://seldomqa.github.io/" target="_blank">
            <n-button type="info" quaternary>在线文档</n-button>
          </a>
        </div>
        <div>
          <img src="../assets/login-bg.png" alt="" style="width: 60%;">
        </div>
        <n-divider>特色</n-divider>
        <div class="feature-option">
          <div class="icon text-primary mb-3">
              <n-icon size="20" :component="GitBranch"  class="feature-icon"/>
            <span class="feature-title">支持git</span>
          </div>
          <p class="text-muted mb-6 mb-md-0">
            seldom-platform 可以接入任意git管理的自动化项目,
            克隆和拉取项目代码。
          </p>
        </div>
        <div class="feature-option">
          <div class="icon text-primary mb-3">
            <n-icon size="20" :component="Search" class="feature-icon"/>
            <span class="feature-title">解析用例</span>
          </div>
          <p class="text-muted mb-0">
            seldom-platform 可以自动解析seldom自动化项目的“用例”,
            并且在平台上展示。
          </p>
        </div>
        <div class="feature-option">
          <div class="icon text-primary mb-3">
            <n-icon size="20" :component="AppsSharp" class="feature-icon"/>
            <span class="feature-title">平台化</span>
          </div>
          <p class="text-muted mb-6 mb-md-0">
            借助于平台的能力，可以方便的管理用例的执行、创建定时任务、展示统计结果。
          </p>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="login">
        <n-card class="login-card">
          <n-tabs
            class="card-tabs"
            size="large"
            animated
          >
            <n-tab-pane name="signin" tab="登录">
              <n-form :model="signinForm" label-placement="left">
                <n-form-item-row label="">
                  <n-input v-model:value="signinForm.username" placeholder="帐号"/>
                </n-form-item-row>
                <n-form-item-row label="">
                  <n-input v-model:value="signinForm.password" type="password" placeholder="密码"/>
                </n-form-item-row>
              </n-form>
              <n-button type="primary" block strong @click="submitLogin">
                登录
              </n-button>
            </n-tab-pane>
            <n-tab-pane name="signup" tab="注册">
              <n-form ref="formRef" :model="signupRef" :rules="signupRules" label-placement="left">
                <n-form-item path="username" label="">
                  <n-input
                    v-model:value="signupRef.username"
                    @keydown.enter.prevent
                    placeholder="帐号"
                  />
                </n-form-item>
                <n-form-item path="password" label="">
                  <n-input
                    v-model:value="signupRef.password"
                    @input="handlePasswordInput"
                    @keydown.enter.prevent
                    placeholder="密码"
                    type="password"
                  />
                </n-form-item>
                <n-form-item
                  ref="rPasswordFormItemRef"
                  first
                  path="password2"
                  label=""
                >
                  <n-input
                    v-model:value="signupRef.password2"
                    :disabled="!signupRef.password"
                    @keydown.enter.prevent
                    placeholder="确认密码"
                    type="password"
                  />
                </n-form-item>
              </n-form>
              <n-button
                type="primary"
                block
                strong
                @click="submitRegister"
                :disabled="
                  signupRef.username === null ||
                  signupRef.password === null ||
                  signupRef.password2 === null
                "
              >
                注册
              </n-button>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </div>
    </div>
  </div>
</template>

<style>

.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 10rem;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}

.title {
  text-align: center;
}

.login-card {
  width: 350px;
  height: 320px;
}

.content {
  margin: auto;
}

.login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: left;
}

.features {
  text-align: center;
  margin-top: 100px;
}

.feature-option {
  height: 120px;
}

.feature-icon {
  top: 5px;
}

.feature-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-left: 15px;
}
</style>
