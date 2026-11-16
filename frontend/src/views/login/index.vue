<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const formRef = ref()
const loading = ref(false)
const form = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为 6-20 位', trigger: 'blur' },
  ],
}

/**
 * 只接受站内绝对路径，避免 redirect 参数被用作外链跳转。
 * @param {unknown} value 路由 query 中的 redirect
 * @returns {string} 安全的回跳路径
 */
function resolveRedirect(value) {
  if (typeof value !== 'string') return '/'
  if (!value.startsWith('/') || value.startsWith('//')) return '/'
  return value
}

/**
 * 校验表单并登录，成功后跳回来源页或工作台。
 * @returns {Promise<void>}
 */
async function handleSubmit() {
  if (loading.value) return

  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    await userStore.login({
      username: form.username.trim(),
      password: form.password,
    })
    ElMessage.success('登录成功')
    router.replace(resolveRedirect(route.query.redirect))
  } catch {
    // 失败提示由 Axios 拦截器统一处理
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <aside class="login-brand">
      <div class="brand-glow" aria-hidden="true"></div>
      <div class="brand-content">
        <div class="brand-logo">GT</div>
        <h1 class="brand-name">Gyang Takeout</h1>
        <p class="brand-subtitle">管理端</p>
        <ul class="brand-points">
          <li>订单、菜品、套餐统一管理</li>
          <li>经营数据集中查看</li>
          <li>员工账号与权限入口</li>
        </ul>
      </div>
      <p class="brand-foot">Vue 3 · Vite · Element Plus</p>
    </aside>

    <main class="login-panel">
      <div class="login-card">
        <header class="login-header">
          <h2>登录</h2>
          <p>请使用员工账号进入管理后台</p>
        </header>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          size="large"
          @submit.prevent="handleSubmit"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入账号"
              :prefix-icon="User"
              autocomplete="username"
              clearable
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              autocomplete="current-password"
              show-password
            />
          </el-form-item>

          <el-button
            class="login-submit"
            type="primary"
            size="large"
            native-type="submit"
            :loading="loading"
          >
            {{ loading ? '登录中…' : '登录' }}
          </el-button>
        </el-form>

        <p class="login-hint">账号由管理员在后台创建，忘记密码请联系管理员重置。</p>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  display: grid;
  grid-template-columns: minmax(400px, 44%) 1fr;
  min-height: 100vh;
  background-color: var(--app-color-page-bg);
}

.login-brand {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: calc(var(--app-space-6) * 2);
  overflow: hidden;
  color: var(--app-color-white);
  background-color: var(--app-color-sidebar-bg);
}

.brand-glow {
  position: absolute;
  top: -120px;
  right: -140px;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, var(--app-color-primary-soft) 0%, transparent 68%);
  pointer-events: none;
}

.brand-content {
  position: relative;
  z-index: 1;
  max-width: 380px;
  margin-top: 12vh;
}

.brand-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: var(--app-space-6);
  font-size: var(--app-font-size-heading);
  font-weight: 700;
  color: var(--app-color-text-primary);
  background-color: var(--app-color-primary);
  border-radius: var(--app-radius-card);
}

.brand-name {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.brand-subtitle {
  margin-top: var(--app-space-2);
  font-size: var(--app-font-size-heading);
  color: var(--app-color-sidebar-text);
}

.brand-points {
  padding: 0;
  margin: var(--app-space-6) 0 0;
  list-style: none;
}

.brand-points li {
  position: relative;
  padding-left: var(--app-space-6);
  margin-bottom: var(--app-space-3);
  color: var(--app-color-sidebar-text);
}

.brand-points li::before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 6px;
  height: 6px;
  content: '';
  background-color: var(--app-color-primary);
  border-radius: 50%;
  transform: translateY(-50%);
}

.brand-foot {
  position: relative;
  z-index: 1;
  font-size: 12px;
  color: var(--app-color-sidebar-text);
  opacity: 0.7;
}

.login-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--app-space-6);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: calc(var(--app-space-6) * 2);
  background-color: var(--app-color-white);
  border-radius: var(--app-radius-card);
  box-shadow: var(--app-shadow-card);
}

.login-header {
  margin-bottom: var(--app-space-6);
}

.login-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--app-color-text-primary);
}

.login-header p {
  margin-top: var(--app-space-2);
  color: var(--app-color-text-secondary);
}

.login-submit {
  width: 100%;
  margin-top: var(--app-space-2);
  font-weight: 600;
}

.login-hint {
  margin-top: var(--app-space-4);
  font-size: 12px;
  line-height: 1.6;
  color: var(--app-color-text-secondary);
}

@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .login-brand {
    display: none;
  }
}
</style>
