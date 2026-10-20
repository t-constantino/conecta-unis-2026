import { useState } from 'react'
import BackButton from '../components/BackButton'

interface Props {
  onNavigate: (s: string) => void
}

const AREAS = ['Todas', 'Tecnologia', 'Engenharia', 'Administração', 'Direito', 'Marketing', 'Saúde', 'Design']
const TYPES = ['Todos', 'Estágio', 'Trainee', 'CLT', 'PJ']
const MODES = ['Todos', 'Presencial', 'Híbrido', 'Remoto']

const jobs = [
  {
    id: 1, company: 'Nubank', role: 'Estágio em Engenharia de Software', area: 'Tecnologia',
    type: 'Estágio', mode: 'Híbrido', location: 'São Paulo, SP', salary: 'R$ 2.800/mês',
    tags: ['React', 'Python', 'SQL'], posted: '2 dias atrás', applicants: 143,
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=60&h=60&fit=crop&auto=format',
    featured: true, challenge: '15 min', feedback: 'até 7 dias',
  },
  {
    id: 2, company: 'Embraer', role: 'Estágio em Engenharia Aeronáutica', area: 'Engenharia',
    type: 'Estágio', mode: 'Presencial', location: 'São José dos Campos, SP', salary: 'R$ 3.200/mês',
    tags: ['CAD', 'MATLAB', 'Inglês C1'], posted: '5 dias atrás', applicants: 87,
    logo: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=60&h=60&fit=crop&auto=format',
    featured: true, challenge: '15 min', feedback: 'até 7 dias',
  },
  {
    id: 3, company: 'Magazine Luiza', role: 'Trainee Programa ML de Gente', area: 'Administração',
    type: 'Trainee', mode: 'Híbrido', location: 'Franca, SP', salary: 'R$ 4.500/mês',
    tags: ['Excel', 'Análise de Dados', 'Liderança'], posted: '1 semana atrás', applicants: 512,
    logo: 'https://images.unsplash.com/photo-1631193816258-28b44b21e78b?w=60&h=60&fit=crop&auto=format',
    featured: false, challenge: '15 min', feedback: 'até 7 dias',
  },
  {
    id: 4, company: 'TOTVS', role: 'Desenvolvedor Front-end Júnior', area: 'Tecnologia',
    type: 'CLT', mode: 'Remoto', location: 'Remoto', salary: 'R$ 5.000–6.500/mês',
    tags: ['Vue.js', 'TypeScript', 'Figma'], posted: '3 dias atrás', applicants: 208,
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=60&h=60&fit=crop&auto=format',
    featured: false, challenge: '15 min', feedback: 'até 7 dias',
  },
  {
    id: 5, company: 'Porto Seguro', role: 'Estágio em Atuária', area: 'Administração',
    type: 'Estágio', mode: 'Presencial', location: 'São Paulo, SP', salary: 'R$ 2.200/mês',
    tags: ['Excel', 'R', 'Estatística'], posted: '4 dias atrás', applicants: 64,
    logo: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?w=60&h=60&fit=crop&auto=format',
    featured: false, challenge: '15 min', feedback: 'até 7 dias',
  },
  {
    id: 6, company: 'Vivo / Telefônica', role: 'Estágio em Marketing Digital', area: 'Marketing',
    type: 'Estágio', mode: 'Híbrido', location: 'São Paulo, SP', salary: 'R$ 2.400/mês',
    tags: ['Google Ads', 'Meta Ads', 'Analytics'], posted: '6 dias atrás', applicants: 177,
    logo: 'https://images.unsplash.com/photo-1631193816258-28b44b21e78b?w=60&h=60&fit=crop&auto=format',
    featured: false, challenge: '15 min', feedback: 'até 7 dias',
  },
]

const modeColor: Record<string, string> = {
  Remoto: '#2ea84f',
  Híbrido: '#e84c2b',
  Presencial: '#5b6bd6',
}

export default function JobSearch({ onNavigate }: Props) {
  const [area, setArea] = useState('Todas')
  const [type, setType] = useState('Todos')
  const [mode, setMode] = useState('Todos')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number | null>(null)

  const filtered = jobs.filter((j) => {
    if (area !== 'Todas' && j.area !== area) return false
    if (type !== 'Todos' && j.type !== type) return false
    if (mode !== 'Todos' && j.mode !== mode) return false
    if (search && !j.role.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const detail = selected !== null ? jobs.find((j) => j.id === selected) : null

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)', paddingTop: '0' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b px-6 py-4 flex items-center gap-4"
        style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <BackButton onClick={() => onNavigate('landing')} />
        <span className="font-bold text-lg mr-2 shrink-0" style={{ fontFamily: 'var(--font-display)' }}>
          Conecta<span style={{ color: 'var(--color-accent)' }}>Unis</span>
        </span>
        <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-full border"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-secondary)', maxWidth: 420 }}>
          <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--color-muted-foreground)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Cargo, empresa ou palavra-chave…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--color-foreground)' }} />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR FILTERS */}
        <aside className="hidden md:flex flex-col gap-6 w-56 shrink-0 px-5 py-6 border-r overflow-y-auto"
          style={{ borderColor: 'var(--color-border)' }}>
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Área</div>
            {AREAS.map((a) => (
              <button key={a} onClick={() => setArea(a)}
                className="block w-full text-left px-3 py-1.5 rounded-lg text-sm mb-0.5 transition-colors"
                style={{
                  background: area === a ? 'var(--color-foreground)' : 'transparent',
                  color: area === a ? 'var(--color-background)' : 'var(--color-foreground)',
                  fontWeight: area === a ? 600 : 400,
                }}>
                {a}
              </button>
            ))}
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Regime</div>
            {TYPES.map((t) => (
              <button key={t} onClick={() => setType(t)}
                className="block w-full text-left px-3 py-1.5 rounded-lg text-sm mb-0.5 transition-colors"
                style={{
                  background: type === t ? 'var(--color-foreground)' : 'transparent',
                  color: type === t ? 'var(--color-background)' : 'var(--color-foreground)',
                  fontWeight: type === t ? 600 : 400,
                }}>
                {t}
              </button>
            ))}
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Modalidade</div>
            {MODES.map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className="block w-full text-left px-3 py-1.5 rounded-lg text-sm mb-0.5 transition-colors"
                style={{
                  background: mode === m ? 'var(--color-foreground)' : 'transparent',
                  color: mode === m ? 'var(--color-background)' : 'var(--color-foreground)',
                  fontWeight: mode === m ? 600 : 400,
                }}>
                {m}
              </button>
            ))}
          </div>
        </aside>

        {/* JOB LIST */}
        <main className="flex-1 overflow-y-auto px-5 py-6" style={{ maxWidth: detail ? 420 : 'none' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
              {filtered.length} vaga{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {filtered.map((job) => (
              <button key={job.id} onClick={() => setSelected(job.id === selected ? null : job.id)}
                className="text-left p-5 rounded-2xl border transition-all hover:shadow-md"
                style={{
                  borderColor: selected === job.id ? 'var(--color-accent)' : 'var(--color-border)',
                  background: selected === job.id ? 'var(--color-card)' : 'var(--color-card)',
                  boxShadow: selected === job.id ? '0 0 0 2px var(--color-accent)' : undefined,
                }}>
                <div className="flex items-start gap-3">
                  <img src={job.logo} alt={job.company}
                    className="w-10 h-10 rounded-xl object-cover shrink-0" style={{ background: 'var(--color-muted)' }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-sm leading-tight">{job.role}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted-foreground)' }}>{job.company} · {job.location}</div>
                      </div>
                      {job.featured && (
                        <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--color-accent)', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                          DESTAQUE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: 'var(--color-secondary)', color: 'var(--color-foreground)' }}>
                        {job.type}
                      </span>
                      <span className="text-xs font-medium" style={{ color: modeColor[job.mode] ?? 'var(--color-muted-foreground)' }}>
                        ● {job.mode}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{job.salary}</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap mt-2">
                      <span className="text-[11px] px-2 py-0.5 rounded"
                        style={{ background: 'rgba(26,92,255,0.08)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                        Desafio {job.challenge}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded"
                        style={{ background: 'var(--color-secondary)', color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                        Retorno {job.feedback}
                      </span>
                      {job.tags.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded border"
                          style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t"
                  style={{ borderColor: 'var(--color-border)' }}>
                  <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{job.posted}</span>
                  <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{job.applicants} candidatos</span>
                </div>
              </button>
            ))}
          </div>
        </main>

        {/* JOB DETAIL PANEL */}
        {detail && (
          <aside className="hidden lg:flex flex-col w-96 shrink-0 border-l overflow-y-auto"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-card)' }}>
            <div className="p-6">
              <img src={detail.logo} alt={detail.company}
                className="w-14 h-14 rounded-2xl object-cover mb-4" style={{ background: 'var(--color-muted)' }} />
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>{detail.role}</h2>
              <div className="text-sm mb-4" style={{ color: 'var(--color-muted-foreground)' }}>
                {detail.company} · {detail.location}
              </div>
              <div className="flex gap-2 flex-wrap mb-6">
                <span className="text-sm px-3 py-1 rounded-full font-medium"
                  style={{ background: 'var(--color-secondary)' }}>{detail.type}</span>
                <span className="text-sm px-3 py-1 rounded-full font-medium"
                  style={{ background: 'var(--color-secondary)' }}>{detail.mode}</span>
              </div>
              <div className="text-sm font-semibold mb-1">Remuneração</div>
              <div className="text-lg font-bold mb-6" style={{ color: 'var(--color-accent)' }}>{detail.salary}</div>
              <div className="text-sm font-semibold mb-2">Habilidades desejadas</div>
              <div className="flex gap-2 flex-wrap mb-6">
                {detail.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded border"
                    style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-mono)' }}>{t}</span>
                ))}
              </div>
              <div className="text-sm font-semibold mb-2">Sobre a vaga</div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
                Buscamos um estudante apaixonado por tecnologia para integrar nosso time de inovação. Você vai trabalhar em projetos reais com impacto direto nos usuários, colaborar com squads multidisciplinares e crescer em um ambiente que valoriza autonomia e aprendizado contínuo.
              </p>
              <div className="rounded-2xl p-4 mb-6" style={{ background: 'rgba(26,92,255,0.06)', border: '1px solid rgba(26,92,255,0.16)' }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                  Processo Conecta
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span>Microdesafio prático</span>
                    <strong>{detail.challenge}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Prazo máximo de retorno</span>
                    <strong>{detail.feedback}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Vídeo de apresentação</span>
                    <strong>Opcional</strong>
                  </div>
                </div>
              </div>
              <button onClick={() => onNavigate('apply')}
                className="w-full py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Candidatar-se agora
              </button>
              <button className="w-full py-3.5 rounded-full font-semibold text-sm border mt-2 transition-colors"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                Salvar vaga
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
