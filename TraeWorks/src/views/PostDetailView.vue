<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 文章头部 -->
    <article class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto">
          <!-- 面包屑导航 -->
          <nav class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <router-link to="/" class="hover:text-green-600 dark:hover:text-green-400 transition-colors">
              首页
            </router-link>
            <ChevronRightIcon class="w-4 h-4" />
            <router-link 
              :to="`/categories/${post.categorySlug}`" 
              class="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {{ post.category }}
            </router-link>
            <ChevronRightIcon class="w-4 h-4" />
            <span class="text-gray-900 dark:text-white">{{ post.title }}</span>
          </nav>
          
          <!-- 文章标题 -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {{ post.title }}
          </h1>
          
          <!-- 文章摘要 -->
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {{ post.excerpt }}
          </p>
          
          <!-- 文章元信息 -->
          <div class="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
            <div class="flex items-center space-x-2">
              <CalendarIcon class="w-5 h-5" />
              <span>{{ post.date }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <ClockIcon class="w-5 h-5" />
              <span>{{ post.readTime }}分钟阅读</span>
            </div>
            <div class="flex items-center space-x-2">
              <EyeIcon class="w-5 h-5" />
              <span>{{ post.views }} 次浏览</span>
            </div>
            <div class="flex items-center space-x-2">
              <UserIcon class="w-5 h-5" />
              <span>{{ post.author }}</span>
            </div>
          </div>
          
          <!-- 标签 -->
          <div class="flex flex-wrap gap-2 mt-6">
            <router-link
              v-for="tag in post.tags"
              :key="tag"
              :to="`/tags/${tag}`"
              class="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-full text-sm hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
            >
              #{{ tag }}
            </router-link>
          </div>
        </div>
      </div>
    </article>

    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- 主要内容 -->
          <main class="flex-1">
            <!-- 文章内容 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- 特色图片 -->
              <div class="h-64 lg:h-80 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"></div>
              
              <!-- 文章正文 -->
              <div class="p-8 lg:p-12">
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <h2>引言</h2>
                  <p>
                    React Hooks 是一个强大的特性，它为我们提供了更灵活的组件逻辑组织方式。
                    在这篇文章中，我们将深入探讨 Composition API 的最佳实践，帮助你写出更清晰、更可维护的代码。
                  </p>
                  
                  <h2>什么是 Composition API？</h2>
                  <p>
                    React Hooks 是 React 16.8 中引入的一套新的 API，它允许我们使用函数的方式来组织组件的逻辑。
                    与传统的 Options API 相比，Composition API 提供了更好的逻辑复用和类型推导支持。
                  </p>
                  
                  <h3>主要优势</h3>
                  <ul>
                    <li><strong>更好的逻辑复用</strong>：通过组合函数，我们可以轻松地在不同组件间共享逻辑</li>
                    <li><strong>更好的类型推导</strong>：TypeScript 支持更加完善</li>
                    <li><strong>更灵活的代码组织</strong>：相关逻辑可以组织在一起，而不是分散在不同的选项中</li>
                    <li><strong>更小的打包体积</strong>：未使用的功能可以被 tree-shaking</li>
                  </ul>
                  
                  <h2>基本用法</h2>
                  <p>让我们从一个简单的例子开始：</p>
                  
                  <pre><code class="language-jsx">&lt;div&gt;
  &lt;div&gt;
    &lt;p&gt;计数: &#123;&#123; count &#125;&#125;&lt;/p&gt;
    &lt;button @click="increment"&gt;增加&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import &#123; useState &#125; from 'react'

const count = ref(0)
const increment = () =&gt; &#123;
  count.value++
&#125;
&lt;/script&gt;</code></pre>
                  
                  <h2>最佳实践</h2>
                  
                  <h3>1. 使用 &lt;script setup&gt;</h3>
                  <p>
                    &lt;script setup&gt; 是 Composition API 的语法糖，它让我们的代码更加简洁。
                    所有在 &lt;script setup&gt; 中声明的变量和函数都会自动暴露给模板。
                  </p>
                  
                  <h3>2. 合理使用 ref 和 reactive</h3>
                  <p>
                    对于基本类型的响应式数据，使用 ref；对于对象类型的响应式数据，可以使用 reactive。
                    但是要注意，reactive 对象不能被解构，否则会失去响应性。
                  </p>
                  
                  <h3>3. 提取可复用的逻辑</h3>
                  <p>
                    将可复用的逻辑提取到组合函数（composables）中，这样可以在多个组件间共享逻辑。
                  </p>
                  
                  <h2>总结</h2>
                  <p>
                    React Hooks 为 React 带来了更强大的功能和更好的开发体验。
                    通过遵循最佳实践，我们可以写出更清晰、更可维护的代码。
                    希望这篇文章能帮助你更好地理解和使用 Composition API。
                  </p>
                </div>
              </div>
            </div>
            
            <!-- 文章操作 -->
            <div class="mt-8 flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <button class="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors">
                  <HeartIcon class="w-5 h-5" />
                  <span>点赞 ({{ post.likes }})</span>
                </button>
                
                <button class="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors">
                  <ShareIcon class="w-5 h-5" />
                  <span>分享</span>
                </button>
                
                <button class="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <BookmarkIcon class="w-5 h-5" />
                  <span>收藏</span>
                </button>
              </div>
              
              <div class="text-sm text-gray-500 dark:text-gray-400">
                最后更新：{{ post.updatedAt }}
              </div>
            </div>
            
            <!-- 相关文章 -->
            <section class="mt-16">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                相关文章
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  v-for="relatedPost in relatedPosts"
                  :key="relatedPost.id"
                  class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div class="h-40 bg-gradient-to-br from-purple-400 to-pink-500"></div>
                  <div class="p-6">
                    <div class="flex items-center space-x-2 mb-3">
                      <span class="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 text-xs font-medium rounded-full">
                        {{ relatedPost.category }}
                      </span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      <router-link :to="`/posts/${relatedPost.slug}`">
                        {{ relatedPost.title }}
                      </router-link>
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {{ relatedPost.excerpt }}
                    </p>
                    <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{{ relatedPost.date }}</span>
                      <span>{{ relatedPost.readTime }}分钟阅读</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          
          <!-- 侧边栏 -->
          <aside class="lg:w-80">
            <!-- 目录 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6 sticky top-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                文章目录
              </h3>
              
              <nav class="space-y-2">
                <a
                  v-for="heading in tableOfContents"
                  :key="heading.id"
                  :href="`#${heading.id}`"
                  class="block py-1 text-sm transition-colors"
                  :class="{
                    'pl-0 text-gray-900 dark:text-white font-medium': heading.level === 2,
                    'pl-4 text-gray-700 dark:text-gray-300': heading.level === 3,
                    'pl-8 text-gray-600 dark:text-gray-400': heading.level === 4
                  }"
                >
                  {{ heading.text }}
                </a>
              </nav>
            </div>
            
            <!-- 作者信息 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {{ post.author }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  前端开发工程师，专注于React生态系统
                </p>
                <div class="flex justify-center space-x-3">
                  <a href="#" class="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    <GithubIcon class="w-5 h-5" />
                  </a>
                  <a href="#" class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <TwitterIcon class="w-5 h-5" />
                  </a>
                  <a href="#" class="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <MailIcon class="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <!-- 文章统计 -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                文章统计
              </h3>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">浏览量</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ post.views }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">点赞数</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ post.likes }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">评论数</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ post.comments }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-400">字数</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ post.wordCount }}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  UserIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  GithubIcon,
  TwitterIcon,
  MailIcon
} from 'lucide-vue-next';

const route = useRoute();

// 当前文章ID
const postId = computed(() => route.params.id as string);

// 模拟文章数据
const post = ref({
  id: 1,
  title: 'React Hooks 最佳实践',
    slug: 'react-hooks-best-practices',
    excerpt: '深入了解React Hooks的使用技巧和最佳实践，提升开发效率。本文将从基础概念开始，逐步深入到高级用法和实际应用场景。',
    category: 'React',
    categorySlug: 'react',
  author: '张三',
  date: '2024年1月15日',
  updatedAt: '2024年1月16日',
  views: 1234,
  likes: 89,
  comments: 23,
  readTime: 8,
  wordCount: 3200,
  tags: ['react', 'hooks', 'best-practices', 'typescript']
});

// 相关文章
const relatedPosts = ref([
  {
    id: 2,
    title: 'React 状态管理深度解析',
    slug: 'react-state-management-deep-dive',
    excerpt: '深入理解React状态管理的工作原理，包括useState、useEffect和状态更新机制。',
    category: 'React',
    date: '2024年1月10日',
    readTime: 12
  },
  {
    id: 3,
    title: 'TypeScript 与 React 完美结合',
    slug: 'typescript-react-perfect-combination',
    excerpt: '学习如何在React项目中充分利用TypeScript的类型系统，提升开发体验。',
    category: 'TypeScript',
    date: '2024年1月8日',
    readTime: 9
  },
  {
    id: 4,
    title: 'Redux vs Context：状态管理的选择',
    slug: 'redux-vs-context-state-management',
    excerpt: '对比Redux和Context的优缺点，了解如何选择合适的React状态管理方案。',
    category: 'React',
    date: '2024年1月5日',
    readTime: 6
  },
  {
    id: 5,
    title: 'React 性能优化实战指南',
    slug: 'react-performance-optimization-guide',
    excerpt: '从多个维度优化React应用性能，包括组件优化、打包优化和运行时优化。',
    category: 'React',
    date: '2024年1月3日',
    readTime: 15
  }
]);

// 文章目录
const tableOfContents = ref([
  { id: 'introduction', text: '引言', level: 2 },
  { id: 'what-is-composition-api', text: '什么是 Composition API？', level: 2 },
  { id: 'main-advantages', text: '主要优势', level: 3 },
  { id: 'basic-usage', text: '基本用法', level: 2 },
  { id: 'best-practices', text: '最佳实践', level: 2 },
  { id: 'use-script-setup', text: '使用 <script setup>', level: 3 },
  { id: 'ref-vs-reactive', text: '合理使用 ref 和 reactive', level: 3 },
  { id: 'extract-reusable-logic', text: '提取可复用的逻辑', level: 3 },
  { id: 'conclusion', text: '总结', level: 2 }
]);

// 生命周期
onMounted(() => {
  // 模拟增加浏览量
  post.value.views++;
});
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3;
}

.prose p {
  @apply text-gray-700 dark:text-gray-300 leading-relaxed mb-4;
}

.prose ul {
  @apply list-disc list-inside space-y-2 mb-4;
}

.prose li {
  @apply text-gray-700 dark:text-gray-300;
}

.prose pre {
  @apply bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4;
}

.prose code {
  @apply text-sm font-mono text-gray-800 dark:text-gray-200;
}

.prose strong {
  @apply font-semibold text-gray-900 dark:text-white;
}

.prose-lg {
  @apply text-lg;
}

.prose-invert {
  @apply text-gray-300;
}
</style>