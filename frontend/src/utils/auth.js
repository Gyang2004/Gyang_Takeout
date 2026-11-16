const TOKEN_KEY = 'token'

/**
 * 读取登录令牌。
 * @returns {string} token；未登录时返回空字符串
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

/**
 * 保存登录令牌。
 * @param {string} token 后端返回的 JWT
 * @returns {void}
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 清除登录令牌。
 * @returns {void}
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}
