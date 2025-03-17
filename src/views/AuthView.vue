<template>
  <v-container class="auth-block">
    <v-row align="center" justify="center">
      <v-col xs="12" sm="12" md="6" lg="4">
        <v-card elevation="1">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Авторизация</v-toolbar-title>
          </v-toolbar>

          <auth-phone @submit="formGetSubmit" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthPhone from '@/components/Auth/AuthPhone.vue'

const router = useRouter()
const authStore = useAuthStore()

const formGetSubmit = async (params: any) => {
  await authStore.authLogin(params)
  router.push('/')
}

</script>

<style>
  .auth-block {
    height: 100%;
    display: flex;
  }
</style>