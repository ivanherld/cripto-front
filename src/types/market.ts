// ── Symbols ────────────────────────────────────────────────────────────
export interface SymbolInfo {
  ticker: string
  pair: string
}

export interface SymbolsResponse {
  symbols: SymbolInfo[]
}

// ── Timeframes ─────────────────────────────────────────────────────────
export interface TimeframesResponse {
  timeframes: Record<string, string[]>
}

// ── OHLCV ──────────────────────────────────────────────────────────────
export interface Candle {
  timestamp: string // ISO date-time
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface OHLCVResponse {
  symbol: string
  timeframe: string
  limit: number
  candles: Candle[]
}

// ── Regime ─────────────────────────────────────────────────────────────
export type Regime = 'BULL' | 'BEAR' | 'LATERAL' | 'INDEFINIDO'

export interface Voto {
  resultado: string
  detalle: string
}

export interface SenialCambioRegimen {
  señal: string
  titulo: string
  detalle: string
  fuente: string
}

export interface RegimenResponse {
  symbol: string
  regimen: string
  score: number
  score_anterior: number
  votos: Record<string, Voto>
  cambio: string | null
  señal_cambio?: SenialCambioRegimen | null
  precio_diario: number
  ema200: number | null
}

// ── Macro ──────────────────────────────────────────────────────────────
export interface MacroResponse {
  symbol: string
  aplica: boolean
  dias_desde_halving: number | null
  dias_para_halving: number | null
  porcentaje_ciclo: number | null
  fase: string | null
  recompensa_bloque: number | null
  s2f_aproximado: number | null
  num_halvings: number | null
}
