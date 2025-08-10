<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- 头部 -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          {{ isLogin ? '登录账号' : '创建账号' }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ isLogin ? '欢迎回来！请登录您的账号' : '加入我们，开始您的技术之旅' }}
        </p>
      </div>

      <!-- 登录/注册表单 -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 邮箱/用户名 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ isLogin ? '邮箱或用户名' : '邮箱地址' }}
            </label>
            <input
              id="email"
              v-model="form.email"
              :type="isLogin ? 'text' : 'email'"
              :placeholder="isLogin ? '请输入邮箱或用户名' : '请输入邮箱地址'"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
            />
          </div>

          <!-- 用户名（仅注册时显示） -->
          <div v-if="!isLogin">
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              用户名
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="请输入用户名"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
            />
          </div>

          <!-- 密码 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              密码
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码"
                required
                class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Eye v-if="!showPassword" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- 确认密码（仅注册时显示） -->
          <div v-if="!isLogin">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              确认密码
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              required
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
            />
          </div>

          <!-- 记住我（仅登录时显示） -->
          <div v-if="isLogin" class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="rememberMe"
                v-model="form.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="rememberMe" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                记住我
              </label>
            </div>
            <button
              type="button"
              class="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              忘记密码？
            </button>
          </div>

          <!-- 用户协议（仅注册时显示） -->
          <div v-if="!isLogin" class="flex items-center">
            <input
              id="agreeTerms"
              v-model="form.agreeTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="agreeTerms" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              我同意
              <a href="#" class="text-blue-600 hover:text-blue-500 dark:text-blue-400">用户协议</a>
              和
              <a href="#" class="text-blue-600 hover:text-blue-500 dark:text-blue-400">隐私政策</a>
            </label>
          </div>

          <!-- 错误信息 -->
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
          </div>

          <!-- 提交按钮 -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            {{ loading ? '处理中...' : (isLogin ? '登录' : '注册') }}
          </button>
        </form>

        <!-- 分割线 -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">或者</span>
            </div>
          </div>
        </div>

        <!-- 第三方登录 -->
        <div class="mt-6 space-y-3">
          <button
            type="button"
            @click="handleGithubLogin"
            class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
          >
            <Github class="w-5 h-5 mr-2" />
            使用 GitHub 登录
          </button>
        </div>

        <!-- 切换登录/注册 -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ isLogin ? '还没有账号？' : '已有账号？' }}
            <button
              type="button"
              @click="toggleMode"
              class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {{ isLogin ? '立即注册' : '立即登录' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, Github, Loader2 } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import type { LoginParams, RegisterParams } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// 状态
const isLogin = ref(true)
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

// 表单数据
const form = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  rememberMe: false,
  agreeTerms: false
})

// 切换登录/注册模式
const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  // 重置表单
  Object.assign(form, {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false
  })
}

// 表单提交
const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    if (isLogin.value) {
      // 登录
      const loginParams: LoginParams = {
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe
      }
      
      await authStore.login(loginParams)
      
      // 登录成功，跳转到首页
      router.push('/')
    } else {
      // 注册
      if (form.password !== form.confirmPassword) {
        throw new Error('两次输入的密码不一致')
      }
      
      if (!form.agreeTerms) {
        throw new Error('请同意用户协议和隐私政策')
      }
      
      const registerParams: RegisterParams = {
        email: form.email,
        username: form.username,
        password: form.password,
        confirmPassword: form.confirmPassword
      }
      
      await authStore.register(registerParams)
      
      // 注册成功，切换到登录模式
      isLogin.value = true
      form.email = registerParams.email
      form.password = ''
      form.confirmPassword = ''
      form.username = ''
      form.agreeTerms = false
      
      // 显示成功消息
      alert('注册成功！请登录您的账号')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '操作失败'
  } finally {
    loading.value = false
  }
}

// GitHub登录
const handleGithubLogin = () => {
  // 这里可以实现GitHub OAuth登录
  alert('GitHub登录功能开发中...')
}
</script>