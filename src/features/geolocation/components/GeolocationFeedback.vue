<script setup lang="ts">
interface Props {
  isLoading: boolean
  error: string | null
}
defineProps<Props>()
</script>

<template>
  <div v-if="isLoading" class="column items-center justify-center q-pa-md">
    <q-spinner color="primary" size="3em" />
    <p class="q-mt-sm">
      Определяем ваше местоположение...
    </p>
  </div>
  <div v-else-if="error" class="column items-center justify-center text-negative q-pa-md">
    <q-icon name="warning" size="2.5em" />
    <p class="q-mt-sm text-center">
      {{ error }}
    </p>
    <!-- Можно добавить кнопку "Попробовать снова", если useGeolocation экспортирует fetchGeolocation -->
  </div>
</template>
