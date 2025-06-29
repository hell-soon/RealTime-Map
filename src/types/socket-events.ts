// =================================================================
//* МОДЕЛИ ДАННЫХ (Data Models)
// Описываем основные сущности, которые передаются по сокету.
// =================================================================

import type { LngLat } from '@yandex/ymaps3-types'

export interface Mark {
  id: string
  mark_name: string
  start_at: string
  end_at: string
  is_ended: boolean
  duration: number
  owner_id: number
  geom: {
    type: string
    coordinates: LngLat
  }
  photo: string
}

export interface Message {
  id: string
  text: string
  senderId: string
  timestamp: string
}

export interface MarksRequestPayload {
  longitude: number
  latitude: number
  radius?: number
  srid?: number
  date?: string
  duration?: number | null
  show_ended?: boolean | null
}

// =================================================================
//* СОБЫТИЯ ОТ КЛИЕНТА К СЕРВЕРУ (Client -> Server)
// Описываем, какие события клиент может отправлять.
// Ключ - имя события.
// Значение - функция-обработчик, которая описывает, какие данные (payload) передаются.
// =================================================================

export interface ClientToServerEvents {
  // --- Публичные события (неймспейс /marks) ---
  'marks:message': (payload: MarksRequestPayload) => void

  // --- Приватные события (неймспейс /messages) ---
  'message:send': (payload: { text: string }) => void
}

// =================================================================
//* СОБЫТИЯ ОТ СЕРВЕРА К КЛИЕНТУ (Server -> Client)
// Описываем, какие события сервер может присылать клиенту.
// =================================================================

export interface ServerToClientEvents {
  // --- Системные события Socket.IO ---
  'connect': () => void
  'disconnect': (reason: string) => void
  'connect_error': (error: Error) => void

  // --- События для меток (неймспейс /marks) ---
  'marks:get': (payload: Mark[]) => void
  'marks:created': (payload: Mark) => void
  'marks:updated': (payload: Partial<Mark> & { id: string }) => void
  'marks:deleted': (payload: { id: string }) => void

  // --- События для сообщений (неймспейс /messages) ---
  'message:new': (payload: Message) => void

  // --- Общие события об ошибках ---
  'error': (payload: { message: string, code?: number }) => void
}
