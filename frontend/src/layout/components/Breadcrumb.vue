<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 取路由 matched 中带 title 的记录，最后一项为当前页
const crumbs = computed(() =>
  route.matched
    .filter((record) => record.meta?.title)
    .map((record) => ({ path: record.path, title: record.meta.title })),
)
</script>

<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in crumbs" :key="item.path">
      <router-link v-if="index < crumbs.length - 1" :to="item.path">{{ item.title }}</router-link>
      <span v-else>{{ item.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.breadcrumb {
  font-size: var(--app-font-size-base);
}
</style>
