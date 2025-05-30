<script setup lang="ts">
export interface EssentialLinkProps {
  title: string
  caption?: string
  link?: string
  icon?: string
};

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
})
</script>

<template>
  <q-item
    clickable
    :to="link"
    class="menu-item"
    active-class="bg-secondary text-white"
    exact
  >
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>
.menu-item {
  border-radius: 8px;
  margin: 4px 8px;
  transition: background-color 0.2s;
}
.menu-item:hover {
  background-color: #f0f0f0;
}
</style>
