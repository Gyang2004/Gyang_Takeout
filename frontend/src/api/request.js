import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from '@/utils/auth'

/**
 * 统一 Axios 实例。
 * 约定：后端 Result 的 code === 1 视为成功；业务失败与网络异常在此统一提示。
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
})

request.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.token = token
  return config
})

request.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res?.code === 1) return res
    const message = res?.msg || '请求失败'
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  },
  (error) => {
    if (error.response?.status === 401) {
      removeToken()
      window.location.assign('/login')
      return Promise.reject(error)
    }
    const message = error.response?.data?.msg || error.message || '网络异常'
    ElMessage.error(message)
    return Promise.reject(error)
  },
)

export default request
