<script setup lang="ts">
import MapMarker from 'src/components/Ui/MapMarker.vue'
import { useMarksSocket } from '../composables/useMarksSocket'

const { marks } = useMarksSocket()
</script>

<template>
  <MapMarker
    v-for="mark in marks"
    :key="mark.id"
    :coordinates="[mark.lng, mark.lat]"
    :draggable="false"
    :media="{
      photoUrl: mark.photoUrl,
    }"
    :title="mark.name"
  />
</template>
