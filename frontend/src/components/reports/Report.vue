<!--
/**
* @author huzhiheng
* @date 2022-02-11
* @desc 首页/测试报告
*/
-->
<template>
  <div class="workbench">
    <div style="padding-bottom: 20px; height: 30px;">
      <span class="span-left">
        <span class="page-title">工作台</span>
      </span>
      <span class="span-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>测试报告</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
    </div>
    <el-card class="main-card">
      <h1>主功能区</h1>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Workbench',
  components: {
    // 组件
  },
  data() {
    return {
      loading: true
    }
  },

  mounted() {
    // 初始化方法
  },

  methods: {
    // 定义方法
  }
}
</script>

<style>
.el-popover.home-popover {
  width: 70px;
  min-width: auto;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 定义当前组件使用的CSS */
</style>
