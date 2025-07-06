<script setup lang="ts">
import type { YMap } from '@yandex/ymaps3-types'
import GeolocationFeedback from 'src/features/geolocation/components/GeolocationFeedback.vue'
import { useGeolocation } from 'src/features/geolocation/composables/useGeolocation'
import BaseMapView from 'src/features/map-core/components/BaseMapView.vue'
import MarksLayer from 'src/features/marks/components/MarksLayer.vue'

const { userPosition, error: geolocationError, isLoading: isLoadingGeolocation } = useGeolocation()
const mapApi = shallowRef<null | YMap>(null)

function handleMapReady(map: YMap) {
  mapApi.value = map
}
</script>

<template>
  <q-page class="column items-stretch" style="height: calc(100vh - 50px);">
    <GeolocationFeedback
      v-if="isLoadingGeolocation || geolocationError"
      :is-loading="isLoadingGeolocation"
      :error="geolocationError"
      class="absolute-center"
    />
    <BaseMapView
      v-if="!isLoadingGeolocation && !geolocationError && userPosition"
      :center-coordinates="userPosition"
      :zoom-level="15"
      :show-user-marker="true"
      :user-marker-settings="{ title: 'Мое местоположение', color: 'red' }"
      class="col"
      @map-ready="handleMapReady"
    >
      <MarksLayer
        :coordinates="userPosition"
      />
      <!-- <MapMarker
        :coordinates="[44.041146, 56.269901]"
        :draggable="false"
        :media="{
          photoUrl: 'https://avatars.githubusercontent.com/u/71484693?v=4',
        }"
      /> -->
    </BaseMapView>
    <div
      v-else-if="!isLoadingGeolocation && !geolocationError && !userPosition"
      class="column items-center justify-center fit text-grey-7"
    >
      <q-icon name="location_off" size="3em" />
      <p>Не удалось определить местоположение для отображения карты.</p>
    </div>
  </q-page>
</template>
