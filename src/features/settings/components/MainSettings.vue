<script setup lang="ts">
const $q = useQuasar()

const theme = ref<'auto' | false | true>($q.dark.mode)

watch(theme, (val) => {
  $q.dark.set(val)
})

const index = computed(() => {
  return theme.value === 'auto' ? 0 : theme.value === false ? 1 : 2
})
</script>

<template>
  <q-card flat bordered class="theme-toggle-card">
    <div class="theme-toggle-container">
      <div class="theme-toggle-background" :style="{ transform: `translateX(${index * 100}%)` }" />

      <q-btn
        flat
        no-caps
        no-wrap
        ripple="false"
        icon="settings_brightness"
        label="Auto"
        class="theme-toggle-btn"
        :class="{ active: theme === 'auto' }"
        @click="theme = 'auto'"
      />
      <q-btn
        flat
        no-caps
        no-wrap
        ripple="false"
        icon="light_mode"
        label="Light"
        class="theme-toggle-btn"
        :class="{ active: theme === false }"
        @click="theme = false"
      />
      <q-btn
        flat
        no-caps
        no-wrap
        ripple="false"
        icon="dark_mode"
        label="Night"
        class="theme-toggle-btn"
        :class="{ active: theme === true }"
        @click="theme = true"
      />
    </div>
  </q-card>
</template>

<style>
.theme-toggle-card {
  width: 100%;
  max-width: 340px;
  margin: auto;
  padding: 8px;
}

.theme-toggle-container {
  display: flex;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: transparent;
}

.theme-toggle-btn {
  flex: 1;
  z-index: 1;
  transition: color 0.3s ease;
  justify-content: center;
  font-weight: 500;
  color: var(--q-primary);
}

.theme-toggle-btn.active {
  color: white;
  font-weight: bold;
}

.theme-toggle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 33.3333%;
  height: 100%;
  background-color: #1976d2;
  border-radius: 0;
  transition: transform 0.3s ease;
  z-index: 0;
}
</style>
