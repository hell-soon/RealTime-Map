import type { LoginPayload, RegistrationPayload } from 'src/utils/api/auth/index.type'
import type { User } from 'src/utils/api/user/index.type'
import { defineStore } from 'pinia'
import { useDialogStore } from 'src/stores/dialog'
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
    },

    setUser(userData: User | null) {
      this.user = userData
      this.isAuthenticated = !!userData
    },

    async login(payload: LoginPayload) {
      try {
        const response = await authApi.login(payload)
        this.setToken(response.access_token)
        await this.fetchUser()
      }
      catch (error) {
        console.error('Login failed in store:', error)
        throw error
      }
    },

    async registration(payload: RegistrationPayload) {
      try {
        await authApi.registration(payload)
      }
      catch (error) {
        console.error('Registration failed in store:', error)
        throw error
      }
    },

    async fetchUser() {
      try {
        const user = await userApi.getProfile()
        this.setUser(user)
        useDialogStore().closeDialog()
      }
      catch (error) {
        console.error('Fetching user failed in store:', error)
        this.setUser(null)
        this.removeToken()
      }
    },

    async logout() {
      try {
        await authApi.logout
        this.removeToken()
      }
      catch (error) {
        console.error('Logout request failed', error)
      }
      finally {
        this.setUser(null)
        // this.router.push('/login');
      }
    },
  },
})

export type { LoginPayload, RegistrationPayload }
