<script setup lang="ts">
  import SystemBar from '@/components/SystemBar.vue'
  import SidebarLeft from '@/components/SidebarLeft.vue'
  import ChatFrame from '@/components/ChatFrame.vue'
  import SidebarRight from '@/components/SidebarRight.vue'

  import { useAdapterStore } from '@/stores/adapter'
  import { ref } from 'vue'

  const adapter = useAdapterStore()
  const syncReady = adapter.syncReady
</script>

<template>
  <system-bar />
  <v-skeleton-loader
    :loading="!syncReady"
    type="table-heading, list-item-two-line, image, table-tfoot"
  >
    <sidebar-left />
    <chat-frame />
    <sidebar-right />
  </v-skeleton-loader>
</template>
