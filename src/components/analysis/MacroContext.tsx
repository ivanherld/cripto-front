import type { MacroResponse } from '../../types/market'
import './MacroContext.css'

interface MacroContextProps {
  data: MacroResponse
}

export function MacroContext({ data }: MacroContextProps) {
  if (!data.aplica) return null

  const {
    dias_desde_halving,
    dias_para_halving,
    porcentaje_ciclo,
    fase,
    recompensa_bloque,
    s2f_aproximado,
    num_halvings,
  } = data

  return (
    <div className="macro-wrap">
      <div className="macro-header">
        <span className="macro-title">Contexto macro — Bitcoin</span>
        {num_halvings != null && (
          <span className="macro-halvings">{num_halvings} halvings</span>
        )}
      </div>

      <div className="macro-grid">
        {fase != null && (
          <div className="macro-card">
            <span className="macro-card-label">Fase del ciclo</span>
            <span className="macro-card-value macro-card-value--accent">{fase}</span>
            {porcentaje_ciclo != null && (
              <span className="macro-card-sub">{porcentaje_ciclo.toFixed(1)}% del ciclo</span>
            )}
          </div>
        )}

        {dias_desde_halving != null && (
          <div className="macro-card">
            <span className="macro-card-label">Desde el halving</span>
            <span className="macro-card-value">{dias_desde_halving.toLocaleString()}</span>
            <span className="macro-card-sub">días transcurridos</span>
          </div>
        )}

        {dias_para_halving != null && (
          <div className="macro-card">
            <span className="macro-card-label">Próximo halving</span>
            <span className="macro-card-value">{dias_para_halving.toLocaleString()}</span>
            <span className="macro-card-sub">días restantes</span>
          </div>
        )}

        {recompensa_bloque != null && (
          <div className="macro-card">
            <span className="macro-card-label">Recompensa bloque</span>
            <span className="macro-card-value">{recompensa_bloque} BTC</span>
          </div>
        )}

        {s2f_aproximado != null && (
          <div className="macro-card">
            <span className="macro-card-label">S2F aproximado</span>
            <span className="macro-card-value">{s2f_aproximado.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
