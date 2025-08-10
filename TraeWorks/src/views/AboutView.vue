<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 页面头部 -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          关于我们
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          了解码农来了的故事和使命
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- 博客介绍 -->
        <section class="mb-16">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-6">
                <HeartIcon class="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  我们的使命
                </h2>
                <p class="text-gray-600 dark:text-gray-400">
                  分享优质的技术内容
                </p>
              </div>
            </div>
            
            <div class="prose prose-lg dark:prose-invert max-w-none">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                码农来了致力于为开发者提供高质量的技术文章、最佳实践和学习资源。我们相信知识分享的力量，希望通过我们的内容帮助更多开发者提升技能，构建更好的应用。
              </p>
              
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                无论你是技术的初学者还是经验丰富的开发者，这里都有适合你的内容。我们涵盖从基础概念到高级技巧，从组件开发到性能优化，从工具使用到架构设计的各个方面。
              </p>
              
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                我们的目标是创建一个活跃的技术社区，让每个人都能在这里学习、成长和分享。
              </p>
            </div>
          </div>
        </section>

        <!-- 特色内容 -->
        <section class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            我们的特色
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon class="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                深度教程
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                从基础到进阶的完整学习路径，帮助你系统掌握现代技术栈。
              </p>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CodeIcon class="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                实战案例
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                真实项目经验分享，包含完整的代码示例和最佳实践。
              </p>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UsersIcon class="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                社区交流
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                活跃的技术社区，与其他开发者交流经验，共同成长。
              </p>
            </div>
          </div>
        </section>

        <!-- 技术栈 -->
        <section class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            我们使用的技术
          </h2>
          
          <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div
                v-for="tech in technologies"
                :key="tech.name"
                class="text-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center" :style="{ backgroundColor: tech.color + '20' }">
                  <component :is="tech.icon" class="w-6 h-6" :style="{ color: tech.color }" />
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">{{ tech.name }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ tech.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 联系方式 -->
        <section>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            联系我们
          </h2>
          
          <div class="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-xl p-8 border border-green-200 dark:border-green-800">
            <div class="text-center mb-8">
              <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                有任何问题或建议？我们很乐意听到您的声音！
              </p>
              
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:contact@manonglaile.com"
                  class="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MailIcon class="w-5 h-5 mr-2" />
                  发送邮件
                </a>
                
                <a
                  href="https://github.com/manonglaile"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 dark:text-green-400 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                >
                  <GithubIcon class="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MailIcon class="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">邮箱</h4>
                <p class="text-gray-600 dark:text-gray-400">contact@manonglaile.com</p>
              </div>
              
              <div>
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <GithubIcon class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">GitHub</h4>
                <p class="text-gray-600 dark:text-gray-400">@manonglaile</p>
              </div>
              
              <div>
                <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageCircleIcon class="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">社区</h4>
                <p class="text-gray-600 dark:text-gray-400">加入我们的讨论</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HeartIcon,
  BookOpenIcon,
  CodeIcon,
  UsersIcon,
  MailIcon,
  GithubIcon,
  MessageCircleIcon,
  LayersIcon,
  PaletteIcon,
  DatabaseIcon,
  SettingsIcon
} from 'lucide-vue-next';

// 技术栈数据
const technologies = [
  {
    name: 'Vue 3',
    description: '现代化框架',
    color: '#10b981',
    icon: LayersIcon
  },
  {
    name: 'TypeScript',
    description: '类型安全',
    color: '#3b82f6',
    icon: CodeIcon
  },
  {
    name: 'Tailwind CSS',
    description: '样式框架',
    color: '#8b5cf6',
    icon: PaletteIcon
  },
  {
    name: 'Vite',
    description: '构建工具',
    color: '#f59e0b',
    icon: SettingsIcon
  }
];
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1.5rem;
}

.prose-lg {
  font-size: 1.125rem;
  line-height: 1.7;
}

.prose-invert {
  color: #d1d5db;
}
</style>