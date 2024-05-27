import { Dayjs } from 'dayjs'
import { Image } from './image'

export interface Event {
  name: string
  description: string
  date: Dayjs | undefined
  location: string
  images: File[]
}

export interface EventReturn extends Omit<Event, `images`> {
  uuid: string
  images: Image[]
}
