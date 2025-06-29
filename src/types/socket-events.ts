// =================================================================
//* МОДЕЛИ ДАННЫХ (Data Models)
// Описываем основные сущности, которые передаются по сокету.
// =================================================================

export interface Mark {
  id: string
  name: string
  lat: number
  lng: number
  photoUrl: string
}

export interface Message {
  id: string
  text: string
  senderId: string
  timestamp: string
}

// =================================================================
//* СОБЫТИЯ ОТ КЛИЕНТА К СЕРВЕРУ (Client -> Server)
// Описываем, какие события клиент может отправлять.
// Ключ - имя события.
// Значение - функция-обработчик, которая описывает, какие данные (payload) передаются.
// =================================================================

export interface ClientToServerEvents {
  // --- Публичные события (неймспейс /marks) ---
  'marks:get': () => void

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
  'marks:all': (payload: Mark[]) => void
  'mark:created': (payload: Mark) => void
  'mark:updated': (payload: Partial<Mark> & { id: string }) => void
  'mark:deleted': (payload: { id: string }) => void

  // --- События для сообщений (неймспейс /messages) ---
  'message:new': (payload: Message) => void

  // --- Общие события об ошибках ---
  'error': (payload: { message: string, code?: number }) => void
}
