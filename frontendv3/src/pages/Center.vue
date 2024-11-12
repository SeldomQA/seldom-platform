<script setup lang="ts">
import CenterNav from "~/layouts/CenterNav.vue";
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
});
</script>

<template>
  <n-config-provider :theme="theme">
  <n-layout class="dflayout" has-sider position="absolute">
    <n-layout>
      <n-layout-header bordered>
        <!-- 导航组件，用于点击菜单跳转至指定 组件 -->
        <CenterNav @changeThemeSignal="changeTheme"></CenterNav>
      </n-layout-header>
      <!-- 设置内容区域，根据主题切换样式 -->
      <n-layout :position="'absolute'" :style="{ top: '76px', bottom: '64px', backgroundColor: theme ? '' : '#fbf9f6' }">
        <n-layout content-style="padding: 24px; background-color: #fbf9f6">
          <div v-if="isRouterAlive">
            <!-- 在该区域加载对应的组件 子 组件。 -->
            <router-view></router-view>
          </div>
        </n-layout>
      </n-layout>
      <!-- 页脚 -->
      <n-layout-footer bordered position="absolute" style="text-align: center">
        © 2024 Powered by SeldomQA Team
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
