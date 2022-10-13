<template>
  <div id="app">
    <!-- <Navigation></Navigation> -->
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import Navigation from './views/Navigation.vue'

// export default {
//   name: 'Home',
//   components: {
//     // Navigation
//   }
// }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
}

body {
  margin: 0px 0px 0px;
}
html{
  /* background-image: url("./assets/home-bg.png"); */
  background-attachment: fixed;
  background-size: 100% 100%;
  z-index: -1000;
}
html,
body {
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.span-left {
  float: left;
}

.span-right {
  float: right;
}

.page-title {
  font-size: 16px;
  font-weight: bold;
}

.main-card {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 50px;
}

.el-button--primary {
  box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
}

.el-button--danger {
  box-shadow: 0 2px 6px 0 rgb(250 92 124 / 50%);
}

.el-button--default {
  box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: rgba(114,124,245,.25);
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #6c757d;
}

</style>
