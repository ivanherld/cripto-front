import './ConfluenceBar.css'

interface ConfluenceBarProps {
  score: number
  direccion: string
}

// direccion values from API: "BUY" | "SELL" | "NEUTRO"
// score: when NEUTRO → always 50; when BUY/SELL → percentage of agreeing signals (>60)
// Visual: score=50 → no fill; score=67 dir=BUY → 17pts above neutral → fill right
function getDir(d: string): 'bull' | 'bear' | 'neutral' {
  const u = d.toUpperCase()
  if (u === 'BUY' || u === 'BULL') return 'bull'
  if (u === 'SELL' || u === 'BEAR') return 'bear'
  return 'neutral'
}

const DIR_LABEL: Record<string, string> = {
  BUY: 'Alcista', BULL: 'Alcista',
  SELL: 'Bajista', BEAR: 'Bajista',
  NEUTRO: 'Neutro', NEUTRAL: 'Neutro',
}

export function ConfluenceBar({ score, direccion }: ConfluenceBarProps) {
  const dir = getDir(direccion)

  // score=50 → neutral (no fill). score 60-100 → strength above neutral.
  // Map [50, 100] → [0%, 50%] of half-bar
  const strength = score <= 50 ? 0 : (score - 50) / 50 * 50

  const label = DIR_LABEL[direccion.toUpperCase()] ?? direccion

  return (
    <div className="confluence-bar-wrap">
      <div className="confluence-bar-header">
        <span className="confluence-bar-label">Confluencia</span>
        <span className={`confluence-direction confluence-direction--${dir}`}>
          {label}
        </span>
        <span className={`confluence-score confluence-score--${dir}`}>
          {score === 50 ? '—' : `${score}%`}
        </span>
      </div>

      <div className="confluence-track">
        {dir === 'bear' && strength > 0 && (
          <div
            className="confluence-fill confluence-fill--bear"
            style={{ right: '50%', width: `${strength}%` }}
          />
        )}
        {dir === 'bull' && strength > 0 && (
          <div
            className="confluence-fill confluence-fill--bull"
            style={{ left: '50%', width: `${strength}%` }}
          />
        )}
        <div className="confluence-midline" />
      </div>
      <div className="confluence-axis">
        <span className="confluence-axis-label confluence-axis-label--bear">Bajista</span>
        <span className="confluence-axis-label confluence-axis-label--neutral">Neutro</span>
        <span className="confluence-axis-label confluence-axis-label--bull">Alcista</span>
      </div>
    </div>
  )
}
