// Импортируем ваши существующие типы
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
    setToken(token: string) {
      localStorage.setItem('token', token)
    },
    getToken() {
      return localStorage.getItem('token')
    },
    removeToken() {
      localStorage.removeItem('token')
    },

    setUser(userData: IUser | null) {
      this.user = userData
      this.isAuthenticated = !!userData
    },

    async login(payload: LoginPayload) {
      try {
        const response = await authApi.login(payload)
        this.setToken(response.access_token)
        // После успешного логина, нужно получить данные пользователя
        // await this.fetchUser();
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

    // Рекомендую добавить отдельное действие для получения данных о пользователе
    // которое можно вызывать после логина или при загрузке приложения.
    // async fetchUser() {
    //   try {
    //     const user = await userApi.getProfile();
    //     this.setUser(user);
    //   } catch (error) {
    //     this.setUser(null);
    //     this.removeToken();
    //   }
    // }

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
