type ThemeValue = 'auto' | false | true

interface UseThemeOptions {
  storageKey?: string
  defaultTheme?: ThemeValue | ((quasarDarkMode: boolean | 'auto') => ThemeValue)
}

function safeGetStorage(key: string): string | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null
  }
  try {
    return window.localStorage.getItem(key)
  }
  catch (e) {
    console.error('Error reading from localStorage:', e)
    return null
  }
}

function safeSetStorage(key: string, value: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return
  }
  try {
    window.localStorage.setItem(key, value)
  }
  catch (e) {
    console.error('Error writing to localStorage:', e)
  }
}

function parseStoredTheme(storedValue: string | null): ThemeValue | null {
  if (storedValue === 'auto')
    return 'auto'
  if (storedValue === 'true')
    return true
  if (storedValue === 'false')
    return false
  return null
}

export function useTheme(options: UseThemeOptions = {}) {
  const $q = useQuasar()

  const storageKey = options.storageKey ?? 'hell-theme'
  const defaultThemeOption = options.defaultTheme ?? ((qMode: boolean | 'auto') => qMode)

  const storedValue = safeGetStorage(storageKey)
  const parsedStoredTheme = parseStoredTheme(storedValue)

  let initialTheme: ThemeValue
  if (parsedStoredTheme !== null) {
    initialTheme = parsedStoredTheme
  }
  else {
    if (typeof defaultThemeOption === 'function') {
      initialTheme = defaultThemeOption($q.dark.mode)
    }
    else {
      initialTheme = defaultThemeOption
    }
  }

  $q.dark.set(initialTheme)

  const theme: Ref<ThemeValue> = ref(initialTheme)

  watch(theme, (val) => {
    $q.dark.set(val)
    safeSetStorage(storageKey, String(val))
  }, { immediate: false })

  const themeIndex = computed(() => {
    if (theme.value === 'auto')
      return 0
    if (theme.value === false)
      return 1
    if (theme.value === true)
      return 2
    return 0
  })

  return {
    theme,
    themeIndex,
  }
}
