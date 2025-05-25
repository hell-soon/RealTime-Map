import type { QuasarConf } from '@quasar/app-vite/types/configuration/conf'

import { defineConfig } from '#q-app/wrappers'
import getBootConfig from './quasar-config-parts/boot'
import getBuildConfig from './quasar-config-parts/build'
import capacitorConfig from './quasar-config-parts/capacitor'
import getElectronConfig from './quasar-config-parts/electron'
import frameworkConfig from './quasar-config-parts/framework'
import pwaConfig from './quasar-config-parts/pwa'
import ssrConfig from './quasar-config-parts/ssr'

export default defineConfig((ctx) => {
  const quasarConfig: QuasarConf = {
    // preFetch: true,

    boot: getBootConfig(ctx),

    css: [
      'app.scss',
    ],

    extras: [
      'roboto-font',
      'material-icons',
    ],

    build: getBuildConfig(ctx),

    framework: frameworkConfig,

    animations: 'all',

    ssr: ssrConfig,

    pwa: pwaConfig,

    capacitor: capacitorConfig,
    electron: getElectronConfig(ctx),
    // bex: {},

    // sourceFiles: {},
  }
  return quasarConfig
})
