import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { useAuthStore } from 'src/stores/auth.store'
import { reactive, readonly, watch } from 'vue'

interface WebSocketState {
  isConnected: boolean
}

let socket: Socket | null = null

const state = reactive<WebSocketState>({
  isConnected: false,
})

export function useWebSocket() {
  const authStore = useAuthStore()

  const connect = (namespace: string) => {
    if (socket?.connected) {
      console.warn('[WebSocket] Already connected.')
      return
    }
    // if (!authStore.token) {
    //   console.error('[WebSocket] Connection attempt without authentication token.')
    //   return
    // }

    const WEBSOCKET_URL = import.meta.env.VITE_WS_URL

    if (!WEBSOCKET_URL) {
      console.error('[WebSocket] VITE_WS_URL is not defined in .env file.')
      return
    }

    const fullUrl = `${WEBSOCKET_URL}${namespace}`
    console.warn(`[WebSocket] Connecting to ${fullUrl}`)

    socket = io(fullUrl, {
      // auth: {
      //   token: authStore.token,
      // },
      autoConnect: false,
      transports: ['websocket', 'polling'],
    })

    socket.on('connect', () => {
      console.warn('[WebSocket] Connected successfully.')
      state.isConnected = true
    })

    socket.on('disconnect', (reason) => {
      console.warn(`[WebSocket] Disconnected: ${reason}`)
      state.isConnected = false
    })

    socket.on('connect_error', (error) => {
      console.error('[WebSocket] Connection Error:', error.message)
      state.isConnected = false
    })

    socket.connect()
  }

  const disconnect = () => {
    if (socket) {
      socket.disconnect()
      socket = null
    }
  }

  const on = <T = any>(event: string, callback: (data: T) => void): (() => void) => {
    if (!socket)
      return () => { }
    socket.on(event, callback)
    return () => socket?.off(event, callback)
  }

  const emit = <T = any>(event: string, data?: T) => {
    socket?.emit(event, data)
  }

  watch(() => authStore.token, (newToken) => {
    if (!newToken && state.isConnected) {
      disconnect()
    }
  })

  return {
    state: readonly(state),
    connect,
    disconnect,
    on,
    emit,
  }
}
