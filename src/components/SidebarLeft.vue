<template>
  <v-navigation-drawer
    app
    permanent
  >
    <v-card v-if="currentUser" link>
      <v-card-title class="mt-4 text-h6">
        {{ currentUser.displayName }}
      </v-card-title>
    </v-card>

    <v-divider />

    <v-list v-if="currentRoom">
      <v-list-item
        v-for="room in roomList"
        :key="room.roomId"
        :class="{'active-chat': room.roomId === currentRoom.roomId}"
        class="d-flex between align-center"
        @click="chooseRoom(room.roomId)"
      >
        <v-list-item-title>{{ room.name }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="px-3 mb-12">
        <v-btn
          color="primary"
          block
        >
          Взять чат
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { useChatStore } from '@/stores/chat'
  import { computed, onMounted } from 'vue'

  const chatStore = useChatStore()

  const currentUser = computed(() => {
    return chatStore.currentUser
  })

  const roomList = computed(() => {
    return chatStore.rooms
  })

  const contactsList = computed(() => {
    return chatStore.contacts
  })

  const currentRoom = computed(() => {
    return chatStore.currentRoom
  })

  const chooseRoom = (contactId: any) => {
    chatStore.chooseRoom(contactId)
  }

  onMounted(() => {
    chatStore.loadRooms()
    chatStore.loadUsers()

    const firstRoom = roomList.value[0]
    if (firstRoom) {
      chooseRoom(firstRoom.roomId)
    }
  })
</script>

<style>
  .active-chat {
    background-color: #FDF8F4 !important; 
  }
</style>
