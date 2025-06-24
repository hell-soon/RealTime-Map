<script setup lang="ts">
import { QForm, useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth.store'

const emit = defineEmits(['success'])
const $q = useQuasar()
const form = ref<QForm | null>(null)
const isRegisterMode = ref(false)
const email = ref('')
const password = ref('')
const username = ref('')
const phone = ref('')
const serverError = ref<string | null>(null)
const isLoading = ref(false)

const title = computed(() => isRegisterMode.value ? 'Регистрация' : 'Авторизация')
const authStore = useAuthStore()

function toggleMode() {
  isRegisterMode.value = !isRegisterMode.value
  form.value?.resetValidation()
  serverError.value = null
}

async function onSubmit() {
  const isValid = await form.value?.validate()
  if (!isValid)
    return

  isLoading.value = true
  serverError.value = null

  try {
    if (isRegisterMode.value) {
      await authStore.registration({
        email: email.value,
        password: password.value,
        username: username.value,
        phone: phone.value,
      })
      $q.notify({
        color: 'positive',
        message: 'Регистрация успешна!',
        icon: 'check_circle',
      })
      toggleMode()
    }
    else {
      await authStore.login({
        username: email.value,
        password: password.value,
      })
      emit('success')
    }
  }
  catch (error: any) {
    serverError.value = error.response?.data?.message || 'Произошла ошибка.'
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="glass-card">
    <div class="text-h5 text-white text-center q-mb-lg">
      {{ title }}
    </div>

    <QForm ref="form" @submit.prevent="onSubmit">
      <transition name="fade-form" mode="out-in">
        <div v-if="!isRegisterMode" key="login" class="q-gutter-y-md">
          <q-input v-model="email" dark standout="bg-blue-grey-10" label="Email" type="email" :rules="[val => !!val || '']" />
          <q-input v-model="password" dark standout="bg-blue-grey-10" label="Пароль" type="password" :rules="[val => !!val || '']" />
          <q-btn label="Войти" type="submit" color="teal" class="full-width q-mt-md" :loading="isLoading" unelevated />
        </div>
        <div v-else key="register" class="q-gutter-y-md">
          <q-input v-model="username" dark standout="bg-blue-grey-10" label="Имя пользователя" :rules="[val => !!val || '']" />
          <q-input v-model="phone" dark standout="bg-blue-grey-10" label="Телефон" mask="+7 (###) ###-##-##" :rules="[val => !!val || '']" />
          <q-input v-model="email" dark standout="bg-blue-grey-10" label="Email" type="email" :rules="[val => !!val || '']" />
          <q-input v-model="password" dark standout="bg-blue-grey-10" label="Пароль" :rules="[val => val.length >= 6 || 'Минимум 6 символов']" />
          <q-btn label="Создать аккаунт" type="submit" color="deep-purple-5" class="full-width q-mt-md" :loading="isLoading" unelevated />
        </div>
      </transition>
    </QForm>

    <q-btn
      :label="isRegisterMode ? 'Уже есть аккаунт?' : 'Создать аккаунт'"
      flat
      no-caps
      class="full-width q-mt-md text-cyan-2"
      @click="toggleMode"
    />

    <transition name="fade-form">
      <q-banner v-if="serverError" rounded class="bg-red-9 text-white q-mt-md">
        <template #avatar>
          <q-icon name="warning" />
        </template>
        {{ serverError }}
      </q-banner>
    </transition>
  </div>
</template>

<style scoped>
.glass-card {
  width: 400px;
  max-width: 90vw;
  padding: 32px;

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.fade-form-enter-active,
.fade-form-leave-active {
  transition: opacity 0.3s ease;
}

.fade-form-enter-from,
.fade-form-leave-to {
  opacity: 0;
}
</style>
