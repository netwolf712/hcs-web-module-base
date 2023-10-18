import auth from "@/plugins/auth";
import router, { constantRoutes, dynamicRoutes } from "@/router";
import { generateModuleRoutes } from "@src/moduleRouter";
const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes);
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      state.topbarRouters = routes;
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes;
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise((resolve) => {
        const moduleRouters = generateModuleRoutes();
        const sidebarRoutes = moduleRouters.sidebarRoutes;
        const rewriteRoutes = moduleRouters.rewriteRoutes;
        const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
        rewriteRoutes.push({ path: "*", redirect: "/404", hidden: true });
        router.addRoutes(asyncRoutes);
        commit("SET_ROUTES", rewriteRoutes);
        commit("SET_SIDEBAR_ROUTERS", constantRoutes.concat(sidebarRoutes));
        commit("SET_DEFAULT_ROUTES", sidebarRoutes);
        commit("SET_TOPBAR_ROUTES", sidebarRoutes);
        resolve(rewriteRoutes);
      });
    },
  },
};

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = [];
  routes.forEach((route) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route);
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route);
      }
    }
  });
  return res;
}

export default permission;
