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
    <el-card class="main-card" v-if="taskFlag">
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
        </el-form>
      </div>
      <div style="text-align: left;">
        <el-form :inline="true">
          <el-form-item label="团队">
            <el-select v-model="query.team_id" placeholder="选择团队" size="small">
              <el-option
                v-for="item in teamOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="query.name" placeholder="请输入任务名称" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="initTaskList">搜索</el-button>
          </el-form-item>
          <el-form-item  style="float: right;">
            <el-button cy-data="create-task" type="primary" size="small" @click="showCreateTask()">创建</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          height="500">
          <el-table-column
            fixed
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="name"
            label="任务">
            <template slot-scope="scope">
              <el-button type="text" @click="clickTaskName(scope.row)">{{scope.row.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="env"
            label="环境">
          </el-table-column>
          <el-table-column
            prop="team"
            label="团队">
          </el-table-column>
          <el-table-column
            prop="execute_count"
            label="执行次数">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
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
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="runTask(scope.row)">运行</el-button>
              <el-button type="primary" size="mini" @click="showEditTask(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteTask(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 子组件 -->
      <TaskDialog v-if="taskDailog" :pid=projectId :tid=taskId @cancel="cancelDialog"></TaskDialog>
    </el-card>
    <el-card class="main-card" v-else>
      <el-page-header @back="goBack" content="任务报告" style="margin-bottom: 50px;">
      </el-page-header>
      <taskReport :tid=taskId></taskReport>
    </el-card>
  </div>
</template>

<script>
import ProjectApi from '../../request/project'
import TaskApi from '../../request/task'
import TeamApi from '../../request/team'
import TaskDialog from './TaskDialog.vue'
import taskReport from './TaskReport.vue'

export default {
  name: 'task',
  components: {
    // 组件
    TaskDialog,
    taskReport
  },
  data() {
    return {
      taskFlag: true,
      taskDailog: false,
      timedDailog: false,
      projectId: '',
      projectName: '',
      taskId: 0,
      fileData: [],
      caseData: [],
      projectOptions: [],
      tableData: [],
      teamOptions: [],
      query: {
        project_id: '',
        team_id: '',
        name: ''
      }
    }
  },
  mounted() {
    // 初始化方法
    this.initProjectList()
    this.initTeamList()
  },
  methods: {
    // 显示创建任务
    showCreateTask() {
      this.taskDailog = true
    },
    // 显示编辑任务
    showEditTask(row) {
      this.taskId = row.id
      this.taskDailog = true
    },
    // 创建任务子组件的回调
    cancelDialog() {
      this.taskId = 0
      this.taskDailog = false
      this.timedDailog = false
      this.initTaskList()
    },
    // 获取项目列表
    async initProjectList() {
      const resp = await ProjectApi.getProjects()
      if (resp.success === true) {
        this.projectOptions = resp.result
        this.switchProject(this.projectOptions[0].id)
      } else {
        this.$message.error(resp.error.message)
      }
    },
    // 初始化获取团队列表
    async initTeamList() {
      const resp = await TeamApi.getTeamAll()
      if (resp.success === true) {
        for (let i = 0; i < resp.result.length; i++) {
          this.teamOptions.push({
            value: resp.result[i].id,
            label: resp.result[i].name
          })
        }
      } else {
        this.$message.error('查询失败!')
      }
    },
    // 初始化项目文件列表
    async initProjectFile() {
      const resp = await ProjectApi.getProjectTree(this.projectId)
      if (resp.success === true) {
        this.fileData = resp.result.files
      } else {
        this.$message.error(resp.error.message)
      }
    },
    // 初始化任务列表
    async initTaskList() {
      this.query.project_id = this.projectId
      const resp = await TaskApi.getTaskAll(this.query)
      if (resp.success === true) {
        this.tableData = resp.result
      } else {
        this.$message.error('获得任务列表失败！')
      }
    },
    // 删除任务
    deleteTask(row) {
      this.$confirm('检查是否有正在运行的定时任务，确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        TaskApi.deleteTask(row.id).then(resp => {
          if (resp.success === true) {
            this.initTaskList()
            this.$message.success('删除任务成功！')
          } else {
            this.$message.error('删除任务失败！')
          }
        })
      }).catch(() => {})
    },
    // 运行任务
    async runTask(row) {
      const resp = await TaskApi.runningTask(row.id)
      if (resp.success === true) {
        this.initTaskList()
        this.$message.success('开始运行！')
      } else {
        this.$message.error('运行失败！')
      }
    },
    // 显示任务报告列表
    clickTaskName(row) {
      this.taskId = row.id
      this.taskFlag = false
    },
    // 返回任务列表
    goBack() {
      this.taskFlag = true
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

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
