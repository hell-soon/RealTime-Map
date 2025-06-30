<script setup lang="ts">
import type { LoginPayload } from 'src/stores/auth.store'
import { useValidationRules } from 'src/composables/useValidationRules'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: LoginPayload): void
}>()

const { t } = useI18n()
const { requiredRule } = useValidationRules()

const formData = reactive<LoginPayload>({
  username: '',
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
      v-model="formData.password"
      :label="t('form.password')"
      type="password"
      lazy-rules
      :rules="[requiredRule]"
    />
    <q-btn
      :label="t('buttons.login')"
      type="submit"
      color="teal"
      class="full-width q-mt-md"
      :loading="loading"
      unelevated
      @click="submit"
    />
  </div>
</template>
