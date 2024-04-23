<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import Default from "./layouts/default.vue";
</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <router-view></router-view>
    </n-dialog-provider>
  </n-message-provider>
</template>

<style>
/* body {
  margin: 0;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

body {
  margin: 0px 0px 0px;
}
html {
  /* background-image: url("./assets/home-bg.png"); */
  background-attachment: fixed;
  background-size: 100% 100%;
  z-index: -1000;
  background-color: #fbf9f6;
}
html,
body {
  height: 100%;
}

.n-input__input-el {
  height: auto !important;
}

.breadcrumb-navigation {
  height: 40px;
  font-size: 1.17em;
  font-weight: bold;
}

.dialog-footer {
  margin-top: 10px;
  float: right;
}

.foot-page {
  margin-top: 15px;
  height: 30px;
  float: right;
}

.main-card {
  min-height: 700px;
}
</style>
