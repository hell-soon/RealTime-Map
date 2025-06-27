import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { useAuthStore } from 'src/stores/auth.store'
import { reactive, readonly } from 'vue'

interface WebSocketState {
  isConnected: boolean
}

let socket: Socket

const state = reactive<WebSocketState>({
  isConnected: false,
})

export function useWebSocket() {
  const connect = () => {
    if (socket && socket.connected) {
      return
    }

    const authStore = useAuthStore()

    const WEBSOCKET_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1/media'

    socket = io(WEBSOCKET_URL, {
      auth: {
        token: authStore.token,
      },
      autoConnect: false,
    })

    socket.on('connect', () => {
      state.isConnected = true
    })

    socket.on('disconnect', (_reason) => {
      state.isConnected = false
    })

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error.message)
    })

    socket.connect()
  }

  const disconnect = () => {
    if (socket) {
      socket.disconnect()
    }
  }

  const on = <T = any>(event: string, callback: (data: T) => void): () => void => {
    if (!socket)
      return () => { }

    socket.on(event, callback)

    return () => socket.off(event, callback)
  }

  const emit = <T = any>(event: string, data?: T) => {
    if (socket) {
      socket.emit(event, data)
    }
  }

  return {
    state: readonly(state),
    connect,
    disconnect,
    on,
    emit,
  }
}
