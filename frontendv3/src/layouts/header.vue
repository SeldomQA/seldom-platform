<script lang="ts">
import { h, defineComponent, ref, onMounted } from "vue";
import type { Component } from "vue";
import { NIcon, useMessage } from "naive-ui";
import {
  DocumentText as DocuIcon,
  LogOutOutline as LogoutIcon,
  PersonCircle as PersonIcon,
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

export default defineComponent({
  emits: ["changeThemeSignal"],
  setup(props, ctx) {
    const router = useRouter();
    const message = useMessage();

    const mainhtml = document.getElementsByTagName("html");
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
      ctx.emit("changeThemeSignal");
      mainhtml[0].classList.toggle("dark");
    };

    const handleSelect = (key: string | number) => {
      switch (key) {
        case "logout":
          UserApi.logout({ token: token.value }).then((resp) => {
            if (resp.success === true) {
              sessionStorage.clear();
              router.push("/login");
            } else {
              message.error("退出失败！");
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
      const mode = localStorage.getItem("themeMode");
      if (mode == "light" || mode == null) {
        btnLabel.value = "深色";
      } else {
        btnLabel.value = "浅色";
      }
      token.value = sessionStorage.getItem("token");
    });
    return {
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
    };
  },
});
</script>

<template>
  <div class="header">
    <n-space justify="end">
      <n-button @click="changeTheme">
        <template #default>
          {{ btnLabel }}
        </template>
      </n-button>
      <n-dropdown :options="options" @select="handleSelect">
        <n-button >
          <template #icon><n-icon :component="PersonIcon"></n-icon></template
        ></n-button>
      </n-dropdown>
    </n-space>
  </div>
</template>

<style>
.header {
}
</style>
