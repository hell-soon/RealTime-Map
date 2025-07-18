<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types'
import { debounce } from 'quasar'
import MapMarker from 'src/components/Ui/MapMarker.vue'
import { useDialogStore } from 'src/stores/dialog'
import { useMarksSocket } from '../composables/useMarksSocket'

const props = defineProps<{
  coordinates: LngLat
}>()

const dialogStore = useDialogStore()
const { marks, fetchMarks } = useMarksSocket()

const debouncFetchMark = debounce((coordinat: LngLat) => {
  const [longitude, latitude] = coordinat
  fetchMarks({
    show_ended: true,
    longitude,
    latitude,
    radius: 100000,
  })
}, 300)

watch(
  () => props.coordinates,
  (newCord) => {
    if (newCord)
      debouncFetchMark(newCord)
  },
)

const MarkDetailsSheet = defineAsyncComponent(
  () => import('./MarkDetailsSheet.vue'),
)

function handleMarkClick(markId: string | number) {
  dialogStore.openDialog(MarkDetailsSheet, { markId }, '')
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
