import type { SymbolInfo } from '../../types/market'
import './TopBar.css'

interface TopBarProps {
  symbols: SymbolInfo[]
  activeSymbol: string
  onSymbolChange: (symbol: string) => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function TopBar({ symbols, activeSymbol, onSymbolChange, darkMode, onToggleDarkMode }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-logo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        <span className="topbar-brand">CryptoLens</span>
      </div>

      <div className="topbar-controls">
        <label htmlFor="symbol-select" className="topbar-label">
          Símbolo
        </label>
        <select
          id="symbol-select"
          className="topbar-select"
          value={activeSymbol}
          onChange={(e) => onSymbolChange(e.target.value)}
        >
          {symbols.map((s) => (
            <option key={s.ticker} value={s.ticker}>
              {s.pair}
            </option>
          ))}
        </select>
      </div>

      <button
        className="topbar-theme-toggle"
        onClick={onToggleDarkMode}
        aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
        title={darkMode ? 'Modo claro' : 'Modo oscuro'}
      >
        {darkMode ? (
          // Sun icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          // Moon icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>

      <div className="topbar-status">
        <span className="topbar-live-dot" aria-hidden="true" />
        <span className="topbar-live-label">Live</span>
      </div>
    </header>
  )
}
