import './RegimeScore.css'

interface RegimeScoreProps {
  score: number
  score_anterior: number
}

export function RegimeScore({ score, score_anterior }: RegimeScoreProps) {
  const diff = score - score_anterior
  const sign = diff > 0 ? '+' : ''

  return (
    <div className="regime-score">
      <div className="regime-score-item">
        <span className="regime-score-label">Score actual</span>
        <span className="regime-score-value">{score}</span>
      </div>
      <div className="regime-score-divider" />
      <div className="regime-score-item">
        <span className="regime-score-label">Hace 50 días</span>
        <span className="regime-score-value regime-score-value--muted">{score_anterior}</span>
      </div>
      <div className="regime-score-divider" />
      <div className="regime-score-item">
        <span className="regime-score-label">Variación</span>
        <span
          className={`regime-score-value ${
            diff > 0
              ? 'regime-score-value--bull'
              : diff < 0
              ? 'regime-score-value--bear'
              : ''
          }`}
        >
          {sign}{diff}
        </span>
      </div>
    </div>
  )
}
