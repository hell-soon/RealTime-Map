<script setup lang="ts">
const slideVol = ref(0)
const slideAlarm = ref(0)
const slideVibration = ref(0)
</script>

<template>
  <q-card style="width: 300px" class="q-px-sm q-pb-md">
    <q-card-section>
      <div class="text-h6">
        Volumes
      </div>
    </q-card-section>

    <q-item-label header>
      Media volume
    </q-item-label>
    <q-item dense>
      <q-item-section avatar>
        <q-icon name="volume_up" />
      </q-item-section>
      <q-item-section>
        <q-slider v-model="slideVol" color="teal" :step="0" />
      </q-item-section>
    </q-item>

    <q-item-label header>
      Alarm volume
    </q-item-label>
    <q-item dense>
      <q-item-section avatar>
        <q-icon name="alarm" />
      </q-item-section>
      <q-item-section>
        <q-slider v-model="slideAlarm" color="teal" :step="0" />
      </q-item-section>
    </q-item>

    <q-item-label header>
      Ring volume
    </q-item-label>
    <q-item dense>
      <q-item-section avatar>
        <q-icon name="vibration" />
      </q-item-section>
      <q-item-section>
        <q-slider v-model="slideVibration" color="teal" :step="0" />
      </q-item-section>
    </q-item>
  </q-card>
</template>
