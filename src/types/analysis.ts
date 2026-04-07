// ── Signal types (raw API schemas) ─────────────────────────────────────

export interface Senial {
  senial: string      // e.g. "BULL" | "BEAR" | "NEUTRAL"
  descripcion: string
  fuente: string
}

export interface PatronVela {
  patron: string
  senial: string
  fuerza: string
  fuente: string
}

export interface PatronChartista {
  nombre: string
  senial: string
  objetivo: number | null
  nota: string | null
  fuente: string
}

export interface SenialVolumen {
  tipo: string
  senial: string
  fuerza: string
  descripcion: string
  fuente: string
}

export interface Divergencia {
  senial: string
  descripcion: string
  fuente: string
}

export interface PatronArmonico {
  patron: string
  senial: string
  punto_d: number | null
  fuente: string
}

// ── Fibonacci ──────────────────────────────────────────────────────────
export interface FibonacciData {
  swing_high: number
  swing_low: number
  swing_alcista: boolean
  precio_actual: number
  retrocesos: Record<string, number>
  proyecciones: Record<string, number>
  nivel_cercano: number | null
  distancia_pct: number | null
}

// ── SL/TP ──────────────────────────────────────────────────────────────
export interface SLTPData {
  stop_loss: number
  take_profit_1: number
  take_profit_2: number
  multiplicador: number
}

// ── Analysis response ──────────────────────────────────────────────────
export interface AnalysisResponse {
  symbol: string
  timeframe: string
  precio: number
  regimen: string
  score: number
  direccion: string
  indicadores: Senial[]
  velas_japonesas: PatronVela[]
  chartismo: PatronChartista[]
  volumen: SenialVolumen[]
  divergencias: Divergencia[]
  armonicos: PatronArmonico[]
  fibonacci: FibonacciData | null
  sl_tp: SLTPData | null
  timestamp: string
}

// ── Normalized display shape (used by SignalRow/SignalGroup) ───────────
export interface SignalDisplay {
  direction: string
  text: string
  source: string
  extra?: string
}

export type SignalCategory =
  | 'indicadores'
  | 'velas_japonesas'
  | 'chartismo'
  | 'volumen'
  | 'divergencias'
  | 'armonicos'

export const CATEGORY_LABELS: Record<SignalCategory, string> = {
  indicadores: 'Indicadores técnicos',
  velas_japonesas: 'Patrones de velas',
  chartismo: 'Análisis chartista',
  volumen: 'Volumen',
  divergencias: 'Divergencias',
  armonicos: 'Patrones armónicos',
}

// ── Normalizers ────────────────────────────────────────────────────────
export function normalizeSenial(s: Senial): SignalDisplay {
  return { direction: s.senial, text: s.descripcion, source: s.fuente }
}

export function normalizePatronVela(p: PatronVela): SignalDisplay {
  return { direction: p.senial, text: p.patron, source: p.fuente, extra: p.fuerza }
}

export function normalizePatronChartista(p: PatronChartista): SignalDisplay {
  const extra = [
    p.objetivo != null ? `Obj: $${p.objetivo.toLocaleString()}` : null,
    p.nota,
  ]
    .filter(Boolean)
    .join(' — ')
  return { direction: p.senial, text: p.nombre, source: p.fuente, extra: extra || undefined }
}

export function normalizeVolumen(v: SenialVolumen): SignalDisplay {
  return {
    direction: v.senial,
    text: v.tipo,
    source: v.fuente,
    extra: v.descripcion || v.fuerza || undefined,
  }
}

export function normalizeDivergencia(d: Divergencia): SignalDisplay {
  return { direction: d.senial, text: d.descripcion, source: d.fuente }
}

export function normalizeArmonico(a: PatronArmonico): SignalDisplay {
  const extra = a.punto_d != null ? `Punto D: $${a.punto_d.toLocaleString()}` : undefined
  return { direction: a.senial, text: a.patron, source: a.fuente, extra }
}

export function getSignals(data: AnalysisResponse, cat: SignalCategory): SignalDisplay[] {
  switch (cat) {
    case 'indicadores':
      return data.indicadores.map(normalizeSenial)
    case 'velas_japonesas':
      return data.velas_japonesas.map(normalizePatronVela)
    case 'chartismo':
      return data.chartismo.map(normalizePatronChartista)
    case 'volumen':
      return data.volumen.map(normalizeVolumen)
    case 'divergencias':
      return data.divergencias.map(normalizeDivergencia)
    case 'armonicos':
      return data.armonicos.map(normalizeArmonico)
  }
}
