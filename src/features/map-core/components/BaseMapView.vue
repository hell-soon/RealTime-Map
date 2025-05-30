<script setup lang="ts">
import type { LngLat, YMap } from '@yandex/ymaps3-types'
// import type { PropType } from 'vue'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
} from 'vue-yandex-maps'

const props = withDefaults(defineProps<Props>(), {
  zoomLevel: 13,
  showUserMarker: true,
  userMarkerSettings: () => ({ /* по умолчанию пустой объект */ }),
})

const emit = defineEmits<{
  (e: 'mapReady', mapInstance: YMap): void
}>()

const $q = useQuasar()

interface Props {
  centerCoordinates: LngLat | null
  zoomLevel?: number
  showUserMarker?: boolean
  userMarkerSettings?: object
}

const mapInstance = shallowRef<null | YMap>(null)

watch(mapInstance, (newMap) => {
  if (newMap) {
    emit('mapReady', newMap)
  }
})
</script>

<template>
  <div v-if="!centerCoordinates" class="column items-center justify-center text-grey-8">
    <q-icon name="map" size="3em" />
    <p>Ожидание координат для отображения карты...</p>
  </div>
  <YandexMap
    v-else
    v-model="mapInstance"
    :settings="{
      location: {
        center: centerCoordinates,
        zoom: props.zoomLevel,
      },
      theme: $q.dark.mode ? 'dark' : 'light',
    }"
    width="100%"
    height="100%"
  >
    <YandexMapDefaultSchemeLayer
      :settings="{
      }"
    />
    <YandexMapDefaultFeaturesLayer />

    <YandexMapDefaultMarker
      v-if="props.showUserMarker"
      :settings="{
        coordinates: centerCoordinates,
        ...props.userMarkerSettings,
      }"
    />
    <slot />
  </YandexMap>
</template>

<!-- <style scoped>
div[v-if="!centerCoordinates"] {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0; /* Пример фона для состояния ожидания */
}
</style> -->
