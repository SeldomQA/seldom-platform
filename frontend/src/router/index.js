import Vue from 'vue'
import VueRouter from 'vue-router'
import Workbench from '../components/home/Workbench.vue'
import Case from '../components/cases/Case.vue'
import Task from '../components/tasks/Task.vue'
import Report from '../components/reports/Report.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Workbench',
    component: Workbench
  },
  {
    path: '/cases',
    name: 'Case',
    component: Case
  },
  {
    path: '/tasks',
    name: 'Task',
    component: Task
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
