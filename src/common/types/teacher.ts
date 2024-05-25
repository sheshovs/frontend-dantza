import { DisciplineReturn } from './discipline'
import { Image } from './image'

export interface Teacher {
  name: string
  images: File[]
  description: string
  disciplines: DisciplineReturn[]
}

export interface TeacherReturn extends Omit<Teacher, `images`> {
  uuid: string
  images: Image[]
}
