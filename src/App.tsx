import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useAppStore, type Horizon } from './store/useAppStore'
import { useSymbols } from './hooks/useSymbols'
import { useTimeframes } from './hooks/useTimeframes'
import { useRegime } from './hooks/useRegime'
import { useAnalysis } from './hooks/useAnalysis'
import { useMacro } from './hooks/useMacro'

import { TopBar } from './components/layout/TopBar'
import { RegimeBlock } from './components/regime/RegimeBlock'
import { HorizonTabs } from './components/signals/HorizonTabs'
import { ConfluenceBar } from './components/signals/ConfluenceBar'
import { SignalGroup } from './components/signals/SignalGroup'
import { FibonacciLevels } from './components/analysis/FibonacciLevels'
import { HarmonicPattern } from './components/analysis/HarmonicPattern'
import { MacroContext } from './components/analysis/MacroContext'
import { RegimeBlockSkeleton, AnalysisSkeleton } from './components/layout/Skeleton'
import { ErrorMessage } from './components/layout/ErrorMessage'

import { getSignals, type SignalCategory } from './types/analysis'
import type { SymbolInfo } from './types/market'

const SIGNAL_CATEGORIES: SignalCategory[] = [
  'indicadores',
  'velas_japonesas',
  'chartismo',
  'volumen',
  'divergencias',
  'armonicos',
]

export default function App() {
  const queryClient = useQueryClient()
  const { activeSymbol, activeHorizon, activeTimeframe, darkMode, setSymbol, setHorizon, setTimeframe, toggleDarkMode } =
    useAppStore()

  const symbolsQuery = useSymbols()
  const timeframesQuery = useTimeframes()
  const regimeQuery = useRegime(activeSymbol)
  const analysisQuery = useAnalysis(activeSymbol, activeTimeframe)
  const macroQuery = useMacro(activeSymbol)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['regime', activeSymbol] })
    queryClient.invalidateQueries({ queryKey: ['analysis', activeSymbol] })
    queryClient.invalidateQueries({ queryKey: ['macro', activeSymbol] })
  }, [activeSymbol, queryClient])

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['analysis', activeSymbol, activeTimeframe] })
  }, [activeTimeframe, activeSymbol, queryClient])

  function handleHorizonChange(horizon: Horizon) {
    setHorizon(horizon)
    const firstTf = timeframesQuery.data?.[horizon]?.[0]
    if (firstTf) setTimeframe(firstTf)
    queryClient.invalidateQueries({ queryKey: ['analysis', activeSymbol] })
  }

  function handleTimeframeChange(tf: string) {
    setTimeframe(tf)
    queryClient.invalidateQueries({ queryKey: ['analysis', activeSymbol, tf] })
  }

  // Fallback symbol list while loading
  const fallbackSymbol: SymbolInfo = { ticker: activeSymbol, pair: activeSymbol }
  const symbols = symbolsQuery.data ?? [fallbackSymbol]
  const timeframes = timeframesQuery.data ?? { scalping: [], swing: [], position: [] }
  const analysis = analysisQuery.data
  const regime = regimeQuery.data

  return (
    <>
      <TopBar
        symbols={symbols}
        activeSymbol={activeSymbol}
        onSymbolChange={setSymbol}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <div className="app-layout">
        {/* ── Sidebar: Régimen + Macro ──────────────────────────────── */}
        <aside className="app-sidebar">
          {regimeQuery.isLoading && <RegimeBlockSkeleton />}
          {regimeQuery.isError && (
            <ErrorMessage
              message={`Régimen: ${(regimeQuery.error as Error).message}`}
              onRetry={() => regimeQuery.refetch()}
            />
          )}
          {regime && <RegimeBlock data={regime} />}

          {macroQuery.isSuccess && macroQuery.data?.aplica && (
            <MacroContext data={macroQuery.data} />
          )}
        </aside>

        {/* ── Main: Análisis técnico ────────────────────────────────── */}
        <main className="app-main">
          {timeframesQuery.isSuccess && (
            <HorizonTabs
              activeHorizon={activeHorizon}
              activeTimeframe={activeTimeframe}
              timeframes={timeframes}
              onHorizonChange={handleHorizonChange}
              onTimeframeChange={handleTimeframeChange}
            />
          )}

          {analysisQuery.isLoading && <AnalysisSkeleton />}
          {analysisQuery.isError && (
            <ErrorMessage
              message={`Análisis: ${(analysisQuery.error as Error).message}`}
              onRetry={() => analysisQuery.refetch()}
            />
          )}

          {analysis && (
            <>
              <ConfluenceBar score={analysis.score} direccion={analysis.direccion} />

              {/* Fibonacci */}
              {analysis.fibonacci && (
                <FibonacciLevels data={analysis.fibonacci} />
              )}

              {/* Patrones armónicos (como SignalGroup via normalizeArmonico, plus detail card) */}
              {analysis.armonicos.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  {analysis.armonicos.map((p, i) => (
                    <HarmonicPattern key={i} patron={p} />
                  ))}
                </div>
              )}

              {/* Señales por categoría (excepto armonicos que ya se muestran arriba) */}
              {SIGNAL_CATEGORIES.filter((c) => c !== 'armonicos').map((cat) => (
                <SignalGroup
                  key={cat}
                  category={cat}
                  signals={getSignals(analysis, cat)}
                />
              ))}

              {/* SL/TP */}
              {analysis.sl_tp && (
                <div className="sltp-wrap">
                  <div className="sltp-header">SL / TP</div>
                  <div className="sltp-grid">
                    <div className="sltp-item sltp-item--sl">
                      <span className="sltp-label">Stop Loss</span>
                      <span className="sltp-value">
                        ${analysis.sl_tp.stop_loss.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="sltp-item sltp-item--tp">
                      <span className="sltp-label">TP 1</span>
                      <span className="sltp-value">
                        ${analysis.sl_tp.take_profit_1.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="sltp-item sltp-item--tp">
                      <span className="sltp-label">TP 2</span>
                      <span className="sltp-value">
                        ${analysis.sl_tp.take_profit_2.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="sltp-item">
                      <span className="sltp-label">Multiplicador</span>
                      <span className="sltp-value">{analysis.sl_tp.multiplicador.toFixed(2)}x</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}
