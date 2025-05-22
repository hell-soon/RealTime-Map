<script setup lang="ts">
import type { YMap } from '@yandex/ymaps3-types'
import { YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps'

const map = shallowRef<null | YMap>(null)
</script>

<template>
  <q-page>
    <YandexMap
      v-model="map"
      :settings="{
        location: {
          center: [37.617644, 55.755819],
          zoom: 9,
        },
      }"
      width="100%"
      height="97dvh"
    >
      <YandexMapDefaultSchemeLayer />
      <YandexMapDefaultFeaturesLayer />
    </YandexMap>
  </q-page>
</template>
