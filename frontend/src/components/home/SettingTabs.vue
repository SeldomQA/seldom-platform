<!--
/**
* @author alphaDog9
* @date 2022-08-21
* @desc 标签页/配置中心
*/
-->
<template>
  <div class="workbench">
    <el-card>
      <el-tabs v-model="tabName" tab-position="left" @tab-click="tabClick">
        <el-tab-pane label="项目配置" name="project">
          <project-list v-if="showTab == 1"></project-list>
        </el-tab-pane>
        <el-tab-pane label="环境配置" name="env">
          <EnvList v-if="showTab == 2"></EnvList>
        </el-tab-pane>
        <el-tab-pane label="团队配置" name="team">
          <TeamList v-if="showTab == 3"></TeamList>
        </el-tab-pane>
        <el-tab-pane label="邮件配置" name="emailGroup">邮件组</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ProjectList from './ProjectList'
import EnvList from './EnvList'
import TeamList from './TeamList'

export default {
  components: {
    // 组件
    ProjectList,
    EnvList,
    TeamList
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
      if (tab.name === 'project') {
        this.showTab = 1
      } else if (tab.name === 'env') {
        this.showTab = 2
      } else if (tab.name === 'team') {
        this.showTab = 3
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
