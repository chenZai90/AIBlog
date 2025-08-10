// 用户类型
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  avatarUrl?: string;
  bio?: string;
  website?: string;
  github?: string;
  twitter?: string;
  passwordHash?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  role?: 'admin' | 'user';
}

// 认证用户类型（不包含敏感信息）
export interface AuthUser {
  id: string;
  email: string;
  username: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  isActive: boolean;
  lastLoginAt?: string;
  role?: 'admin' | 'user';
}

// 个人信息类型
export interface PersonalInfo {
  name: string;
  nickname?: string;
  title: string;
  bio: string;
  avatar: string;
  skills: string[];
  socialLinks: SocialLink[];
  motto: string;
  interests?: string[];
  projects?: Project[];
  learningGoals?: string[];
}

// 社交链接类型
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

// 项目类型
export interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  github?: string;
}

// 分类类型
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
  postCount: number;
  createdAt: string;
}

// 标签类型
export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
  postCount: number;
  createdAt: string;
}

// 文章类型
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: User;
  category: Category;
  tags: Tag[];
  publishedAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  readingTime: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
}

// 评论类型
export interface Comment {
  id: string;
  content: string;
  author: User;
  post: Post;
  parent?: Comment;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
  likes: number;
}

// 搜索结果类型
export interface SearchResult {
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  total: number;
}

// 分页类型
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// API 响应类型
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

// 主题类型
export type Theme = 'light' | 'dark' | 'system';

// 排序类型
export type SortOrder = 'asc' | 'desc';
export type PostSortBy = 'publishedAt' | 'views' | 'likes' | 'title';

// 状态类型
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

// 表单类型
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// 统计类型
export interface SiteStats {
  totalPosts: number;
  totalViews: number;
  totalCategories: number;
  totalTags: number;
  totalComments?: number;
}

// 导航菜单类型
export interface NavItem {
  name: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

// 面包屑类型
export interface BreadcrumbItem {
  name: string;
  path?: string;
}

// SEO 元数据类型
export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}