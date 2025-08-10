import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import CategoryView from '@/views/CategoryView.vue'
import TagView from '@/views/TagView.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import SearchView from '@/views/SearchView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useAuthStore } from '@/stores/auth'

// 定义路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '首页 - 码农来了',
      description: '分享前端开发技术文章和最佳实践'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: '关于我 - 码农来了',
      description: '了解贾晨和码农来了技术博客'
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryView,
    meta: {
      title: '分类 - 码农来了',
      description: '浏览所有文章分类'
    }
  },
  {
    path: '/categories/:id',
    name: 'category-detail',
    component: CategoryView,
    props: true,
    meta: {
      title: '分类详情 - 码农来了',
      description: '查看分类下的所有文章'
    }
  },
  {
    path: '/tags',
    name: 'tags',
    component: TagView,
    meta: {
      title: '标签 - 码农来了',
      description: '浏览所有文章标签'
    }
  },
  {
    path: '/tags/:id',
    name: 'tag-detail',
    component: TagView,
    props: true,
    meta: {
      title: '标签详情 - 码农来了',
      description: '查看标签下的所有文章'
    }
  },
  {
    path: '/post/:slug',
    name: 'post-detail',
    component: PostDetailView,
    props: true,
    meta: {
      title: '文章详情 - 码农来了',
      description: '阅读技术文章详细内容'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: {
      title: '搜索 - 码农来了',
      description: '搜索技术文章和内容'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: '登录 - 码农来了',
      description: '登录您的账户',
      requiresGuest: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: '用户中心 - 码农来了',
      description: '管理您的个人信息和账户设置',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: '页面未找到 - 码农来了',
      description: '抱歉，您访问的页面不存在'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退），恢复到该位置
    if (savedPosition) {
      return savedPosition;
    }
    // 如果有锚点，滚动到锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    // 否则滚动到顶部
    return { top: 0, behavior: 'smooth' };
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 更新页面标题
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }
  
  // 更新页面描述
  if (to.meta?.description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description as string);
    }
  }
  
  // 认证检查
  const authStore = useAuthStore();
  
  // 检查是否需要认证
  if (to.meta?.requiresAuth && !authStore.isAuthenticated) {
    // 需要登录但未登录，重定向到登录页
    next({ name: 'login', query: { redirect: to.fullPath } });
    return;
  }
  
  // 检查是否需要游客状态（如登录页）
  if (to.meta?.requiresGuest && authStore.isAuthenticated) {
    // 已登录用户访问登录页，重定向到首页
    next({ name: 'home' });
    return;
  }
  
  next();
});

export default router
