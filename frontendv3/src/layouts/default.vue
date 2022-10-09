<script setup lang="ts">
import Sidebar from "./sidebar.vue";
import Header from "./header.vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import { ref, onMounted } from "vue";

const theme = ref<GlobalTheme | null>(null);
const localStorage = window.localStorage;

const islogin = sessionStorage.token

const changeTheme = () => {
  if (theme.value == null) {
    theme.value = darkTheme;
  } else {
    theme.value = null;
  }
};

onMounted(() => {
  const mode = localStorage.getItem("themeMode");
  const mainhtml = document.getElementsByTagName("html");

  if (mode == "light" || mode == null) {
    theme.value = darkTheme;
    mainhtml[0].classList.remove("dark");
  } else {
    theme.value = null;
    mainhtml[0].classList.add("dark");
  }
  changeTheme();
  // console.log(islogin);
});
</script>

<template>
  <n-config-provider :theme="theme">
    <n-layout v-if="islogin != undefined" class="dflayout" has-sider position="absolute">
      <n-layout-sider bordered content-style="padding: 24px;">
        <Sidebar></Sidebar>
      </n-layout-sider>
      <n-layout>
        <n-layout-header bordered>
          <Header @changeThemeSignal="changeTheme"></Header>
        </n-layout-header>
        <n-layout position="absolute" style="top: 76px; bottom: 64px">
          <n-layout content-style="padding: 24px;">
            <router-view></router-view>
          </n-layout>
        </n-layout>
        <n-layout-footer bordered position="absolute" style="text-align:center">
          © 2022 Powered by SeldomQA Team
        </n-layout-footer>
      </n-layout>
    </n-layout>
    <n-layout v-else>
      <router-view></router-view>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.n-layout-header,
.n-layout-footer {
  /* background: rgba(128, 128, 128, 0.2); */
  padding: 20px;
}

.n-layout-sider {
  /* background: rgba(128, 128, 128, 0.3); */
}

.n-layout-content {
  /* background: #e9eef3; */
}

.dflayout {
  /* height: 100%; */
}
</style>
