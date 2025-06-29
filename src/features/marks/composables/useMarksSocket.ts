import type { Mark, MarksRequestPayload } from 'src/types/socket-events'
import { useWebSocket } from 'src/composables/useWebSocket'

const MARKS_NAMESPACE = '/marks'

export function useMarksSocket() {
  const { on, emit, getSocketState } = useWebSocket()

  const marks = ref<Mark[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchMarks = (params: MarksRequestPayload) => {
    const socketState = getSocketState(MARKS_NAMESPACE)
    if (!socketState?.isConnected) {
      const errorMessage = '[Marks] Невозможно запросить метки: сокет не подключен.'
      console.error(errorMessage)
      error.value = errorMessage
      return
    }

    isLoading.value = true
    error.value = null
    emit(MARKS_NAMESPACE, 'marks:message', params)
  }

  const handleGetMarks = (receivedMarks: Mark[]) => {
    marks.value = receivedMarks
    isLoading.value = false
  }

  const unsubscribes = [
    on(MARKS_NAMESPACE, 'marks:get', handleGetMarks),
  ]

  onUnmounted(() => {
    unsubscribes.forEach(fn => fn())
  })

  return {
    marks: readonly(marks),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchMarks,
  }
}
