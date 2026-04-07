import './ErrorMessage.css'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({ message = 'Error al cargar los datos', onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span className="error-message-text">{message}</span>
      {onRetry && (
        <button className="error-retry-btn" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  )
}
