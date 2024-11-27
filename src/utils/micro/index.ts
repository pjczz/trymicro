import microApp from '@micro-zoe/micro-app'
//根据子应用名 进行指定路由跳转
export const useMicro = () => {
  function setRouteByPath(name: string, path: string) {
    console.log(name, path, 'setRouteByPath')
    microApp.router.push({ name, path, replace: false })
  }
  // 获取子应用发射的数据
  function getDataByAppName(appName: string) {
    return microApp.getData(appName)
  }
  // 监听子应用发射数据
  function getDataByAppNameListener(appName: string) {
    return new Promise((resolve) => {
      microApp.addDataListener(appName, (data) => {
        resolve(data)
      })
    })
  }
  // 获取全局数据
  function getGlobalData() {
    return microApp.getGlobalData()
  }
  // 监听全局数据
  function getGlobalDataListener() {
    return new Promise((resolve) => {
      microApp.addGlobalDataListener((data) => {
        resolve(data)
      })
    })
  }
  return {
    setRouteByPath,
    getDataByAppName,
    getDataByAppNameListener,
    getGlobalData,
    getGlobalDataListener,
  }
}
