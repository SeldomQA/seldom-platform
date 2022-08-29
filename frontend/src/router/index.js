import Vue from 'vue'
import VueRouter from 'vue-router'
import SettingTabs from '../components/home/SettingTabs.vue'
import Case from '../components/cases/Case.vue'
import TaskList from '../components/tasks/TaskList.vue'
import Report from '../components/reports/Report.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Setting',
    component: SettingTabs
  },
  {
    path: '/cases',
    name: 'Case',
    component: Case
  },
  {
    path: '/tasks',
    name: 'Task',
    component: TaskList
  },
  {
    path: '/reports',
    name: 'Report',
    component: Report
  }
]

const router = new VueRouter({
  mode: 'hash', // 模式: hash/history
  base: process.env.BASE_URL,
  routes
})

export default router
