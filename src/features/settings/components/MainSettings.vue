<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth.store'
import { useDialogStore } from 'src/stores/dialog'
import { useI18n } from 'vue-i18n'
import ThemeToggle from './ThemeToggle.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const { closeDialog } = useDialogStore()

function logoutAndClose() {
  authStore.logout()
  closeDialog()
}
</script>

<template>
  <q-card-section class="row items-center q-pb-none">
    <div class="text-h6">
      {{ t('menu.header') }}
    </div>

    <q-space />
  </q-card-section>

  <q-card-section>
    <ThemeToggle />
  </q-card-section>

  <q-separator />

  <q-card-actions v-if="authStore.token">
    <q-btn
      flat
      no-caps
      class="full-width"
      color="negative"
      icon="logout"
      :label="t('auth.logout')"
      @click="logoutAndClose"
    />
  </q-card-actions>
</template>
