<!--
/**
* @author bugmaster
* @date 2022-05-20
* @desc 页面导航组件
*/
-->
<template>
  <div class="navigation">
    <el-container>
      <el-container v-if="isRouterAlive">
        <el-aside width="80px" style="background-color: #313a46">
          <el-menu text-color="#838f9c" active-text-color="#12263f" :default-active="onRoutes">
            <div class="seldom-logo">
                <img src="../assets/seldom-logo-mini.gif" class="img-logo" />
            </div>
            <router-link to="/main/settings">
              <el-tooltip class="item" effect="dark" content="配置管理" placement="right">
                <el-menu-item index="1" class="menu-option">
                    <i class="el-icon-c-scale-to-original"></i>
                </el-menu-item>
              </el-tooltip>
            </router-link>
            <router-link to="/main/cases">
              <el-tooltip class="item" effect="dark" content="用例管理" placement="right">
              <el-menu-item index="2" class="menu-option">
                <i class="el-icon-folder-opened"></i>
              </el-menu-item>
            </el-tooltip>
            </router-link>
            <router-link to="/main/tasks">
              <el-tooltip class="item" effect="dark" content="任务管理" placement="right">
                <el-menu-item index="3" class="menu-option">
                  <i class="el-icon-date"></i>
                </el-menu-item>
              </el-tooltip>
            </router-link>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <div style="float: left">
              <span style="font-size: 15px;">默认项目: </span>
              <el-dropdown @command="switchProject" trigger="click">
                <span class="el-dropdown-link"> {{projectName}} <i class="el-icon-arrow-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in projectOptions"
                    :key="index"
                    class="sort-item"
                    :command="item.id"
                  >{{item.name}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <el-dropdown @command="handleCommand" trigger="click" style="margin-top: 10px;">
              <el-avatar size="small" :src="circleUrl"></el-avatar>
              <el-dropdown-menu slot="dropdown" style="width: 120px">
                <el-dropdown-item command="help_documentation">
                  <i class="el-icon-tickets"></i>帮助文档
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  <i class="el-icon-switch-button"></i>退出
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
          <el-main>
            <router-view> </router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import UserApi from '../request/user'
import ProjectApi from '../request/project'

export default {
  name: 'navigation',
  components: {},
  computed: {
    onRoutes() {
      if (this.$route.path === '/main/cases') {
        return '2'
      } else if (this.$route.path === '/main/tasks') {
        return '3'
      }
      return '1'
    }
  },
  data() {
    return {
      isRouterAlive: true,
      // 定义变量
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      token: '',
      projectId: '',
      projectName: '',
      projectOptions: []
    }
  },
  created() {
    // 初始化项目
    this.initProjectList()
  },
  mounted() {
    // 初始化方法
    this.token = sessionStorage.getItem('token')
  },

  methods: {
    // 初始化项目列表
    async initProjectList() {
      const resp = await ProjectApi.getProjects()
      if (resp.success === true) {
        this.projectOptions = resp.result
        this.switchProject(this.projectOptions[0].id)
      } else {
        this.$message.error(resp.error.message)
      }
    },
    // 选择项目
    switchProject(command) {
      for (let i = 0; i < this.projectOptions.length; i++) {
        if (this.projectOptions[i].id === command) {
          this.projectName = this.projectOptions[i].name
          sessionStorage.projectId = this.projectOptions[i].id
          sessionStorage.projectName = this.projectOptions[i].name
          this.reload()
        }
      }
    },
    // 刷新组件
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    // 退出登录
    handleCommand(command) {
      switch (command) {
        case 'logout':
          UserApi.logout({ token: this.token }).then(resp => {
            if (resp.success === true) {
              sessionStorage.clear()
              this.$router.push('/login')
            } else {
              this.$message.error('退出失败！')
            }
          })
          break
        case 'help_documentation':
          window.open('https://github.com/SeldomQA/seldom-platform', '_blank')
          break
        default:
          break
      }
    }

  }
}
</script>

<style>
.navigation {
  height: 100%;
}

.el-container {
  height: 100%;
}

.seldom-logo {
  background-color: #313a46;
  line-height: 60px;
  padding-bottom: 0px;
  width: 80px;
}

.img-logo {
  display: inline-block;
  vertical-align: middle;
  height: 32px;
}

.el-header {
  background-color: #fff;
  color: #313a46;
  line-height: 60px;
  text-align: center;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 80px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

a {
  color: #838f9c;
  text-decoration: none;
}

.menu-option {
  text-align: left;
  background-color: #313a46;
  color: #fff;
  width: 80px;
}
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-menu-item.is-active {
  color: #fff !important;
  background-color: #313a46 !important;
}
.span-breadcrumb {
  float: right;
  margin-top: 10px;
}

.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
  color: #727cf5 !important;
}

</style>
