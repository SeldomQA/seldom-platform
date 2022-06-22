import {
    createMemoryHistory,
    createRouter as _createRouter,
    createWebHistory,
  } from "vue-router";
  import pageRoutes from "~pages";
  
  export const routes = pageRoutes;
  // console.log(routes)
  
  export function createRouter() {
    return _createRouter({
      // use appropriate history implementation for server/client
      // import.meta.env.SSR is injected by Vite.
      history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
      routes,
    });
  }
  