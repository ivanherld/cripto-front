import { useQuery } from '@tanstack/react-query'
import { fetchMacro } from '../api/market'

export function useMacro(symbol: string) {
  const isBTC = symbol.toUpperCase().startsWith('BTC')

  return useQuery({
    queryKey: ['macro', symbol],
    queryFn: () => fetchMacro(symbol),
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: isBTC,
  })
}
