import { useState, useRef, useEffect } from 'react'
import './SourceChip.css'

interface SourceChipProps {
  source: string
}

export function SourceChip({ source }: SourceChipProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="source-chip-wrap" ref={ref}>
      <button
        className="source-chip"
        onClick={() => setOpen((v) => !v)}
        title={source}
        aria-label={`Fuente: ${source}`}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </button>
      {open && (
        <div className="source-tooltip" role="tooltip">
          <span className="source-tooltip-label">Fuente bibliográfica</span>
          <p className="source-tooltip-text">{source}</p>
        </div>
      )}
    </div>
  )
}
