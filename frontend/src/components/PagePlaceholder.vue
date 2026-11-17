<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '后端接口实现后接入。' },
})
</script>

<template>
  <el-card class="page-placeholder" shadow="never">
    <el-result icon="info" :title="title" sub-title="功能开发中">
      <template #extra>
        <p class="placeholder-desc">{{ description }}</p>
        <el-tag type="info" effect="plain">等待后端接口</el-tag>
      </template>
    </el-result>
  </el-card>
</template>

<style scoped lang="scss">
.page-placeholder {
  border-radius: var(--app-radius-card);
}

.placeholder-desc {
  margin-bottom: var(--app-space-3);
  color: var(--app-color-text-secondary);
}
</style>
