<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth'
import { useDialogStore } from 'src/stores/dialog'
import { useI18n } from 'vue-i18n'
import LoginModal from './LoginModal.vue'

const dialog = useDialogStore()
const { t } = useI18n()
const authStore = useAuthStore()

const AVATAR_PLACEHOLDER = 'https://cdn.quasar.dev/img/boy-avatar.png'

function openLogin() {
  dialog.openDialog(LoginModal, {}, '')
}
</script>

<template>
  <div v-if="!authStore.token">
    <q-item

      v-ripple
      clickable
      style="height: 70px;"
      @click="openLogin"
    >
      <q-item-section avatar>
        <q-icon name="account_circle" size="36px" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-weight-bold">
          {{ t('auth.login') }}
        </q-item-label>
        <q-item-label caption class="text-grey-6">
          {{ t('auth.loginDescription') }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
  <q-img
    v-else
    src="https://cdn.quasar.dev/img/material.png" style="height: 150px"
  >
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="56px" class="q-mb-sm">
        <img :src="authStore.user?.avatar || AVATAR_PLACEHOLDER">
      </q-avatar>
      <div
        class="text-weight-bold"
      >
        {{ authStore.user?.username }}
      </div>
      <div>
        {{ authStore.user?.email }}
      </div>
    </div>
  </q-img>
</template>
