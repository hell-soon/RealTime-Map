<script setup lang="ts">
import type { LngLat } from '@yandex/ymaps3-types'
import { YandexMapMarker } from 'vue-yandex-maps'

interface Media {
  photoUrl?: string | undefined
  icon?: string
}

interface Props {
  coordinates: LngLat
  draggable?: boolean
  settings?: object
  media: Media
}

const props = withDefaults(defineProps<Props>(), {
  draggable: false,
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
    <div
      class="custom-map-marker"
      :class="{ draggable: props.draggable }"
    >
      <template v-if="props.media?.photoUrl">
        <div class="marker__block">
          <img
            :src="props.media?.photoUrl"
            class="marker-photo"
            alt="photo"
          >
        </div>
      </template>

      <template v-else-if="props.media?.icon">
        <div class="marker__block">
          <q-icon
            :name="props.media?.icon"
            class="marker-icon--quasar"
          />
        </div>
      </template>

      <template v-else>
        <div class="marker-icon" />
      </template>

      <div class="marker-pulse" />
    </div>
  </YandexMapMarker>
</template>

<style scoped lang="scss">
.custom-map-marker {
  position: relative;
  width: 48px;
  height: 60px;
  transform: translate(-50%, -100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.draggable {
  cursor: grab;
}

.marker__block {
  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: #3399ff;
    z-index: 1;
  }
}

.marker-icon--quasar {
  font-size: 25px;
  color: #3399ff;
  background-color: white;
  border-radius: 50%;
  padding: 6px;
  border: 4px solid #3399ff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

.marker-photo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #3399ff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
  background-color: white;
  position: relative;
  z-index: 2;
}

.marker-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(145deg, #66ccff, #0066cc);
  border: 3px solid white;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  position: relative;
  top: 5px;
  animation: pop-in 0.3s ease;
}

.marker-pulse {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 24px;
  height: 24px;
  background: rgba(0, 153, 255, 0.3);
  border-radius: 50%;
  animation: pulse 2s infinite;
  z-index: 0;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  70% {
    transform: scale(1.6);
    opacity: 0;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

@keyframes pop-in {
  0% {
    transform: scale(0.5) rotate(-45deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(-45deg);
    opacity: 1;
  }
}

.custom-map-marker:active {
  cursor: grabbing;
}
</style>
