import type { QuasarConf } from '@quasar/app-vite/types/configuration/conf'

import { defineConfig } from '#q-app/wrappers'

import {
  capacitorConfig,
  frameworkConfig,
  getBootConfig,
  getBuildConfig,
  getElectronConfig,
  pwaConfig,
  ssrConfig,
} from './build'

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
