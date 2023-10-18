import { filterRouters } from "@/utils/filterRouters";
// 获取路由
export const getRouters = () => {
  var menu = [];
  return filterRouters(menu, loadView);
};
function loadView(view) {
  if (process.env.NODE_ENV === "development") {
    return (resolve) => require([`@/views/${view}`], resolve);
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`);
  }
}
