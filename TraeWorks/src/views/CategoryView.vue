<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 页面头部 -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {{ categoryName || '文章分类' }}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400">
              {{ categoryDescription || '浏览所有技术文章分类' }}
            </p>
          </div>
          
          <!-- 搜索和筛选 -->
          <div class="hidden md:flex items-center space-x-4">
            <div class="relative">
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索文章..."
                class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              v-model="sortBy"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="date">按日期排序</option>
              <option value="title">按标题排序</option>
              <option value="views">按浏览量排序</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 侧边栏 -->
        <aside class="lg:w-80">
          <!-- 分类列表 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              所有分类
            </h3>
            
            <div class="space-y-2">
              <router-link
                v-for="category in categories"
                :key="category.id"
                :to="`/categories/${category.slug}`"
                class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                :class="{
                  'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300': currentCategory === category.slug,
                  'text-gray-700 dark:text-gray-300': currentCategory !== category.slug
                }"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ backgroundColor: category.color + '20' }">
                    <component :is="category.icon" class="w-4 h-4" :style="{ color: category.color }" />
                  </div>
                  <span class="font-medium">{{ category.name }}</span>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ category.count }}</span>
              </router-link>
            </div>
          </div>
          
          <!-- 热门标签 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              热门标签
            </h3>
            
            <div class="flex flex-wrap gap-2">
              <router-link
                v-for="tag in popularTags"
                :key="tag.id"
                :to="`/tags/${tag.slug}`"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300 transition-colors"
              >
                {{ tag.name }}
              </router-link>
            </div>
          </div>
        </aside>
        
        <!-- 主要内容 -->
        <main class="flex-1">
          <!-- 移动端搜索 -->
          <div class="md:hidden mb-6">
            <div class="relative mb-4">
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索文章..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              v-model="sortBy"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="date">按日期排序</option>
              <option value="title">按标题排序</option>
              <option value="views">按浏览量排序</option>
            </select>
          </div>
          
          <!-- 文章列表 -->
          <div class="space-y-6">
            <div
              v-for="post in filteredPosts"
              :key="post.id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div class="md:flex">
                <!-- 文章图片 -->
                <div class="md:w-64 h-48 md:h-auto bg-gradient-to-br from-green-400 to-blue-500"></div>
                
                <!-- 文章内容 -->
                <div class="flex-1 p-6">
                  <div class="flex items-center space-x-2 mb-3">
                    <span class="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-sm font-medium rounded-full">
                      {{ post.category }}
                    </span>
                    <span class="text-gray-400">•</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
                  </div>
                  
                  <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    <router-link :to="`/posts/${post.slug}`">
                      {{ post.title }}
                    </router-link>
                  </h2>
                  
                  <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {{ post.excerpt }}
                  </p>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div class="flex items-center space-x-1">
                        <EyeIcon class="w-4 h-4" />
                        <span>{{ post.views }}</span>
                      </div>
                      <div class="flex items-center space-x-1">
                        <ClockIcon class="w-4 h-4" />
                        <span>{{ post.readTime }}分钟阅读</span>
                      </div>
                    </div>
                    
                    <router-link
                      :to="`/posts/${post.slug}`"
                      class="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors"
                    >
                      阅读更多 →
                    </router-link>
                  </div>
                  
                  <!-- 标签 -->
                  <div class="flex flex-wrap gap-2 mt-4">
                    <router-link
                      v-for="tag in post.tags"
                      :key="tag"
                      :to="`/tags/${tag}`"
                      class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      #{{ tag }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 分页 -->
          <div class="mt-12 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                :disabled="currentPage === 1"
                class="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeftIcon class="w-5 h-5" />
              </button>
              
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                class="px-4 py-2 rounded-lg transition-colors"
                :class="{
                  'bg-green-600 text-white': currentPage === page,
                  'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': currentPage !== page
                }"
              >
                {{ page }}
              </button>
              
              <button
                :disabled="currentPage === totalPages"
                class="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRightIcon class="w-5 h-5" />
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  SearchIcon,
  EyeIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeIcon,
  PaletteIcon,
  DatabaseIcon,
  SettingsIcon,
  LayersIcon,
  SmartphoneIcon
} from 'lucide-vue-next';

const route = useRoute();

// 响应式数据
const searchQuery = ref('');
const sortBy = ref('date');
const currentPage = ref(1);
const postsPerPage = 6;

// 当前分类
const currentCategory = computed(() => route.params.category as string);

// 分类数据
const categories = [
  { id: 1, name: 'React', slug: 'react', count: 45, color: '#61DAFB', icon: LayersIcon },
  { id: 2, name: 'TypeScript', slug: 'typescript', count: 32, color: '#3b82f6', icon: CodeIcon },
  { id: 3, name: 'CSS', slug: 'css', count: 28, color: '#8b5cf6', icon: PaletteIcon },
  { id: 4, name: '工具', slug: 'tools', count: 21, color: '#f59e0b', icon: SettingsIcon },
  { id: 5, name: '数据库', slug: 'database', count: 15, color: '#ef4444', icon: DatabaseIcon },
  { id: 6, name: '移动开发', slug: 'mobile', count: 12, color: '#06b6d4', icon: SmartphoneIcon }
];

// 热门标签
const popularTags = [
  { id: 1, name: 'composition-api', slug: 'composition-api' },
  { id: 2, name: 'pinia', slug: 'pinia' },
  { id: 3, name: 'vite', slug: 'vite' },
  { id: 4, name: 'tailwindcss', slug: 'tailwindcss' },
  { id: 5, name: 'performance', slug: 'performance' },
  { id: 6, name: 'testing', slug: 'testing' }
];

// 模拟文章数据
const allPosts = [
  {
    id: 1,
    title: 'React Hooks 最佳实践',
    slug: 'react-hooks-best-practices',
    excerpt: '深入了解React Hooks的使用技巧和最佳实践，提升开发效率。',
    category: 'React',
    categorySlug: 'react',
    date: '2024年1月15日',
    views: 1234,
    readTime: 8,
    tags: ['hooks', 'react', 'best-practices']
  },
  {
    id: 2,
    title: 'TypeScript 在 React 项目中的应用',
    slug: 'typescript-in-react-projects',
    excerpt: '学习如何在React项目中有效使用TypeScript，提高代码质量和开发体验。',
    category: 'TypeScript',
    categorySlug: 'typescript',
    date: '2024年1月12日',
    views: 987,
    readTime: 6,
    tags: ['typescript', 'react', 'type-safety']
  },
  {
    id: 3,
    title: 'CSS Grid 布局完全指南',
    slug: 'css-grid-complete-guide',
    excerpt: '从基础到高级，全面掌握CSS Grid布局系统，创建复杂的网页布局。',
    category: 'CSS',
    categorySlug: 'css',
    date: '2024年1月10日',
    views: 756,
    readTime: 12,
    tags: ['css', 'grid', 'layout']
  },
  {
    id: 4,
    title: 'Vite 构建工具深度解析',
    slug: 'vite-build-tool-deep-dive',
    excerpt: '探索Vite的工作原理，学习如何优化构建配置，提升开发和构建速度。',
    category: '工具',
    categorySlug: 'tools',
    date: '2024年1月8日',
    views: 543,
    readTime: 10,
    tags: ['vite', 'build-tools', 'performance']
  },
  {
    id: 5,
    title: 'Pinia 状态管理实战',
    slug: 'pinia-state-management-practice',
    excerpt: '学习使用Redux进行React应用的状态管理，现代化的状态管理解决方案。',
    category: 'React',
    categorySlug: 'react',
    date: '2024年1月5日',
    views: 432,
    readTime: 7,
    tags: ['redux', 'state-management', 'react']
  },
  {
    id: 6,
    title: 'React 性能优化技巧',
    slug: 'react-performance-optimization',
    excerpt: '掌握React应用的性能优化技巧，包括组件优化、懒加载和代码分割。',
    category: 'React',
    categorySlug: 'react',
    date: '2024年1月3日',
    views: 321,
    readTime: 9,
    tags: ['react', 'performance', 'optimization']
  }
];

// 计算属性
const categoryName = computed(() => {
  if (!currentCategory.value) return '';
  const category = categories.find(c => c.slug === currentCategory.value);
  return category?.name || '';
});

const categoryDescription = computed(() => {
  if (!currentCategory.value) return '浏览所有技术文章分类';
  return `浏览 ${categoryName.value} 相关的技术文章`;
});

const filteredPosts = computed(() => {
  let posts = allPosts;
  
  // 按分类筛选
  if (currentCategory.value) {
    posts = posts.filter(post => post.categorySlug === currentCategory.value);
  }
  
  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // 排序
  posts.sort((a, b) => {
    switch (sortBy.value) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'views':
        return b.views - a.views;
      case 'date':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
  
  // 分页
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return posts.slice(start, end);
});

const totalPages = computed(() => {
  let posts = allPosts;
  
  if (currentCategory.value) {
    posts = posts.filter(post => post.categorySlug === currentCategory.value);
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  return Math.ceil(posts.length / postsPerPage);
});

// 生命周期
onMounted(() => {
  // 重置分页
  currentPage.value = 1;
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>