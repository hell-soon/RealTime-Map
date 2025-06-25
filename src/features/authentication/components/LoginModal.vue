<script setup lang="ts">
import type { LoginPayload, RegistrationPayload } from 'src/stores/auth.store'
import { QForm } from 'quasar'
import { useDialogStore } from 'src/stores/dialog'
import { computed, ref } from 'vue'
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
    <div class="text-h5 text-white text-center q-mb-lg">
      {{ title }}
    </div>

    <QForm ref="formRef" @submit.prevent>
      <transition name="fade-form" mode="out-in">
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
      class="full-width q-mt-md text-cyan-2"
      @click="toggleMode"
    />
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
