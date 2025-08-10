<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900">
    <!-- 页面头部 -->
    <div class="bg-white dark:bg-slate-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">用户中心</h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">管理您的个人信息和账户设置</p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <!-- 侧边栏导航 -->
        <aside class="lg:col-span-3">
          <nav class="space-y-1">
            <button
              v-for="item in navigationItems"
              :key="item.id"
              @click="activeTab = item.id"
              :class="[
                activeTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300'
                  : 'border-transparent text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700',
                'group border-l-4 px-3 py-2 flex items-center text-sm font-medium w-full text-left transition-colors'
              ]"
            >
              <component :is="item.icon" class="mr-3 h-5 w-5" />
              {{ item.name }}
            </button>
          </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="lg:col-span-9 mt-8 lg:mt-0">
          <!-- 个人信息 -->
          <div v-if="activeTab === 'profile'" class="bg-white dark:bg-slate-800 shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">个人信息</h2>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">更新您的个人资料和联系信息</p>
            </div>
            
            <form @submit.prevent="updateProfile" class="p-6 space-y-6">
              <!-- 头像 -->
              <div class="flex items-center space-x-6">
                <div class="shrink-0">
                  <img
                    :src="profileForm.avatarUrl || user?.avatarUrl"
                    :alt="user?.name"
                    class="h-20 w-20 rounded-full object-cover"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    class="bg-white dark:bg-slate-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    更换头像
                  </button>
                  <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">JPG, GIF 或 PNG. 最大 1MB.</p>
                </div>
              </div>

              <!-- 基本信息 -->
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">姓名</label>
                  <input
                    id="name"
                    v-model="profileForm.name"
                    type="text"
                    class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">用户名</label>
                  <input
                    id="username"
                    v-model="profileForm.username"
                    type="text"
                    class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div class="sm:col-span-2">
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">邮箱</label>
                  <input
                    id="email"
                    v-model="profileForm.email"
                    type="email"
                    disabled
                    class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-slate-600 text-gray-500 dark:text-gray-400 sm:text-sm"
                  />
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">邮箱地址无法修改</p>
                </div>

                <div class="sm:col-span-2">
                  <label for="bio" class="block text-sm font-medium text-gray-700 dark:text-gray-300">个人简介</label>
                  <textarea
                    id="bio"
                    v-model="profileForm.bio"
                    rows="3"
                    class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                    placeholder="介绍一下自己..."
                  />
                </div>
              </div>

              <!-- 保存按钮 -->
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="profileLoading"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Loader2 v-if="profileLoading" class="w-4 h-4 mr-2 animate-spin" />
                  {{ profileLoading ? '保存中...' : '保存更改' }}
                </button>
              </div>
            </form>
          </div>

          <!-- 收藏文章 -->
          <div v-else-if="activeTab === 'favorites'" class="bg-white dark:bg-slate-800 shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">收藏文章</h2>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">您收藏的所有文章</p>
            </div>
            
            <div class="p-6">
              <div v-if="favorites.length === 0" class="text-center py-12">
                <Bookmark class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">暂无收藏</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">您还没有收藏任何文章</p>
                <div class="mt-6">
                  <router-link
                    to="/"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus class="-ml-1 mr-2 h-4 w-4" />
                    去发现文章
                  </router-link>
                </div>
              </div>
              
              <div v-else class="space-y-4">
                <div
                  v-for="article in favorites"
                  :key="article.id"
                  class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                        <router-link :to="`/post/${article.slug}`">{{ article.title }}</router-link>
                      </h3>
                      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ article.excerpt }}</p>
                      <div class="mt-2 flex items-center text-xs text-gray-400 dark:text-gray-500">
                        <Calendar class="mr-1 h-3 w-3" />
                        {{ formatDate(article.publishedAt) }}
                        <Clock class="ml-4 mr-1 h-3 w-3" />
                        {{ article.readingTime }} 分钟阅读
                      </div>
                    </div>
                    <button
                      @click="removeFavorite(article.id)"
                      class="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 互动记录 -->
          <div v-else-if="activeTab === 'activity'" class="bg-white dark:bg-slate-800 shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">互动记录</h2>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">您的评论和点赞记录</p>
            </div>
            
            <div class="p-6">
              <div class="text-center py-12">
                <MessageCircle class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">功能开发中</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">互动记录功能即将上线</p>
              </div>
            </div>
          </div>

          <!-- 账户设置 -->
          <div v-else-if="activeTab === 'settings'" class="bg-white dark:bg-slate-800 shadow rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">账户设置</h2>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">管理您的账户安全和偏好设置</p>
            </div>
            
            <div class="p-6 space-y-6">
              <!-- 修改密码 -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">修改密码</h3>
                <form @submit.prevent="changePassword" class="space-y-4">
                  <div>
                    <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">当前密码</label>
                    <input
                      id="currentPassword"
                      v-model="passwordForm.currentPassword"
                      type="password"
                      class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                    />
                  </div>
                  <div>
                    <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">新密码</label>
                    <input
                      id="newPassword"
                      v-model="passwordForm.newPassword"
                      type="password"
                      class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                    />
                  </div>
                  <div>
                    <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">确认新密码</label>
                    <input
                      id="confirmNewPassword"
                      v-model="passwordForm.confirmNewPassword"
                      type="password"
                      class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    更新密码
                  </button>
                </form>
              </div>

              <!-- 危险操作 -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 class="text-lg font-medium text-red-600 dark:text-red-400 mb-4">危险操作</h3>
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                  <div class="flex">
                    <AlertTriangle class="h-5 w-5 text-red-400" />
                    <div class="ml-3">
                      <h4 class="text-sm font-medium text-red-800 dark:text-red-300">删除账户</h4>
                      <p class="mt-1 text-sm text-red-700 dark:text-red-400">
                        删除账户后，您的所有数据将被永久删除且无法恢复。
                      </p>
                      <button
                        type="button"
                        class="mt-3 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        删除账户
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  User,
  Settings,
  Bookmark,
  MessageCircle,
  Calendar,
  Clock,
  Trash2,
  Plus,
  Loader2,
  AlertTriangle
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import type { AuthUser } from '@/types'

const router = useRouter()
const authStore = useAuthStore()

// 检查用户是否已登录
if (!authStore.isAuthenticated) {
  router.push('/login')
}

const user = computed(() => authStore.user)

// 导航项
const navigationItems = [
  { id: 'profile', name: '个人信息', icon: User },
  { id: 'favorites', name: '收藏文章', icon: Bookmark },
  { id: 'activity', name: '互动记录', icon: MessageCircle },
  { id: 'settings', name: '账户设置', icon: Settings }
]

// 当前活动标签
const activeTab = ref('profile')

// 个人信息表单
const profileForm = reactive({
  name: '',
  username: '',
  email: '',
  bio: '',
  avatarUrl: ''
})

// 密码修改表单
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

// 加载状态
const profileLoading = ref(false)

// 模拟收藏文章数据
const favorites = ref([
  {
    id: '1',
    title: 'React Hooks 深度解析',
    slug: 'react-hooks-deep-dive',
    excerpt: '深入了解 React Hooks 的设计理念和最佳实践，提升开发效率。',
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 8
  },
  {
    id: '2',
    title: 'TypeScript 高级类型系统详解',
    slug: 'typescript-advanced-types',
    excerpt: '掌握 TypeScript 的高级类型系统，编写更安全、更优雅的代码。',
    publishedAt: '2024-01-10T14:20:00Z',
    readingTime: 12
  }
])

// 初始化表单数据
const initializeForm = () => {
  if (user.value) {
    profileForm.name = user.value.name
    profileForm.username = user.value.username
    profileForm.email = user.value.email
    profileForm.bio = user.value.bio || ''
    profileForm.avatarUrl = user.value.avatarUrl || ''
  }
}

// 更新个人信息
const updateProfile = async () => {
  profileLoading.value = true
  try {
    await authStore.updateProfile({
      name: profileForm.name,
      username: profileForm.username,
      bio: profileForm.bio,
      avatarUrl: profileForm.avatarUrl
    })
    alert('个人信息更新成功！')
  } catch (error) {
    alert('更新失败，请重试')
  } finally {
    profileLoading.value = false
  }
}

// 修改密码
const changePassword = () => {
  if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
    alert('两次输入的新密码不一致')
    return
  }
  
  // 这里应该调用API修改密码
  alert('密码修改功能开发中...')
}

// 移除收藏
const removeFavorite = (articleId: string) => {
  const index = favorites.value.findIndex(item => item.id === articleId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 组件挂载时初始化
onMounted(() => {
  initializeForm()
})
</script>