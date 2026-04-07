import type { PatronArmonico } from '../../types/analysis'
import { SourceChip } from '../signals/SourceChip'
import './HarmonicPattern.css'

interface HarmonicPatternProps {
  patron: PatronArmonico
}

export function HarmonicPattern({ patron }: HarmonicPatternProps) {
  const { patron: nombre, senial, punto_d, fuente } = patron
  const dirClass = senial.toUpperCase() === 'BULL'
    ? 'bull'
    : senial.toUpperCase() === 'BEAR'
    ? 'bear'
    : 'neutral'

  return (
    <div className={`harmonic-wrap harmonic-wrap--${dirClass}`}>
      <div className="harmonic-header">
        <span className={`harmonic-badge harmonic-badge--${dirClass}`}>{senial}</span>
        <span className="harmonic-name">{nombre}</span>
        <SourceChip source={fuente} />
      </div>

      {punto_d != null && (
        <div className="harmonic-level">
          <span className="harmonic-level-label">Punto D</span>
          <span className="harmonic-level-value">
            ${punto_d.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
      )}
    </div>
  )
}
