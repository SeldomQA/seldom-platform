<!--
/**
* @author bugmaster
* @date 2022-06-11
* @desc 首页/用例管理
*/
-->
<template>
  <div class="workbench">
    <div style="padding-bottom: 20px; height: 30px;">
      <span class="span-left">
        <span class="page-title">用例管理</span>
      </span>
      <span class="span-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用例管理</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
    </div>
    <el-card class="main-card">
      <div style="text-align: left;">
        <el-form :inline="true">
          <el-form-item label="项目">
            <el-select v-model="projectId" placeholder="选择项目" size="small" @change="changeProject()">
              <el-option
                v-for="item in projectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="syncProject" size="small">同步</el-button>
          </el-form-item>
        </el-form>
        </div>
        <h1>用例列表</h1>
        <div style="min-height: 300px;">
        <span style="width: 20%; float: left">
          <el-card>
          <el-tree
            :data="fileData"
            node-key="id"
            ref="tree"
            lazy
            highlight-current
            :props="defaultProps"
            @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <i :class="data.icon"></i> {{ data.label }}
              </span>
            </span>
          </el-tree>
          </el-card>
        </span>
        <span>
          <el-table :data="caseData" border style="width: 80%">
            <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
            <el-table-column prop="id" label="ID" width="100"> </el-table-column>
            <el-table-column prop="class_name" label="测试类"> </el-table-column>
            <el-table-column prop="class_doc" label="测试类描述"> </el-table-column>
            <el-table-column prop="case_name" label="测试方法"> </el-table-column>
            <el-table-column prop="case_doc" label="测试方法描述"> </el-table-column>
            <el-table-column prop="report" label="报告">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="openReport(scope.row)">{{scope.row.report}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
              <el-button type="success" size="mini" @click="runCase(scope.row)">执行</el-button>
              </template>
            </el-table-column>
          </el-table>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import ProjectApi from '../../request/project'
import CaseApi from '../../request/case'

export default {
  name: 'Workbench',
  components: {
    // 组件
  },
  data() {
    return {
      loading: true,
      projectId: '',
      fileData: [],
      caseData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      projectOptions: []
    }
  },

  mounted() {
    // 初始化方法
    this.initProjectList()
  },

  methods: {
    // 获取项目列表
    async initProjectList() {
      this.loading = true
      const resp = await ProjectApi.getProjects()
      if (resp.success === true) {
        // this.tableData = resp.data
        for (let i = 0; i < resp.data.length; i++) {
          this.projectOptions.push({
            value: resp.data[i].id,
            label: resp.data[i].name
          })
        }

      } else {
        this.$message.error(resp.error.message)
      }
      this.loading = false
    },

    // 初始化项目文件列表
    async initProjectFile() {
      const resp = await ProjectApi.getProjectTree(this.projectId)
      if (resp.success === true) {
        this.fileData = resp.data
      } else {
        this.$message.error(resp.error.message)
      }
    },

    // 点击项目文件
    handleNodeClick(data) {
      // 如果是文件返回 类&方法
      if (data.label.match('.py')) {
        ProjectApi.getProjectCases(this.projectId, data.full_name).then(resp => {
          if (resp.success === true) {
            this.$message.success('获取用例成功')
            console.log(resp.data)
            this.caseData = resp.data
            // this.initProject()
          } else {
            this.$message.error(resp.error.message)
          }
        })
      } else {
        // 如果目录返回下一级 目录&文件
        if (data.children.length > 0) {
          // 下一级不为空，直接返回
          return
        }
        ProjectApi.getProjectSubdirectory(this.projectId, data.full_name).then(resp => {
          if (resp.success === true) {
            this.$message.success('获取用例成功')
            console.log(resp.data)
            data.children = resp.data
            // this.caseData = resp.data
            // this.initProject()
          } else {
            this.$message.error(resp.error.message)
          }
        })
      }
    },

    async syncProject() {
      if (this.projectId === '') {
        this.$message.error('请选择项目')
        return
      }
      const resp = await ProjectApi.syncProjectCase(this.projectId)
      if (resp.success === true) {
        this.$message.success('同步成功')
      } else {
        this.$message.error(resp.error.message)
      }
    },

    changeProject() {
      this.initProjectFile()
    },

    // 运行用例
    async runCase(row) {
      const resp = await CaseApi.runningCase(row.id)
      if (resp.success === true) {
        this.fileData = resp.data
        this.$message.success('开始执行')
      } else {
        this.$message.error('运行失败')
      }
      this.initProjectFile()
    },

    // 打开报告
    openReport(row) {
      window.open('/reports/' + row.report)
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
