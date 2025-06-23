import type { AuthResponse, LoginPayload, RegistrationPayload } from './index.type'
import { apiService } from 'src/services/apiService'

export const authApi = {
  login(payload: LoginPayload): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', payload)
  },

  registration(payload: RegistrationPayload): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/registration', payload)
  },

  logout(): Promise<void> {
    return apiService.post<void>('/auth/logout')
  },

  checkAuth(): Promise<AuthResponse> {
    return apiService.get<AuthResponse>('/auth/refresh')
  },
}
