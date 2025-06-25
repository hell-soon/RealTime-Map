import type { AxiosError, AxiosRequestConfig, Method } from 'axios'
import type { ApiError, BackendErrorDetail } from './api.types'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export interface RequestConfig extends AxiosRequestConfig {
  suppressErrorNotify?: boolean
}

function isBackendError(data: any): data is BackendErrorDetail {
  return data && typeof data.message === 'string'
}

function handleError(error: AxiosError, config: RequestConfig): ApiError {
  const apiError: ApiError = {
    message: 'Произошла неизвестная ошибка',
    status: error.response?.status,
  }

  if (error.response) {
    const errorData = error.response.data
    apiError.details = errorData
    if (isBackendError(errorData)) {
      apiError.message = errorData.message
    }
    else {
      apiError.message = error.message
    }
  }
  else if (error.request) {
    apiError.message = 'Сервер не отвечает. Проверьте подключение к сети.'
  }
  else {
    apiError.message = error.message
  }

  if (!config.suppressErrorNotify && apiError.status !== 401) {
    Notify.create({
      type: 'negative',
      message: apiError.message,
      position: 'top',
      timeout: 3000,
    })
  }

  return apiError
}

async function request<T>(method: Method, url: string, config: RequestConfig = {}, data?: any): Promise<T> {
  try {
    const response = await api.request<T>({
      method,
      url,
      data,
      ...config,
    })
    return response.data
  }
  catch (error) {
    throw handleError(error as AxiosError, config)
  }
}

export const apiService = {
  get<T>(url: string, config?: RequestConfig): Promise<T> {
    return request<T>('GET', url, config)
  },

  post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return request<T>('POST', url, config, data)
  },

  put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return request<T>('PUT', url, config, data)
  },

  delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return request<T>('DELETE', url, config)
  },
}
