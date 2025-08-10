<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- 头部导航 -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">V</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">码农来了</span>
          </router-link>
          
          <!-- 导航菜单 -->
          <nav class="hidden md:flex items-center space-x-8">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              active-class="text-green-600 dark:text-green-400"
            >
              {{ item.name }}
            </router-link>
          </nav>
          
          <!-- 右侧操作 -->
          <div class="flex items-center space-x-4">
            <!-- 搜索按钮 -->
            <button
              @click="appStore.toggleSearch()"
              class="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <SearchIcon class="w-5 h-5" />
            </button>
            
            <!-- 主题切换 -->
            <button
              @click="appStore.toggleTheme()"
              class="p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <SunIcon v-if="appStore.isDark" class="w-5 h-5" />
              <MoonIcon v-else class="w-5 h-5" />
            </button>
            
            <!-- 移动端菜单按钮 -->
            <button
              @click="appStore.toggleSidebar()"
              class="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <MenuIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <!-- 移动端侧边栏 -->
    <div
      v-if="appStore.sidebarOpen"
      class="fixed inset-0 z-50 md:hidden"
      @click="appStore.closeSidebar()"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div class="p-4">
          <div class="flex items-center justify-between mb-6">
            <span class="text-lg font-semibold text-gray-900 dark:text-white">菜单</span>
            <button
              @click="appStore.closeSidebar()"
              class="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors"
            >
              <XIcon class="w-5 h-5" />
            </button>
          </div>
          <nav class="space-y-4">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              @click="appStore.closeSidebar()"
              class="block py-2 px-4 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              active-class="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>
    
    <!-- 主要内容 -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 码农来了. 保留所有权利.</p>
        </div>
      </div>
    </footer>
    
    <!-- 加载指示器 -->
    <div
      v-if="appStore.loading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div class="flex items-center space-x-3">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
          <span class="text-gray-900 dark:text-white">加载中...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import {
  SearchIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon
} from 'lucide-vue-next';

const appStore = useAppStore();

// 导航菜单
const navItems = [
  { name: '首页', path: '/' },
  { name: '分类', path: '/categories' },
  { name: '标签', path: '/tags' },
  { name: '关于', path: '/about' }
];

// 初始化
onMounted(() => {
  appStore.init();
});
</script>

<style scoped>
/* 动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 过渡动画 */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>