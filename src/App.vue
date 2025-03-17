<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAdapterStore } from '@/stores/adapter'

const store = useAdapterStore()

onMounted(async () => {
  await store.connect({providerURL: 'https://matrix.org'})
})
</script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
