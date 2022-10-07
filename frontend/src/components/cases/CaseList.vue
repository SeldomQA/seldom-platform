<!--
/**
* @author bugmaster
* @date 2022-06-11
* @desc 首页/用例管理
*/
-->
<template>
  <div class="case">
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
            <el-dropdown @command="switchProject">
              <span class="el-dropdown-link">{{projectName}} <i class="el-icon-sort"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in projectOptions"
                  :key="index"
                  class="sort-item"
                  :command="item.id"
                >{{item.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showSync" size="small">同步</el-button>
          </el-form-item>
          <el-form-item label="用例" style="float: right;">
           <el-tag>{{caseNumber}}</el-tag> 条
          </el-form-item>
          <el-form-item label="环境" style="float: right;">
            <el-select v-model="env" placeholder="选择项目" size="small">
              <el-option
                v-for="item in envOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div style="height: 40px;">
        <span> 用例列表</span>
        <span style="float: right">
          <el-button v-if="fullName != ''" type="success" size="mini" @click="initFileCases()">刷新</el-button>
        </span>
      </div>
      <div style="min-height: 600px;">
        <div class="case-dir-tree">
          <div style="width: 100%; height: 600px;">
            <el-scrollbar style="height:100%">
              <el-tree
                :data="fileData"
                node-key="id"
                ref="tree"
                lazy
                :props="defaultProps"
                @node-expand="handleNodeClick"
                >
                <span slot-scope="{ node, data }">
                  <span v-if="data.is_leaf === 1">
                    <i class="el-icon-tickets"></i>
                  </span>
                  <span v-else>
                    <i class="el-icon-folder"></i>
                  </span>
                    {{ data.label }}
                </span>
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
        <div style="width: 78%; float: right">
          <el-table :data="caseData" border  @row-click="caseRowClick" style="width: 100%"  height="500">
            <el-table-column prop="id" label="ID" width="100"> </el-table-column>
            <el-table-column prop="class_name" label="测试类"> </el-table-column>
            <el-table-column prop="class_doc" label="测试类描述"> </el-table-column>
            <el-table-column prop="case_name" label="测试方法"> </el-table-column>
            <el-table-column prop="case_doc" label="测试方法描述"> </el-table-column>
            <el-table-column prop="status" label="状态">
               <template slot-scope="scope">
                <span v-if="scope.row.status === 0">
                  <el-tag type="info"> 未执行 </el-tag>
                </span>
                <span v-else-if="scope.row.status === 1">
                  <el-tag type="success"> 执行中 </el-tag>
                </span>
                <span v-else-if="scope.row.status === 2">
                  <el-tag> 已执行 </el-tag>
                </span>
                <span v-else>
                  <el-tag type="danger"> 未知 </el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
              <el-button type="success" size="mini" @click="runCase(scope.row)" @click.stop="drawer = false">执行</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 组件 -->
      <el-drawer
        title="测试结果"
        :visible.sync="drawer"
        direction="rtl"
        size="40%"
      >
        <ResultDialog v-if="drawer" :cid=caseId @cancel="cancelDialog"></ResultDialog>
      </el-drawer>
      <syncDialog v-if="showSyncDialog" :pid=projectId @cancel="cancelSync"></syncDialog>
    </el-card>
  </div>
</template>

<script>
import ProjectApi from '../../request/project'
import CaseApi from '../../request/case'
import ResultDialog from './ResultDialog.vue'
import syncDialog from './syncDialog.vue'


export default {
  name: 'case',
  components: {
    // 组件
    ResultDialog,
    syncDialog
  },
  data() {
    return {
      loading: true,
      showSyncDialog: false,
      projectId: '',
      projectName: '',
      caseId: '',
      caseNumber: 0,
      fullName: '',
      fileData: [],
      caseData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      projectOptions: [],
      drawer: false,
      activeName: 'first',
      caseInfo: '',
      env: '',
      envOptions: []
    }
  },

  mounted() {
    // 初始化方法
    this.initProjectList()
    this.initEnv()
  },

  methods: {
    // 获取项目列表
    async initProjectList() {
      this.loading = true
      const resp = await ProjectApi.getProjects()
      if (resp.success === true) {
        this.projectOptions = resp.result
        this.switchProject(this.projectOptions[0].id)
        this.initProjectFile()
      } else {
        this.$message.error(resp.error.message)
      }
      this.loading = false
    },
    // 选择项目
    switchProject(command) {
      for (let i = 0; i < this.projectOptions.length; i++) {
        if (this.projectOptions[i].id === command) {
          this.projectName = this.projectOptions[i].name
          this.projectId = command
        }
      }
      this.initProjectFile()
      this.initTaskList()
    },
    // 初始化项目文件列表
    async initProjectFile() {
      const resp = await ProjectApi.getProjectTree(this.projectId)
      if (resp.success === true) {
        this.fileData = resp.result.files
        this.caseNumber = resp.result.case_number
      } else {
        this.$message.error(resp.error.message)
      }
    },

    // 初始化环境列表
    async initEnv() {
      const resp = await ProjectApi.getEnvs()
      if (resp.success === true) {
        for (let i = 0; i < resp.result.length; i++) {
          this.envOptions.push({
            value: resp.result[i].id,
            label: resp.result[i].name
          })
        }
      } else {
        this.$message.error(resp.error.message)
      }
    },
    // 获得文件用例
    initFileCases() {
      ProjectApi.getProjectCases(this.projectId, this.fullName).then(resp => {
        if (resp.success === true) {
          // this.$message.success('获取用例列表成功')
          this.caseData = resp.result
        } else {
          this.$message.error(resp.error.message)
        }
      })
    },
    // 点击tree节点
    handleNodeClick(data) {
      // 如果是文件返回 类&方法
      if (data.label.match('.py')) {
        this.fullName = data.full_name
        this.initFileCases()
      } else {
        // 如果目录返回下一级 目录&文件
        if (data.children.length > 0) {
          // 下一级不为空，直接返回
          return
        }
        ProjectApi.getProjectSubdirectory(this.projectId, data.full_name).then(resp => {
          if (resp.success === true) {
            data.children = resp.result
          } else {
            this.$message.error(resp.error.message)
          }
        })
      }
    },

    // 同步项目用例
    async showSync() {
      this.showSyncDialog = true
    },
    // 子组件的回调
    cancelSync() {
      this.showSyncDialog = false
      this.initProjectFile()
    },

    changeProject() {
      this.initProjectFile()
    },

    // 运行用例
    async runCase(row) {
      if (this.env === '') {
        this.$message.error('请选择运行环境')
        return
      }
      const resp = await CaseApi.runningCase(row.id, { env: this.env })
      if (resp.success === true) {
        this.$message.success('开始执行')
      } else {
        this.$message.error('运行失败')
      }
    },

    // 打开报告
    openReport(row) {
      window.open('/reports/' + row.report)
    },

    caseRowClick(row) {
      this.caseId = row.id
      this.drawer = true
    },

    // 子组件的回调
    cancelDialog() {
      this.drawer = false
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
.case-dir-tree {
  width: 21%;
  float: left;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>
