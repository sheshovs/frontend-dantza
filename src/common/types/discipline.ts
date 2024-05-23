export interface DisciplineSchedule {
  label: string
  isActive: boolean
  schedule: {
    id: number
    start: string
    end: string
  }[]
}

export interface Discipline {
  name: string
  images: File[]
  description: string
  schedule: DisciplineSchedule[]
}

export interface DisciplineReturn extends Discipline {
  uuid: string
}

export const weekDays: DisciplineSchedule[] = [
  {
    label: `Lunes`,
    isActive: false,
    schedule: [
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
    schedule: [
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
    schedule: [
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
    schedule: [
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
    schedule: [
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
    schedule: [
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
    schedule: [
      {
        id: 1,
        start: ``,
        end: ``,
      },
    ],
  },
]
