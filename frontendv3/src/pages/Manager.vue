<script setup lang="ts">
import ManagerNav from "~/layouts/ManagerNav.vue";
import Footer from "~/layouts/footer.vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import { ref, onMounted, provide } from "vue";
import { nextTick } from 'vue';

const theme = ref<GlobalTheme | null>(null);
const isRouterAlive = ref(true);

const changeTheme = () => {
  theme.value = theme.value ? null : darkTheme;
  const mode = theme.value ? "dark" : "light";
  localStorage.setItem("themeMode", mode);  // 存储模式
  document.documentElement.classList.toggle("dark", mode === "dark");
};

const reload = () => {
  isRouterAlive.value = !isRouterAlive.value;
  nextTick(() => {
  });
};

provide("reload", reload);

onMounted(() => {
  const mode = localStorage.getItem("themeMode") ?? "light";  // 默认 "light"
  theme.value = mode === "dark" ? darkTheme : null;  // 根据 localStorage 设置主题
  document.documentElement.classList.toggle("dark", mode === "dark");
});
</script>

<template>
  <n-config-provider :theme="theme">
    <n-layout class="dflayout" has-sider position="absolute">
      <n-layout>
        <n-layout-header bordered>
          <ManagerNav @changeThemeSignal="changeTheme"></ManagerNav>
        </n-layout-header>
        <n-layout 
          position="absolute" 
          :style="theme === null ? 'top: 76px; bottom: 64px; background-color: #fbf9f6': 'top: 76px; bottom: 64px;' ">
          <n-layout
            :content-style="theme === null ? 'padding: 24px; background-color: #fbf9f6' : 'padding: 24px'">
            <div v-if="isRouterAlive">
              <router-view></router-view>
            </div>
            <div v-else>
              <router-view></router-view>
            </div>
          </n-layout>
        </n-layout>
        <Footer></Footer>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<style scoped>
.n-layout-header,
.n-layout-footer {
  padding: 20px;
}
</style>
