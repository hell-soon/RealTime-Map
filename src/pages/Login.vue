<script setup lang="ts">
import { useUserStore } from 'stores/user'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()

const login = ref('')
const password = ref('')

function Auth() {
  user.login()
  router.push('/')
}
</script>

<template>
  <q-page padding>
    <h5>Авторизация, ну почти</h5>
    <div class="q-gutter-md">
      <q-input v-model="login" square filled label="Login" />
      <q-input v-model="password" square filled label="Password" />
      <q-btn label="Войти" color="primary" @click="Auth" />
    </div>
  </q-page>
</template>
