import { ref } from 'vue'
import { defineStore } from 'pinia'

const COLLAPSED_KEY = 'sidebarCollapsed'

/**
 * 全局 UI 状态：侧边栏折叠等。
 */
export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(localStorage.getItem(COLLAPSED_KEY) === '1')

  /**
   * 切换侧边栏折叠状态并持久化，刷新后保持。
   * @returns {void}
   */
  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
    localStorage.setItem(COLLAPSED_KEY, sidebarCollapsed.value ? '1' : '0')
  }

  return { sidebarCollapsed, toggleSidebar }
})
