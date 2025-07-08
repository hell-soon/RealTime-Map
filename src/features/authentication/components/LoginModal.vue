<script setup lang="ts">
import type { LoginPayload, RegistrationPayload } from 'src/stores/auth.store'
import { QForm } from 'quasar'
import { useDialogStore } from 'src/stores/dialog'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../composables/useAuth'
import LoginForm from './LoginForm.vue'
import RegistrationForm from './RegistrationForm.vue'

const emit = defineEmits(['success'])
const { t } = useI18n()
const dialog = useDialogStore()

const { isLoading, submit } = useAuth()

const formRef = ref<QForm | null>(null)
const isRegisterMode = ref(false)

const currentFormComponent = computed(() => (isRegisterMode.value ? RegistrationForm : LoginForm))

const title = computed(() =>
  isRegisterMode.value ? t('auth.register') : t('auth.login'),
)

function toggleMode() {
  isRegisterMode.value = !isRegisterMode.value
  formRef.value?.resetValidation()
}

async function onSubmit(payload: LoginPayload | RegistrationPayload) {
  const isValid = await formRef.value?.validate()
  if (!isValid)
    return

  const mode = isRegisterMode.value ? 'register' : 'login'
  const success = await submit(mode, payload)

  if (success) {
    if (isRegisterMode.value) {
      toggleMode()
    }
    else {
      dialog.closeDialog()
      emit('success')
    }
  }
}
</script>

<template>
  <div class="glass-card">
    <div class="text-h5 text-center q-mb-lg">
      {{ title }}
    </div>

    <QForm ref="formRef" @submit.prevent>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <component
          :is="currentFormComponent"
          :loading="isLoading"
          @submit="onSubmit"
        />
      </transition>
    </QForm>

    <q-btn
      :label="isRegisterMode ? t('auth.alreadyHaveAccount') : t('buttons.createAccount')"
      flat
      no-caps
      :disable="isLoading"
      class="full-width q-mt-md"
      @click="toggleMode"
    />
  </div>
</template>

<style scoped lang="scss">
.glass-card {
  height: 100%;
  padding: 32px;
}
</style>
