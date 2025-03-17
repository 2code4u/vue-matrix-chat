<template>
  <v-form ref="form" @submit.prevent="actLogin">
    <v-card-text>
      <v-text-field v-model="providerURL" outlined label="Адрес сервера" :error-messages="codeErrorCodes"
        :loading="codeLoading" @input="handleInput" />

      <v-text-field v-model="login" autofocus outlined label="Имя пользователя" :error-messages="codeErrorCodes"
        :loading="codeLoading" @input="handleInput" />

      <v-text-field v-model="password" outlined type="password" label="Пароль" :error-messages="codeErrorCodes"
        :loading="codeLoading" @input="handleInput" />
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="actLogin">
        Войти
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const emit = defineEmits<{
  submit: any
}>();

const authStore = useAuthStore()
const router = useRouter()

const codeErrorCodes = ref([])
const codeLoading = ref(false)
const providerURL = ref('matrix.org')
const login = ref('')
const password = ref('')

const handleInput = () => {
  codeErrorCodes.value = []
}

const actLogin = async () => {
  codeErrorCodes.value = []
  if (codeLoading.value) {
    return null
  }
  codeLoading.value = true

  try {
    const params = {
      'login': login.value,
      'password': password.value,
      'providerURL': providerURL.value
    }
    emit('submit', params)
  } catch (error: unknown) {
    // @ts-ignore
    codeErrorCodes.value.push(error?.text)
  }
  codeLoading.value = false
}

</script>
