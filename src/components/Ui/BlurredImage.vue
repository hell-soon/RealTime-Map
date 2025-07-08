<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <div class="blurred-image-container">
    <q-img
      :src="src"
      class="blurred-image__background"
      :draggable="false"
    />
    <q-img
      :src="src"
      class="blurred-image__foreground"
      fit="contain"
      :draggable="false"
    />
  </div>
</template>

<style lang="scss" scoped>
.blurred-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
}

.blurred-image__background {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  filter: blur(15px);
  transform: scale(1.1);
  opacity: 0.7;
}

.blurred-image__foreground {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
