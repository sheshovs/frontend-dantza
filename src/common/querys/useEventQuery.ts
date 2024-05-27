import { API_QUERY_KEYS } from './keys'
import API from '../api'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { EventReturn } from '../types'

export const useEventQuery = (): UseQueryResult<{ data: EventReturn[] }, unknown> =>
  useQuery({
    queryKey: API_QUERY_KEYS.allEvents,
    queryFn: API.event.getAll,
  })

export const useNextEventsQuery = (): UseQueryResult<{ data: EventReturn[] }, unknown> =>
  useQuery({
    queryKey: API_QUERY_KEYS.allNextEvents,
    queryFn: API.event.getAllNext,
  })
