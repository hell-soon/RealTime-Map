<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types'
import MapMarker from 'src/components/Ui/MapMarker.vue'
import { useDialogStore } from 'src/stores/dialog'
import { useMarksSocket } from '../composables/useMarksSocket'

const props = defineProps<{
  coordinates: LngLat
}>()

const dialogStore = useDialogStore()
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

function handleMarkClick(markId: string | number) {
  dialogStore.openDialog(MarkDetailsSheet, { markId })
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
      photoUrl: mark.photo ? mark.photo[0] : undefined,
    }"
    @click="handleMarkClick(mark.id)"
  />
</template>
