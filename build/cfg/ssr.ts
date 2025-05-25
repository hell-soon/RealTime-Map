import type { QuasarSsrConfiguration } from '@quasar/app-vite/types/configuration/ssr-conf'

export const ssrConfig: QuasarSsrConfiguration = {
  prodPort: 3000,
  middlewares: [
    'render',
  ],
  pwa: false,
}
