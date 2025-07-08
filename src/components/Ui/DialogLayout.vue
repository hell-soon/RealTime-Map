<script setup lang="ts">
import { useDialogStore } from 'src/stores/dialog'

const dialog = useDialogStore()
</script>

<template>
  <q-card class="dialog-sheet-layout">
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="arrow_back" @click="dialog.closeDialog" />
      <q-toolbar-title>
        {{ dialog.title }}
      </q-toolbar-title>
      <slot name="actions" />
    </q-toolbar>

    <!-- <q-separator /> -->

    <q-card-section class="scroll content-area">
      <slot />
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.dialog-sheet-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .content-area {
    flex-grow: 1;
    padding: 0;
  }
}
</style>
