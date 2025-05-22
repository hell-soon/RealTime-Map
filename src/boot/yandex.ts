import type { VueYandexMaps } from 'vue-yandex-maps'
import { boot } from 'quasar/wrappers'
import { createYmaps } from 'vue-yandex-maps'

const settings: VueYandexMaps.PluginSettings = {
  apikey: 'd17123bd-3142-47c8-9496-8cb21e6d450f',
  lang: 'ru_RU',
}

export default boot(({ app }) => {
  const ymaps = createYmaps(settings)
  app.use(ymaps)
})
