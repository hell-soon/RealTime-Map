// quasar-config-parts/boot.js
import type { QuasarBootConfiguration } from '@quasar/app-vite/types/configuration/boot'

export default function (_ctx: any): QuasarBootConfiguration {
  return [
    'i18n',
    'axios',
    'yandex',
  ]
}
