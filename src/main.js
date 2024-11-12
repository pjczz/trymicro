import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import microApp from '@micro-zoe/micro-app'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import 'uno.css'

createApp(App).use(store).use(router).use(Antd).mount('#app')
microApp.start()
microApp.router.setBaseAppRouter(router)