import type { ApiError } from 'src/services/api.types'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

type NotifyType = 'positive' | 'negative' | 'warning' | 'info' | 'ongoing'

interface NotifyOptions {
  type?: NotifyType
  message: string
  caption?: string
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  timeout?: number
}

interface NotifyApiErrorOptions {
  message?: string
  statusMessages?: Record<number, string>
}

export function useNotify() {
  const { t } = useI18n()
  const $q = useQuasar()

  function notify(options: NotifyOptions) {
    $q.notify({
      position: 'top',
      timeout: 3500,
      ...options,
    })
  }

  function notifySuccess(message: string) {
    notify({ type: 'positive', message })
  }

  function notifyError(message: string) {
    notify({ type: 'negative', message })
  }

  function notifyOnApiError(error: unknown, options: NotifyApiErrorOptions = {}): void {
    if (!(error && typeof error === 'object' && 'message' in error && 'status' in error && 'raw' in error)) {
      notifyError(t('notify.errors.unknown'))
      return
    }

    const apiError = error as ApiError

    let finalMessage: string

    const statusMessage = apiError.status ? options.statusMessages?.[apiError.status] : undefined

    if (options.message) {
      finalMessage = options.message
    }
    else if (statusMessage) {
      finalMessage = statusMessage
    }
    else {
      finalMessage = apiError.message
    }

    notifyError(finalMessage)
  }

  return {
    notify,
    notifySuccess,
    notifyError,
    notifyOnApiError,
  }
}
