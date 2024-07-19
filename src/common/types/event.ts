import { Dayjs } from 'dayjs'
import { Image } from './image'

export interface Event {
  name: string
  description: string
  date: Dayjs | undefined
  location: string
  mainImageName: string
  images: File[]
  imagesUploaded: Image[]
}

export interface EventReturn extends Event {
  uuid: string
}
