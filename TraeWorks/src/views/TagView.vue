<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 页面头部 -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {{ tagName ? `#${tagName}` : '标签云' }}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400">
              {{ tagDescription }}
            </p>
          </div>
          
          <!-- 搜索 -->
          <div class="hidden md:block">
            <div class="relative">
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索标签..."
                class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- 如果没有选择特定标签，显示标签云 -->
      <div v-if="!currentTag">
        <!-- 移动端搜索 -->
        <div class="md:hidden mb-6">
          <div class="relative">
            <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索标签..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <!-- 标签统计 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{{ allTags.length }}</div>
            <div class="text-gray-600 dark:text-gray-400">标签总数</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{{ totalPosts }}</div>
            <div class="text-gray-600 dark:text-gray-400">文章总数</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{{ mostPopularTag?.count || 0 }}</div>
            <div class="text-gray-600 dark:text-gray-400">最热标签文章数</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{{ averagePostsPerTag }}</div>
            <div class="text-gray-600 dark:text-gray-400">平均每标签文章数</div>
          </div>
        </div>
        
        <!-- 标签云 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            标签云
          </h2>
          
          <div class="flex flex-wrap justify-center gap-3">
            <router-link
              v-for="tag in filteredTags"
              :key="tag.id"
              :to="`/tags/${tag.slug}`"
              class="inline-block px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              :class="getTagClasses(tag.count)"
              :style="{ fontSize: getTagSize(tag.count) }"
            >
              #{{ tag.name }}
              <span class="ml-1 text-xs opacity-75">({{ tag.count }})</span>
            </router-link>
          </div>
        </div>
        
        <!-- 热门标签列表 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            热门标签
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <router-link
              v-for="tag in topTags"
              :key="tag.id"
              :to="`/tags/${tag.slug}`"
              class="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <TagIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">#{{ tag.name }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">{{ tag.description }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ tag.count }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">篇文章</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- 如果选择了特定标签，显示该标签的文章 -->
      <div v-else>
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- 侧边栏 -->
          <aside class="lg:w-80">
            <!-- 标签信息 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TagIcon class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  #{{ tagName }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  {{ currentTagInfo?.description || '相关技术文章' }}
                </p>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                  {{ currentTagInfo?.count || 0 }} 篇文章
                </div>
              </div>
            </div>
            
            <!-- 相关标签 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                相关标签
              </h3>
              
              <div class="flex flex-wrap gap-2">
                <router-link
                  v-for="tag in relatedTags"
                  :key="tag.id"
                  :to="`/tags/${tag.slug}`"
                  class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                >
                  #{{ tag.name }}
                </router-link>
              </div>
            </div>
          </aside>
          
          <!-- 文章列表 -->
          <main class="flex-1">
            <div class="space-y-6">
              <div
                v-for="post in tagPosts"
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
                        class="px-2 py-1 rounded text-xs transition-colors"
                        :class="{
                          'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300': tag === currentTag,
                          'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400': tag !== currentTag
                        }"
                      >
                        #{{ tag }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  SearchIcon,
  TagIcon,
  EyeIcon,
  ClockIcon
} from 'lucide-vue-next';

const route = useRoute();

// 响应式数据
const searchQuery = ref('');

// 当前标签
const currentTag = computed(() => route.params.tag as string);

// 所有标签数据
const allTags = [
  { id: 1, name: 'react', slug: 'react', count: 25, description: 'React 相关技术' },
  { id: 2, name: 'hooks', slug: 'hooks', count: 20, description: 'React Hooks' },
  { id: 3, name: 'typescript', slug: 'typescript', count: 18, description: 'TypeScript 类型系统' },
  { id: 4, name: 'redux', slug: 'redux', count: 15, description: 'React 状态管理库' },
  { id: 5, name: 'vite', slug: 'vite', count: 12, description: '现代化构建工具' },
  { id: 6, name: 'tailwindcss', slug: 'tailwindcss', count: 10, description: '实用优先的CSS框架' },
  { id: 7, name: 'performance', slug: 'performance', count: 8, description: '性能优化技巧' },
  { id: 8, name: 'testing', slug: 'testing', count: 7, description: '测试最佳实践' },
  { id: 9, name: 'css-grid', slug: 'css-grid', count: 6, description: 'CSS Grid 布局' },
  { id: 10, name: 'responsive', slug: 'responsive', count: 5, description: '响应式设计' },
  { id: 11, name: 'animation', slug: 'animation', count: 4, description: 'CSS 动画效果' },
  { id: 12, name: 'accessibility', slug: 'accessibility', count: 3, description: '无障碍设计' }
];

// 模拟文章数据
const allPosts = [
  {
    id: 1,
    title: 'React Hooks 最佳实践',
    slug: 'react-hooks-best-practices',
    excerpt: '深入了解React Hooks的使用技巧和最佳实践，提升开发效率。',
    category: 'React',
    date: '2024年1月15日',
    views: 1234,
    readTime: 8,
    tags: ['react', 'hooks', 'best-practices']
  },
  {
    id: 2,
    title: 'TypeScript 在 React 项目中的应用',
    slug: 'typescript-in-react-projects',
    excerpt: '学习如何在React项目中有效使用TypeScript，提高代码质量和开发体验。',
    category: 'TypeScript',
    date: '2024年1月12日',
    views: 987,
    readTime: 6,
    tags: ['typescript', 'react', 'type-safety']
  },
  {
    id: 3,
    title: 'Pinia 状态管理实战',
    slug: 'pinia-state-management-practice',
    excerpt: '学习使用Redux进行React应用的状态管理，现代化的状态管理解决方案。',
    category: 'React',
    date: '2024年1月5日',
    views: 432,
    readTime: 7,
    tags: ['redux', 'state-management', 'react']
  },
  {
    id: 4,
    title: 'Vite 构建工具深度解析',
    slug: 'vite-build-tool-deep-dive',
    excerpt: '探索Vite的工作原理，学习如何优化构建配置，提升开发和构建速度。',
    category: '工具',
    date: '2024年1月8日',
    views: 543,
    readTime: 10,
    tags: ['vite', 'build-tools', 'performance']
  }
];

// 计算属性
const tagName = computed(() => {
  if (!currentTag.value) return '';
  const tag = allTags.find(t => t.slug === currentTag.value);
  return tag?.name || currentTag.value;
});

const tagDescription = computed(() => {
  if (!currentTag.value) return '浏览所有技术标签和相关文章';
  const tag = allTags.find(t => t.slug === currentTag.value);
  return `浏览 #${tagName.value} 相关的技术文章`;
});

const currentTagInfo = computed(() => {
  return allTags.find(t => t.slug === currentTag.value);
});

const filteredTags = computed(() => {
  if (!searchQuery.value) return allTags;
  const query = searchQuery.value.toLowerCase();
  return allTags.filter(tag => 
    tag.name.toLowerCase().includes(query) ||
    tag.description.toLowerCase().includes(query)
  );
});

const topTags = computed(() => {
  return [...allTags]
    .sort((a, b) => b.count - a.count)
    .slice(0, 9);
});

const relatedTags = computed(() => {
  if (!currentTag.value) return [];
  return allTags
    .filter(tag => tag.slug !== currentTag.value)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
});

const tagPosts = computed(() => {
  if (!currentTag.value) return [];
  return allPosts.filter(post => 
    post.tags.includes(currentTag.value)
  );
});

const totalPosts = computed(() => {
  return allTags.reduce((sum, tag) => sum + tag.count, 0);
});

const mostPopularTag = computed(() => {
  return allTags.reduce((max, tag) => 
    tag.count > (max?.count || 0) ? tag : max, null
  );
});

const averagePostsPerTag = computed(() => {
  return Math.round(totalPosts.value / allTags.length);
});

// 方法
const getTagSize = (count: number) => {
  const maxCount = Math.max(...allTags.map(t => t.count));
  const minSize = 0.8;
  const maxSize = 2;
  const ratio = count / maxCount;
  const size = minSize + (maxSize - minSize) * ratio;
  return `${size}rem`;
};

const getTagClasses = (count: number) => {
  const maxCount = Math.max(...allTags.map(t => t.count));
  const ratio = count / maxCount;
  
  if (ratio > 0.8) {
    return 'bg-green-500 text-white hover:bg-green-600';
  } else if (ratio > 0.6) {
    return 'bg-blue-500 text-white hover:bg-blue-600';
  } else if (ratio > 0.4) {
    return 'bg-purple-500 text-white hover:bg-purple-600';
  } else if (ratio > 0.2) {
    return 'bg-orange-500 text-white hover:bg-orange-600';
  } else {
    return 'bg-gray-500 text-white hover:bg-gray-600';
  }
};

// 生命周期
onMounted(() => {
  // 组件挂载时的初始化逻辑
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