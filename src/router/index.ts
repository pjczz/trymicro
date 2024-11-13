import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 设置动态路由，/child/one、child/two，以及所有/child开头的路由都指向MyPage组件
      path: '/home/:page*',
      name: 'child',
      component: HomeView,
      meta: {
        name: 'yudao'
      }
    },
    {
      path: '/about/:page*',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
      meta: {
        name: 'vben'
      }
    },
    {
      path: '/:pathMatch(.*)*', // 处理所有未匹配的路由
      redirect: '/home',           // 重定向到首页
    },
  ],
})
// 路由拦截函数
router.beforeEach((to, from, next) => {
  // 检查是否需要认证
  // 如果目标路由需要认证
  const userStore = useUserStore()
  if (to.meta.name) {
    console.log('success')
    userStore.setIsSubMenu(true)
    // 如果不需要认证，直接访问
  }
  else {
    userStore.setIsSubMenu(false)
    console.log('failure')
  }
  next();
});
export default router
