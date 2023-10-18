import Layout from "@/layout/index";
import ParentView from "@/components/ParentView";
import InnerLink from "@/layout/components/InnerLink";

export function filterRouters(menu, loadView) {
  const sdata = JSON.parse(JSON.stringify(menu));
  const rdata = JSON.parse(JSON.stringify(menu));
  const sidebarRoutes = filterAsyncRouter(sdata, false, false, loadView);
  const rewriteRoutes = filterAsyncRouter(rdata, false, true, loadView);
  var routers = {
    sidebarRoutes: sidebarRoutes,
    rewriteRoutes: rewriteRoutes,
  };
  return routers;
}
// 遍历后台传来的路由字符串，转换为组件对象
export function filterAsyncRouter(
  asyncRouterMap,
  lastRouter = false,
  type = false,
  loadView
) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else if (route.component === "ParentView") {
        route.component = ParentView;
      } else if (route.component === "InnerLink") {
        route.component = InnerLink;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type, loadView);
    } else {
      delete route["children"];
      delete route["redirect"];
    }
    return true;
  });
}
function filterChildren(childrenMap, lastRouter = false) {
  var children = [];
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView" && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + "/" + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + "/" + el.path;
    }
    children = children.concat(el);
  });
  return children;
}
