<template>
  <div class="enviornment-dialog">
    <el-dialog :title=showTitle :visible.sync="showStatus" @close="cancelEnv()" width="600px">
      <el-form v-if="inResize === true" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input cy-data="enviornment-name" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="环境" prop="env">
          <el-input cy-data="enviornment-env"  v-model="form.env"></el-input>
        </el-form-item>
        <el-form-item label="浏览器" prop="browser">
          <el-input cy-data="enviornment-browser"  v-model="form.browser"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="base_url">
          <el-input cy-data="enviornment-url"  v-model="form.base_url"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 22px; margin-bottom: 0px;">
          <div class="dialog-footer">
            <el-button cy-data="cancel-enviornment" @click="cancelEnv()">取消</el-button>
            <el-button cy-data="save-enviornment" type="primary" @click="onSubmit('form')">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import EnvApi from '../../request/env'
export default {
  props: ['eid'],
  data() {
    return {
      showStatus: true,
      showTitle: '',
      form: {
        name: '',
        env: '',
        browser: '',
        base_url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ]
      },
      inResize: true
    }
  },
  created() {
    if (this.eid === 0) {
      this.showTitle = '创建环境'
    } else {
      this.showTitle = '编辑环境'
      this.getEnv()
    }
  },
  mounted() {

  },
  methods: {
    // 创建&编辑环境
    onSubmit(formNmame) {
      this.$refs[formNmame].validate(valid => {
        if (valid) {
          if (this.eid === 0) {
            EnvApi.CreateEnv(this.form).then(resp => {
              if (resp.success === true) {
                this.$message.success('创建成功！')
                this.cancelEnv()
              } else { this.$message.error('创建失败！') }
            })
          } else {
            EnvApi.UpdateEnv(this.eid, this.form).then(resp => {
              if (resp.success === true) {
                this.$message.success('更新成功！')
                this.cancelEnv()
              } else {
                this.$message.error('更新失败！');
              }
            })
          }
        } else {
          return false;
        }
      })
    },
    // 获取环境信息
    async getEnv() {
      const resp = await EnvApi.GetEnvDetail(this.eid)
      if (resp.success === true) {
        this.form = resp.result
      } else {
        this.$message.error(resp.error.message);
      }
    },
    // 关闭dialog
    cancelEnv() {
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
