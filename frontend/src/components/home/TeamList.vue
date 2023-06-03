<!--
/**
* @author alley
* @date 2022-09-17
* @desc 团队管理/配置中心
*/
-->
<template>
  <div class="main-card">
      <div class="filter-line">
        <el-button cy-data="create-team" type="primary" @click="showCreate()">创建</el-button>
      </div>
      <div>
        <el-table :data="teamData" border style="width: 100%">
          <el-table-column fixed prop="id" label="ID" width="80">
          </el-table-column>
          <el-table-column prop="name" label="团队名称"> </el-table-column>
          <el-table-column prop="email" label="团队邮箱"> </el-table-column>
          <el-table-column prop="update_time" label="更新时间"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" plain @click="showEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" plain @click="deleteTeam(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <TeamDialog v-if="showDailog" @cancel="cancelTeam" :tid=teamid></TeamDialog>
  </div>
</template>

<script>
import TeamApi from '../../request/team'
import TeamDialog from './TeamDialog'


export default {
  name: 'Team',
  components: {
    TeamDialog
  },
  data() {
    return {
      loading: false,
      teamData: [],
      showDailog: false,
      teamid: 0
    }
  },
  mounted() {
    this.initTeamList()
  },
  methods: {
    // 初始化获取团队列表
    async initTeamList() {
      const resp = await TeamApi.getTeamAll()
      if (resp.success === true) {
        this.teamData = resp.result
        // this.$message.success("查询成功")
      } else {
        this.$message.error('查询失败!')
      }
    },
    // 显示创建窗口
    showCreate() {
      this.showDailog = true
    },
    // 显示编辑窗口
    showEdit(obj) {
      this.teamid = obj.id
      this.showDailog = true
    },
    // 子组件的回调
    cancelTeam() {
      this.showDailog = false
      this.teamid = 0
      this.initTeamList()
    },
    // 删除团队信息
    async deleteTeam(obj) {
      this.teamid = obj.id
      const resp = await TeamApi.deleteTeam(this.teamid)
      if (resp.success === true) {
        this.$message.success('删除成功')
        this.initTeamList()
        this.teamid = 0
      } else {
        this.$message.error('删除失败!')
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
}
.foot-page {
  margin-top: 20px;
  float: right;
  margin-bottom: 20px;
}
.team-card {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 15px;
  margin-bottom: 15px
}
</style>
