<script setup lang="ts">
import { useDialogStore } from 'src/stores/dialog'
import { useI18n } from 'vue-i18n'
import LoginModal from './LoginModal.vue'

const dialog = useDialogStore()
const { t } = useI18n()

function openLogin() {
  dialog.openDialog(LoginModal)
}
</script>

<template>
  <div>
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
  <!-- <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="56px" class="q-mb-sm">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
      </q-avatar>
      <div
        class="text-weight-bold"
      >
        Razvan Stoenescu
      </div>
      <div>@rstoenescu</div>
    </div>
  </q-img> -->
</template>
