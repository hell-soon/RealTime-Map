<script setup lang="ts">
import type { MarkFull } from '../types'
import { markApi } from 'src/utils/api/mark'
import { computed, ref } from 'vue'

const props = defineProps<{
  markId: string | number
}>()

const mark = ref<MarkFull | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

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

const slide = ref(0)

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
  <q-card class="mark-details-sheet">
    <div v-if="isLoading" class="q-pa-md">
      <q-skeleton height="200px" square />
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
      <div v-if="hasPhotos">
        <q-carousel
          v-if="hasMultiplePhotos"
          v-model="slide"
          animated
          swipeable
          arrows
          navigation
          infinite
          control-color="white"
          height="200px"
          class="bg-black"
        >
          <q-carousel-slide
            v-for="(url, index) in photoUrls"
            :key="url"
            :name="index"
            :img-src="url"
          />
        </q-carousel>
        <q-img v-else :src="photoUrls[0]" :ratio="16 / 9" style="height: 200px" />
      </div>
      <!-- <q-img v-else src="/placeholder.png" :ratio="16 / 9" style="height: 200px">
        <div class="absolute-full text-subtitle2 flex flex-center">
          Нет изображения
        </div>
      </q-img> -->

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

    <q-card-actions align="right">
      <q-btn v-close-popup flat color="primary" label="Закрыть" />
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped>
.mark-details-sheet {
  width: 100%;
  max-width: 500px;
}
</style>
