<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * 回到首页（未登录时会被路由守卫转到登录页）。
 * @returns {void}
 */
function goHome() {
  router.replace('/')
}
</script>

<template>
  <div class="not-found">
    <el-result icon="warning" title="404" sub-title="页面不存在或已被移除">
      <template #extra>
        <el-button type="primary" @click="goHome">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--app-color-page-bg);
}
</style>
