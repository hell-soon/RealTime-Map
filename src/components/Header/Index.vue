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

      <q-toolbar-title>
        RealTime Map
      </q-toolbar-title>

      <div>RealTime Map v 0.0.1</div>
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
  >
    <q-list>
      <q-item-label
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
