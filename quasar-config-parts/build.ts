import type { QuasarBuildConfiguration } from '@quasar/app-vite/types/configuration/build.js'
// quasar-config-parts/build.js
import getVitePlugins from './vitePlugins.js'

export default function (_ctx: any): QuasarBuildConfiguration {
  return {
    target: {
      browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
      node: 'node20',
    },
    typescript: {
      strict: true,
      vueShim: true,
    },
    vueRouterMode: 'hash',
    vitePlugins: getVitePlugins(_ctx),
  }
}
