import type { AuthResponse, LoginPayload, RegistrationPayload } from './index.type'
import { apiService } from 'src/services/apiService'

export const authApi = {
  login(payload: LoginPayload): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  },

  registration(payload: RegistrationPayload): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/register', payload)
  },

  logout(): Promise<void> {
    return apiService.post<void>('/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },
}
