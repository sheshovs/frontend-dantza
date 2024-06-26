import { API_QUERY_KEYS } from './keys'
import API from '../api'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { TeacherReturn } from '../types'

export const useTeacherQuery = (): UseQueryResult<{ data: TeacherReturn[] }, unknown> =>
  useQuery({
    queryKey: API_QUERY_KEYS.allTeachers,
    queryFn: API.teacher.getAll,
  })

export const useTeacherByIdQuery = (
  teacherId: string,
): UseQueryResult<{ data: TeacherReturn }, unknown> =>
  useQuery({
    queryKey: API_QUERY_KEYS.teacher(teacherId),
    queryFn: () => API.teacher.getById(teacherId),
    enabled: !!teacherId,
  })
