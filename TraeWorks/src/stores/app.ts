import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Theme } from '@/types';

export const useAppStore = defineStore('app', () => {
  // 状态
  const theme = ref<Theme>('system');
  const sidebarOpen = ref(false);
  const loading = ref(false);
  const searchOpen = ref(false);
  
  // 计算属性
  const isDark = computed(() => {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return theme.value === 'dark';
  });
  
  // 方法
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeClass();
  };
  
  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  
  const updateThemeClass = () => {
    const root = document.documentElement;
    if (isDark.value) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };
  
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };
  
  const closeSidebar = () => {
    sidebarOpen.value = false;
  };
  
  const toggleSearch = () => {
    searchOpen.value = !searchOpen.value;
  };
  
  const closeSearch = () => {
    searchOpen.value = false;
  };
  
  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading;
  };
  
  // 初始化主题
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      theme.value = savedTheme as Theme;
    } else {
      // 检测系统主题偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.value = prefersDark ? 'dark' : 'light';
    }
    updateThemeClass();
  };

  // 初始化应用
  const init = () => {
    initTheme();
  };
  
  return {
    // 状态
    theme,
    sidebarOpen,
    loading,
    searchOpen,
    
    // 计算属性
    isDark,
    
    // 方法
    setTheme,
    toggleTheme,
    toggleSidebar,
    closeSidebar,
    toggleSearch,
    closeSearch,
    setLoading,
    init
  };
});