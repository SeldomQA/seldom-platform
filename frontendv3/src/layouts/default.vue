<script setup lang="ts">
import Sidebar from "~/layouts/Sidebar.vue";
import Header from "~/layouts/Header.vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import { ref, onMounted, watch, provide, nextTick } from "vue";

const theme = ref<GlobalTheme | null>(null);
const localStorage = window.localStorage;

const changeTheme = () => {
  if (theme.value == null) {
    theme.value = darkTheme;
  } else {
    theme.value = null;
  }
};

// 刷新组件
const isRouterAlive = ref(true);

const reload = () => {
  isRouterAlive.value = false;

  nextTick(() => {
    isRouterAlive.value = true;
  });
};

provide("reload", reload);

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
    <n-layout class="dflayout" has-sider position="absolute">
      <n-layout-sider bordered content-style="padding: 24px;">
        <Sidebar></Sidebar>
      </n-layout-sider>
      <n-layout>
        <n-layout-header bordered>
          <Header @changeThemeSignal="changeTheme"></Header>
        </n-layout-header>
        <n-layout v-if="theme === null" position="absolute" style="top: 76px; bottom: 64px; background-color: #fbf9f6">
          <n-layout content-style="padding: 24px; background-color: #fbf9f6">
            <div v-if="isRouterAlive"><router-view></router-view></div>
          </n-layout>
        </n-layout>
        <n-layout v-else="theme === null" position="absolute" style="top: 76px; bottom: 64px;">
          <n-layout content-style="padding: 24px;">
            <div v-if="isRouterAlive"><router-view></router-view></div>
          </n-layout>
        </n-layout>
        <n-layout-footer
          bordered
          position="absolute"
          style="text-align: center"
        >
          © 2023 Powered by SeldomQA Team
        </n-layout-footer>
      </n-layout>
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
