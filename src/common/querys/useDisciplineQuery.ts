import { API_QUERY_KEYS } from './keys'
import API from '../api'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { DisciplineOneReturn, DisciplineReturn } from '../types/discipline'

export const useDisciplineQuery = (): UseQueryResult<{ data: DisciplineReturn[] }, unknown> =>
  useQuery({
    queryKey: API_QUERY_KEYS.allDisciplines,
    queryFn: API.discipline.getAll,
  })

export const useDisciplineByIdQuery = (
  disciplineId: string,
): UseQueryResult<{ data: DisciplineOneReturn }, unknown> =>
  useQuery({
    queryKey: API_QUERY_KEYS.discipline(disciplineId),
    queryFn: () => API.discipline.getById(disciplineId),
    enabled: !!disciplineId,
  })
