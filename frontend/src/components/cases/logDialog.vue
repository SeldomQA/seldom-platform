<template>
  <div class="log-dialog">
    <el-dialog :title=showTitle :visible.sync="showLog" @close="cancelSync()" width="800px">
      <el-input
        type="textarea"
        :rows="20"
        placeholder="log null"
        v-model="log">
      </el-input>
    </el-dialog>
  </div>
</template>

<script>
import ProjectApi from '../../request/project'

export default {
  props: [],
  data() {
    return {
      showLog: true,
      showTitle: '同步日志',
      log: ''
    }
  },
  created() {},
  mounted() {
    this.syncLog()
  },
  methods: {
    // 同步日志
    async syncLog() {
      const resp = await ProjectApi.getSyncLog()
      if (resp.success === true) {
        this.log = resp.result.log
      } else {
        this.$message.error(resp.error.message)
      }
    },

    // 关闭dialog
    cancelSync() {
      this.$emit('cancel', {})
    }
  }
}
</script>

<style scoped>
</style>
