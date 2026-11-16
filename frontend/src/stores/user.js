import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { login as loginApi, logout as logoutApi } from '@/api/employee'
import { getToken, removeToken, setToken } from '@/utils/auth'

const USER_NAME_KEY = 'userName'
const NAME_KEY = 'name'

/**
 * 登录态：token、员工信息与登录/退出动作。
 * token 存 localStorage，刷新后恢复；真正的门禁在后端拦截器。
 */
export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const userName = ref(localStorage.getItem(USER_NAME_KEY) || '')
  const name = ref(localStorage.getItem(NAME_KEY) || '')

  const isLoggedIn = computed(() => Boolean(token.value))

  /**
   * 登录并持久化登录态。
   * @param {{ username: string, password: string }} loginForm 登录表单
   * @returns {Promise<{ id: number, userName: string, name: string, token: string }>} 登录成功后的员工信息
   * @throws {Error} 业务失败或网络异常时由 Axios 拦截器抛出
   */
  async function login(loginForm) {
    const res = await loginApi(loginForm)
    const data = res.data || {}
    token.value = data.token || ''
    userName.value = data.userName || ''
    name.value = data.name || ''

    setToken(token.value)
    localStorage.setItem(USER_NAME_KEY, userName.value)
    localStorage.setItem(NAME_KEY, name.value)
    return data
  }

  /**
   * 退出登录：先请求后端，失败也清理本地登录态。
   * @returns {Promise<void>}
   */
  async function logout() {
    try {
      await logoutApi()
    } catch {
      // 后端退出接口失败不影响本地清理；错误提示已由拦截器统一处理
    }
    reset()
  }

  /**
   * 清空内存与 localStorage 中的登录态。
   * @returns {void}
   */
  function reset() {
    token.value = ''
    userName.value = ''
    name.value = ''
    removeToken()
    localStorage.removeItem(USER_NAME_KEY)
    localStorage.removeItem(NAME_KEY)
  }

  return { token, userName, name, isLoggedIn, login, logout, reset }
})
