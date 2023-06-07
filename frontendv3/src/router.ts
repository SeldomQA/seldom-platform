import {
  createMemoryHistory,
  createWebHashHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

import pageRoutes from "~pages";

export const routes = pageRoutes;
// console.log(routes)

export function createRouter() {
  const router = _createRouter({
    history: createWebHashHistory(),
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
