import { apiClient } from './client'
import type { AnalysisResponse } from '../types/analysis'

export async function fetchAnalysis(
  symbol: string,
  timeframe: string,
  includeRegime = true
): Promise<AnalysisResponse> {
  const res = await apiClient.get<AnalysisResponse>(
    `/api/v1/analysis/${symbol}/${timeframe}`,
    { params: { include_regime: includeRegime } }
  )
  return res.data
}
