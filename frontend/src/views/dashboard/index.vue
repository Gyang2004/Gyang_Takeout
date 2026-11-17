<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="dashboard-page">
    <el-card class="welcome-card" shadow="never">
      <div class="welcome-head">
        <div>
          <h2>欢迎回来，{{ userStore.name || userStore.userName || '管理员' }}</h2>
          <p>工作台数据将在后端 report 接口实现后接入。</p>
        </div>
        <el-tag type="info" effect="plain">功能开发中</el-tag>
      </div>
    </el-card>

    <el-card class="placeholder-card" shadow="never">
      <el-empty description="工作台统计、订单概览与菜品/套餐数据待接入" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: var(--app-space-4);
}

.welcome-card,
.placeholder-card {
  border-radius: var(--app-radius-card);
}

.welcome-head {
  display: flex;
  gap: var(--app-space-4);
  align-items: flex-start;
  justify-content: space-between;
}

.welcome-head h2 {
  font-size: var(--app-font-size-display);
  color: var(--app-color-text-primary);
}

.welcome-head p {
  margin-top: var(--app-space-2);
  color: var(--app-color-text-secondary);
}
</style>
