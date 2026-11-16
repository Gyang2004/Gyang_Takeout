import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { getToken } from '@/utils/auth'

const APP_TITLE = 'Gyang Takeout 管理端'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const token = getToken()

  // 未登录访问受保护页面：跳登录并记录回跳地址
  if (!to.meta.public && !token) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  // 已登录访问登录页：直接进工作台
  if (to.path === '/login' && token) {
    return '/'
  }
  return true
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - ${APP_TITLE}` : APP_TITLE
})

export default router
