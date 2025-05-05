<script setup lang="ts">
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import { ref, onMounted, provide } from "vue";


const props = defineProps<{
  navComponent: any
}>();

const theme = ref<GlobalTheme | null>(null);
const isRouterAlive = ref(true);

const changeTheme = () => {
  theme.value = theme.value ? null : darkTheme;
  const mode = theme.value ? "dark" : "light";
  localStorage.setItem("themeMode", mode);
  document.documentElement.classList.toggle("dark", mode === "dark");
};

const reload = () => {
  isRouterAlive.value = !isRouterAlive.value;
};

provide("reload", reload);

onMounted(() => {
  const mode = localStorage.getItem("themeMode") ?? "light";
  theme.value = mode === "dark" ? darkTheme : null;
  document.documentElement.classList.toggle("dark", mode === "dark");
});
</script>

<template>
  <n-config-provider :theme="theme">
    <n-layout class="dflayout" has-sider position="absolute">
      <n-layout>
        <n-layout-header bordered>
          <component :is="props.navComponent" @changeThemeSignal="changeTheme"></component>
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
          <n-layout-footer bordered position="absolute" style="text-align: center">
            © 2025 Powered by SeldomQA Team
          </n-layout-footer>
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