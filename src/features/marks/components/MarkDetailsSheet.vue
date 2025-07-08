<script setup lang="ts">
import type { MarkFull } from '../types'
import BlurredImage from 'src/components/Ui/BlurredImage.vue'
import { markApi } from 'src/utils/api/mark'

const props = defineProps<{
  markId: string | number
}>()

const mark = ref<MarkFull | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const slide = ref(0)

async function fetchData() {
  isLoading.value = true
  error.value = null

  try {
    mark.value = await markApi.getMarkFull(props.markId)
  }
  catch (e) {
    console.error('Ошибка при загрузке данных о марке:', e)
    error.value = 'Не удалось загрузить данные. Попробуйте позже.'
  }
  finally {
    isLoading.value = false
  }
}

fetchData()

const photoUrls = computed(() => {
  if (mark.value && mark.value.photo && mark.value.photo.length > 0) {
    return mark.value.photo
  }
  return []
})

const hasMultiplePhotos = computed(() => photoUrls.value.length > 1)
const hasPhotos = computed(() => photoUrls.value.length > 0)
</script>

<template>
  <div>
    <div v-if="isLoading" class="q-pa-md">
      <q-skeleton height="300px" square />
      <q-skeleton type="text" class="text-h6 q-mt-md" />
      <q-skeleton type="text" class="text-subtitle2" />
      <q-skeleton type="text" class="q-mt-md" />
    </div>

    <div v-else-if="error" class="q-pa-md">
      <q-banner inline-actions class="text-white bg-red">
        {{ error }}
      </q-banner>
    </div>

    <template v-else-if="mark">
      <div v-if="hasPhotos" style="height: 300px;">
        <q-carousel
          v-if="hasMultiplePhotos"
          v-model="slide"
          animated
          swipeable
          infinite
          control-color="white"
          class="full-height"
        >
          <q-carousel-slide
            v-for="(url, index) in photoUrls"
            :key="url"
            :name="index"
            :img-src="url"
            class="q-pa-none"
          >
            <BlurredImage :src="url" />
          </q-carousel-slide>
        </q-carousel>
        <BlurredImage v-else :src="photoUrls[0]!" />
      </div>

      <q-card-section>
        <div class="text-h6">
          {{ mark.mark_name }}
        </div>
        <div class="text-subtitle2 text-grey">
          <q-avatar size="26px" class="q-mb-sm">
            <img :src="`${mark.owner.avatar}`">
          </q-avatar>
          {{ mark.owner.username }}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ mark.additional_info }}
      </q-card-section>
    </template>
  </div>
</template>
