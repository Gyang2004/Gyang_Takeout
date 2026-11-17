<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowDown, Expand, Fold, UserFilled } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import Breadcrumb from './Breadcrumb.vue'

const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()

const displayName = computed(() => userStore.name || userStore.userName || '管理员')

/**
 * 下拉菜单命令：目前只有退出登录。
 * @param {string} command 菜单命令
 * @returns {Promise<void>}
 */
async function handleCommand(command) {
  if (command !== 'logout') return
  await userStore.logout()
  ElMessage.success('已退出登录')
  router.replace('/login')
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-left">
      <el-button
        class="collapse-btn"
        text
        aria-label="切换侧边栏"
        @click="appStore.toggleSidebar"
      >
        <el-icon :size="20">
          <component :is="appStore.sidebarCollapsed ? Expand : Fold" />
        </el-icon>
      </el-button>
      <Breadcrumb class="navbar-breadcrumb" />
    </div>

    <el-dropdown trigger="click" @command="handleCommand">
      <span class="user-entry" tabindex="0">
        <el-icon><UserFilled /></el-icon>
        <span class="user-name">{{ displayName }}</span>
        <el-icon><ArrowDown /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--app-space-4);
  background-color: var(--app-color-white);
}

.navbar-left {
  display: flex;
  gap: var(--app-space-3);
  align-items: center;
  min-width: 0;
}

.collapse-btn {
  color: var(--app-color-text-regular);
}

.user-entry {
  display: flex;
  gap: var(--app-space-2);
  align-items: center;
  color: var(--app-color-text-regular);
  cursor: pointer;
  outline: none;
}

.user-entry:hover {
  color: var(--app-color-text-primary);
}

.user-name {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .navbar-breadcrumb {
    display: none;
  }

  .user-name {
    display: none;
  }
}
</style>
