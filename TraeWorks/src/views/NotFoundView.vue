<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- 404 图标 -->
      <div class="mb-8">
        <div class="relative">
          <div class="text-9xl font-bold text-gray-200 dark:text-gray-700 select-none">
            404
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <SearchXIcon class="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </div>

      <!-- 错误信息 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          页面未找到
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          抱歉，您访问的页面不存在或已被移动。
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="space-y-4">
        <button
          @click="goHome"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <HomeIcon class="w-5 h-5" />
          <span>返回首页</span>
        </button>
        
        <button
          @click="goBack"
          class="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ArrowLeftIcon class="w-5 h-5" />
          <span>返回上页</span>
        </button>
      </div>

      <!-- 搜索建议 -->
      <div class="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          您可能在寻找
        </h3>
        <div class="space-y-2">
          <router-link
            v-for="suggestion in suggestions"
            :key="suggestion.path"
            :to="suggestion.path"
            class="block p-3 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
          >
            <div class="flex items-center space-x-3">
              <component :is="suggestion.icon" class="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              <div>
                <div class="font-medium group-hover:text-green-600 transition-colors">
                  {{ suggestion.title }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ suggestion.description }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 联系信息 -->
      <div class="mt-8 text-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          如果您认为这是一个错误，请
          <a href="mailto:support@example.com" class="text-green-600 hover:text-green-700 transition-colors">
            联系我们
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  SearchXIcon,
  HomeIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  TagIcon,
  FolderIcon,
  SearchIcon
} from 'lucide-vue-next';

const router = useRouter();

// 页面建议
const suggestions = [
  {
    path: '/',
    title: '首页',
    description: '浏览最新的技术文章',
    icon: HomeIcon
  },
  {
    path: '/categories',
    title: '文章分类',
    description: '按分类浏览文章',
    icon: FolderIcon
  },
  {
    path: '/tags',
    title: '标签云',
    description: '按标签查找文章',
    icon: TagIcon
  },
  {
    path: '/search',
    title: '搜索',
    description: '搜索您感兴趣的内容',
    icon: SearchIcon
  },
  {
    path: '/about',
    title: '关于我们',
    description: '了解我们的博客',
    icon: BookOpenIcon
  }
];

// 方法
const goHome = () => {
  router.push('/');
};

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
/* 动画效果 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* 渐变文字效果 */
.gradient-text {
  background: linear-gradient(135deg, #10b981, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 悬停效果 */
.hover-lift {
  transition: transform 0.2s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
</style>