<template>
  <div class="project-dialog">
    <el-dialog :title=showTitle :visible.sync="showStatus" @close="cancelProject()" width="600px">
      <el-form v-if="inResize === true" :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input cy-data="project-name" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="关联项目" prop="address">
          <el-input cy-data="project-address"  v-model="form.address"></el-input>
          <el-alert title="关联项目：使用seldom开发的自动化项目路径" type="success" :closable="false"></el-alert>
        </el-form-item>
        <el-form-item>
          <div class="dialog-footer">
            <el-button cy-data="cancel-project" @click="cancelProject()">取消</el-button>
            <el-button cy-data="save-project" type="primary" @click="onSubmit('form')">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import ProjectApi from '../../../request/project'

export default {
  props: ['pid'],
  data() {
    return {
      showStatus: true,
      showTitle: '',
      form: {
        name: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入项目地址', trigger: 'blur' }
        ]
      },
      inResize: true
    }
  },
  created() {
    if (this.pid === 0) {
      this.showTitle = '创建项目'
    } else {
      this.showTitle = '编辑项目'
      this.getProject()
    }
    // 强制刷新
    this.inResize = false;
    this.$nextTick(() => {
      this.inResize = true;
    });
  },
  mounted() {
  //   this.initProject()
  },
  methods: {
    // 获取一条项目信息
    async getProject() {
      const resp = await ProjectApi.getProject(this.pid)
      if (resp.success === true) {
        this.form = resp.data
      } else {
        this.$message.error(resp.error.message);
      }
    },
    // 关闭dialog
    cancelProject() {
      this.$emit('cancel', {})
    },
    // 创建项目按钮
    onSubmit(formName) {
      console.log('pid', this.pid)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.pid === 0) {
            ProjectApi.createProject(this.form).then(resp => {
              if (resp.success === true) {
                this.$message.success('创建成功！')
                this.cancelProject()
              } else {
                this.$message.error('创建失败！');
              }
            })
          } else {
            ProjectApi.updateProject(this.pid, this.form).then(resp => {
              if (resp.success === true) {
                this.$message.success('更新成功！')
                this.cancelProject()
              } else {
                this.$message.error('更新失败！');
              }
            })
          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  float: right;
}
</style>
