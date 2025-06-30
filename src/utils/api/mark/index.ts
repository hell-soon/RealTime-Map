import type { MarkFull } from 'src/features/marks/types'
import { apiService } from 'src/services/apiService'

export const markApi = {
  getMarkFull(markId: string | number): Promise<MarkFull> {
    return apiService.get<MarkFull>(`/marks/${markId}/`)
  },
}
