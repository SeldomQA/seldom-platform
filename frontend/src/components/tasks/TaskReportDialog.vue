<template>
  <div class="report-dialog">
    <el-dialog :title=showTitle :visible.sync="showStatus" @close="cancelDialog()" width="1200px">
      <div style="min-height:600px; overflow-y: scroll">
        <span style="float: left; width: 30%;">
          <el-card>
            <el-table
              :data="resultData"
              height="500"
              @row-click="caseRowClick"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="用例列表"
              >
              </el-table-column>
            </el-table>
          </el-card>
        </span>
        <span style="float: right; width: 65%; margin-right: 10px;">
          <el-descriptions title="用例详情" :column="2">
              <el-descriptions-item label="Case name">{{caseDetails.name}}</el-descriptions-item>
              <el-descriptions-item label="Run time">{{caseDetails.run_time}}</el-descriptions-item>
              <el-descriptions-item label="Test class">{{caseDetails.class_name}}</el-descriptions-item>
          </el-descriptions>
          <div v-if="caseDetails.doc !== ''">
            <p>doc</p>
            <el-input id="doc" type="textarea" :rows="3" placeholder="null" v-model="caseDetails.doc"> </el-input>
          </div>
          <div v-if="caseDetails.system_err !== ''">
            <p>system err</p>
            <el-input id="system-err" type="textarea" :rows="10" placeholder="null" v-model="caseDetails.system_err"> </el-input>
          </div>
          <div v-if="caseDetails.system_out !== ''">
            <p>system out</p>
            <el-input id="system-out" type="textarea" :rows="10" placeholder="null" v-model="caseDetails.system_out"> </el-input>
          </div>
          <div v-if="caseDetails.failure_out !== ''">
            <p>failure</p>
            <el-input id="failure" type="textarea" :rows="10" placeholder="null" v-model="caseDetails.failure_out"> </el-input>
          </div>
          <div v-if="caseDetails.error_out !== ''">
            <p>error</p>
            <el-input id="error" type="textarea" :rows="10" placeholder="null" v-model="caseDetails.error_out"> </el-input>
          </div>
          <div v-if="caseDetails.skipped_message !== ''">
            <p>skipped message</p>
            <el-input id="skipped-message" type="textarea" :rows="2" placeholder="null" v-model="caseDetails.skipped_message"> </el-input>
          </div>
        </span>
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
      resultData: [],
      caseDetails: {
        doc: '',
        error_out: '',
        failure_out: '',
        skipped_message: '',
        system_err: '',
        system_out: ''
      }
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
    },
    // 点击用例详情
    caseRowClick(row) {
      console.log(row)
      this.caseDetails = row
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

#doc {
  color: #727cf5;
}

#error {
  color: #fa5c7c;
}
#failure{
  color: #fd7e14;
}
#skipped-message {
  color: #8a969c;
}
#system-err {
  color: #fa5c7c;
}

#system-out {
  color: #6b5eae;
}
</style>
