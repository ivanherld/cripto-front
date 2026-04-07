import { apiClient } from './client'
import type {
  SymbolInfo,
  SymbolsResponse,
  TimeframesResponse,
  OHLCVResponse,
  Candle,
  RegimenResponse,
  MacroResponse,
} from '../types/market'

export async function fetchSymbols(): Promise<SymbolInfo[]> {
  const res = await apiClient.get<SymbolsResponse>('/api/v1/market/symbols')
  return res.data.symbols
}

export async function fetchTimeframes(): Promise<Record<string, string[]>> {
  const res = await apiClient.get<TimeframesResponse>('/api/v1/market/timeframes')
  return res.data.timeframes
}

export async function fetchOHLCV(
  symbol: string,
  timeframe = '1h',
  limit = 200
): Promise<Candle[]> {
  const res = await apiClient.get<OHLCVResponse>(`/api/v1/market/ohlcv/${symbol}`, {
    params: { timeframe, limit },
  })
  return res.data.candles
}

export async function fetchRegime(symbol: string): Promise<RegimenResponse> {
  const res = await apiClient.get<RegimenResponse>(`/api/v1/market/regime/${symbol}`)
  return res.data
}

export async function fetchMacro(symbol: string): Promise<MacroResponse> {
  const res = await apiClient.get<MacroResponse>(`/api/v1/market/macro/${symbol}`)
  return res.data
}
