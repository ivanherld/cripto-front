import type { SenialCambioRegimen } from '../../types/market'
import { SourceChip } from '../signals/SourceChip'
import './RegimeChangeAlert.css'

interface RegimeChangeAlertProps {
  senialCambio: SenialCambioRegimen
}

export function RegimeChangeAlert({ senialCambio }: RegimeChangeAlertProps) {
  const { señal, titulo, detalle, fuente } = senialCambio
  const dir = señal.toUpperCase()
  const dirClass = dir === 'BULL' ? 'bull' : dir === 'BEAR' ? 'bear' : 'neutral'

  return (
    <div className={`regime-change-alert regime-change-alert--${dirClass}`}>
      <div className="regime-change-alert-header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span className="regime-change-alert-title">{titulo}</span>
        <div className="regime-change-alert-right">
          <span className={`regime-dir-badge regime-dir-badge--${dirClass}`}>{señal}</span>
          <SourceChip source={fuente} />
        </div>
      </div>
      <p className="regime-change-alert-detail">{detalle}</p>
    </div>
  )
}
