import type { Voto } from '../../types/market'
import './RegimeVotes.css'

interface RegimeVotesProps {
  votos: Record<string, Voto>
}

const VOTO_LABELS: Record<string, string> = {
  ema200: 'EMA200',
  ema_cross: 'Cruce EMA',
  rsi: 'RSI',
  obv: 'OBV',
  halving: 'Halving',
}

function getVotoLabel(key: string): string {
  return VOTO_LABELS[key] ?? key.replace(/_/g, ' ')
}

function getVotoClass(resultado: string): string {
  const r = resultado.toUpperCase()
  if (r === 'BULL') return 'vote-chip--bull'
  if (r === 'BEAR') return 'vote-chip--bear'
  if (r === 'N/A') return 'vote-chip--na'
  return 'vote-chip--neutral'
}

export function RegimeVotes({ votos }: RegimeVotesProps) {
  return (
    <div className="regime-votes">
      {Object.entries(votos).map(([key, voto]) => (
        <div
          key={key}
          className={`vote-chip ${getVotoClass(voto.resultado)}`}
          title={voto.detalle}
        >
          <span className="vote-chip-label">{getVotoLabel(key)}</span>
          <span className="vote-chip-result">{voto.resultado}</span>
        </div>
      ))}
    </div>
  )
}
