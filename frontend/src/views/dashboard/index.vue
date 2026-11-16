<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

/**
 * 退出登录并回到登录页。
 * @returns {Promise<void>}
 */
async function handleLogout() {
  await userStore.logout()
  router.replace('/login')
}
</script>

<template>
  <div class="dashboard-placeholder">
    <el-card class="welcome-card" shadow="never">
      <h2>登录成功</h2>
      <p class="welcome-text">欢迎回来，{{ userStore.name || userStore.userName || '管理员' }}。</p>
      <p class="muted">
        工程骨架与登录闭环已完成。布局、菜单与业务模块将按「一个模块开发 → 验收 → 下一个」推进。
      </p>
      <el-button type="primary" @click="handleLogout">退出登录</el-button>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.dashboard-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--app-space-6);
}

.welcome-card {
  width: 100%;
  max-width: 560px;
  padding: var(--app-space-4);
  border-radius: var(--app-radius-card);
  box-shadow: var(--app-shadow-card);
}

.welcome-card h2 {
  font-size: var(--app-font-size-display);
  color: var(--app-color-text-primary);
}

.welcome-text {
  margin-top: var(--app-space-3);
  color: var(--app-color-text-regular);
}

.muted {
  margin: var(--app-space-2) 0 var(--app-space-6);
  line-height: 1.7;
  color: var(--app-color-text-secondary);
}
</style>
