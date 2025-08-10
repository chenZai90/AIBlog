import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { Post, Category, Tag, Pagination, SearchResult } from '@/types'
import articlesData from '@/data/articles.json'

export interface GetPostsParams {
  page?: number
  limit?: number
  category?: string
  tag?: string
  search?: string
  featured?: boolean
}

export interface PostsResponse {
  posts: Post[]
  total: number
  hasMore: boolean
  pagination: Pagination
}

export interface SearchParams {
  query: string
  page?: number
  limit?: number
}

export const useArticlesStore = defineStore('articles', () => {
  // 状态
  const posts = ref<Post[]>([])
  const featuredPosts = ref<Post[]>([])
  const currentPost = ref<Post | null>(null)
  const categories = ref<Category[]>([])
  const tags = ref<Tag[]>([])
  const searchResults = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref<Pagination>({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  })

  // 计算属性
  const totalPosts = computed(() => posts.value.length)
  const publishedPosts = computed(() => posts.value.filter(post => post.status === 'published'))
  const draftPosts = computed(() => posts.value.filter(post => post.status === 'draft'))
  const hasMore = computed(() => pagination.value.page < pagination.value.totalPages)
  
  // 最新文章
  const latestArticles = computed(() => {
    return posts.value
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 6)
  })
  
  // 网站统计
  const statistics = computed(() => {
    const totalViews = posts.value.reduce((sum, post) => sum + post.views, 0)
    return {
      totalArticles: publishedPosts.value.length,
      totalViews,
      totalCategories: categories.value.length,
      totalTags: tags.value.length
    }
  })

  // 初始化数据
  const initData = () => {
    try {
      // 加载文章数据
      posts.value = articlesData as Post[]
      
      // 提取精选文章
      featuredPosts.value = posts.value.filter(post => post.featured && post.status === 'published')
      
      // 提取分类
      const categoryMap = new Map<string, Category>()
      posts.value.forEach(post => {
        if (post.category && !categoryMap.has(post.category.id)) {
          categoryMap.set(post.category.id, {
            ...post.category,
            postCount: posts.value.filter(p => p.category.id === post.category.id).length,
            createdAt: new Date().toISOString()
          })
        }
      })
      categories.value = Array.from(categoryMap.values())
      
      // 提取标签
      const tagMap = new Map<string, Tag>()
      posts.value.forEach(post => {
        post.tags.forEach(tag => {
          if (!tagMap.has(tag.id)) {
            tagMap.set(tag.id, {
              ...tag,
              postCount: posts.value.filter(p => 
                p.tags.some(t => t.id === tag.id)
              ).length,
              createdAt: new Date().toISOString()
            })
          }
        })
      })
      tags.value = Array.from(tagMap.values())
      
    } catch (err) {
      console.error('Failed to initialize articles data:', err)
      error.value = '加载文章数据失败'
    }
  }

  // 获取文章列表
  const getPosts = async (params: GetPostsParams = {}): Promise<PostsResponse> => {
    loading.value = true
    error.value = null

    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 500))

      let filteredPosts = [...posts.value]

      // 过滤已发布的文章
      filteredPosts = filteredPosts.filter(post => post.status === 'published')

      // 按分类过滤
      if (params.category) {
        filteredPosts = filteredPosts.filter(post => 
          post.category.slug === params.category
        )
      }

      // 按标签过滤
      if (params.tag) {
        filteredPosts = filteredPosts.filter(post => 
          post.tags.some(tag => tag.slug === params.tag)
        )
      }

      // 按精选过滤
      if (params.featured) {
        filteredPosts = filteredPosts.filter(post => post.featured)
      }

      // 搜索过滤
      if (params.search) {
        const searchTerm = params.search.toLowerCase()
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm))
        )
      }

      // 按发布时间排序（最新的在前）
      filteredPosts.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )

      // 分页处理
      const page = params.page || 1
      const limit = params.limit || 10
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

      // 更新分页信息
      pagination.value = {
        page,
        pageSize: limit,
        total: filteredPosts.length,
        totalPages: Math.ceil(filteredPosts.length / limit)
      }

      return {
        posts: paginatedPosts,
        total: filteredPosts.length,
        hasMore: page < pagination.value.totalPages,
        pagination: pagination.value
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '获取文章列表失败'
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  // 获取文章详情
  const getPostBySlug = async (slug: string): Promise<Post | null> => {
    loading.value = true
    error.value = null

    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 300))

      const post = posts.value.find(p => p.slug === slug && p.status === 'published')
      
      if (!post) {
        throw new Error('文章不存在')
      }

      // 增加浏览量（模拟）
      post.views += 1
      
      currentPost.value = post
      return post
    } catch (err) {
      const message = err instanceof Error ? err.message : '获取文章详情失败'
      error.value = message
      return null
    } finally {
      loading.value = false
    }
  }

  // 获取相关文章
  const getRelatedPosts = (postId: string, limit = 4): Post[] => {
    const currentPost = posts.value.find(p => p.id === postId)
    if (!currentPost) return []

    // 基于分类和标签找相关文章
    const relatedPosts = posts.value
      .filter(post => 
        post.id !== postId && 
        post.status === 'published' && (
          post.category.id === currentPost.category.id ||
          post.tags.some(tag => currentPost.tags.some(t => t.id === tag.id))
        )
      )
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)

    return relatedPosts
  }

  // 搜索文章
  const searchPosts = async (params: SearchParams): Promise<SearchResult> => {
    loading.value = true
    error.value = null

    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 400))

      const searchTerm = params.query.toLowerCase()
      
      // 搜索文章
      const matchedPosts = posts.value.filter(post => 
        post.status === 'published' && (
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm)) ||
          post.category.name.toLowerCase().includes(searchTerm)
        )
      )

      // 搜索分类
      const matchedCategories = categories.value.filter(category =>
        category.name.toLowerCase().includes(searchTerm) ||
        category.description.toLowerCase().includes(searchTerm)
      )

      // 搜索标签
      const matchedTags = tags.value.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm)
      )

      searchResults.value = matchedPosts

      return {
        posts: matchedPosts,
        categories: matchedCategories,
        tags: matchedTags,
        total: matchedPosts.length + matchedCategories.length + matchedTags.length
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '搜索失败'
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  // 获取分类列表
  const getCategories = (): Category[] => {
    return categories.value
  }

  // 获取标签列表
  const getTags = (): Tag[] => {
    return tags.value
  }

  // 获取热门标签
  const getPopularTags = (limit = 10): Tag[] => {
    return tags.value
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, limit)
  }

  // 获取精选文章
  const getFeaturedPosts = (limit = 3): Post[] => {
    return featuredPosts.value.slice(0, limit)
  }

  // 获取最新文章
  const getLatestPosts = (limit = 5): Post[] => {
    return posts.value
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit)
  }

  // 清除当前文章
  const clearCurrentPost = () => {
    currentPost.value = null
  }

  // 清除搜索结果
  const clearSearchResults = () => {
    searchResults.value = []
  }

  // 清除错误
  const clearError = () => {
    error.value = null
  }

  return {
    // 状态
    posts: readonly(posts),
    featuredPosts: readonly(featuredPosts),
    currentPost: readonly(currentPost),
    categories: readonly(categories),
    tags: readonly(tags),
    searchResults: readonly(searchResults),
    loading: readonly(loading),
    error: readonly(error),
    pagination: readonly(pagination),
    
    // 计算属性
    totalPosts,
    publishedPosts,
    draftPosts,
    hasMore,
    latestArticles,
    statistics,
    
    // 方法
    initData,
    getPosts,
    getPostBySlug,
    getRelatedPosts,
    searchPosts,
    getCategories,
    getTags,
    getPopularTags,
    getFeaturedPosts,
    getLatestPosts,
    clearCurrentPost,
    clearSearchResults,
    clearError
  }
})