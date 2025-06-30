import type { User } from './index.type'
import { apiService } from 'src/services/apiService'

export const userApi = {
  getProfile(): Promise<User> {
    return apiService.get<User>('/user/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },
}
