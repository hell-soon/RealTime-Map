<script setup lang="ts">
import Header from 'components/Header/Index.vue'
import { useQuasar } from 'quasar'
import { useTheme } from 'src/features/settings/composables/useInitialTheme'
import { useDialogStore } from 'src/stores/dialog'

const $q = useQuasar()
const dialog = useDialogStore()

useTheme()

$q.addressbarColor.set('#1976D2')
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="dialog.show">
      <component
        :is="dialog.component"
        v-bind="dialog.props"
      />
    </q-dialog>
  </q-layout>
</template>
