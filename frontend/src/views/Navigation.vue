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
      <el-container>
        <el-aside width="160px" style="background-color: #313a46">
          <el-menu text-color="#838f9c" active-text-color="#12263f" :default-active="onRoutes">
            <div class="seldom-logo">
                <img src="../assets/seldom-platform.gif" class="img-logo" />
            </div>
            <router-link to="/">
              <el-menu-item index="1" class="menu-option">
                <i class="el-icon-s-home"></i>
                <template #title>项目管理</template>
              </el-menu-item>
            </router-link>
            <router-link to="/cases">
              <el-menu-item index="2" class="menu-option">
                <i class="el-icon-folder-opened"></i>
                <template #title>用例管理</template>
              </el-menu-item>
            </router-link>
            <router-link to="/reports">
              <el-menu-item index="3" class="menu-option">
                <i class="el-icon-document"></i>
                <template #title>报告管理</template>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="text-align: right; font-size: 12px">
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

export default {
  name: 'navigation',
  components: {},
  computed: {
    onRoutes() {
      if (this.$route.path === '/cases') {
        return '2'
      } else if (this.$route.path === '/reports') {
        return '3'
      }
      return '1'
    }
  },
  data() {
    return {
      // 定义变量
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  mounted() {
    // 初始化方法
  },

  methods: {
    // 退出登录
    handleCommand(command) {
      switch (command) {
        case 'logout':
          document.getElementsByClassName('sign-out-btn')[0].click();
          break;
        case 'help_documentation':
          window.open('https://docs.google.com/document/d/1Pq46C6rUrp36QiRcf9PN0JZqclPPLmkPFZrIjeJ1hZs/edit?usp=sharing', '_blank')
          break;
        default:
          break;
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
  width: 160px;
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
  line-height: 160px;
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
  width: 160px;
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
