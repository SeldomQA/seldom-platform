<!--
/**
* @author alphaDog9
* @date 2022-08-21
* @desc 标签页/配置中心
*/
-->
<template>
  <div class="workbench">
    <div style="padding-bottom: 20px; height: 30px;">
      <span class="span-left">
        <span class="page-title">配置管理</span>
      </span>
      <span class="span-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
    </div>
     <el-tabs v-model="tabName" type="border-card" @tab-click="tabClick">
      <el-tab-pane label="项目管理" name="project">
        <project-list v-if="showTab == 1"></project-list>
      </el-tab-pane>
      <el-tab-pane label="环境管理" name="env">
        <env-list v-if="showTab == 2"></env-list>
      </el-tab-pane>
      <el-tab-pane label="团队管理" name="team">团队管理</el-tab-pane>
      <el-tab-pane label="邮件组" name="emailGroup">邮件组</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProjectList from './ProjectList'
import EnvList from './EnvList'

export default {
  components: {
    // 组件
    ProjectList,
    EnvList
  },
  data() {
    return {
      loading: true,
      tabName: 'project',
      showTab: 1
    }
  },

  mounted() {
    // 初始化方法
  },

  methods: {
    // 切换tab标签页
    tabClick(tab) {
      console.log(tab.name)
      if (tab.name === 'project') {
        this.showTab = 1
      } else if (tab.name === 'env') {
        this.showTab = 2
      }
    }
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
