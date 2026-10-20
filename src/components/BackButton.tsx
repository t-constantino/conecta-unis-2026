interface Props {
  onClick: () => void
  label?: string
  light?: boolean
}

export default function BackButton({ onClick, label = 'Voltar', light = false }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-all hover:scale-105"
      style={{
        borderColor: light ? 'rgba(255,255,255,0.2)' : 'var(--color-border)',
        color: light ? 'rgba(255,255,255,0.75)' : 'var(--color-muted-foreground)',
        background: 'transparent',
      }}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </button>
  )
}
