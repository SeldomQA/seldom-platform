<template>
  <div class="enviornment-dialog">
    <el-dialog :title=showTitle :visible.sync="showStatus" @close="cancelEnv()" width="600px">
      <el-form v-if="inResize === true" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input
            cy-data="enviornment-name"
            v-model="form.name"
            placeholder="环境名称">
          </el-input>
        </el-form-item>
        <el-form-item label="类型" prop="test_type">
          <el-select v-model="form.test_type" style="width: 100%;" @change="testTypeChange()">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="env" prop="env">
          <el-input
              cy-data="enviornment-env"
              v-model="form.env"
              placeholder="Seldom env 配置">
            </el-input>
        </el-form-item>
        <el-form-item v-if="form.test_type=='web'" label="browser" prop="browser">
          <el-select
            v-model="form.browser"
            cy-data="enviornment-browser"
            placeholder="Seldom browser 配置"
            style="width: 100%;">
            <el-option
              v-for="item in browserOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.test_type=='http'" label="base_url" prop="base_url">
          <el-input
              cy-data="enviornment-url"
              v-model="form.base_url"
              placeholder="Seldom base_url 配置">
            </el-input>
        </el-form-item>
        <el-form-item style="margin-top: 22px; margin-bottom: 0px;">
          <div class="dialog-footer">
            <el-button cy-data="cancel-enviornment" size="small" @click="cancelEnv()">取消</el-button>
            <el-button cy-data="save-enviornment" type="primary" size="small" @click="onSubmit('form')">保存</el-button>
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
        test_type: 'http',
        env: '',
        browser: '',
        base_url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        test_type: [
          { required: true, message: '请选择测试类型', trigger: 'blur' }
        ],
        browser: [
          { required: true, message: '请选择浏览器', trigger: 'blur' }
        ]
      },
      typeOptions: [
        {
          value: 'http',
          label: 'http'
        }, {
          value: 'web',
          label: 'web'
        }
      // 暂未APP支持
      // {
      //   value: 'app',
      //   label: 'App UI'
      // }
      ],
      browserOptions: [
        {
          value: 'chrome',
          label: 'chrome'
        }, {
          value: 'edge',
          label: 'edge'
        }, {
          value: 'firefox',
          label: 'firefox'
        }
      ],
      testType: 'http',
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
                this.$message.error('更新失败！')
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 获取环境信息
    async getEnv() {
      const resp = await EnvApi.GetEnvDetail(this.eid)
      if (resp.success === true) {
        this.form = resp.result
      } else {
        this.$message.error(resp.error.message)
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
