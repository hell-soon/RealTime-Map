import type { QuasarBootConfiguration } from '@quasar/app-vite/types/configuration/boot'

export function getBootConfig(_ctx: any): QuasarBootConfiguration {
  return [
    'i18n',
    'axios',
    'yandex',
    'auth',
    'websocket',
    'addressbar-color',
  ]
}
