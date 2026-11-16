import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 开发代理与生产构建配置，说明见 docs/p3/前端重构方案.md §6
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // /api/employee/login -> http://localhost:8080/admin/employee/login
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/admin'),
      },
    },
  },
  build: {
    // 旧产物曾因 sourcemap 泄露源码，生产构建必须关闭
    sourcemap: false,
  },
})
