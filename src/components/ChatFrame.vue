<template>
  <v-container class="chat-frame pa-0">
    <v-col class="chat-frame__list border px-3">
      <v-row v-for="message in messagesList" :key="message.event_id" no-gutters>
        <!-- <template v-if="checkAuthorMessage(message.author_id)">
          
          <v-card class="mt-4" color="grey">
            <v-list-item>
              <div class="mb-2">
                {{ message.message_value }}
              </div>
              <v-list-item-subtitle class="text-right">
                {{ message.message_time }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-card>
        </template> -->
          <v-spacer />
          <v-card class="mt-4">
            <v-list-item>
              <div class="mb-2">
                {{ message.content?.body }}
              </div>
              <!-- <v-list-item-subtitle class="text-right">
                {{ message.message_time }}
              </v-list-item-subtitle> -->
            </v-list-item>
          </v-card>
      </v-row>
    </v-col>

    <div class="chat-frame__message-bar pa-3 pb-7">
      <v-text-field v-model="message" append-outer-icon="mdi-send" clear-icon="mdi-close-circle" filled clearable
        hide-details label="Сообщение" type="text" @click:append-outer="sendMessage(message)"
        @keydown.enter="sendMessage(message)" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const authStore = useAuthStore()
const message = ref('')


const messagesList = computed(() => {
  return chatStore.messages.filter(el => el.type === 'm.room.message')
})

const userId = computed(() => {
  return authStore.userId
})

const checkAuthorMessage = (authorId: string) => {
  return authorId === userId.value
}
const sendMessage = (text: string) => {
  if (text === '' || text === null || text.length > 256) {
    return null
  }
  // socket.emit('newMessage', {
  //  message
  // })

  chatStore.addNewMessage({
    message_value: text,
    message_time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    author_id: userId.value,
    author_name: authStore.userName
  })

  message.value = ''
}

onMounted(() => {
  // socket.on('newMessage', message => {
  //   chatStore.addNewMessage(message)
  // })
})
</script>

<style>
.chat-frame {
  width: 100%;
  padding-bottom: 97px !important;

  .chat-frame__message-bar {
    max-width: inherit;
    width: inherit;
    position: sticky;
    bottom: 0px;
    background-color: white;
    border-top: 1px solid #cbc9c9;
  }
}
</style>
