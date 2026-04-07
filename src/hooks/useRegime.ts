import { useQuery } from '@tanstack/react-query'
import { fetchRegime } from '../api/market'

export function useRegime(symbol: string) {
  return useQuery({
    queryKey: ['regime', symbol],
    queryFn: () => fetchRegime(symbol),
    refetchInterval: 1000 * 60 * 5, // 5 min
    enabled: !!symbol,
  })
}
