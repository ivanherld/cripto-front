import './Skeleton.css'

interface SkeletonProps {
  height?: number | string
  width?: number | string
  borderRadius?: number | string
}

export function Skeleton({ height = 16, width = '100%', borderRadius = 4 }: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{ height, width, borderRadius }}
      aria-hidden="true"
    />
  )
}

export function RegimeBlockSkeleton() {
  return (
    <div className="skeleton-regime-block">
      <div className="skeleton-regime-header">
        <Skeleton height={14} width={120} />
        <Skeleton height={24} width={100} />
      </div>
      <Skeleton height={52} borderRadius={8} />
      <div className="skeleton-votes">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={46} width={68} borderRadius={6} />
        ))}
      </div>
    </div>
  )
}

export function AnalysisSkeleton() {
  return (
    <div className="skeleton-analysis">
      <Skeleton height={40} borderRadius={8} />
      <div style={{ marginTop: 12 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton-signal-group">
            <Skeleton height={32} borderRadius={0} />
            <div style={{ padding: '8px 12px' }}>
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} height={28} borderRadius={4} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
