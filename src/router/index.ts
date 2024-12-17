import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/modules/user'
const { t } = useI18n()
import { APPLICATION } from '@/assets/son'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 设置动态路由，/child/one、child/two，以及所有/child开头的路由都指向MyPage组件
      path: '/home/:page*',
      name: APPLICATION.HOME,
      component: HomeView,
      meta: {
        name: 'yudao',
      },
    },
    {
      path: '/about/:page*',
      name: APPLICATION.ABOUT,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
      meta: {
        name: 'vben',
      },
    },
    {
      path: '/abs',
      name: 'abs',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/absView.vue'),
      meta: {
        name: '',
      },
    },
    {
      path: '/user/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Profile/index.vue'),
      meta: {
        name: '',
      },
    },

    {
      path: '/:pathMatch(.*)*', // 处理所有未匹配的路由
      redirect: '/home', // 重定向到首页
    },
    {
      path: '/login',
      component: () => import('@/views/Login/Login.vue'),
      name: 'Login',
      meta: {
        hidden: true,
        title: t('router.login'),
        noTagsView: true,
      },
    },
    {
      path: '/forget',
      component: () => import('@/views/Login/Forget.vue'),
      name: 'Forget',
      meta: {
        hidden: true,
        title: t('router.forget'),
        noTagsView: true,
      },
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
  } else {
    userStore.setIsSubMenu(false)
    console.log('failure')
  }
  next()
})
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
export default router
