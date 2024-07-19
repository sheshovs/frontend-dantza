import { DisciplineReturn } from './discipline'
import { Image } from './image'

export interface Teacher {
  name: string
  mainImageName: string
  images: File[]
  imagesUploaded: Image[]
  description: string
  disciplines: DisciplineReturn[]
}

export interface TeacherReturn extends Teacher {
  uuid: string
}
