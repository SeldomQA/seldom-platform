<script lang="ts">
import { h, defineComponent, ref, onMounted, reactive, inject } from "vue";
import type { Component } from "vue";
import { RouterLink } from "vue-router";
import type { MenuOption } from "naive-ui";
import { NIcon, useMessage  } from "naive-ui";
import {
  DocumentText as DocuIcon,
  LogOutOutline as LogoutIcon,
  PersonCircle as PersonIcon,
  HomeOutline as HomeIcon, 
  CloudOutline as CloudIcon,
  PeopleOutline as PeopleIcon,
} from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import UserApi from "~/request/user";


const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

// 定义菜单
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "center-Project",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "项目配置" }
      ),
    key: "go-back-home",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "center-Env",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "环境配置" }
      ),
    key: "go-back-env",
    icon: renderIcon(CloudIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "center-Team",
            params: {
              lang: "zh-CN",
            },
          },
        },
        { default: () => "团队配置" }
      ),
    key: "go-back-team",
    icon: renderIcon(PeopleIcon),
  },
  
];


export default defineComponent({
  emits: ["changeThemeSignal"],
  setup() {
    const router = useRouter();
    const message = useMessage();
    const datas = reactive({
      loading: false,
      projectValue: null,
    });

    // 刷新组件
    const reload =  inject("reload");

    // 更新主题
    const btnLabel = ref("深色");
    const localStorage = window.localStorage;
    const changeTheme = () => {
      if (btnLabel.value == "深色") {
        btnLabel.value = "浅色";
        localStorage.setItem("themeMode", "dark");
      } else {
        btnLabel.value = "深色";
        localStorage.setItem("themeMode", "light");
      }
      location.reload();
    };

    const handleSelect = (key: string | number) => {
      switch (key) {
        case "logout":
          UserApi.logout({ token: token.value }).then((resp: any) => {
            if (resp.success === true) {
              sessionStorage.clear();
              router.push("/login");
            } else {
              message.error(resp.error.message);
            }
          });
          break;
        case "help_documentation":
          window.open("https://github.com/SeldomQA/seldom-platform", "_blank");
          break;
        default:
          break;
      }
    };
    const token = ref<string | null>("");

    onMounted(() => {
      // 本地缓存获取主题
      const mode = localStorage.getItem("themeMode");
      console.log(mode);
      if (mode == "light" || mode == null) {
        btnLabel.value = "深色";
      } else {
        btnLabel.value = "浅色";
      }
      // 登录token
      token.value = sessionStorage.getItem("token");
    });

    return {
      datas,
      btnLabel,
      changeTheme,
      options: [
        {
          label: "操作手册",
          key: "help_documentation",
          icon: renderIcon(DocuIcon),
        },
        {
          label: "退出登录",
          key: "logout",
          icon: renderIcon(LogoutIcon),
        },
      ],
      token,
      handleSelect,
      PersonIcon,
      reload,
      menuOptions,
      handleUpdateValue(key: string, item: MenuOption) {
        console.log("[onUpdate:value]: " + JSON.stringify(key));
        console.log("[onUpdate:value]: " + JSON.stringify(item));
      },
    };
  },
});
</script>

<template>
  <div class="header">
    <n-space justify="space-between">
      <img src="../assets/seldom-platform.gif" style="height: 40px" />
      <n-menu
        :options="menuOptions"
        @update:value="handleUpdateValue"
        mode="horizontal"/>
      <n-space>
        <n-button @click="changeTheme">
          <template #default>
            {{ btnLabel }}
          </template>
        </n-button>
        <n-dropdown :options="options" @select="handleSelect">
          <n-button>
            <template #icon>
              <n-icon :component="PersonIcon"></n-icon>
              </template>
            </n-button>
          </n-dropdown>
      </n-space>
    </n-space>
  </div>
</template>

<style scoped>
</style>
