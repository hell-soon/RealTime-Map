// import type { IUser, LoginPayload, RegistrationPayload } from 'src/utils/api/auth/index.type'
// import { defineStore } from 'pinia'
// import { authApi as api } from 'src/utils/api/auth'

// interface AuthState {
//   user: IUser | null
//   isAuthenticated: boolean
// }

// export const useAuthStore = defineStore('auth', {
//   state: (): AuthState => ({
//     user: null,
//     isAuthenticated: false,
//   }),

//   actions: {
//     setUser(userData: IUser | null) {
//       this.user = userData
//       this.isAuthenticated = !!userData
//     },

//     async login(payload: LoginPayload) {
//       try {
//         const response = await api.auth.login(payload)
//         this.setUser(response.user)
//       }
//       catch (error) {
//         console.error('Login failed in store', error)
//       }
//     },

//     async registration(payload: RegistrationPayload) {
//       try {
//         const response = await api.auth.registration(payload)
//         this.setUser(response.user)
//       }
//       catch (error) {
//         console.error('Registration failed in store', error)
//       }
//     },

//     async logout() {
//       try {
//         await api.auth.logout()
//       }
//       catch (error) {
//         console.error('Logout request failed', error)
//       }
//       finally {
//         this.setUser(null)
//         // this.router.push('/login'); // Перенаправление сделает навигационный хук
//       }
//     },

//     async checkAuth() {
//       try {
//         const response = await api.auth.checkAuth()
//         this.setUser(response.user)
//       }
//       catch (error) {
//         this.setUser(null)
//       }
//     },
//   },
// })
