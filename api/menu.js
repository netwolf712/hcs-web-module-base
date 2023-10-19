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



/**
 * 空白首页菜单
 */
export function getTemplateSettings() {
  var menu = [
    {
      name: "BaseInfo",
      path: "",
      hidden: false,
      redirect: "index",
      component: "Layout",
      alwaysShow: true,
      meta: {
        title: "基本信息",
        icon: "dashboard",
        noCache: false,
        link: null,
      },
      children: [
        {
          name: "HelloWorld",
          path: "index",
          hidden: false,
          component: "index",
          meta: {
            title: "你好",
            icon: "clipboard",
            noCache: false,
            link: null,
          },
        }
      ],
    },
  ];
  return filterRouters(menu, loadView);
}