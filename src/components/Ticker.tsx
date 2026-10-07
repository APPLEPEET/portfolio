interface TickerItem {
  label: string
  value: string
  status?: 'LIVE' | 'DEMO'
}

interface TickerProps {
  items: TickerItem[]
}

export function Ticker({ items }: TickerProps) {
  const content = items.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-3 mx-6">
      <span 
        className="text-xs font-mono uppercase tracking-wide"
        style={{ color: 'var(--color-ink-faint)' }}
      >
        {item.label}
      </span>
      <span 
        className="text-sm font-medium"
        style={{ color: 'var(--color-ink)' }}
      >
        {item.value}
      </span>
      {item.status && (
        <span 
          className="text-xs font-mono font-semibold px-2 py-0.5"
          style={{ 
            backgroundColor: item.status === 'LIVE' ? 'var(--color-signal)' : 'var(--color-surface-elevated)',
            color: item.status === 'LIVE' ? 'var(--color-ground)' : 'var(--color-ink-muted)',
          }}
        >
          {item.status}
        </span>
      )}
      <span 
        className="text-lg"
        style={{ color: 'var(--color-border-strong)' }}
      >
        /
      </span>
    </span>
  ))

  return (
    <div 
      className="w-full overflow-hidden py-4 border-y"
      style={{ 
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div className="ticker-animate flex whitespace-nowrap">
        <div className="flex">{content}</div>
        <div className="flex" aria-hidden="true">{content}</div>
      </div>
    </div>
  )
}
