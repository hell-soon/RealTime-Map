<script setup lang="ts">
import type { EssentialLinkProps } from 'src/components/Header/EssentialLink.vue'
import EssentialLink from 'src/components/Header/EssentialLink.vue'

const linksList: EssentialLinkProps[] = [
  {
    title: 'Map',
    caption: 'Actual Map',
    icon: 'map',
    link: '/',
  },
  {
    title: 'Chat',
    caption: 'Personal Chat',
    icon: 'message',
    link: '/message',
  },
  {
    title: 'Settings',
    caption: 'App Settings',
    icon: 'settings',
    link: '/settings',
  },
]

const leftDrawerOpen = ref(false)

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
    class="bg-grey-1 drawer-style"
  >
    <q-list>
      <q-item-label
        class="text-primary text-bold text-subtitle2 q-pa-sm"
        header
      >
        Menu
      </q-item-label>

      <EssentialLink
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
      />
    </q-list>
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
