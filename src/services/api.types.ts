export interface BackendErrorDetail {
  message: string
  [key: string]: any
}

export interface ApiError {
  message: string
  status?: number | undefined
  details?: BackendErrorDetail | any
}
