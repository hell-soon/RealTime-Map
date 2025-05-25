<script setup lang="ts">
import type { LngLat, YMap } from '@yandex/ymaps3-types'
import { onMounted, ref, shallowRef } from 'vue'

import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
} from 'vue-yandex-maps'

const userPosition = ref<LngLat>()
const error = ref<string | null>(null)

const map = shallowRef<null | YMap>(null)

onMounted(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        userPosition.value = [lng, lat]
      },
      (err) => {
        error.value = `Ошибка: ${err.message}`
        console.error(error.value)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    )
  }
  else {
    error.value = 'Геолокация не поддерживается в этом браузере.'
  }
})
</script>

<template>
  <q-page>
    <YandexMap
      v-if="userPosition"
      v-model="map"
      :settings="{
        location: {
          center: userPosition,
          zoom: 13,
        },
      }"
      width="100%"
      height="97dvh"
    >
      <YandexMapDefaultSchemeLayer />
      <YandexMapDefaultFeaturesLayer />

      <!-- 🔵 Маркер на позицию пользователя -->
      <YandexMapDefaultMarker
        :settings="{
          coordinates: userPosition,
        }"
      />
    </YandexMap>

    <div v-else class="q-pa-md">
      <q-spinner color="primary" size="2em" />
      <p>Определяем местоположение...</p>
    </div>

    <div v-if="error" class="text-negative q-pa-md">
      {{ error }}
    </div>
  </q-page>
</template>
