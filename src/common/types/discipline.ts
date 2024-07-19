import { Image } from './image'
import { TeacherReturn } from './teacher'

export interface DisciplineSchedule {
  label: string
  isActive: boolean
  daySchedule: {
    id: number
    start: string
    end: string
  }[]
}

export interface Discipline {
  name: string
  mainImageName: string
  images: File[]
  imagesUploaded: Image[]
  description: string
  categorySchedule: Record<string, DisciplineSchedule[]>
}

export interface DisciplineState extends Discipline {
  categories: string[]
}

export interface DisciplineReturn extends Omit<Discipline, `categorySchedule` | `mainImageName`> {
  uuid: string
  schedule: Record<string, DisciplineSchedule[]>
}

export interface DisciplineOneReturn extends DisciplineReturn {
  teachers: TeacherReturn[]
}

export const weekDays: DisciplineSchedule[] = [
  {
    label: `Lunes`,
    isActive: false,
    daySchedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Martes`,
    isActive: false,
    daySchedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Miércoles`,
    isActive: false,
    daySchedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Jueves`,
    isActive: false,
    daySchedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Viernes`,
    isActive: false,
    daySchedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Sábado`,
    isActive: false,
    daySchedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
  {
    label: `Domingo`,
    isActive: false,
    daySchedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
]
