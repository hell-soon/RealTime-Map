export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface RegistrationPayload {
  email: string
  password: string
  phone: string
  username: string
  is_active?: boolean
  is_superuser?: boolean
  is_verified?: boolean
}
