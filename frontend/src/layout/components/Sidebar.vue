<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  DataLine,
  Dish,
  Food,
  Menu as MenuIcon,
  Odometer,
  Tickets,
  UserFilled,
} from '@element-plus/icons-vue'
import { menuRoutes } from '@/router/routes'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const appStore = useAppStore()

const iconMap = {
  Odometer,
  UserFilled,
  Menu: MenuIcon,
  Food,
  Dish,
  Tickets,
  DataLine,
}

const activeMenu = computed(() => {
  const matched = menuRoutes.find(
    (item) => route.path === item.path || route.path.startsWith(`${item.path}/`),
  )
  return matched?.path || route.path
})
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-logo" :class="{ 'is-collapsed': appStore.sidebarCollapsed }">
      <span class="logo-mark">GT</span>
      <span v-if="!appStore.sidebarCollapsed" class="logo-text">管理端</span>
    </div>

    <el-menu
      class="sidebar-menu"
      :default-active="activeMenu"
      :collapse="appStore.sidebarCollapsed"
      :collapse-transition="false"
      router
    >
      <el-menu-item v-for="item in menuRoutes" :key="item.path" :index="item.path">
        <el-icon><component :is="iconMap[item.icon]" /></el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-logo {
  display: flex;
  flex-shrink: 0;
  gap: var(--app-space-2);
  align-items: center;
  height: 56px;
  padding: 0 var(--app-space-4);
  overflow: hidden;
  color: var(--app-color-white);
  white-space: nowrap;
  border-bottom: 1px solid var(--app-color-sidebar-border);
}

.sidebar-logo.is-collapsed {
  justify-content: center;
  padding: 0;
}

.logo-mark {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 13px;
  font-weight: 700;
  color: var(--app-color-text-primary);
  background-color: var(--app-color-primary);
  border-radius: var(--app-radius-base);
}

.logo-text {
  font-size: var(--app-font-size-title);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.sidebar-menu {
  --el-menu-bg-color: var(--app-color-sidebar-bg);
  --el-menu-text-color: var(--app-color-sidebar-text);
  --el-menu-active-color: var(--app-color-primary);
  --el-menu-hover-bg-color: var(--app-color-sidebar-hover);
  --el-menu-item-height: 48px;

  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: none;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  background-color: var(--app-color-sidebar-active-bg);
}
</style>
