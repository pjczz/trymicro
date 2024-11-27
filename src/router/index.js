import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    // 设置动态路由，/child/one、child/two，以及所有/child开头的路由都指向MyPage组件
    path: '/home/:page*',
    name: 'child',
    component: HomeView,
  },
  {
    path: '/about/:page*',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*', // 处理所有未匹配的路由
    redirect: '/about',           // 重定向到首页
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
