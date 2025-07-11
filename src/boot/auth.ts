import { api } from 'boot/axios'
import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth'

export default boot(async () => {
  const authStore = useAuthStore()

  const token = authStore.token

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    try {
      await authStore.fetchUser()
    }
    catch (error) {
      console.error('Auth boot: Invalid session detected and cleaned up.', error)
    }
  }
})
