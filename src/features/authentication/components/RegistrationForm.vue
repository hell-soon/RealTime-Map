<script setup lang="ts">
import type { RegistrationPayload } from 'src/stores/auth.store'
import { useValidationRules } from 'src/composables/useValidationRules'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: RegistrationPayload): void
}>()

const { t } = useI18n()
const { requiredRule, emailRule, minLengthRule } = useValidationRules()

const formData = reactive<RegistrationPayload>({
  username: '',
  phone: '',
  email: '',
  password: '',
})

function submit() {
  emit('submit', formData)
}
</script>

<template>
  <div class="q-gutter-y-md">
    <q-input
      v-model="formData.username"
      :label="t('form.username')"
      lazy-rules
      :rules="[requiredRule]"
    />
    <q-input
      v-model="formData.phone"
      :label="t('form.phone')"
      mask="+7 (###) ###-##-##"
      unmasked-value
      lazy-rules
      :rules="[requiredRule]"
    />
    <q-input
      v-model="formData.email"
      :label="t('form.email')"
      type="email"
      lazy-rules
      :rules="[requiredRule, emailRule]"
    />
    <q-input
      v-model="formData.password"
      :label="t('form.password')"
      type="password"
      lazy-rules
      :rules="[requiredRule, minLengthRule(6)]"
    />
    <q-btn
      :label="t('buttons.createAccount')"
      type="submit"
      color="deep-purple-5"
      class="full-width q-mt-md"
      :loading="loading"
      unelevated
      @click="submit"
    />
  </div>
</template>
