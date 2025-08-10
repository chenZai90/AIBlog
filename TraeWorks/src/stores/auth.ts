import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { User, AuthUser } from '@/types'
import usersData from '@/data/users.json'

export interface LoginParams {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterParams {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export interface LoginResponse {
  success: boolean
  token: string
  user: AuthUser
  expiresIn: number
  message?: string
}

export interface RegisterResponse {
  success: boolean
  message: string
  user?: AuthUser
}

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // 初始化认证状态
  const initAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    
    if (savedToken && savedUser) {
      try {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
      } catch (e) {
        console.error('Failed to parse saved user data:', e)
        clearAuth()
      }
    }
  }

  // 清除认证信息
  const clearAuth = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  // 保存认证信息
  const saveAuth = (authUser: AuthUser, authToken: string, rememberMe = false) => {
    user.value = authUser
    token.value = authToken
    
    if (rememberMe) {
      localStorage.setItem('auth_token', authToken)
      localStorage.setItem('auth_user', JSON.stringify(authUser))
    } else {
      sessionStorage.setItem('auth_token', authToken)
      sessionStorage.setItem('auth_user', JSON.stringify(authUser))
    }
  }

  // 模拟JWT token生成
  const generateToken = (userId: string): string => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({ 
      userId, 
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7天过期
    }))
    const signature = btoa('mock_signature')
    return `${header}.${payload}.${signature}`
  }

  // 用户登录
  const login = async (params: LoginParams): Promise<LoginResponse> => {
    loading.value = true
    error.value = null

    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 查找用户
      const foundUser = usersData.find(u => 
        u.email === params.email || u.username === params.email
      )

      if (!foundUser) {
        throw new Error('用户不存在')
      }

      if (!foundUser.isActive) {
        throw new Error('账号已被禁用')
      }

      // 简单密码验证（实际项目中应该使用bcrypt等加密库）
      if (params.password !== 'password123') {
        throw new Error('密码错误')
      }

      // 创建认证用户对象
      const authUser: AuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        name: foundUser.name,
        avatarUrl: foundUser.avatarUrl,
        bio: foundUser.bio,
        isActive: foundUser.isActive,
        lastLoginAt: new Date().toISOString(),
        role: foundUser.role as 'admin' | 'user'
      }

      // 生成token
      const authToken = generateToken(foundUser.id)
      
      // 保存认证信息
      saveAuth(authUser, authToken, params.rememberMe)

      return {
        success: true,
        token: authToken,
        user: authUser,
        expiresIn: 7 * 24 * 60 * 60 * 1000, // 7天
        message: '登录成功'
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '登录失败'
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  // 用户注册
  const register = async (params: RegisterParams): Promise<RegisterResponse> => {
    loading.value = true
    error.value = null

    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 验证密码确认
      if (params.password !== params.confirmPassword) {
        throw new Error('两次输入的密码不一致')
      }

      // 检查邮箱是否已存在
      const existingUser = usersData.find(u => u.email === params.email)
      if (existingUser) {
        throw new Error('邮箱已被注册')
      }

      // 检查用户名是否已存在
      const existingUsername = usersData.find(u => u.username === params.username)
      if (existingUsername) {
        throw new Error('用户名已被使用')
      }

      // 创建新用户
      const newUser: AuthUser = {
        id: Date.now().toString(),
        email: params.email,
        username: params.username,
        name: params.username,
        avatarUrl: `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20portrait%20friendly%20person%20modern%20style&image_size=square`,
        bio: '新用户，还没有个人简介',
        isActive: true,
        lastLoginAt: new Date().toISOString(),
        role: 'user'
      }

      return {
        success: true,
        message: '注册成功，请登录',
        user: newUser
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '注册失败'
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  // 用户登出
  const logout = () => {
    clearAuth()
    error.value = null
  }

  // 更新用户信息
  const updateProfile = async (updates: Partial<AuthUser>): Promise<void> => {
    if (!user.value) {
      throw new Error('用户未登录')
    }

    loading.value = true
    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 500))

      // 更新用户信息
      const updatedUser = { ...user.value, ...updates }
      user.value = updatedUser

      // 更新本地存储
      const savedToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
      if (savedToken) {
        if (localStorage.getItem('auth_token')) {
          localStorage.setItem('auth_user', JSON.stringify(updatedUser))
        } else {
          sessionStorage.setItem('auth_user', JSON.stringify(updatedUser))
        }
      }
    } finally {
      loading.value = false
    }
  }

  // 检查token是否有效
  const validateToken = (): boolean => {
    if (!token.value) return false

    try {
      const parts = token.value.split('.')
      if (parts.length !== 3) return false

      const payload = JSON.parse(atob(parts[1]))
      return payload.exp > Date.now()
    } catch {
      return false
    }
  }

  return {
    // 状态
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    error: readonly(error),
    
    // 计算属性
    isAuthenticated,
    isAdmin,
    
    // 方法
    initAuth,
    login,
    register,
    logout,
    updateProfile,
    validateToken,
    clearAuth
  }
})