<!--
/**
* @author bugmaster
* @date 2022-07-02
* @desc 首页/任务管理
*/
-->
<template>
  <div class="case">
    <div style="padding-bottom: 20px; height: 30px;">
      <span class="span-left">
        <span class="page-title">任务管理</span>
      </span>
      <span class="span-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>任务管理</el-breadcrumb-item>
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
          <el-form-item label="用例" style="float: right;">
           <el-tag>{{caseNumber}}</el-tag> 条
          </el-form-item>
        </el-form>
      </div>
      <h1>添加用例</h1>
      <div style="min-height: 600px;">
        <div style="width: 20%; float: left;">
          <el-card style="min-height: 500px; overflow: scroll;">
            <el-tree
              :data="fileData"
              node-key="id"
              ref="tree"
              lazy
              highlight-current
              :props="defaultProps"
              @node-click="handleNodeClick"
              >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span v-if="data.is_leaf === 1">
                  <i class="el-icon-tickets"></i>
                </span>
                <span v-else>
                  <i class="el-icon-folder"></i>
                </span>
                  {{ data.label }}
              </span>
            </el-tree>
          </el-card>
        </div>
        <!-- 穿梭 -->
        <div style="width: 78%; float: right">
          <el-transfer
            v-model="selectValue"
            :data="caseData"
            :titles="['Source', 'Target']">
          </el-transfer>
        </div>
      </div>
      <el-drawer
        title="报告"
        :visible.sync="drawer"
        direction="rtl"
        size="40%">
        <span>
          <el-tabs v-model="activeName" style="margin-left: 5px; margin-right: 5px;">
            <el-tab-pane label="System Out" name="first">
              <el-input
                type="textarea"
                :rows="25"
                placeholder="system out is null"
                v-model="caseInfo.system_out">
              </el-input>
            </el-tab-pane>
            <el-tab-pane label="Error" name="second">
              <el-input
                type="textarea"
                :rows="25"
                placeholder="error info null"
                v-model="caseInfo.error">
              </el-input>
            </el-tab-pane>
          </el-tabs>
        </span>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import ProjectApi from '../../request/project'

export default {
  name: 'task',
  components: {
    // 组件
  },
  data() {
    return {
      loading: true,
      projectId: '',
      caseNumber: 0,
      fileData: [],
      caseData: [],
      selectValue: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      projectOptions: [],
      drawer: false,
      activeName: 'first',
      caseInfo: '',
      selectData: []
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
        for (let i = 0; i < resp.data.length; i++) {
          this.projectOptions.push({
            value: resp.data[i].id,
            label: resp.data[i].name
          })
        }
        this.projectId = this.projectOptions[0].value
        this.initProjectFile()
      } else {
        this.$message.error(resp.error.message)
      }
      this.loading = false
    },

    // 初始化项目文件列表
    async initProjectFile() {
      const resp = await ProjectApi.getProjectTree(this.projectId)
      if (resp.success === true) {
        this.fileData = resp.data.files
        this.caseNumber = resp.data.case_number
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
            // this.caseData = resp.data
            for (let i = 0; i < resp.data.length; i++) {
              // 如果用例不在列表时添加
              var isExists = false
              for(let j = 0; j < this.caseData.length; j++) {
                console.log("iii", resp.data[i])
                console.log("jjj", this.caseData[j])
                if(resp.data[i].id === this.caseData[j].key) {
                  isExists = true
                  break
                }
              }
              if (isExists === false) {
                this.caseData.push({
                  key: resp.data[i].id,
                  label: resp.data[i].id + ' ' + resp.data[i].class_name + '.' + resp.data[i].case_name
                })
              }
            }
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
            data.children = resp.data
          } else {
            this.$message.error(resp.error.message)
          }
        })
      }
    },

    // 同步项目用例
    async syncProject() {
      if (this.projectId === '') {
        this.$message.error('请选择项目')
        return
      }
      const resp = await ProjectApi.syncProjectCase(this.projectId)
      if (resp.success === true) {
        this.initProjectFile()
        this.$message.success('同步成功')
      } else {
        this.$message.error(resp.error.message)
      }
    },

    changeProject() {
      this.initProjectFile()
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
<style>
/* 定义当前组件使用的CSS */
.el-checkbox {
  text-align: left;
}
.el-transfer-panel {
  width: 300px !important;
}
</style>
