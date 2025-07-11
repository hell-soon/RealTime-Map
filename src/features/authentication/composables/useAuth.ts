import type { LoginPayload, RegistrationPayload } from 'src/stores/auth'
import { useNotify } from 'src/composables/useNotify'
import { useAuthStore } from 'src/stores/auth'
import { useI18n } from 'vue-i18n'

export function useAuth() {
  const { notifyOnApiError, notifySuccess } = useNotify()

  const authStore = useAuthStore()
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
        notifySuccess(t('notify.registrationSuccess'))
      }
    }
    catch (error) {
      notifyOnApiError(error, {
        statusMessages: {
          400: 'okak',
          422: t('notify.errors.validation'),
          409: t('notify.errors.conflict'),
          401: t('notify.errors.unauthorized'),
        },
      })
      throw error
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
