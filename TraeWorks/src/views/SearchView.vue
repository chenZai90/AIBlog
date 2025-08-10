<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 搜索头部 -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            搜索文章
          </h1>
          
          <!-- 搜索框 -->
          <div class="relative mb-6">
            <SearchIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章标题、内容或标签..."
              class="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              @keyup.enter="performSearch"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <XIcon class="w-6 h-6" />
            </button>
          </div>
          
          <!-- 搜索建议 -->
          <div v-if="searchSuggestions.length > 0 && !hasSearched" class="mb-6">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">热门搜索：</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="suggestion in searchSuggestions"
                :key="suggestion"
                @click="searchQuery = suggestion; performSearch()"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300 transition-colors"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>
          
          <!-- 搜索结果统计 -->
          <div v-if="hasSearched" class="text-center">
            <p class="text-gray-600 dark:text-gray-400">
              找到 <span class="font-semibold text-green-600 dark:text-green-400">{{ filteredResults.length }}</span> 篇相关文章
              <span v-if="searchQuery">关于 "<span class="font-semibold">{{ searchQuery }}</span>"</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- 侧边栏筛选 -->
          <aside class="lg:w-80">
            <!-- 筛选选项 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                筛选条件
              </h3>
              
              <!-- 分类筛选 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  分类
                </label>
                <select
                  v-model="selectedCategory"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">所有分类</option>
                  <option v-for="category in categories" :key="category.slug" :value="category.slug">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              
              <!-- 排序方式 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  排序方式
                </label>
                <select
                  v-model="sortBy"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="relevance">相关性</option>
                  <option value="date">发布时间</option>
                  <option value="views">浏览量</option>
                  <option value="title">标题</option>
                </select>
              </div>
              
              <!-- 时间范围 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  时间范围
                </label>
                <select
                  v-model="timeRange"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">所有时间</option>
                  <option value="week">最近一周</option>
                  <option value="month">最近一月</option>
                  <option value="year">最近一年</option>
                </select>
              </div>
              
              <!-- 清除筛选 -->
              <button
                @click="clearFilters"
                class="w-full px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                清除筛选
              </button>
            </div>
            
            <!-- 热门标签 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                热门标签
              </h3>
              
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in popularTags"
                  :key="tag"
                  @click="searchByTag(tag)"
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                >
                  #{{ tag }}
                </button>
              </div>
            </div>
          </aside>
          
          <!-- 主要内容 -->
          <main class="flex-1">
            <!-- 加载状态 -->
            <div v-if="isLoading" class="text-center py-12">
              <div class="inline-flex items-center space-x-3">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span class="text-gray-600 dark:text-gray-400">搜索中...</span>
              </div>
            </div>
            
            <!-- 空状态 -->
            <div v-else-if="!hasSearched" class="text-center py-16">
              <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon class="w-12 h-12 text-gray-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                开始搜索
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                输入关键词搜索相关文章
              </p>
              
              <!-- 推荐文章 -->
              <div class="max-w-2xl mx-auto">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  推荐阅读
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="post in recommendedPosts"
                    :key="post.id"
                    class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <h5 class="font-semibold text-gray-900 dark:text-white mb-2">
                      <router-link :to="`/posts/${post.slug}`" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        {{ post.title }}
                      </router-link>
                    </h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      {{ post.excerpt }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 无结果 -->
            <div v-else-if="filteredResults.length === 0" class="text-center py-16">
              <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileTextIcon class="w-12 h-12 text-gray-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                未找到相关文章
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                尝试使用不同的关键词或调整筛选条件
              </p>
              
              <div class="space-y-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">建议：</p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 检查拼写是否正确</li>
                  <li>• 尝试使用更通用的关键词</li>
                  <li>• 减少筛选条件</li>
                  <li>• 浏览所有分类</li>
                </ul>
              </div>
            </div>
            
            <!-- 搜索结果 -->
            <div v-else class="space-y-6">
              <div
                v-for="post in paginatedResults"
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
                    
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      <router-link 
                        :to="`/posts/${post.slug}`" 
                        class="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        v-html="highlightSearchTerm(post.title)"
                      >
                      </router-link>
                    </h2>
                    
                    <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2" v-html="highlightSearchTerm(post.excerpt)">
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
                        <div class="flex items-center space-x-1">
                          <HeartIcon class="w-4 h-4" />
                          <span>{{ post.likes }}</span>
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
            <div v-if="totalPages > 1" class="mt-12 flex justify-center">
              <nav class="flex items-center space-x-2">
                <button
                  :disabled="currentPage === 1"
                  @click="currentPage--"
                  class="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeftIcon class="w-5 h-5" />
                </button>
                
                <button
                  v-for="page in visiblePages"
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
                  @click="currentPage++"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  SearchIcon,
  XIcon,
  EyeIcon,
  ClockIcon,
  HeartIcon,
  FileTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

// 响应式数据
const searchQuery = ref('');
const selectedCategory = ref('');
const sortBy = ref('relevance');
const timeRange = ref('');
const currentPage = ref(1);
const isLoading = ref(false);
const hasSearched = ref(false);
const resultsPerPage = 6;

// 搜索建议
const searchSuggestions = ref([
  'React', 'Hooks', 'TypeScript', 'Redux', 'Vite', 'CSS Grid', '性能优化', '最佳实践'
]);

// 热门标签
const popularTags = ref([
  'react', 'hooks', 'typescript', 'redux', 'vite', 'tailwindcss', 'performance', 'testing'
]);

// 分类数据
const categories = ref([
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'CSS', slug: 'css' },
  { name: '工具', slug: 'tools' },
  { name: '数据库', slug: 'database' },
  { name: '移动开发', slug: 'mobile' }
]);

// 推荐文章
const recommendedPosts = ref([
  {
    id: 1,
    title: 'React 入门指南',
    slug: 'react-getting-started',
    excerpt: '从零开始学习React的基础知识'
  },
  {
    id: 2,
    title: 'TypeScript 最佳实践',
    slug: 'typescript-best-practices',
    excerpt: '提升TypeScript代码质量的技巧'
  },
  {
    id: 3,
    title: 'CSS Grid 布局教程',
    slug: 'css-grid-tutorial',
    excerpt: '掌握现代CSS布局技术'
  },
  {
    id: 4,
    title: 'Vite 构建优化',
    slug: 'vite-build-optimization',
    excerpt: '提升项目构建速度和性能'
  }
]);

// 所有文章数据
const allPosts = ref([
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
    likes: 89,
    tags: ['react', 'hooks', 'best-practices']
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
    likes: 67,
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
    likes: 45,
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
    likes: 34,
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
    likes: 56,
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
    likes: 78,
    tags: ['react', 'performance', 'optimization']
  }
]);

// 计算属性
const filteredResults = computed(() => {
  let results = allPosts.value;
  
  // 搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    results = results.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // 分类筛选
  if (selectedCategory.value) {
    results = results.filter(post => post.categorySlug === selectedCategory.value);
  }
  
  // 时间范围筛选（简化实现）
  if (timeRange.value) {
    // 这里可以根据实际需求实现时间筛选逻辑
  }
  
  // 排序
  results.sort((a, b) => {
    switch (sortBy.value) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'views':
        return b.views - a.views;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'relevance':
      default:
        // 简单的相关性排序：标题匹配优先
        if (searchQuery.value) {
          const query = searchQuery.value.toLowerCase();
          const aScore = a.title.toLowerCase().includes(query) ? 2 : 1;
          const bScore = b.title.toLowerCase().includes(query) ? 2 : 1;
          return bScore - aScore;
        }
        return 0;
    }
  });
  
  return results;
});

const totalPages = computed(() => {
  return Math.ceil(filteredResults.value.length / resultsPerPage);
});

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  return filteredResults.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...', total);
    } else if (current >= total - 3) {
      pages.push(1, '...');
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, '...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...', total);
    }
  }
  
  return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page));
});

// 方法
const performSearch = async () => {
  if (!searchQuery.value.trim()) return;
  
  isLoading.value = true;
  hasSearched.value = true;
  currentPage.value = 1;
  
  // 模拟搜索延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  isLoading.value = false;
  
  // 更新URL
  router.push({
    path: '/search',
    query: {
      q: searchQuery.value,
      category: selectedCategory.value || undefined,
      sort: sortBy.value !== 'relevance' ? sortBy.value : undefined,
      time: timeRange.value || undefined
    }
  });
};

const clearSearch = () => {
  searchQuery.value = '';
  hasSearched.value = false;
  currentPage.value = 1;
  router.push({ path: '/search' });
};

const clearFilters = () => {
  selectedCategory.value = '';
  sortBy.value = 'relevance';
  timeRange.value = '';
  currentPage.value = 1;
};

const searchByTag = (tag: string) => {
  searchQuery.value = tag;
  performSearch();
};

const highlightSearchTerm = (text: string) => {
  if (!searchQuery.value) return text;
  
  const query = searchQuery.value.trim();
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
};

// 监听器
watch([selectedCategory, sortBy, timeRange], () => {
  if (hasSearched.value) {
    currentPage.value = 1;
  }
});

watch(currentPage, () => {
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 生命周期
onMounted(() => {
  // 从URL参数初始化搜索状态
  const query = route.query.q as string;
  if (query) {
    searchQuery.value = query;
    selectedCategory.value = (route.query.category as string) || '';
    sortBy.value = (route.query.sort as string) || 'relevance';
    timeRange.value = (route.query.time as string) || '';
    hasSearched.value = true;
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

:deep(mark) {
  background-color: #fef08a;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}

:deep(.dark mark) {
  background-color: #a16207;
  color: #fef3c7;
}
</style>