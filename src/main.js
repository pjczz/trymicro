import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import microApp from '@micro-zoe/micro-app'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import 'uno.css'

createApp(App).use(store).use(router).use(Antd).mount('#app')
microApp.start({
  "router-mode":'native-scope',
  // preFetchApps: [
  //   { name: 'Vben Admin Antd', url: 'http://192.168.1.120:5666/', level: 3, iframe:true }, // 加载资源、解析并渲染
  // ],

})
microApp.router.setBaseAppRouter(router)