<script setup lang="ts">
import Sidebar from "./sidebar.vue";
import Header from "./header.vue";
</script>

<template>
  <n-space vertical size="large">
    <n-layout has-sider>
      <n-layout-sider bordered content-style="padding: 24px;">
        <Sidebar></Sidebar>
      </n-layout-sider>
      <n-layout>
        <n-layout-header bordered>
          <Header></Header>
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;" style="min-height:auto">
          <router-view></router-view>
        </n-layout-content>
        <n-layout-footer bordered>成府路</n-layout-footer>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<style scoped>
.n-layout-header,
.n-layout-footer {
  /* background: rgba(128, 128, 128, 0.2); */
  padding: 24px;
}

.n-layout-sider {
  /* background: rgba(128, 128, 128, 0.3); */
}

.n-layout-content {
  background: #e9eef3;
}
</style>
