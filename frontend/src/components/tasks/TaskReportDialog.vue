<template>
  <div class="report-dialog">
    <el-dialog :title=showTitle :visible.sync="showStatus" @close="cancelDialog()" width="1000px">
      <div>
        <el-table
          :data="resultData"
          height="500"
          border
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item v-if="props.row.system_out !== ''" label="日志" style="width: 100%;">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="null"
                    width="100%"
                    v-model="props.row.system_out">
                  </el-input>
                </el-form-item>
                <el-form-item v-if="props.row.system_err !== ''" label="系统错误" style="width: 100%;">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="null"
                    width="100%"
                    v-model="props.row.system_err">
                  </el-input>
                </el-form-item>
                <el-form-item v-if="props.row.error_out !== ''" label="用例错误" style="width: 100%;">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="null"
                    width="100%"
                    v-model="props.row.error_out">
                  </el-input>
                </el-form-item>
                <el-form-item v-if="props.row.failure_out !== ''" label="用例失败" style="width: 100%;">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="null"
                    width="100%"
                    v-model="props.row.failure_out">
                  </el-input>
                </el-form-item>
                <el-form-item v-if="props.row.skipped_message !== ''" label="用例跳过" style="width: 100%;">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="null"
                    width="100%"
                    v-model="props.row.skipped_message">
                  </el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="class_name"
            label="测试类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="测试方法"
            width="180">
          </el-table-column>
          <el-table-column
            prop="doc"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="run_time"
            label="运行时间">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TaskApi from '../../request/task'

export default {
  props: ['rid', 'type'],
  data() {
    return {
      showStatus: true,
      showTitle: '报告详情',
      resultData: []
    }
  },
  created() {
    // 强制刷新
  },
  mounted() {
    // 初始化方法
    this.initTaskDetails()
  },
  methods: {
    // 初始化任务详情
    async initTaskDetails() {
      const data = { type: this.type }
      const resp = await TaskApi.getReportResult(this.rid, data)
      if (resp.success === true) {
        this.resultData = resp.result
      } else {
        this.$message.error(resp.error.message)
      }
    },
    // 关闭dialog
    cancelDialog() {
      this.$emit('cancel', {})
    }
  }
}
</script>

<style scoped>

</style>

<style>
.el-transfer-panel {
  height: 500px !important;
}
.el-transfer-panel__list {
  height: 500px !important;
}
.el-transfer-panel {
  width: 320px !important;
}
.report-dialog .el-form--inline .el-form-item__content {
  width: 100% !important;
}
.el-textarea__inner {
  background-color: #f1f3fa !important;
}
</style>
