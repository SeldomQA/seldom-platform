<template>
  <div class="sync-dialog">
    <el-dialog :title=showTitle :visible.sync="showStatus" @close="cancelSync()" width="800px">
      <div>
        <el-steps :space="200" :active=syncStatus simple>
          <el-step title="拉取代码" :icon="stepIcon.one"></el-step>
          <el-step title="查找用例" :icon="stepIcon.two"></el-step>
          <el-step title="同步结果" :icon="stepIcon.three"></el-step>
        </el-steps>
      </div>
      <div style="height: 500px; margin-top: 20px;">
        <el-card class="add-case">
          <el-table :data="req.add_case" stripe style="width: 100%" height="420">
            <el-table-column prop="case_name" label="新增用例">
              <template slot-scope="scope">
                {{scope.row.class_name}} / {{scope.row.case_name}}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="del-case">
          <el-table :data="req.del_case" stripe style="width: 100%" height="420">
            <el-table-column prop="case_name" label="删除用例">
              <template slot-scope="scope">
                {{scope.row.class_name}} / {{scope.row.case_name}}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div class="dialog-footer">
        <el-button cy-data="cancel-project" size="small" @click="cancelSync()">取消</el-button>
        <el-button cy-data="save-project" type="primary" size="small" @click="mergeCase()">合并</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ProjectApi from '../../request/project'

export default {
  props: ['pid'],
  data() {
    return {
      syncStatus: 0,
      showStatus: true,
      showTitle: '',
      stepIcon: {
        one: 'el-icon-download',
        two: 'el-icon-search',
        three: 'el-icon-tickets'
      },
      req: {
        project_id: 0,
        add_case: [],
        del_case: []
      }
    }
  },
  created() {
    this.showTitle = '同步项目用例'
    this.req.project_id = this.pid
  },
  mounted() {
    this.syncRunning()
  },
  methods: {
    // 同步用例
    async syncRunning() {
      this.stepIcon.one = 'el-icon-loading'
      const resp = await ProjectApi.syncCode(this.pid)
      if (resp.success === true) {
        this.syncStatus = 1
        this.stepIcon.one = 'el-icon-download'
        this.stepIcon.two = 'el-icon-loading'
        const resp = await ProjectApi.syncCase(this.pid)
        if (resp.success === true) {
          this.syncStatus = 2
          this.stepIcon.two = 'el-icon-search'
          this.stepIcon.three = 'el-icon-loading'
          const resp = await ProjectApi.syncResult(this.pid)
          if (resp.success === true) {
            this.syncStatus = 3
            this.stepIcon.three = 'el-icon-tickets'
            this.req = resp.result
          } else {
            this.$message.error(resp.error.message)
          }
        } else {
          this.$message.error(resp.error.message)
        }
      } else {
        this.$message.error(resp.error.message)
      }
    },

    // 关闭dialog
    cancelSync() {
      this.$emit('cancel', {})
    },

    // 合并用例
    async mergeCase() {
      const resp = await ProjectApi.syncMerge(this.pid, this.req)
      if (resp.success === true) {
        this.$message.success('合并成功！')
        this.cancelSync()
      } else {
        this.$message.error(resp.error.message)
      }
    }

  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
.add-case {
  width: 48%;
  float: left;
}
.del-case {
  width: 48%;
  float: right;
}
</style>
