<!--
/**
* @author alphaDog9
* @date 2022-08-26
* @desc 任务管理/报告列表
*/
-->
<template>
  <div class="task-report">
    <div style="float: left; height: 80px;">
      <!-- <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="类型">
          <el-checkbox-group v-model="form.type">
          <el-checkbox label="错误" name="type"></el-checkbox>
          <el-checkbox label="失败" name="type"></el-checkbox>
        </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form> -->
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="tests"
        label="总数"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.tests === 0">
            {{scope.row.tests}}
          </span>
          <span v-else>
            <el-button @click="showReport(scope.row)" type="text" size="small">
              <el-tag>{{scope.row.tests}}</el-tag>
            </el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="passed"
        label="通过"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.passed === 0">
            {{scope.row.passed}}
          </span>
          <span v-else>
            <el-button @click="showReport(scope.row, 'success')" type="text" size="small">
              <el-tag type="success">{{scope.row.passed}}</el-tag>
            </el-button>
          </span>
      </template>
      </el-table-column>
      <el-table-column
        prop="error"
        label="错误"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.error === 0">
            {{scope.row.error}}
          </span>
          <span v-else>
            <el-button @click="showReport(scope.row, 'error')" type="text" size="small">
              <el-tag type="danger">{{scope.row.error}}</el-tag>
            </el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="failure"
        label="失败"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.failure === 0">
            {{scope.row.failure}}
          </span>
          <span v-else>
            <el-button @click="showReport(scope.row, 'failure')" type="text" size="small">
              <el-tag type="warning">{{scope.row.failure}}</el-tag>
            </el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="skipped"
        label="跳过"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.skipped === 0">
            {{scope.row.skipped}}
          </span>
          <span v-else>
            <el-button @click="showReport(scope.row, 'skipped')" type="text" size="small">
              <el-tag type="info">{{scope.row.skipped}}</el-tag>
            </el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="run_time"
        label="运行">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="foot-page">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!-- 引用组件 -->
    <TaskReportDialog v-if="reportDialog" :rid=reportId :type=resultType @cancel="cancelDialog"></TaskReportDialog>
  </div>
</template>

<script>
import TaskApi from '../../request/task'
import TaskReportDialog from './TaskReportDialog.vue'


export default {
  props: ['tid'],
  components: {
    // 组件
    TaskReportDialog
  },
  data() {
    return {
      loading: true,
      reportDialog: false,
      reportId: false,
      resultType: '',
      tableData: [],
      total: 0,
      req: {
        page: 1,
        size: 10,
        task_id: 0
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        user: ''
      }
    }
  },
  created() {
    this.req.task_id = this.tid
  },

  mounted() {
    // 初始化方法
    this.initReportList()
  },

  methods: {
    // 初始化任务列表
    async initReportList() {
      const resp = await TaskApi.getReportAll(this.req)
      if (resp.success === true) {
        this.tableData = resp.result
        this.total = resp.total
      } else {
        this.$message.error('获得任务列表失败！')
      }
    },
    // 显示报告详情
    async showReport(row, type) {
      this.reportDialog = true
      this.reportId = row.id
      this.resultType = type
    },
    // 创建任务子组件的回调
    cancelDialog() {
      this.reportDialog = false
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.req.page = val
      this.initReportList()
    },
    onSubmit() {}
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
.foot-page {
  margin-top: 20px;
  text-align: right;
}
</style>
