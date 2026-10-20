import { useState } from 'react'
import BackButton from '../components/BackButton'

type Role = 'aluno' | 'empresa'
type Mode = 'login' | 'cadastro'

interface Props {
  onNavigate: (s: string) => void
  role: Role
}

export default function LoginPage({ onNavigate, role }: Props) {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [university, setUniversity] = useState('')
  const [course, setCourse] = useState('')
  const [showPass, setShowPass] = useState(false)

  const isLogin = mode === 'login'

  function handleSubmit() {
    if (role === 'empresa') {
      onNavigate('dashboard')
    } else {
      onNavigate('profile')
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-background)' }}>
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] px-14 py-12 relative overflow-hidden"
        style={{ background: '#0a0f1e' }}>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        {/* Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: '#1a5cff' }} />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: '#1a5cff' }} />

        {/* Logo + back */}
        <div className="relative flex items-center gap-4">
          <BackButton onClick={() => onNavigate('landing')} light />
          <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
            Conecta<span style={{ color: 'var(--color-accent)' }}>Unis</span>
          </span>
        </div>

        {/* Center content */}
        <div className="relative flex flex-col gap-8">
          <h2 className="text-4xl leading-tight" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
            {role === 'aluno'
              ? 'Seu próximo estágio começa com um cadastro.'
              : 'Encontre os melhores talentos universitários do Brasil.'}
          </h2>

          <div className="flex flex-col gap-4">
            {(role === 'aluno'
              ? [
                  ['48.200+', 'alunos de todo o Brasil'],
                  ['3.700', 'vagas abertas agora'],
                  ['890', 'empresas parceiras'],
                ]
              : [
                  ['1.200+', 'currículos novos por semana'],
                  ['94%', 'taxa de satisfação dos RHs'],
                  ['72h', 'tempo médio para 1ª candidatura'],
                ]
            ).map(([v, l]) => (
              <div key={l} className="flex items-center gap-4">
                <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>{v}</span>
                <span className="text-sm" style={{ color: '#8899bb' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <div className="relative border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-sm italic" style={{ color: '#8899bb' }}>
            "A Conecta Unis mudou como fazemos recrutamento. Em dois ciclos contratamos 12 estagiários de alta qualidade."
          </p>
          <p className="text-xs mt-2 font-semibold" style={{ color: '#fff' }}>Ana Paula Melo · Head de RH, Nubank</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12 overflow-y-auto">
        {/* Mobile logo + back */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <BackButton onClick={() => onNavigate('landing')} />
          <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Conecta<span style={{ color: 'var(--color-accent)' }}>Unis</span>
          </span>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--color-secondary)', color: 'var(--color-accent)' }}>
              {role === 'aluno' ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m3 9 9-5 9 5-9 5-9-5Z" />
                  <path d="M7 12v4.5c2.6 2 7.4 2 10 0V12M21 9v6" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 21V5a2 2 0 0 1 2-2h8v18M14 9h4a2 2 0 0 1 2 2v10M8 7h2M8 11h2M8 15h2M2 21h20" />
                </svg>
              )}
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                Portal {role === 'aluno' ? 'do aluno' : 'da empresa'}
              </div>
              <button
                type="button"
                onClick={() => onNavigate(role === 'aluno' ? 'company-login' : 'student-login')}
                className="text-xs mt-1 underline underline-offset-4"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                Ir para acesso de {role === 'aluno' ? 'empresas' : 'alunos'}
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            {isLogin ? 'Bem-vindo de volta' : role === 'aluno' ? 'Crie sua conta' : 'Cadastre sua empresa'}
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--color-muted-foreground)' }}>
            {isLogin
              ? 'Entre com suas credenciais para continuar.'
              : role === 'aluno'
              ? 'Gratuito para estudantes universitários.'
              : 'Acesso ao maior banco de talentos universitários do Brasil.'}
          </p>

          <div className="flex flex-col gap-4">
            {/* Cadastro-only fields */}
            {!isLogin && role === 'aluno' && (
              <>
                <Field label="Nome completo">
                  <input value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Julie Costa" className="field-input" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Universidade">
                    <input value={university} onChange={(e) => setUniversity(e.target.value)}
                      placeholder="USP" className="field-input" />
                  </Field>
                  <Field label="Curso">
                    <input value={course} onChange={(e) => setCourse(e.target.value)}
                      placeholder="Ciência da Computação" className="field-input" />
                  </Field>
                </div>
              </>
            )}

            {!isLogin && role === 'empresa' && (
              <>
                <Field label="Nome da empresa">
                  <input value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Nubank" className="field-input" />
                </Field>
                <Field label="CNPJ">
                  <input value={cnpj} onChange={(e) => setCnpj(e.target.value)}
                    placeholder="00.000.000/0001-00" className="field-input" />
                </Field>
              </>
            )}

            <Field label="E-mail">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'aluno' ? 'lucas@usp.br' : 'rh@empresa.com.br'}
                className="field-input" />
            </Field>

            <Field label="Senha">
              <div className="relative">
                <input type={showPass ? 'text' : 'password'}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" className="field-input pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                  style={{ color: 'var(--color-muted-foreground)' }}>
                  {showPass ? 'Ocultar' : 'Ver'}
                </button>
              </div>
            </Field>

            {isLogin && (
              <div className="flex justify-end -mt-2">
                <button type="button" className="text-xs" style={{ color: 'var(--color-accent)' }}>
                  Esqueci minha senha
                </button>
              </div>
            )}

            <button type="button" onClick={handleSubmit}
              className="w-full py-3.5 rounded-full font-semibold text-sm mt-2 transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ background: 'var(--color-accent)', color: '#fff' }}>
              {isLogin
                ? `Entrar como ${role === 'aluno' ? 'aluno' : 'empresa'}`
                : role === 'aluno' ? 'Criar conta gratuita' : 'Cadastrar empresa'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
              <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>ou</span>
              <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            </div>

            {/* Google */}
            <button type="button" onClick={handleSubmit}
              className="w-full py-3.5 rounded-full text-sm font-semibold border flex items-center justify-center gap-2 transition-colors hover:bg-[var(--color-secondary)]"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </button>
          </div>

          {/* Switch mode */}
          <p className="text-sm text-center mt-6" style={{ color: 'var(--color-muted-foreground)' }}>
            {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button onClick={() => setMode(isLogin ? 'cadastro' : 'login')}
              className="font-semibold" style={{ color: 'var(--color-accent)' }}>
              {isLogin ? 'Cadastre-se grátis' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        .field-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-card);
          color: var(--color-foreground);
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
          font-family: var(--font-sans);
        }
        .field-input:focus {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(26,92,255,0.1);
        }
        .field-input::placeholder {
          color: var(--color-muted-foreground);
        }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: 'var(--color-foreground)' }}>{label}</label>
      {children}
    </div>
  )
}
