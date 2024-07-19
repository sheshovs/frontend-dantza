import { DisciplineSchedule, weekDays } from '../types'

// function to format the discipline schedule into the default weekDays
export const formatDisciplineSchedule = (
  schedule: Record<string, DisciplineSchedule[]>,
): Record<string, DisciplineSchedule[]> => {
  const formattedSchedule: Record<string, DisciplineSchedule[]> = {}

  Object.keys(schedule).forEach((category) => {
    formattedSchedule[category] = weekDays.map((weekDay) => {
      const day = schedule[category].find((day) => day.label === weekDay.label)
      return day || weekDay
    })
  })

  return formattedSchedule
}

export const formatFileName = (fileName: string, length: number): string => {
  return fileName.length > length ? `${fileName.slice(0, length).trim()}...` : fileName
}
