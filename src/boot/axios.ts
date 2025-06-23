import type { AxiosInstance } from 'axios'
import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

const api = axios.create({ baseURL: 'http://77.110.105.64:80/api/v1' })

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

  app.provide('api', api)
})

export { api }
