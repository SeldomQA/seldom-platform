import Vue from 'vue'
import VueRouter from 'vue-router'
import SettingTabs from '../components/home/SettingTabs.vue'
import Case from '../components/cases/Case.vue'
import TaskList from '../components/tasks/TaskList.vue'
import TeamList from '../components/home/TeamList.vue'
import Report from '../components/reports/Report.vue'
import Login from '../views/Login.vue';
import Navigation from '../views/Navigation.vue';
Vue.use(VueRouter)

const routes = [
  // 开启登陆页
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/',
    redirect: '/main/settings'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Navigation',
    component: Navigation,
    children: [
      {
        path: 'settings',
        name: 'Setting',
        component: SettingTabs
      },
      {
        path: 'cases',
        name: 'Case',
        component: Case
      },
      {
        path: 'tasks',
        name: 'Task',
        component: TaskList
      },
      {
        path: 'teams',
        name: 'Team',
        component: TeamList
      },
      {
        path: 'reports',
        name: 'Report',
        component: Report
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history', // 模式: hash/history
  base: process.env.BASE_URL,
  routes
})

// 开启登陆页
// // 导航守卫，控制一些页面登录才能访问
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     // 当路由为login时就直接下一步操作
//     next();
//   } else {
//     // 否则就需要判断
//     if (sessionStorage.token) {
//       // 如果有用户名就进行下一步操作
//       next();
//     } else {
//       next({ path: '/login' }); // 没有用户名就跳转到login页面
//     }
//   }
// });

export default router
