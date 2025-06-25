import type { QuasarBuildConfiguration } from '@quasar/app-vite/types/configuration/build.js'
import getVitePlugins from './vitePlugins'

export function getBuildConfig(_ctx: any): QuasarBuildConfiguration {
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
