/**
 * 环境检查
 * 主要用于检测是编译哪些模块
 */
export function getOutputDir() {
  if (hasMaintainModule()) {
    return "dist/maintain";
  }
  return "dist";
}
export function hasMaintainModule() {
  if (
    process.env.VUE_APP_PROJECT_NAME &&
    process.env.VUE_APP_PROJECT_NAME.indexOf("maintainModule") >= 0
  ) {
    return true;
  }
  return false;
}
