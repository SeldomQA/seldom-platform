<template>
  <div class="main">
    <div class="title">
      <span>
        <h1><span style="color: #20d489">Seldom</span> Platform.</h1>
        <p style="color: #869ab8">基于Seldom框架的测试平台.</p>
      </span>
    </div>
    <div class="content">
      <div class="login">
        <n-card class="login-card">
          <n-tabs
            class="card-tabs"
            size="large"
            animated
            style="margin: 0 -4px"
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
          >
            <n-tab-pane name="signin" tab="登录">
              <n-form :model="signinRef" :rules="signinRules" label-placement="left">
                <n-form-item-row label="">
                  <n-input v-model:value="signinRef.username" placeholder="帐号"/>
                </n-form-item-row>
                <n-form-item-row label="">
                  <n-input v-model:value="signinRef.password" type="password" placeholder="密码"/>
                </n-form-item-row>
              </n-form>
              <n-button
                type="primary"
                block
                secondary
                strong
                @click="submitLogin"
              >
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
                  />
                </n-form-item>
              </n-form>
              <n-button
                type="primary"
                block
                secondary
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
      <div class="features">
        <div style="width: 30%; float: left">
          <div class="icon text-primary mb-3">
            <n-icon size="20" :component="GitBranch" />
          </div>
          <h3>支持git</h3>
          <p class="text-muted mb-6 mb-md-0">
            seldom-platform 可以接入任意git管理的自动化项目,
            克隆和拉取项目代码。
          </p>
        </div>
        <div style="width: 30%; float: left; margin-left: 3%">
          <div class="icon text-primary mb-3">
            <n-icon size="20" :component="Search" />
          </div>
          <h3>解析用例</h3>
          <p class="text-muted mb-0">
            seldom-platform 可以自动解析seldom自动化项目的“用例”,
            并且在平台上展示。
          </p>
        </div>
        <div style="width: 30%; float: right">
          <div class="icon text-primary mb-3">
            <n-icon size="20" :component="AppsSharp" />
          </div>
          <h3>平台化</h3>
          <p class="text-muted mb-6 mb-md-0">
            借助于平台的能力，可以方便的管理用例的执行、创建定时任务、展示统计结果。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserApi from "~/request/user";
import { useRouter } from "vue-router";

import { defineComponent, ref } from "vue";
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

export default defineComponent({
  components: {
    GitBranch,
    Search,
    AppsSharp
  },
  setup() {
    const router = useRouter();
    const formRef = ref<FormInst | null>(null);
    const rPasswordFormItemRef = ref<FormItemInst | null>(null);
    const message = useMessage();

    const signinRef = ref<TSignin>({
      username: null,
      password: null,
    });
    const signupRef = ref<TSignup>({
      username: null,
      password: null,
      password2: null,
    });

    const signinRules: FormRules = {
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
    };

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
      // formRef.value?.validate((errors) => {
      //   if (!errors) {
      UserApi.login(signinRef.value).then((resp) => {
        if (resp.success === true) {
          sessionStorage.token = resp.result.token;
          sessionStorage.user = resp.result.username;
          router.push({ path: "/main/project" });
          message.success("登陆成功！");
        } else {
          message.error(resp.error.message);
        }
      });
      // } else {
      //   console.log(errors);
      //   message.error("请正确填写信息");
      // }
      // });
    };
    // 用户注册
    const submitRegister = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          UserApi.register(signupRef.value).then((resp) => {
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

    return {
      formRef,
      rPasswordFormItemRef,
      signinRef,
      signinRules,
      signupRef,
      signupRules,
      submitLogin,
      submitRegister,
      GitBranch,
      Search,
      AppsSharp,
      handlePasswordInput() {
        if (signupRef.value.password2) {
          rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
        }
      },
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success("验证成功");
          } else {
            console.log(errors);
            message.error("请正确填写信息");
          }
        });
      },
    };
  },
});

// export default {
//   data() {
//     return {
//       stretch: true,
//       activeName: "first",
//       loginForm: {
//         username: "",
//         password: "",
//       },
//       signupForm: {
//         username: "",
//         password: "",
//         password2: "",
//       },
//       rules: {
//         username: [{ required: true, message: "请输入账号", trigger: "blur" }],
//         password: [{ required: true, message: "请输入密码", trigger: "blur" }],
//         password2: [
//           { required: true, message: "请输入确认密码", trigger: "blur" },
//         ],
//       },
//     };
//   },
//   methods: {
//     // 用户登录
//     submitLogin(formName) {
//       this.$refs[formName].validate((valid) => {
//         if (valid) {
//           // UserApi.login(this.loginForm).then(resp => {
//           //   if (resp.success === true) {
//           //     sessionStorage.token = resp.result.token
//           //     sessionStorage.user = resp.result.username
//           //     this.$router.push({ path: '/main/settings' })
//           //     Message.success('登陆成功！')
//           //   } else {
//           //     this.$message.error(resp.error.message)
//           //   }
//           // })
//         } else {
//           return false;
//         }
//       });
//     },
//     // 用户注册
//     submitRegister(formName) {
//       this.$refs[formName].validate((valid) => {
//         if (valid) {
//           // UserApi.signup(this.signupForm).then(resp => {
//           //   if (resp.success === true) {
//           //     this.$message.success('注册成功！')
//           //   } else {
//           //     this.$message.error(resp.error.message)
//           //   }
//           // })
//         } else {
//           return false;
//         }
//       });
//     },
//   },
// };
</script>

<style>
.title {
  text-align: center;
}

.login-card {
  width: 350px;
  height: 320px;
}

.content {
  margin: auto;
  height: 500px;
  /* width: 1680px; */
  max-width: 1280px;
  min-width: 1280px;
}

.login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-image: url("../assets/home-bg.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: left;
}

.features {
  text-align: center;
  margin-top: 100px;
}
</style>
