<!--
/**
* @author bugmaster
* @date 2022-07-02
* @desc 首页/任务管理
*/
-->
<template>
  <div class="case">
    <el-card class="main-card" v-if="taskFlag">
      <div style="text-align: left;">
        <el-form :inline="true">
          <el-form-item>
            <el-button cy-data="create-task" type="primary" @click="showCreateTask()">创建</el-button>
          </el-form-item>
          <el-form-item class="span-right">
            <el-button type="primary" icon="el-icon-search" @click="initTaskList">搜索</el-button>
          </el-form-item>
          <el-form-item label="名称" class="span-right">
            <el-input v-model="query.name" clearable placeholder="请输入任务名称"></el-input>
          </el-form-item>
          <el-form-item label="团队" class="span-right">
            <el-select v-model="query.team_id" clearable placeholder="选择团队">
              <el-option
                v-for="item in teamOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="100">
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
            prop="create_time"
            label="创建">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="运行&报告"
            width="180">
            <template slot-scope="scope">
              <el-button type="success" size="mini" plain @click="runTask(scope.row)">运行</el-button>
              <el-button type="primary" size="mini" plain @click="clickTaskName(scope.row)">报告</el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="showEditTask(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" plain @click="deleteTask(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="foot-page">
       <el-pagination
          background
          @current-change="changeCurrentPage"
          layout="total, prev, pager, next"
          :page-size="query.size"
          :total="total">
        </el-pagination>
      </div>

      <!-- 子组件 -->
      <TaskDialog v-if="taskDailog" :pid=projectId :tid=taskId @cancel="cancelDialog"></TaskDialog>
    </el-card>
    <el-card class="main-card" v-else>
      <el-page-header @back="goBack" :content="taskTitle" style="margin-bottom: 50px;">
      </el-page-header>
      <taskReport :tid=taskId></taskReport>
    </el-card>
  </div>
</template>

<script>
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
      taskTitle: '',
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
        name: '',
        page: 1,
        size: 10
      },
      total: 0
    }
  },
  created() {
    this.projectId = sessionStorage.projectId
    this.projectName = sessionStorage.projectName
  },
  mounted() {
    // 初始化方法
    this.initTeamList()
    this.initTaskList()
    this.tasktHeartbeat = setInterval(() => {
      this.checkTask()
    }, 5000);
  },
  destroyed() {
    // 销毁时候清除定时器
    clearInterval(this.tasktHeartbeat);
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
    // 初始化任务列表
    async initTaskList() {
      this.query.project_id = this.projectId
      const resp = await TaskApi.getTaskAll(this.query)
      if (resp.success === true) {
        this.tableData = resp.result
        this.total = resp.total
      } else {
        this.$message.error('获得任务列表失败！')
      }
    },
    // 检查用例状态, 判断有“执行中”的用例，调用接口
    checkTask() {
      for (const i in this.tableData) {
        if (this.tableData[i].status === 1) {
          this.initTaskList()
          break
        }
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
        this.$message.success('开始运行！')
        this.initTaskList()
      } else {
        this.$message.error('运行失败！')
      }
    },
    // 跳转到第几页
    changeCurrentPage(val) {
      this.query.page = val
      this.initTaskList()
    },
    // 显示任务报告列表
    clickTaskName(row) {
      this.taskTitle = row.name + ' - 报告列表'
      this.taskId = row.id
      this.taskFlag = false
    },
    // 返回任务列表
    goBack() {
      this.taskFlag = true
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
.foot-page {
  margin-top: 20px;
  float: right;
  margin-bottom: 20px;
}
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
