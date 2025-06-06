<script setup lang="ts">
import type { LngLat, YMap } from '@yandex/ymaps3-types'
import MapMarker from 'src/components/Ui/MapMarker.vue'

import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
  YandexMapListener,
} from 'vue-yandex-maps'

interface Props {
  centerCoordinates: LngLat
  zoomLevel?: number
  showUserMarker?: boolean
  userMarkerSettings?: object
}

const props = withDefaults(defineProps<Props>(), {
  zoomLevel: 13,
  showUserMarker: true,
  userMarkerSettings: () => ({ /* по умолчанию пустой объект */ }),
})

const emit = defineEmits<{
  (e: 'mapReady', mapInstance: YMap): void
}>()

const $q = useQuasar()

const mapInstance = shallowRef<null | YMap>(null)

watch(mapInstance, (newMap) => {
  if (newMap) {
    emit('mapReady', newMap)
  }
})

const zoom = ref(props.zoomLevel)
const center = ref(props.centerCoordinates)

function onMapZoomChange(event: any) {
  const newZoom = event?.location?.zoom
  const newCenter = event?.location?.center

  if (newCenter) {
    center.value = newCenter
  }

  if (typeof newZoom === 'number') {
    zoom.value = newZoom
  }
}
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
        center,
        zoom,
      },
      theme: $q.dark.mode ? 'dark' : 'light',
    }"
    width="100%"
    height="100%"
  >
    <YandexMapDefaultSchemeLayer />
    <YandexMapDefaultFeaturesLayer />

    <YandexMapDefaultMarker
      v-if="props.showUserMarker"
      :settings="{
        coordinates: centerCoordinates,
        ...props.userMarkerSettings,
      }"
    />

    <MapMarker
      :coordinates="centerCoordinates"
    />
    <!-- <YandexMapDefaultMarker
      v-if="props.showUserMarker"
      :settings="{
        coordinates: defaultMarker ? defaultMarker.coordinates : centerCoordinates,
        draggable: true,
        onDragMove,
      }"
    /> -->

    <slot />

    <YandexMapListener
      :settings="{
        onUpdate: onMapZoomChange,
      }"
    />
  </YandexMap>
</template>
