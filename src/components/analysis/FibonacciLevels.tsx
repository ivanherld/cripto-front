import type { FibonacciData } from '../../types/analysis'
import './FibonacciLevels.css'

interface FibonacciLevelsProps {
  data: FibonacciData
}

export function FibonacciLevels({ data }: FibonacciLevelsProps) {
  const {
    swing_high,
    swing_low,
    swing_alcista,
    precio_actual,
    retrocesos,
    proyecciones,
    nivel_cercano,
    distancia_pct,
  } = data

  const range = swing_high - swing_low

  const allLevels: { label: string; price: number; type: 'ret' | 'proj' }[] = [
    ...Object.entries(retrocesos).map(([k, v]) => ({ label: k, price: v, type: 'ret' as const })),
    ...Object.entries(proyecciones).map(([k, v]) => ({ label: k, price: v, type: 'proj' as const })),
  ].sort((a, b) => b.price - a.price)

  function getPct(price: number): number {
    if (range === 0) return 0
    return Math.min(100, Math.max(0, ((price - swing_low) / range) * 100))
  }

  const currentPct = getPct(precio_actual)

  // Insert the current price as a virtual row
  const rows: { kind: 'level' | 'current'; label: string; price: number; type?: 'ret' | 'proj' }[] = []
  let inserted = false
  for (const lvl of allLevels) {
    if (!inserted && precio_actual >= lvl.price) {
      rows.push({ kind: 'current', label: 'Precio', price: precio_actual })
      inserted = true
    }
    rows.push({ kind: 'level', label: lvl.label, price: lvl.price, type: lvl.type })
  }
  if (!inserted) {
    rows.push({ kind: 'current', label: 'Precio', price: precio_actual })
  }

  return (
    <div className="fib-wrap">
      <div className="fib-header">
        <span className="fib-title">Fibonacci</span>
        <div className="fib-swing">
          <span className="fib-swing-label">
            {swing_alcista ? 'Swing alcista' : 'Swing bajista'}
          </span>
          <span className="fib-swing-range">
            ${swing_low.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            {' — '}
            ${swing_high.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {nivel_cercano != null && distancia_pct != null && (
        <div className="fib-nearest">
          <span className="fib-nearest-label">Nivel más cercano</span>
          <strong className="fib-nearest-price">
            ${nivel_cercano.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </strong>
          <span className="fib-dist">{distancia_pct.toFixed(2)}% de distancia</span>
        </div>
      )}

      <div className="fib-table">
        {rows.map((row, i) => {
          if (row.kind === 'current') {
            return (
              <div key={`current-${i}`} className="fib-row fib-row--current">
                <span className="fib-row-dot" />
                <span className="fib-row-label fib-row-label--current">Precio actual</span>
                <div className="fib-bar-wrap">
                  <div className="fib-bar-fill" style={{ width: `${currentPct}%` }} />
                </div>
                <span className="fib-row-price fib-row-price--current">
                  ${precio_actual.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            )
          }
          const pct = getPct(row.price)
          const isNearest = nivel_cercano != null && Math.abs(row.price - nivel_cercano) < 0.01
          return (
            <div
              key={`${row.type}-${row.label}`}
              className={`fib-row fib-row--${row.type}${isNearest ? ' fib-row--nearest' : ''}`}
            >
              <span className="fib-row-dot" />
              <span className={`fib-row-label fib-row-label--${row.type}`}>{row.label}</span>
              <div className="fib-bar-wrap">
                <div
                  className={`fib-bar-fill fib-bar-fill--${row.type}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="fib-row-price">
                ${row.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
