import { useState } from 'react'
import BackButton from '../components/BackButton'

type Role = 'aluno' | 'empresa'
type Mode = 'login' | 'cadastro'

interface Props {
  onNavigate: (s: string) => void
  role: Role
  initialMode?: Mode
}

export default function LoginPage({ onNavigate, role, initialMode = 'cadastro' }: Props) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [university, setUniversity] = useState('')
  const [course, setCourse] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const isLogin = mode === 'login'

  async function handleSubmit() {
    setLoading(true)
    console.log("1. Botão de submit clicado! Modo:", mode, "| Role:", role);

    try {
      const payload = isLogin
        ? { action: 'login', email, senha: password, tipo: role }
        : {
            action: 'register',
            tipo: role,
            email,
            senha: password,
            nome_completo: role === 'aluno' ? name : undefined,
            universidade: role === 'aluno' ? university : undefined,
            curso: role === 'aluno' ? course : undefined,
            nome_fantasia: role === 'empresa' ? name : undefined,
            cnpj: role === 'empresa' ? cnpj : undefined,
          };

      console.log("2. Enviando requisição para /api/auth...", payload);

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("3. Resposta recebida da API! Status:", response.status, result);

      if (!response.ok) {
        alert(result.error || 'Erro ao processar requisição.');
        setLoading(false);
        return;
      }

      // Salva usuário logado no localStorage
      localStorage.setItem('conecta_user', JSON.stringify(result.user));

      alert(isLogin ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!');

      // Redirecionamento baseado no tipo de usuário
      if (result.user.tipo === 'admin') {
        onNavigate('admin-dashboard');
      } else if (role === 'empresa' || result.user.tipo === 'empresa') {
        onNavigate('dashboard');
      } else {
        onNavigate('profile');
      }

    } catch (error) {
      console.error("ERRO CAPTURADO NO CATCH:", error);
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
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
              : 'Encontre os melhores talentos do Grupo Unis.'}
          </h2>

          <div className="flex flex-col gap-4">
            {(role === 'aluno'
              ? [
                  ['48.200+', 'alunos cadastrados'],
                  ['3.700', 'vagas abertas agora'],
                  ['890', 'empresas parceiras'],
                ]
              : [
                  ['1.200+', 'currículos novos por semana'],
                  ['94%', 'taxa de satisfação dos RHs'],
                  ['72h', 'tempo médio para contratação'],
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
            "A Conecta Unis mudou como fazemos recrutamento nas unidades do Grupo Unis."
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
              ? 'Gratuito para estudantes do Grupo Unis.'
              : 'Acesso ao maior banco de talentos das unidades do Grupo Unis.'}
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
                  <Field label="Unidade">
                    <input value={university} onChange={(e) => setUniversity(e.target.value)}
                      placeholder="Unis São Lourenço" className="field-input" />
                  </Field>
                  <Field label="Curso">
                    <input value={course} onChange={(e) => setCourse(e.target.value)}
                      placeholder="Análise e Desenvolvimento de Sistemas" className="field-input" />
                  </Field>
                </div>
              </>
            )}

            {!isLogin && role === 'empresa' && (
              <>
                <Field label="Nome fantasia">
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
                placeholder={role === 'aluno' ? 'lucas@unis.edu.br' : 'rh@empresa.com.br'}
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

            <button type="button" onClick={handleSubmit} disabled={loading}
              className="w-full py-3.5 rounded-full font-semibold text-sm mt-2 transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50"
              style={{ background: 'var(--color-accent)', color: '#fff' }}>
              {loading ? 'Processando...' : isLogin ? `Entrar como ${role === 'aluno' ? 'aluno' : 'empresa'}` : role === 'aluno' ? 'Criar conta gratuita' : 'Cadastre sua empresa'}
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
