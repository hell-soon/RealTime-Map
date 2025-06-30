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
    coordinates: [number, number]
  }
  photo: string[]
}
