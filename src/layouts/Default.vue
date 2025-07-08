<script setup lang="ts">
import Header from 'components/Header/Index.vue'
import DialoLayout from 'src/components/Ui/DialogLayout.vue'
import { useTheme } from 'src/features/settings/composables/useInitialTheme'
import { useDialogStore } from 'src/stores/dialog'

const dialog = useDialogStore()

useTheme()
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog
      v-model="dialog.show"
      position="right"
      maximized
    >
      <DialoLayout v-if="dialog.component">
        <component
          :is="dialog.component"
          v-bind="dialog.props"
        />
      </DialoLayout>
    </q-dialog>
  </q-layout>
</template>

<style lang="scss">
.fixed-right {
  width: 100%;
}
</style>
