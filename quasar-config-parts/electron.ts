// quasar-config-parts/electron.ts
import type { QuasarElectronConfiguration } from '@quasar/app-vite/types/configuration/electron-conf'

export default function (_ctx: any): QuasarElectronConfiguration {
  return {
    preloadScripts: ['electron-preload'],
    inspectPort: 5858,
    bundler: 'packager',
    packager: {
      // ...
    },
    // builder: {
    //   appId: 'real-time-map',
    // },
  }
}
