import type { SignalDisplay } from '../../types/analysis'
import { SourceChip } from './SourceChip'
import './SignalRow.css'

interface SignalRowProps {
  signal: SignalDisplay
}

export function SignalRow({ signal }: SignalRowProps) {
  const { direction, text, source, extra } = signal
  const dir = direction.toUpperCase()
  const dirClass = (dir === 'BULL' || dir === 'BUY')
    ? 'bull'
    : (dir === 'BEAR' || dir === 'SELL')
    ? 'bear'
    : 'neutral'

  return (
    <div className="signal-row">
      <span className={`signal-badge signal-badge--${dirClass}`}>
        {direction}
      </span>
      <span className="signal-text">
        {text}
        {extra && <span className="signal-extra"> — {extra}</span>}
      </span>
      <div className="signal-row-right">
        <SourceChip source={source} />
      </div>
    </div>
  )
}
