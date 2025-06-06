<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types'
import { YandexMapMarker } from 'vue-yandex-maps'

interface Props {
  coordinates: LngLat
  draggable?: boolean
  settings?: object
}

const props = withDefaults(defineProps<Props>(), {
  draggable: true,
  settings: () => ({}),
})

const emit = defineEmits<{
  (e: 'dragend', newCoordinates: LngLat): void
  (e: 'drag', currentCoordinates: LngLat): void
}>()

const currentCoordinates = ref<LngLat>([...props.coordinates])

watch(() => props.coordinates, (newCoords) => {
  currentCoordinates.value = [...newCoords]
}, { deep: true })

function handleDragEnd(event: any) {
  const newCoords = event.coordinates as LngLat
  currentCoordinates.value = newCoords
  emit('dragend', newCoords)
}

function handleDrag(event: any) {
  const currentCoords = event.coordinates as LngLat
  emit('drag', currentCoords)
}

onMounted(() => {
  if (props.coordinates) {
    currentCoordinates.value = [...props.coordinates]
  }
})
</script>

<template>
  <YandexMapMarker
    :settings="{
      coordinates: currentCoordinates,
      draggable: props.draggable,
    }"
    @dragend="handleDragEnd"
    @drag="handleDrag"
  >
    <div class="custom-map-marker">
      <!-- <QIcon name="place" color="red" size="32px" /> -->
      <!-- <div class="marker-shape"></div> -->
    </div>
  </YandexMapMarker>
</template>

<style scoped>
.custom-map-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 2px solid blue;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  cursor: grab;
}

.custom-map-marker {
    transform: translate(-50%, -100%);
}

.custom-map-marker:active {
    cursor: grabbing;
}
</style>
