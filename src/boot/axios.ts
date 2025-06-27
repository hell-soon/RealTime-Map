import type { AxiosInstance } from 'axios'
import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1/'

const api = axios.create(
  {
    baseURL,
  },
)

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

  app.provide('api', api)
})

export { api }
