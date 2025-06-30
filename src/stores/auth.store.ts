import type { LoginPayload, RegistrationPayload } from 'src/utils/api/auth/index.type'
import type { User } from 'src/utils/api/user/index.type'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { authApi } from 'src/utils/api/auth'
import { userApi } from 'src/utils/api/user'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    setToken(token: string) {
      localStorage.setItem('token', token)
      this.token = token
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    getToken() {
      if (this.token)
        return this.token
      this.token = localStorage.getItem('token')
      return this.token
    },
    removeToken() {
      localStorage.removeItem('token')
      this.token = null
      delete api.defaults.headers.common.Authorization
    },

    setUser(userData: User | null) {
      this.user = userData
      this.isAuthenticated = !!userData
    },

    async login(payload: LoginPayload) {
      const response = await authApi.login(payload)
      this.setToken(response.access_token)
      await this.fetchUser()
    },

    async registration(payload: RegistrationPayload) {
      await authApi.registration(payload)
    },

    async fetchUser() {
      try {
        const user = await userApi.getProfile()
        this.setUser(user)
      }
      catch (error) {
        console.error('Fetching user failed in store:', error)
        this.logout()
        throw error
      }
    },

    async logout() {
      try {
        await authApi.logout()
      }
      catch (error) {
        console.error('Logout request failed', error)
      }
      finally {
        this.setUser(null)
        this.removeToken()
      }
    },
  },
})

export type { LoginPayload, RegistrationPayload }
