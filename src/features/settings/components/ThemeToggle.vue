<script setup lang="ts">
import { useTheme } from '../composables/useInitialTheme'

const { theme, themeIndex } = useTheme()
</script>

<template>
  <q-card flat bordered class="theme-toggle-card">
    <div class="theme-toggle-container">
      <div
        class="theme-toggle-background"
        :style="{ transform: `translateX(${themeIndex * 100}%)` }"
      />
      <q-btn
        flat
        no-caps
        no-wrap
        ripple="false"
        icon="settings_brightness"
        :label="$t('theme.auto')"
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
        :label="$t('theme.light')"
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
        :label="$t('theme.dark')"
        class="theme-toggle-btn"
        :class="{ active: theme === true }"
        @click="theme = true"
      />
    </div>
  </q-card>
</template>

<style lang="scss">
.theme-toggle {
  &-card {
    width: 100%;
    max-width: 340px;
    margin: auto;
    padding: 8px;

    @media screen and (max-width: 340px) {
      .q-btn {
        &__content {
          .on-left {
            margin: 0;
          }

          span {
            display: none !important;
          }
        }
      }
    }
  }

  &-container {
    display: flex;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: transparent;
  }

  &-btn {
    flex: 1;
    z-index: 1;
    transition: color 0.3s ease;
    justify-content: center;
    font-weight: 500;
    color: var(--q-primary);
    width: 33%;

    &.active {
      color: white;
      font-weight: bold;
    }
  }

  &-background {
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
}
</style>
