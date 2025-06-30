<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types'
import MapMarker from 'src/components/Ui/MapMarker.vue'
import { useMarksSocket } from '../composables/useMarksSocket'

const props = defineProps<{
  coordinates: LngLat
}>()

const { marks, fetchMarks } = useMarksSocket()

if (props.coordinates) {
  const [longitude, latitude] = props.coordinates
  fetchMarks({
    longitude,
    latitude,
    radius: 5000,
  })
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
      photoUrl: mark.photo[0]!,
    }"
  />
</template>
