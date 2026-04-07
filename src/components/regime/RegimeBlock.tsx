import type { RegimenResponse } from '../../types/market'
import { RegimeScore } from './RegimeScore'
import { RegimeVotes } from './RegimeVotes'
import { RegimeChangeAlert } from './RegimeChangeAlert'
import './RegimeBlock.css'

interface RegimeBlockProps {
  data: RegimenResponse
}

const REGIME_LABELS: Record<string, string> = {
  BULL: 'Alcista',
  BEAR: 'Bajista',
  LATERAL: 'Lateral',
  INDEFINIDO: 'Indefinido',
}

export function RegimeBlock({ data }: RegimeBlockProps) {
  const { regimen, señal_cambio, votos, score, score_anterior, precio_diario, ema200 } = data
  const regimeClass = regimen.toLowerCase()

  return (
    <div className={`regime-block regime-block--${regimeClass}`}>
      <div className="regime-block-header">
        <div className="regime-block-title-row">
          <span className="regime-block-label">Régimen de mercado</span>
          <span className={`regime-badge regime-badge--${regimeClass}`}>
            {regimen} — {REGIME_LABELS[regimen] ?? regimen}
          </span>
        </div>
        <div className="regime-block-price-row">
          <span className="regime-price-label">Precio diario</span>
          <span className="regime-price-value">
            ${precio_diario.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
          {ema200 !== null && (
            <>
              <span className="regime-price-label">EMA200</span>
              <span className="regime-price-value">
                ${ema200.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="regime-block-body">
        <RegimeScore score={score} score_anterior={score_anterior} />

        <div className="regime-block-votes-wrap">
          <span className="regime-votes-label">Votos</span>
          <RegimeVotes votos={votos} />
        </div>

        {señal_cambio != null && (
          <RegimeChangeAlert senialCambio={señal_cambio} />
        )}
      </div>
    </div>
  )
}
