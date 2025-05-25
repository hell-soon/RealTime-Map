import type { PluginEntry } from '@quasar/app-vite/types/configuration/build'
// quasar-config-parts/vitePlugins.js
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'

export default function (ctx: any): PluginEntry[] { // ctx может быть нужен для ssr в i18n
  return [
    ['@intlify/unplugin-vue-i18n/vite', {
      ssr: ctx.modeName === 'ssr',
      include: [fileURLToPath(new URL('../src/i18n', import.meta.url))],
    }],

    ['vite-plugin-checker', {
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
        useFlatConfig: true,
      },
    }, { server: false }],

    [AutoImport, {
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          quasar: [
            'useQuasar',
            'useMeta',
          ],
        },
      ],
      dts: path.resolve(__dirname, '../../src/auto-imports.d.ts'),
      eslintrc: {
        enabled: true,
        filepath: path.resolve(__dirname, '../../.eslintrc-auto-import.json'),
        globalsPropValue: true,
      },
      vueTemplate: true,
    }] as any, //* сложная типизации unplugin-auto-import
  ]
}
