<template>
  <div class="team-dialog">
    <el-dialog :title=showTitle :visible.sync="showStatus" @close="cancelTeam()" width="600px">
      <el-form v-if="inResize === true" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input
            cy-data="team-name"
            v-model="form.name"
            placeholder="团队名称">
            </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            cy-data="email-name"
            v-model="form.email"
            placeholder="团队邮箱，多个邮箱用分号“;”分割">
          </el-input>
        </el-form-item>
        <el-form-item style="margin-top: 22px; margin-bottom: 0px;">
          <div class="dialog-footer">
            <el-button cy-data="cancel-team" size="small" @click="cancelTeam()">取消</el-button>
            <el-button cy-data="save-team" type="primary" size="small" @click="onSubmit('form')">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TeamApi from '../../request/team'
export default {
  props: ['tid'],
  data() {
    return {
      showStatus: true,
      showTitle: '',
      form: {
        name: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入团队名称', trigger: 'blur' }
        ]
      },
      inResize: true
    }
  },
  created() {
    if (this.tid === 0) {
      this.showTitle = '创建团队'
    } else {
      this.showTitle = '编辑团队'
      this.getTeam()
    }
  },
  mounted() {
  },
  methods: {
    // 创建&编辑团队
    onSubmit(formNmame) {
      this.$refs[formNmame].validate(valid => {
        if (valid) {
          if (this.tid === 0) {
            TeamApi.createTeam(this.form).then(resp => {
              if (resp.success === true) {
                this.$message.success('创建成功！')
                this.cancelTeam()
              } else { this.$message.error('创建失败！') }
            })
          } else {
            TeamApi.updateTeam(this.tid, this.form).then(resp => {
              if (resp.success === true) {
                this.$message.success('更新成功！')
                this.cancelTeam()
              } else {
                this.$message.error('更新失败！')
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 获取团队信息
    async getTeam() {
      const resp = await TeamApi.getTeamDetails(this.tid)
      if (resp.success === true) {
        this.form = resp.result
      } else {
        this.$message.error(resp.error.message)
      }
    },
    // 关闭dialog
    cancelTeam() {
      this.$emit('cancel', {})
    }
  }
}
</script>
<style scoped>
  .dialog-footer {
    float: right;
  }
</style>
