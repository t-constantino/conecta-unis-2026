import { useState } from 'react'
import BackButton from '../components/BackButton'

interface Props {
  onNavigate: (s: string) => void
  onLoginSuccess: () => void
}

export default function AdminLogin({ onNavigate, onLoginSuccess }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'talles.admin@gmail.com' && password === 'adminsenha123') {
      onLoginSuccess()
      onNavigate('admin')
    } else {
      setError('Credenciais de administrador inválidas.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-background)' }}>
      <div className="w-full max-w-md p-8 rounded-3xl border shadow-xl" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-3 mb-6">
          <BackButton onClick={() => onNavigate('landing')} />
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>
            Acesso Restrito
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Painel Administrativo</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
          Entre com as credenciais de administrador para gerenciar o sistema.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="talles.admin@gmail.com"
              required
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            Entrar no Painel
          </button>
        </form>
      </div>
    </div>
  )
}
