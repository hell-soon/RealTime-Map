export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login() {
      this.isAuthenticated = true
      window.localStorage.setItem('isAuthenticated', 'true')
    },
    logout() {
      this.isAuthenticated = false
    },
  },
})
