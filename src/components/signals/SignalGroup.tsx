import type { SignalDisplay, SignalCategory } from '../../types/analysis'
import { CATEGORY_LABELS } from '../../types/analysis'
import { SignalRow } from './SignalRow'
import './SignalGroup.css'

interface SignalGroupProps {
  category: SignalCategory
  signals: SignalDisplay[]
}

export function SignalGroup({ category, signals }: SignalGroupProps) {
  if (signals.length === 0) return null

  const bullCount = signals.filter((s) => { const d = s.direction.toUpperCase(); return d === 'BULL' || d === 'BUY' }).length
  const bearCount = signals.filter((s) => { const d = s.direction.toUpperCase(); return d === 'BEAR' || d === 'SELL' }).length

  return (
    <div className="signal-group">
      <div className="signal-group-header">
        <span className="signal-group-title">{CATEGORY_LABELS[category]}</span>
        <div className="signal-group-counts">
          {bullCount > 0 && (
            <span className="signal-count signal-count--bull">{bullCount} ↑</span>
          )}
          {bearCount > 0 && (
            <span className="signal-count signal-count--bear">{bearCount} ↓</span>
          )}
        </div>
      </div>
      <div className="signal-group-body">
        {signals.map((signal, i) => (
          <SignalRow key={i} signal={signal} />
        ))}
      </div>
    </div>
  )
}
