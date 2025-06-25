import type { LoginPayload, RegistrationPayload } from 'src/stores/auth.store'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth.store'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useAuth() {
  const authStore = useAuthStore()
  const $q = useQuasar()
  const { t } = useI18n()

  const isLoading = ref(false)

  const submit = async (action: 'login' | 'register', payload: LoginPayload | RegistrationPayload) => {
    isLoading.value = true

    try {
      if (action === 'login') {
        await authStore.login(payload as LoginPayload)
      }
      else {
        await authStore.registration(payload as RegistrationPayload)
        $q.notify({
          color: 'positive',
          message: t('notify.registrationSuccess'),
          icon: 'check_circle',
        })
      }
      return true
    }
    catch (error) {
      console.error(error)
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    submit,
  }
}
