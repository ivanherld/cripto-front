import { useQuery } from '@tanstack/react-query'
import { fetchAnalysis } from '../api/analysis'

export function useAnalysis(symbol: string, timeframe: string) {
  return useQuery({
    queryKey: ['analysis', symbol, timeframe],
    queryFn: () => fetchAnalysis(symbol, timeframe),
    refetchInterval: 1000 * 60 * 2, // 2 min
    enabled: !!symbol && !!timeframe,
  })
}
