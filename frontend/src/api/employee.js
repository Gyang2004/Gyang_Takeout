import request from './request'

/**
 * 员工登录。
 * @param {{ username: string, password: string }} data 登录表单
 * @returns {Promise<{ code: number, msg?: string, data: { id: number, userName: string, name: string, token: string } }>}
 */
export function login(data) {
  return request.post('/employee/login', data)
}

/**
 * 员工退出。当前后端只返回成功，不维护令牌黑名单。
 * @returns {Promise<{ code: number, msg?: string }>}
 */
export function logout() {
  return request.post('/employee/logout')
}
