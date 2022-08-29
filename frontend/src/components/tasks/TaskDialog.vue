<template>
  <div class="dialog">
    <el-dialog :title=showTitle :visible.sync="showStatus" @close="cancelDialog()" width="1200px">
      <div style="text-align: left;">
        <el-form ref="taskform" :model="taskform" :rules="taskRule" :inline="true" label-width="80px">
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="taskform.name"></el-input>
          </el-form-item>
          <el-form-item label="运行环境" prop="env">
           <el-select v-model="taskform.env" placeholder="选择环境">
              <el-option
                v-for="item in envOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="告警邮箱" prop="lark_email">
            <el-input v-model="taskform.lark_email"></el-input>
          </el-form-item> -->
          <el-form-item>
            <div class="dialog-footer">
              <el-button cy-data="save-task" type="primary" @click="createTask('taskform')">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-divider content-position="left">选择用例</el-divider>
      <div style="min-height: 550px;">
        <div style="width: 20%; float: left;">
          <div style="width: 100%; height: 500px;">
            <el-scrollbar style="height:100%">
              <el-tree
                class="flow-tree"
                :data="fileData"
                node-key="id"
                ref="tree"
                lazy
                highlight-current
                :props="defaultProps"
                @node-click="handleNodeClick"
                >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span v-if="data.is_leaf === 1">
                    <i class="el-icon-tickets"></i>
                  </span>
                  <span v-else>
                    <i class="el-icon-folder"></i>
                  </span>
                    {{ data.label }}
                </span>
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
        <!-- 穿梭 -->
        <div style="width: 78%; float: right">
          <el-transfer
            v-model="taskform.cases"
            :data="caseData"
            :titles="['Source', 'Target']">
          </el-transfer>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ProjectApi from '../../request/project'
import TaskApi from '../../request/task'

export default {
  props: ['pid', 'tid'],
  data() {
    return {
      showStatus: true,
      showTitle: '',
      taskform: {
        name: '',
        env: '',
        cases: []
      },
      group_list: [],
      taskRule: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        env: [
          { required: true, message: '请输入运行环境', trigger: 'blur' }
        ]
      },
      caseNumber: 0,
      fileData: [],
      caseData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      envOptions: []
    }
  },
  created() {
    this.taskform.project = this.pid
    if (this.tid === 0) {
      this.showTitle = '创建任务'
    } else {
      this.showTitle = '编辑任务'
      this.initTaskDetails()
    }
  },
  mounted() {
  // 初始化方法
    this.initProjectFile()
    this.initEvn()
  },
  methods: {
    // 获取环境列表
    async initEvn() {
      const resp = await ProjectApi.getEnvs()
      console.log('resp', resp)
      if (resp.success === true) {
        for (let i = 0; i < resp.result.length; i++) {
          this.envOptions.push({
            value: resp.result[i].id,
            label: resp.result[i].name
          })
        }
      } else {
        this.$message.error(resp.error.message)
      }
    },

    async initProjectFile() {
      const resp = await ProjectApi.getProjectTree(this.pid)
      if (resp.success === true) {
        this.fileData = resp.result.files
        this.caseNumber = resp.result.case_number
      } else {
        this.$message.error(resp.error.message)
      }
    },
    // 初始化任务详情
    async initTaskDetails() {
      const resp = await TaskApi.getTaskDetails(this.tid)
      if (resp.success === true) {
        this.taskform = resp.result
        this.caseData = resp.result.case_list
      } else {
        this.$message.error(resp.error.message)
      }
    },
    // 点击项目文件
    handleNodeClick(data) {
      // 如果是文件返回 类&方法
      if (data.label.match('.py')) {
        ProjectApi.getProjectCases(this.pid, data.full_name).then(resp => {
          if (resp.success === true) {
            this.$message.success('获取用例成功')
            // this.caseData = resp.result
            for (let i = 0; i < resp.result.length; i++) {
              // 如果用例不在列表时添加
              let isExists = false
              for (let j = 0; j < this.caseData.length; j++) {
                if (resp.result[i].id === this.caseData[j].key) {
                  isExists = true
                  break
                }
              }
              if (isExists === false) {
                this.caseData.push({
                  key: resp.result[i].id,
                  label: resp.result[i].id + ' ' + resp.result[i].class_name + '.' + resp.result[i].case_name
                })
              }
            }
          } else {
            this.$message.error(resp.error.message)
          }
        })
      } else {
        // 如果目录返回下一级 目录&文件
        if (data.children.length > 0) {
          // 下一级不为空，直接返回
          return
        }
        ProjectApi.getProjectSubdirectory(this.pid, data.full_name).then(resp => {
          if (resp.success === true) {
            data.children = resp.result
          } else {
            this.$message.error(resp.error.msg)
          }
        })
      }
    },
    // 关闭dialog
    cancelDialog() {
      this.$emit('cancel', {})
    },
    // 创建任务按钮
    createTask(formName) {
      if (this.taskform.cases.length === 0) {
        this.$message.warning('请选择用例!')
        return
      }
      // this.taskform.cases = this.selectValue
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.tid === 0) {
            // 创建任务
            TaskApi.createTask(this.taskform).then(resp => {
              if (resp.success === true) {
                this.$message.success('创建成功！')
                this.cancelDialog()
              } else {
                this.$message.error('创建失败！');
              }
            })
          } else {
            // 更新任务
            TaskApi.updateTask(this.tid, this.taskform).then(resp => {
              if (resp.success === true) {
                this.$message.success('更新成功！')
                this.cancelDialog()
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

.el-tree {
  min-width: 100%;
  display: inline-block !important;
}

.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
