<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types'
import type { Mark } from '../types/idnex'
import MapMarker from 'src/components/Ui/MapMarker.vue'
import { useDialogStore } from 'src/stores/dialog'
import { useMarksSocket } from '../composables/useMarksSocket'

const props = defineProps<{
  coordinates: LngLat
}>()

const dialogStore = useDialogStore()
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const { marks, fetchMarks } = useMarksSocket()

if (props.coordinates) {
  const [longitude, latitude] = props.coordinates
  fetchMarks({
    longitude,
    latitude,
    radius: 5000,
  })
}

const MarkDetailsSheet = defineAsyncComponent(
  () => import('./MarkDetailsSheet.vue'),
)

function handleMarkClick(mark: Mark) {
  dialogStore.openDialog(MarkDetailsSheet, { mark })
}
</script>

<template>
  <MapMarker
    v-for="mark in marks"
    :key="mark.id"
    :coordinates="mark.geom.coordinates as any"
    :draggable="false"
    :title="mark.mark_name"
    :media="{
      photoUrl: API_BASE_URL + mark.photo[0]!,
    }"
    @click="handleMarkClick(mark as any)"
  />
</template>
