import type { AxiosError, AxiosRequestConfig } from 'axios'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

interface ApiError {
  message: string
  status?: number
  details?: any
}

function handleError(error: AxiosError): ApiError {
  const apiError: ApiError = {
    message: 'Произошла неизвестная ошибка',
    status: error.response?.status as number,
  }

  if (error.response) {
    console.error('API Response Error:', error.response.data)
    apiError.message = (error.response.data as any)?.message || error.message
    apiError.details = error.response.data
  }
  else if (error.request) {
    console.error('API No Response:', error.request)
    apiError.message = 'Сервер не отвечает. Проверьте подключение к сети.'
  }
  else {
    console.error('API Request Setup Error:', error.message)
    apiError.message = error.message
  }

  Notify.create({
    type: 'negative',
    message: apiError.message,
    position: 'top',
    timeout: 3000,
  })

  return apiError
}

export const apiService = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await api.get<T>(url, config)
      return response.data
    }
    catch (error) {
      throw handleError(error as AxiosError)
    }
  },

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await api.post<T>(url, data, config)
      return response.data
    }
    catch (error) {
      throw handleError(error as AxiosError)
    }
  },

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await api.put<T>(url, data, config)
      return response.data
    }
    catch (error) {
      throw handleError(error as AxiosError)
    }
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await api.delete<T>(url, config)
      return response.data
    }
    catch (error) {
      throw handleError(error as AxiosError)
    }
  },
}
