<!--
/**
* @author huzhiheng
* @date 2022-02-11
* @desc 首页/用例管理
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
          <el-breadcrumb-item>用例管理</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
    </div>
    <el-card class="main-card">
      <h1>用例列表</h1>
      <div style="min-height: 300px;">
      <span style="width: 20%; float: left">
        <el-card>
        <el-tree
          :data="fileData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          @node-click="handleNodeClick">
        </el-tree>
        </el-card>
      </span>
      <span>
        <el-table :data="caseData" border style="width: 80%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="class.name" label="测试类"> </el-table-column>
          <el-table-column prop="class.doc" label="测试类描述"> </el-table-column>
          <el-table-column prop="method.name" label="测试方法"> </el-table-column>
          <el-table-column prop="method.doc" label="测试方法描述"> </el-table-column>
        </el-table>
      </span>
      </div>
      <div style="float: left; margin-top: 10px;">
        <el-button type="primary" size="small">运行测试</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import ProjectApi from '../../request/project'

export default {
  name: 'Workbench',
  components: {
    // 组件
  },
  data() {
    return {
      loading: true,
      fileData: [],
      caseData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  mounted() {
    // 初始化方法
    this.initProject()
  },

  methods: {
    // 初始化项目列表
    async initProject() {
      const resp = await ProjectApi.getProjectTree()
      if (resp.success === true) {
        this.fileData = resp.data
      } else {
        this.$message.error(resp.error.message)
      }
      this.loading = false
    },

    handleNodeClick(data) {
      console.log(data.label)
      ProjectApi.getProjectClass(data.label).then(resp => {
        if (resp.success === true) {
          this.$message.success('获取用例成功')
          console.log(resp.data)
          this.caseData = resp.data
          // this.initProject()
        } else {
          this.$message.error(resp.error.message)
        }
      })
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
