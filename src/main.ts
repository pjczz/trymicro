import './assets/main.css'
import microApp from '@micro-zoe/micro-app'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import 'virtual:uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
microApp.start({
  "router-mode": 'native-scope',
  // preFetchApps: [
  //   { name: 'Vben Admin Antd', url: 'http://192.168.1.120:5666/', level: 3, iframe:true }, // 加载资源、解析并渲染
  // ],

})
microApp.router.setBaseAppRouter(router)
