import { API_QUERY_KEYS } from './keys'
import API from '../api'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { DisciplineReturn } from '../types/discipline'

export const useDisciplineQuery = (): UseQueryResult<{ data: DisciplineReturn[] }, unknown> =>
  useQuery({
    queryKey: API_QUERY_KEYS.allDisciplines,
    queryFn: API.discipline.getAll,
  })
