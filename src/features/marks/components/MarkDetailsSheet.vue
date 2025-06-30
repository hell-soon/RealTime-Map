<script setup lang="ts">
import type { Mark } from '../types/idnex'

const props = defineProps<{
  mark: Mark
}>()

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const imageUrl = computed(() => {
  if (props.mark.photo && props.mark.photo.length > 0) {
    return API_BASE_URL + props.mark.photo[0]
  }
  return '/placeholder.png'
})
</script>

<template>
  <q-card>
    <q-img :src="imageUrl" :ratio="16 / 9" />

    <q-card-section>
      <div class="text-h6">
        {{ props.mark.mark_name }}
      </div>
      <div class="text-subtitle2">
        Координаты: {{ props.mark.geom.coordinates.join(', ') }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ props.mark.duration }}
    </q-card-section>

    <q-card-actions align="right">
      <q-btn v-close-popup flat color="primary" label="Закрыть" />
    </q-card-actions>
  </q-card>
</template>
