import './assets/main.css'
import microApp from '@micro-zoe/micro-app'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'
import { setupI18n } from '@/plugins/vueI18n'
import './permission'
// 引入全局样式
import '@/styles/index.scss'
import useTrack from '@/utils/tracking/useTrack'
import { sendTracking } from './api/track/manual'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router, { setupRouter } from '@/router'
import App from './App.vue'

const app = createApp(App)
await setupI18n(app)
setupRouter(app)
app.use(createPinia())
app.use(router)
app.use(Antd)
window.$useTrack = new useTrack({
  request: sendTracking,
  app,
  autoClick: true, //是否开启点击事件全埋点 默认为true
  autoError: true, //是否开启错误事件全埋点 默认为true
  autoStay: true, //是否开启错误事件全埋点 默认为true
  autoUrl: true, //是否开启自动通过url获取module和submodules 用于解决不同项目的路由名称问题 默认为true
  intervalTime: 5000, //自动埋点上报间隔时间 默认为5000ms
  retryLimit: 3, //自动埋点上报失败重试次数 默认为3次
})
await router.isReady()
app.mount('#app')
microApp.start({
  'router-mode': 'native-scope',
  // preFetchApps: [
  //   { name: 'Vben Admin Antd', url: 'http://192.168.1.120:5666/', level: 3, iframe:true }, // 加载资源、解析并渲染
  // ],
})
microApp.router.setBaseAppRouter(router)
