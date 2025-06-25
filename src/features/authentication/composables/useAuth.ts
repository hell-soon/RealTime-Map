import type { LoginPayload, RegistrationPayload } from 'src/stores/auth.store'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth.store'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
}

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'response' in error
}

export function useAuth() {
  const authStore = useAuthStore()
  const $q = useQuasar()
  const { t } = useI18n()

  const isLoading = ref(false)
  const serverError = ref<string | null>(null)

  const submit = async (action: 'login' | 'register', payload: LoginPayload | RegistrationPayload) => {
    isLoading.value = true
    serverError.value = null
    let success = false

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
      success = true
    }
    catch (error) {
      if (isApiError(error)) {
        serverError.value = error.response?.data?.message || t('errors.generic')
      }
      else {
        serverError.value = t('errors.generic')
      }
      success = false
    }
    finally {
      isLoading.value = false
    }

    return success
  }

  return {
    isLoading,
    serverError,
    submit,
  }
}
