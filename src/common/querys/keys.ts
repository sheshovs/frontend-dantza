import { QueryKey, UseQueryOptions } from '@tanstack/react-query'

export const API_QUERY_KEYS = {
  allDisciplines: [`allDisciplines`],
}

export type QueryOptions<T, V extends QueryKey = string[], K = T> = Omit<
  UseQueryOptions<T, unknown, K, V>,
  `initialData` | `queryFn` | `queryKey`
>
