import {
  createMemoryHistory,
  createWebHashHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

import pageRoutes from "~pages";
import Center from "~/pages/Center.vue";
import Project from "~/pages/center/Project.vue";
import Env from "~/pages/center/Env.vue";
import Team from "~/pages/center/Team.vue";

// export const routes = pageRoutes;

export const routes = [
  ...pageRoutes,
  {
    path: '/center',
    name: 'center',
    component: Center,
    children: [
      {
        path: 'project',
        name: 'center-Project',
        component: Project,
      },
      {
        path: 'env',
        name: 'center-Env',
        component: Env,
      },
      {
        path: 'team',
        name: 'center-Team',
        component: Team,
      }
    ]
  }
];

// console.log("layout", routes)

export function createRouter() {
  const router = _createRouter({
    history: createWebHistory(),
    routes,
  });

  // 开启登陆页
  // 导航守卫，控制一些页面登录才能访问
  router.beforeEach((to, from, next) => {
    if (to.path === "/login") {
      // 当路由为login时就直接下一步操作
      next();
    } else {
      // 否则就需要判断
      if (sessionStorage.token) {
        // 如果有用户名就进行下一步操作
        next();
      } else {
        next({ path: "/login" }); // 没有用户名就跳转到login页面
      }
    }
  });
  return router;
}
