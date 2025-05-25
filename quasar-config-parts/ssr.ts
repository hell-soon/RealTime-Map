import type { QuasarSsrConfiguration } from '@quasar/app-vite/types/configuration/ssr-conf'

const ssrConfig: QuasarSsrConfiguration = {
  prodPort: 3000,
  middlewares: [
    'render',
  ],
  pwa: false,
  // ... другие настройки ssr
}

export default ssrConfig
