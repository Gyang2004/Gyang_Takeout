<script setup>
import { useAppStore } from '@/stores/app'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

const appStore = useAppStore()
</script>

<template>
  <el-container class="layout">
    <el-aside class="layout-aside" :width="appStore.sidebarCollapsed ? '64px' : '210px'">
      <Sidebar />
    </el-aside>

    <el-container class="layout-body">
      <el-header class="layout-header" height="56px">
        <Navbar />
      </el-header>

      <el-main class="layout-main">
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout {
  height: 100vh;
}

.layout-aside {
  overflow: hidden;
  background-color: var(--app-color-sidebar-bg);
  transition: width 0.2s ease;
}

.layout-body {
  min-width: 0;
}

.layout-header {
  padding: 0;
  background-color: var(--app-color-white);
  border-bottom: 1px solid var(--app-color-border);
}

.layout-main {
  padding: var(--app-space-4);
  overflow-y: auto;
  background-color: var(--app-color-page-bg);
}
</style>
