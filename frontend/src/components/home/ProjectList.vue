<!--
/**
* @author huzhiheng
* @date 2022-02-11
* @desc 项目管理/配置中心
*/
-->
<template>
  <div class="main-card">
    <div shadow="never">
      <div class="filter-line">
        <el-button cy-data="create-project" type="primary" @click="showCreate()">创建</el-button>
      </div>
      <el-row>
        <div v-for="(item, index) in tableData" :key="index">
          <el-col :span="7" class="project-card">
            <el-card>
              <div>
                  <img
                    :src="'static/images/' + item.path_name  + '/'"
                    class="image"
                    style="height: 120px; width: 120px"
                  />
                </div>
                <!-- <div style="margin-top: 10px;">
                  <el-tag>{{item.address}}</el-tag>
                </div> -->
                <div style="margin-top: 10px;">
                  <el-tag>测试目录：{{item.case_dir}}</el-tag>
                </div>
                <div style="margin-top: 10px;">
                  <el-tag>文件数量：{{item.test_num}}</el-tag>
                </div>
              <div slot="header" class="clearfix">
                <span>【{{item.id}}】{{item.name}} </span>
                <span style="float: right; padding: 3px 0">
                  <el-dropdown style="left: 5px;">
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="item.is_clone==0">
                        <el-button cy-data="delete-project" @click="cloneProject(item.id)" type="text" class="dropdown-menu">克隆</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="item.is_clone==1">
                        <el-button cy-data="delete-project" @click="cloneProject(item.id)" type="text" class="dropdown-menu">拉取</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button cy-data="edit-project" @click="showEdit(item.id)" type="text" class="dropdown-menu">编辑</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button cy-data="delete-project" @click="deleteProject(item.id)" type="text" class="dropdown-menu">删除</el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </div>
              <div>
                {{item.describe}}
              </div>
            </el-card>
          </el-col>
        </div>
      </el-row>
    </div>
    <project-dialog v-if="showDailog" :pid=projectId @cancel="cancelProject"></project-dialog>
  </div>
</template>

<script>
import ProjectApi from '../../request/project'
import projectDialog from './projectDialog'

export default {
  name: 'Workbench',
  components: {
    // 组件
    projectDialog
  },
  data() {
    return {
      loading: false,
      showDailog: false,
      projectId: 0,
      tableData: [],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },

  mounted() {
    // 初始化方法
    this.initProjects()
  },

  methods: {
    // 定义方法
    async initProjects() {
      this.loading = true
      const resp = await ProjectApi.getProjects()
      if (resp.success === true) {
        this.tableData = resp.result
      } else {
        this.$message.error(resp.error.message)
      }
      this.loading = false
    },
    // 显示创建窗口
    showCreate() {
      this.showDailog = true
    },
    // 显示编辑窗口
    showEdit(pid) {
      this.projectId = pid
      this.showDailog = true
    },
    // 子组件的回调
    cancelProject() {
      this.showDailog = false
      this.projectId = 0
      this.initProjects()
    },
    // 克隆项目到本地
    async cloneProject(pid) {
      const resp = await ProjectApi.cloneProject(pid)
      if (resp.success === true) {
        this.$message.success('克隆&拉取完成！')
        this.initProjects()
      } else {
        this.$message.error('克隆失败');
      }
    },
    // 删除一条项目信息
    async deleteProject(pid) {
      const resp = await ProjectApi.deleteProject(pid)
      if (resp.success === true) {
        this.$message.success('删除成功！')
        this.initProjects()
      } else {
        this.$message.error('删除失败');
      }
    }
  }
}
</script>

<style>
.el-popover.home-popover {
  width: 70px;
  min-width: auto;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 定义当前组件使用的CSS */
.filter-line {
  height: 50px;
  text-align: left;
  margin-left: 15px;
}
.foot-page {
  margin-top: 20px;
    float: right;
    margin-bottom: 20px;
}
.project-card {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 15px;
  margin-bottom: 15px
}
.dropdown-menu {
  width: 100%;
  text-align: left;
}
</style>
