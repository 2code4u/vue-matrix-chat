<template>
  <v-navigation-drawer
    app
    permanent
    location="right"
    width="324"
  >
    <v-expansion-panels
      v-if="currentRoom"
      multiple
      class="pa-4"
    >
      <v-expansion-panel class="my-4">
        <v-expansion-panel-title>
          <h3>Создатель</h3>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          {{ currentRoom.getCreator() }}
          {{ currentRoom.getMxcAvatarUrl() }}
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel class="my-4">
        <v-expansion-panel-title>
          <h3>Список участников</h3>
        </v-expansion-panel-title>

        <v-expansion-panel-text
          v-for="info in currentRoom.getJoinedMembers()"
          :key="info"
        >
          {{ info.name }}
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel class="my-4">
        <v-expansion-panel-title>
          <h3>Список событий</h3>
        </v-expansion-panel-title>

        <v-expansion-panel-text
          v-for="info in currentRoom.timeline"
          :key="info"
        >
          {{ info.event.content }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { useChatStore } from '@/stores/chat'
  import { computed } from 'vue'

  const chatStore = useChatStore()

  const currentRoom = computed(() => {
    return chatStore.currentRoom
  })
</script>
