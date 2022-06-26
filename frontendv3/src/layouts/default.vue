<script setup lang="ts">
import Sidebar from "./sidebar.vue";
import Header from "./header.vue";
import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import { ref } from 'vue'

const theme = ref<GlobalTheme | null>(null)

const changeTheme = () => {
  if (theme.value == null) {
    theme.value = darkTheme
  } else {
    theme.value = null
  }
}
</script>

<template>
  <n-config-provider :theme="theme" class="dflayout">
    <div class="dflayout">

      <n-layout has-sider>
        <n-layout-sider bordered content-style="padding: 24px;">
          <Sidebar></Sidebar>
        </n-layout-sider>
        <n-layout>
          <n-layout-header bordered>
            <Header @changeThemeSignal="changeTheme"></Header>
          </n-layout-header>
          <n-layout-content content-style="padding: 24px;">
            <router-view></router-view>
          </n-layout-content>
          <n-layout-footer bordered>
            © 2022 Powered by SeldomQA Team
          </n-layout-footer>
        </n-layout>
      </n-layout>

    </div>
  </n-config-provider>
</template>

<style scoped>
.n-layout-header,
.n-layout-footer {
  /* background: rgba(128, 128, 128, 0.2); */
  padding: 24px;
}

.n-layout-sider {
  /* background: rgba(128, 128, 128, 0.3); */
  /* height: 100vh; */
}

.n-layout-content {
  /* background: #e9eef3; */
  /* height: 100vh; */
}

.dflayout {
  height: 100%;
}

.n-layout {
  height: 100%;
}

/* * {
  box-sizing: border-box
} */
</style>
