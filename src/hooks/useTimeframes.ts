import { useQuery } from '@tanstack/react-query'
import { fetchTimeframes } from '../api/market'

export function useTimeframes() {
  return useQuery({
    queryKey: ['timeframes'],
    queryFn: fetchTimeframes,
    staleTime: 1000 * 60 * 30,
  })
}
