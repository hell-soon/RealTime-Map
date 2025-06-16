<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue'

export interface Props {
  isLoading: boolean
  error?: string | null
}
defineProps<Props>()
</script>

<template>
  <q-card>
    <ThemeToggle />
  </q-card>
</template>
