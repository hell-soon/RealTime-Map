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
      message: 'Fill in all fields',
    })
  }

  if (login.value === 'admin' && password.value === '123456') {
    user.login()
    router.push('/')
  }
  else {
    $q.notify({
      type: 'negative',
      message: 'Invalid username or password',
      position: 'top',
    })
  }
}
</script>

<template>
  <q-page>
    <div class="fixed-center" style="width: 100%; max-width: 300px">
      <h5 class="q-mb-md text-center">
        Welcome RealTime Map!
      </h5>

      <q-form
        ref="formRef"
        class="q-gutter-md"
        @submit.prevent="Auth"
      >
        <q-input
          v-model="login"
          filled
          label="Login -- admin"
          lazy-rules
          :rules="[val => !!val || 'Enter your login']"
        />

        <q-input
          v-model="password"
          filled
          label="Password -- 123456"
          type="password"
          lazy-rules
          :rules="[
            val => !!val || 'Enter the password',
            val => val.length >= 6 || 'Minimum of 6 characters',
          ]"
        />

        <q-btn
          label="Submit"
          color="primary"
          type="submit"
        />
      </q-form>
    </div>
  </q-page>
</template>
