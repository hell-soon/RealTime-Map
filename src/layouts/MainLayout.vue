<script setup lang="ts">
import Header from 'components/Header/Index.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

$q.addressbarColor.set('#1976D2')
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
