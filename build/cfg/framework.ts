import type { QuasarFrameworkConfiguration } from '@quasar/app-vite/types/configuration/framework-conf'

export const frameworkConfig: QuasarFrameworkConfiguration = {
  config: {
    dark: 'auto',
  },
  iconSet: 'material-icons',
  lang: 'en-US',
  plugins: [
    'Notify',
    'AddressbarColor',
  ],
}
