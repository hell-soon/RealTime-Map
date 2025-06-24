import type { IUser, LoginPayload, RegistrationPayload } from 'src/utils/api/auth/index.type'
import { defineStore } from 'pinia'
import { authApi } from 'src/utils/api/auth'

interface AuthState {
  user: IUser | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(userData: IUser | null) {
      this.user = userData
      this.isAuthenticated = !!userData
    },

    setToken(token: string) {
      localStorage.setItem('token', token)
    },
    getToken() {
      return localStorage.getItem('token')
    },
    removeToken() {
      localStorage.removeItem('token')
    },

    async login(payload: LoginPayload) {
      try {
        const response = await authApi.login(payload)
        this.setToken(response.access_token)
      }
      catch (error) {
        console.error('Login failed in store', error)
      }
    },

    async registration(payload: RegistrationPayload) {
      try {
        const response = await authApi.registration(payload)
        this.setUser(response)
      }
      catch (error) {
        console.error('Registration failed in store', error)
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
        // this.router.push('/login'); // Перенаправление сделает навигационный хук
      }
    },
  },
})
