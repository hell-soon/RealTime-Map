import type { Mark } from 'src/types/socket-events'
import { useWebSocket } from 'src/composables/useWebSocket'

const MARKS_NAMESPACE = '/marks'

export function useMarksSocket() {
  const { on, emit, getSocketState } = useWebSocket()

  const marks = ref<Mark[]>([])
  const socketState = getSocketState(MARKS_NAMESPACE)

  const isLoading = computed(() => !socketState?.isConnected)

  const handleAllMarks = (initialMarks: Mark[]) => {
    marks.value = initialMarks
  }
  const handleMarkCreated = (newMark: Mark) => {
    marks.value.push(newMark)
  }

  const unsubscribes: (() => void)[] = []

  onMounted(() => {
    emit(MARKS_NAMESPACE, 'marks:get')

    unsubscribes.push(on(MARKS_NAMESPACE, 'marks:all', handleAllMarks))
    unsubscribes.push(on(MARKS_NAMESPACE, 'mark:created', handleMarkCreated))
  })

  onUnmounted(() => {
    unsubscribes.forEach(fn => fn())
  })

  return {
    marks: readonly(marks),
    isLoading: readonly(isLoading),
  }
}
