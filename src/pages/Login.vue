<script setup lang="ts">
import { useUserStore } from 'stores/user'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const user = useUserStore()
const router = useRouter()

const login = ref('')
const password = ref('')
const formRef = ref()

function Auth() {
  const valid = formRef.value.validate()
  if (!valid) {
    $q.notify({
      type: 'negative',
      message: 'Заполните все поля',
    })
  }

  if (login.value === 'admin' && password.value === '123456') {
    user.login()
    router.push('/')
  }
  else {
    $q.notify({
      type: 'negative',
      message: 'Неверный логин или пароль',
      position: 'top',
    })
  }
}
</script>

<template>
  <q-page class="flex flex-center">
    <div style="width: 100%; max-width: 300px">
      <h5 class="q-mb-md text-center">
        Авторизация
      </h5>

      <q-form
        ref="formRef"
        class="q-gutter-md"
        @submit.prevent="Auth"
      >
        <q-input
          v-model="login"
          filled
          label="Логин -- admin"
          lazy-rules
          :rules="[val => !!val || 'Введите логин']"
        />

        <q-input
          v-model="password"
          filled
          label="Пароль -- 123456"
          type="password"
          lazy-rules
          :rules="[
            val => !!val || 'Введите пароль',
            val => val.length >= 6 || 'Минимум 6 символов',
          ]"
        />

        <q-btn
          label="Войти"
          color="primary"
          type="submit"
        />
      </q-form>
    </div>
  </q-page>
</template>
