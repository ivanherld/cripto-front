import type { Horizon } from '../../store/useAppStore'
import './HorizonTabs.css'

interface HorizonTabsProps {
  activeHorizon: Horizon
  activeTimeframe: string
  timeframes: Record<string, string[]>
  onHorizonChange: (horizon: Horizon) => void
  onTimeframeChange: (tf: string) => void
}

const HORIZON_LABELS: Record<Horizon, string> = {
  scalping: 'Scalping',
  swing: 'Swing',
  position: 'Position',
}

export function HorizonTabs({
  activeHorizon,
  activeTimeframe,
  timeframes,
  onHorizonChange,
  onTimeframeChange,
}: HorizonTabsProps) {
  const currentTimeframes = timeframes[activeHorizon] ?? []

  return (
    <div className="horizon-tabs-wrap">
      <div className="horizon-tabs" role="tablist" aria-label="Horizonte de análisis">
        {(['scalping', 'swing', 'position'] as Horizon[]).map((h) => (
          <button
            key={h}
            role="tab"
            aria-selected={activeHorizon === h}
            className={`horizon-tab ${activeHorizon === h ? 'horizon-tab--active' : ''}`}
            onClick={() => {
              onHorizonChange(h)
              const firstTf = timeframes[h]?.[0]
              if (firstTf) onTimeframeChange(firstTf)
            }}
          >
            {HORIZON_LABELS[h]}
          </button>
        ))}
      </div>

      {currentTimeframes.length > 0 && (
        <div className="timeframe-tabs" role="tablist" aria-label="Timeframe">
          {currentTimeframes.map((tf) => (
            <button
              key={tf}
              role="tab"
              aria-selected={activeTimeframe === tf}
              className={`timeframe-tab ${activeTimeframe === tf ? 'timeframe-tab--active' : ''}`}
              onClick={() => onTimeframeChange(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
