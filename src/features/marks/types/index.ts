import type { User } from 'src/utils/api/user/index.type'

export interface Mark {
  id: string
  mark_name: string
  start_at: string
  end_at: string
  is_ended: boolean
  duration: number
  owner_id: number
  additional_info: string
  geom: {
    type: string
    coordinates: [number, number]
  }
  photo: string[]
}

export interface MarkFull extends Mark {
  owner: User
}
