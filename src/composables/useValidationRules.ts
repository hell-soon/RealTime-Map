import { useI18n } from 'vue-i18n'

export function useValidationRules() {
  const { t } = useI18n()

  const requiredRule = (val: string) => !!val || t('validation.required')

  const minLengthRule = (length: number) => (val: string) =>
    (val && val.length >= length) || t('validation.minLength', { length })

  const emailRule = (val: string) =>
    /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(val) || t('validation.invalidEmail')

  return {
    requiredRule,
    minLengthRule,
    emailRule,
  }
}
