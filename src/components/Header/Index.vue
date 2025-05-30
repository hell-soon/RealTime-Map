<script setup lang="ts">
import type { EssentialLinkProps } from 'src/components/Header/EssentialLink.vue'
import EssentialLink from 'src/components/Header/EssentialLink.vue'
import MainSettings from 'src/features/settings/components/MainSettings.vue'
import { useDialogStore } from 'src/stores/dialog'
import { useI18n } from 'vue-i18n'

const $t = useI18n().t

const linksList: EssentialLinkProps[] = [
  {
    title: $t('menu.map.title'),
    caption: $t('menu.map.caption'),
    icon: 'map',
    link: '/',
  },
  {
    title: $t('menu.chat.title'),
    caption: $t('menu.chat.caption'),
    icon: 'message',
    link: '/message',
  },
]

const leftDrawerOpen = ref(false)
const dialog = useDialogStore()

function openSettings() {
  dialog.openDialog(MainSettings)
  leftDrawerOpen.value = false
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
    </q-toolbar>
  </q-header>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    class="drawer-style column justify-between"
  >
    <q-list>
      <q-item-label
        class="text-primary text-bold text-subtitle2 q-pa-sm"
        header
      >
        {{ $t('menu.header') }}
      </q-item-label>

      <EssentialLink
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
      />
    </q-list>

    <div class="q-pa-sm">
      <q-btn
        clickable
        flat
        dense
        icon="settings"
        @click="openSettings"
      />
    </div>
  </q-drawer>
</template>

<style scoped>
.drawer-style {
  min-width: 220px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #ccc;
}
</style>
