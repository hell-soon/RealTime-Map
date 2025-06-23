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
  is_active: boolean
  is_superuser: boolean
  is_verified: boolean
  phone: string
  username: string
}

export interface IUser {

}
