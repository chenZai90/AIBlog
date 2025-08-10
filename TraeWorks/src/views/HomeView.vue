<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 个人介绍区域 -->
    <section class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div class="container mx-auto px-4 py-20">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- 个人信息 -->
            <div class="text-center lg:text-left">
              <div class="flex justify-center lg:justify-start mb-6">
                <img
                  :src="personalInfo.avatar"
                  :alt="personalInfo.name"
                  class="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl"
                />
              </div>
              <h1 class="text-4xl lg:text-5xl font-bold mb-4">
                {{ personalInfo.name }}
              </h1>
              <p class="text-xl text-blue-100 mb-2">
                {{ personalInfo.title }}
              </p>
              <p class="text-lg text-blue-200 leading-relaxed mb-8">
                {{ personalInfo.bio }}
              </p>
              
              <!-- 社交链接 -->
              <div class="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <a
                   v-for="social in personalInfo.socialLinks"
                   :key="social.name"
                   :href="social.url"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                 >
                   <component :is="social.icon" class="w-5 h-5 mr-2" />
                   {{ social.name }}
                 </a>
              </div>
              
              <!-- 操作按钮 -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <router-link
                  to="/categories"
                  class="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <BookOpenIcon class="w-5 h-5 mr-2" />
                  浏览文章
                </router-link>
                <router-link
                  v-if="!authStore.isAuthenticated"
                  to="/login"
                  class="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <UserIcon class="w-5 h-5 mr-2" />
                  登录
                </router-link>
                <router-link
                  v-else
                  to="/profile"
                  class="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <UserIcon class="w-5 h-5 mr-2" />
                  用户中心
                </router-link>
              </div>
            </div>
            
            <!-- 技能标签云 -->
            <div class="text-center lg:text-left">
              <h3 class="text-2xl font-bold mb-6">技术专长</h3>
              <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span
                  v-for="skill in personalInfo.skills"
                  :key="skill"
                  class="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  {{ skill }}
                </span>
              </div>
              
              <!-- 座右铭 -->
              <div class="mt-8 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <Quote class="w-8 h-8 text-white/60 mb-3" />
                <p class="text-lg italic text-white/90">
                  {{ personalInfo.motto }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 装饰性波浪 -->
      <div class="relative">
        <svg class="w-full h-12 text-gray-50 dark:text-gray-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <!-- 主要内容 -->
    <div class="container mx-auto px-4 py-16">
      <!-- 最新文章 -->
      <section class="mb-16">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            最新文章
          </h2>
          <router-link
            to="/categories"
            class="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors"
          >
            查看全部 →
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="article in articlesStore.latestArticles.slice(0, 6)"
            :key="article.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            @click="$router.push(`/post/${article.slug}`)"
          >
            <div class="h-48 overflow-hidden">
              <img
                :src="article.coverImage"
                :alt="article.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center space-x-2 mb-3">
                <span 
                  class="px-3 py-1 text-sm font-medium rounded-full"
                  :style="{ 
                    backgroundColor: article.category.color + '20', 
                    color: article.category.color 
                  }"
                >
                  {{ article.category.name }}
                </span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {{ article.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ article.excerpt }}
              </p>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{{ formatDate(article.publishedAt) }}</span>
                <span>{{ article.readingTime }}分钟阅读</span>
              </div>
              <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span class="flex items-center">
                    <Eye class="w-4 h-4 mr-1" />
                    {{ article.views }}
                  </span>
                  <span class="flex items-center">
                    <Heart class="w-4 h-4 mr-1" />
                    {{ article.likes }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 热门分类 -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          热门分类
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="category in categories"
            :key="category.name"
            class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div class="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center" :style="{ backgroundColor: category.color + '20' }">
              <component :is="category.icon" class="w-6 h-6" :style="{ color: category.color }" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ category.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ category.count }} 篇文章</p>
          </div>
        </div>
      </section>

      <!-- 网站统计 -->
      <section class="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          网站统计
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {{ articlesStore.statistics.totalArticles }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">文章总数</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {{ formatNumber(articlesStore.statistics.totalViews) }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">总浏览量</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {{ articlesStore.statistics.totalCategories }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">分类数量</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {{ articlesStore.statistics.totalTags }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">标签数量</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import {
  BookOpenIcon,
  InfoIcon,
  CodeIcon,
  PaletteIcon,
  DatabaseIcon,
  SettingsIcon,
  UserIcon,
  Quote,
  Github,
  Mail,
  ExternalLink,
  Eye,
  Heart
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useArticlesStore } from '@/stores/articles'
import personalInfoData from '@/data/personal-info.json'

// 认证store
const authStore = useAuthStore()

// 文章store
const articlesStore = useArticlesStore()

// 个人信息
const personalInfo = computed(() => ({
  ...personalInfoData,
  socialLinks: personalInfoData.socialLinks.map(link => ({
    ...link,
    icon: link.name === 'GitHub' ? Github : 
          link.name === '掘金' ? ExternalLink :
          link.name === '邮箱' ? Mail : ExternalLink
  }))
}))

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 格式化数字（如浏览量）
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// 组件挂载时初始化数据
onMounted(() => {
  articlesStore.initData()
})

// 热门分类数据
const categories = [
  {
    name: 'React',
    count: 45,
    color: '#10b981',
    icon: CodeIcon
  },
  {
    name: 'TypeScript',
    count: 32,
    color: '#3b82f6',
    icon: CodeIcon
  },
  {
    name: 'CSS',
    count: 28,
    color: '#8b5cf6',
    icon: PaletteIcon
  },
  {
    name: '工具',
    count: 21,
    color: '#f59e0b',
    icon: SettingsIcon
  }
];
</script>

<style scoped>
/* 渐变动画 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* 悬停效果 */
.hover-lift {
  transition: transform 0.2s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
</style>