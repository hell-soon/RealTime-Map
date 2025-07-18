<script setup lang="ts">
import type { EssentialLinkProps } from 'src/components/Header/EssentialLink.vue'
import EssentialLink from 'src/components/Header/EssentialLink.vue'
import { useWebSocket } from 'src/composables/useWebSocket'
import profileMini from 'src/features/authentication/components/profileMini.vue'
import MainSettings from 'src/features/settings/components/MainSettings.vue'
import { useDialogStore } from 'src/stores/dialog'
import { useI18n } from 'vue-i18n'

const $t = useI18n().t

interface CountUser {
  count: number
}

const MARKS_NAMESPACE = '/count'
const userActive = ref<CountUser>()

function useCountUser() {
  const { on, emit, getSocketState } = useWebSocket()

  const socketState = getSocketState(MARKS_NAMESPACE)
  if (!socketState?.isConnected) {
    console.error('[COUNT] Сокет не подключен')
    return
  }

  on(MARKS_NAMESPACE, 'user_count', (data: any) => {
    userActive.value = data
  })

  emit(MARKS_NAMESPACE, 'user_count')
}

// говнокод ON
setTimeout(() => {
  useCountUser()
}, 100)
// говнокод OFF

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
  // leftDrawerOpen.value = false
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
  >
    <profileMini />
    <q-list>
      <EssentialLink
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
      />
    </q-list>

    <h5>{{ userActive?.count }}</h5>

    <div class="absolute-bottom q-pa-sm">
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
