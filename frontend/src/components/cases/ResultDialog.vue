<template>
  <div class="log-desc">
    <el-descriptions title="基本信息" :column="1" border>
      <el-descriptions-item label="报告名称">{{ resultData.name }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ resultData.create_time }}</el-descriptions-item>
      <el-descriptions-item label="运行时长">{{ resultData.run_time }}</el-descriptions-item>
      <el-descriptions-item label="统计结果">
        <el-tag>{{ resultData.tests }}</el-tag> =
        <el-tag type="success">{{ resultData.passed }}</el-tag> +
        <el-tag type="warning">{{ resultData.failure }}</el-tag> +
        <el-tag type="danger">{{ resultData.error }}</el-tag> +
        <el-tag type="info">{{ resultData.skipped }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-divider content-position="left">运行日志</el-divider>
    <el-input
      type="textarea"
      :rows="32"
      placeholder="system out is null"
      v-model="resultData.system_out">
    </el-input>
  </div>
</template>

<script>
import CaseApi from '../../request/case'

export default {
  props: ['cid'],
  data() {
    return {
      drawer: true,
      activeName: 'first',
      resultData: {}
    }
  },
  created() {
    this.drawer = true
  },
  mounted() {
    this.initCaseResult()
  },
  methods: {
    // 查询用例结果
    async initCaseResult() {
      const resp = await CaseApi.getCaseResult(this.cid)
      if (resp.success === true) {
        this.resultData = resp.result
      } else {
        this.$message.error('获取结果失败')
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
.log-desc {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
