import { useState } from 'react'
import BackButton from '../components/BackButton'

interface Props {
  onNavigate?: (s: string) => void
}

type Section = 'dashboard' | 'vagas' | 'candidatos' | 'mensagens' | 'relatorios' | 'configuracoes'

// ── shared data ────────────────────────────────────────────────────────────────
const JOBS = [
  { id: 1, title: 'Estágio em Engenharia de Software', area: 'Tecnologia', type: 'Estágio', mode: 'Híbrido', salary: 'R$ 2.800–3.200', applicants: 143, new: 18, deadline: '30 out 2026', status: 'Ativa' as const },
  { id: 2, title: 'Analista de Dados Júnior', area: 'Tecnologia', type: 'CLT', mode: 'Remoto', salary: 'R$ 5.000–6.500', applicants: 67, new: 5, deadline: '15 nov 2026', status: 'Ativa' as const },
  { id: 3, title: 'Designer de Produto (UX)', area: 'Design', type: 'CLT', mode: 'Presencial', salary: 'R$ 4.500–5.500', applicants: 92, new: 11, deadline: '20 out 2026', status: 'Ativa' as const },
  { id: 4, title: 'Trainee de Finanças', area: 'Finanças', type: 'Trainee', mode: 'Híbrido', salary: 'R$ 4.200–4.800', applicants: 310, new: 0, deadline: '01 set 2026', status: 'Encerrada' as const },
  { id: 5, title: 'Especialista em Marketing Digital', area: 'Marketing', type: 'PJ', mode: 'Remoto', salary: 'R$ 6.000–7.500', applicants: 55, new: 3, deadline: '10 nov 2026', status: 'Ativa' as const },
]

const CANDIDATES = [
  { id: 1, name: 'Julie Costa', course: 'Ciência da Computação · USP', role: 'Estágio em Engenharia de Software', jobId: 1, stage: 'Entrevista técnica', match: 94, feedbackDue: '2 dias', avatar: 'https://images.unsplash.com/photo-1648478445898-ae81dfa8701b?auto=format&fit=crop&crop=faces&w=160&h=160&q=85' },
  { id: 2, name: 'Isabela Torres', course: 'Engenharia de Produção · UNICAMP', role: 'Estágio em Engenharia de Software', jobId: 1, stage: 'Triagem', match: 88, feedbackDue: 'Hoje', avatar: 'https://images.unsplash.com/photo-1696200327543-4e0d3f62ee1f?w=80&h=80&fit=crop&auto=format' },
  { id: 3, name: 'Rafael Moura', course: 'Ciência da Computação · UNICAMP', role: 'Analista de Dados Júnior', jobId: 2, stage: 'Proposta enviada', match: 91, feedbackDue: 'Enviado', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format' },
  { id: 4, name: 'Camila Neves', course: 'Design · ESPM', role: 'Designer de Produto (UX)', jobId: 3, stage: 'Triagem', match: 82, feedbackDue: '1 dia', avatar: 'https://images.unsplash.com/photo-1744036096938-4519bc2e47fe?w=80&h=80&fit=crop&auto=format' },
  { id: 5, name: 'Felipe Andrade', course: 'Sistemas de Informação · PUC-SP', role: 'Estágio em Engenharia de Software', jobId: 1, stage: 'Triagem', match: 79, feedbackDue: '4 dias', avatar: 'https://images.unsplash.com/photo-1528900403525-dc523d4f18d6?w=80&h=80&fit=crop&auto=format' },
  { id: 6, name: 'Mariana Costa', course: 'Design Gráfico · Mackenzie', role: 'Designer de Produto (UX)', jobId: 3, stage: 'Entrevista técnica', match: 87, feedbackDue: '3 dias', avatar: 'https://images.unsplash.com/photo-1758518731468-98e90ffd7430?w=80&h=80&fit=crop&auto=format' },
]

const MESSAGES = [
  { id: 1, from: 'Julie Costa', avatar: 'https://images.unsplash.com/photo-1648478445898-ae81dfa8701b?auto=format&fit=crop&crop=faces&w=160&h=160&q=85', role: 'Estágio em Engenharia de Software', last: 'Olá! Gostaria de confirmar o horário da entrevista on-line para amanhã.', time: '14:32', unread: 2 },
  { id: 2, from: 'Isabela Torres', avatar: 'https://images.unsplash.com/photo-1696200327543-4e0d3f62ee1f?w=80&h=80&fit=crop&auto=format', role: 'Estágio em Engenharia de Software', last: 'Obrigada pelo retorno. Fico no aguardo!', time: '11:05', unread: 0 },
  { id: 3, from: 'Rafael Moura', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format', role: 'Analista de Dados Júnior', last: 'Recebi a proposta, vou analisar e respondo até sexta!', time: 'Ontem', unread: 1 },
  { id: 4, from: 'Camila Neves', avatar: 'https://images.unsplash.com/photo-1744036096938-4519bc2e47fe?w=80&h=80&fit=crop&auto=format', role: 'Designer de Produto (UX)', last: 'Portfólio atualizado, segue o link: dribbble.com/camila', time: 'Seg', unread: 0 },
]

const CONV_MSGS: Record<number, { me: boolean; text: string; time: string }[]> = {
  1: [
    { me: false, text: 'Olá! Tudo bem? Me chamo Julie e estou animada com a oportunidade de estágio.', time: '10:00' },
    { me: true, text: 'Olá, Julie! Ótimo ter você conosco. Seu perfil se destacou bastante no processo seletivo.', time: '10:15' },
    { me: false, text: 'Muito obrigada! Estou bem preparada e empolgada para a etapa técnica.', time: '10:20' },
    { me: true, text: 'A entrevista técnica está agendada para amanhã às 14h via Google Meet. Vou te enviar o link.', time: '14:30' },
    { me: false, text: 'Olá! Gostaria de confirmar o horário da entrevista on-line para amanhã.', time: '14:32' },
  ],
  2: [
    { me: false, text: 'Boa tarde! Candidatei-me à vaga de estágio. Tenho disponibilidade para começar imediatamente.', time: '09:00' },
    { me: true, text: 'Olá Isabela! Recebemos sua candidatura. Estamos avaliando os perfis e entraremos em contato em breve.', time: '09:45' },
    { me: false, text: 'Obrigada pelo retorno. Fico no aguardo!', time: '11:05' },
  ],
  3: [
    { me: true, text: 'Rafael, ficamos muito satisfeitos com seu desempenho nas etapas anteriores. Segue a proposta em anexo.', time: '16:00' },
    { me: false, text: 'Recebi a proposta, vou analisar e respondo até sexta!', time: '16:20' },
  ],
  4: [
    { me: true, text: 'Camila, gostaríamos de ver mais exemplos do seu trabalho em UX. Pode compartilhar?', time: 'Seg 14:00' },
    { me: false, text: 'Portfólio atualizado, segue o link: dribbble.com/camila', time: 'Seg 15:30' },
  ],
}

const stageColor: Record<string, string> = {
  Triagem: '#e8a52b',
  'Entrevista técnica': '#5b6bd6',
  'Proposta enviada': '#2ea84f',
  Contratado: '#2ea84f',
  Reprovado: '#e84c2b',
}

const STAGES = ['Triagem', 'Entrevista técnica', 'Proposta enviada', 'Contratado', 'Reprovado']

const funnel = [
  { stage: 'Candidatos', count: 1204 },
  { stage: 'Triagem', count: 312 },
  { stage: 'Entrevista', count: 89 },
  { stage: 'Proposta', count: 24 },
  { stage: 'Contratados', count: 14 },
]

const summaryCards = [
  { label: 'Vagas ativas', value: '7', delta: '+2 este mês', positive: true },
  { label: 'Candidatos totais', value: '1.204', delta: '+143 esta semana', positive: true },
  { label: 'Em análise', value: '89', delta: '12 aguardam retorno', positive: false },
  { label: 'Contratados (2026)', value: '14', delta: 'meta: 20', positive: true },
]

const NAV_ITEMS: { key: Section; label: string; icon: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { key: 'vagas', label: 'Minhas Vagas', icon: '📋' },
  { key: 'candidatos', label: 'Candidatos', icon: '👥' },
  { key: 'mensagens', label: 'Mensagens', icon: '💬' },
  { key: 'relatorios', label: 'Relatórios', icon: '📊' },
  { key: 'configuracoes', label: 'Configurações', icon: '⚙️' },
]

// ── titles per section ────────────────────────────────────────────────────────
const SECTION_TITLE: Record<Section, string> = {
  dashboard: 'Dashboard de Recrutamento',
  vagas: 'Minhas Vagas',
  candidatos: 'Candidatos',
  mensagens: 'Mensagens',
  relatorios: 'Relatórios',
  configuracoes: 'Configurações',
}

// ─────────────────────────────────────────────────────────────────────────────
export default function CompanyDashboard({ onNavigate }: Props) {
  const [section, setSection] = useState<Section>('dashboard')
  const [candidateStages, setCandidateStages] = useState<Record<number, string>>(
    Object.fromEntries(CANDIDATES.map((c) => [c.id, c.stage]))
  )
  const [feedbackSent, setFeedbackSent] = useState<Record<number, boolean>>({ 3: true })
  const [activeMsg, setActiveMsg] = useState<number | null>(null)
  const [msgInput, setMsgInput] = useState('')
  const [convos, setConvos] = useState(CONV_MSGS)
  const [jobFilter, setJobFilter] = useState('Todas')
  const [stageFilter, setStageFilter] = useState('Todos')
  const [vagaFilter, setVagaFilter] = useState<'Todas' | 'Ativa' | 'Encerrada'>('Todas')
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifSMS, setNotifSMS] = useState(false)
  const [notifApp, setNotifApp] = useState(true)
  const [companyName, setCompanyName] = useState('Nubank')
  const [companyEmail, setCompanyEmail] = useState('rh@nubank.com.br')
  const [companySite, setCompanySite] = useState('nubank.com.br')
  const [saved, setSaved] = useState(false)

  function advanceStage(id: number) {
    setCandidateStages((prev) => {
      const cur = prev[id]
      const idx = STAGES.indexOf(cur)
      const next = STAGES[Math.min(idx + 1, STAGES.length - 1)]
      return { ...prev, [id]: next }
    })
    setFeedbackSent((prev) => ({ ...prev, [id]: true }))
  }

  function rejectCandidate(id: number) {
    setCandidateStages((prev) => ({ ...prev, [id]: 'Reprovado' }))
    setFeedbackSent((prev) => ({ ...prev, [id]: true }))
  }

  function sendFeedback(id: number) {
    setFeedbackSent((prev) => ({ ...prev, [id]: true }))
  }

  function sendMsg() {
    if (!msgInput.trim() || activeMsg === null) return
    setConvos((prev) => ({
      ...prev,
      [activeMsg]: [...(prev[activeMsg] ?? []), { me: true, text: msgInput.trim(), time: 'Agora' }],
    }))
    setMsgInput('')
  }

  const filteredCandidates = CANDIDATES.filter((c) => {
    if (jobFilter !== 'Todas' && c.role !== jobFilter) return false
    const stage = candidateStages[c.id]
    if (stageFilter !== 'Todos' && stage !== stageFilter) return false
    return true
  })

  const filteredJobs = JOBS.filter((j) => vagaFilter === 'Todas' || j.status === vagaFilter)

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-background)' }}>
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r fixed top-0 left-0 h-full z-20"
        style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <div className="px-5 py-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <span className="font-bold text-base" style={{ fontFamily: 'var(--font-display)' }}>
            Conecta<span style={{ color: 'var(--color-accent)' }}>Unis</span>
          </span>
          <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted-foreground)' }}>Portal Empresa</div>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
          {NAV_ITEMS.map(({ key, label, icon }) => {
            const unread = key === 'mensagens' ? MESSAGES.reduce((s, m) => s + m.unread, 0) : 0
            return (
              <button key={key} onClick={() => setSection(key)}
                className="text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2.5"
                style={{
                  background: section === key ? 'var(--color-foreground)' : 'transparent',
                  color: section === key ? '#fff' : 'var(--color-muted-foreground)',
                  fontWeight: section === key ? 600 : 400,
                }}>
                <span className="text-base leading-none">{icon}</span>
                <span className="flex-1">{label}</span>
                {unread > 0 && (
                  <span className="text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full"
                    style={{ background: 'var(--color-accent)', color: '#fff' }}>{unread}</span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="px-4 py-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: 'var(--color-accent)', color: '#fff' }}>N</div>
            <div>
              <div className="text-xs font-semibold">{companyName}</div>
              <div className="text-[10px]" style={{ color: 'var(--color-muted-foreground)' }}>RH · Ana Paula</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 overflow-y-auto md:ml-56">
        {/* Topbar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b"
          style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3">
            <BackButton onClick={() => onNavigate?.('landing')} />
            <div>
              <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                {SECTION_TITLE[section]}
              </h1>
              <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Setembro 2026</div>
            </div>
          </div>
          {(section === 'dashboard' || section === 'vagas') && (
            <button onClick={() => onNavigate?.('publish')}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{ background: 'var(--color-accent)', color: '#fff' }}>
              + Publicar vaga
            </button>
          )}
        </div>

        {/* ── DASHBOARD ── */}
        {section === 'dashboard' && (
          <div className="p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {summaryCards.map((c) => (
                <div key={c.label} className="p-5 rounded-2xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                  <div className="text-xs mb-2 uppercase tracking-widest" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>{c.label}</div>
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>{c.value}</div>
                  <div className="text-xs" style={{ color: c.positive ? '#2ea84f' : 'var(--color-muted-foreground)' }}>{c.delta}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Funil de contratação</div>
                {funnel.map((f, i) => {
                  const pct = (f.count / funnel[0].count) * 100
                  return (
                    <div key={f.stage} className="mb-3 last:mb-0">
                      <div className="flex justify-between text-sm mb-1">
                        <span style={{ fontWeight: i === funnel.length - 1 ? 700 : 400 }}>{f.stage}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted-foreground)' }}>{f.count.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-secondary)' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: i === funnel.length - 1 ? '#2ea84f' : 'var(--color-accent)', opacity: 1 - i * 0.08 }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="p-5 rounded-2xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Vagas ativas</div>
                {JOBS.filter((j) => j.status === 'Ativa').map((j) => (
                  <button key={j.id} onClick={() => setSection('vagas')}
                    className="w-full text-left flex items-center justify-between py-3 border-b last:border-0 hover:opacity-80 transition-opacity"
                    style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{j.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: '#2ea84f20', color: '#2ea84f' }}>Ativa</span>
                        <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{j.applicants} candidatos</span>
                      </div>
                    </div>
                    {j.new > 0 && (
                      <span className="ml-3 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full" style={{ background: 'var(--color-accent)', color: '#fff' }}>{j.new}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
                <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Candidatos recentes</div>
                <button onClick={() => setSection('candidatos')} className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>Ver todos →</button>
              </div>
              {CANDIDATES.slice(0, 4).map((c) => (
                <CandidateRow key={c.id} c={c} stage={candidateStages[c.id]} feedbackSent={!!feedbackSent[c.id]} onFeedback={() => sendFeedback(c.id)} onAdvance={() => advanceStage(c.id)} onReject={() => rejectCandidate(c.id)} />
              ))}
            </div>
          </div>
        )}

        {/* ── MINHAS VAGAS ── */}
        {section === 'vagas' && (
          <div className="p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 flex-wrap">
              {(['Todas', 'Ativa', 'Encerrada'] as const).map((f) => (
                <button key={f} onClick={() => setVagaFilter(f)}
                  className="px-4 py-1.5 rounded-full text-sm border transition-all"
                  style={{
                    borderColor: vagaFilter === f ? 'var(--color-accent)' : 'var(--color-border)',
                    background: vagaFilter === f ? 'rgba(26,92,255,0.08)' : 'transparent',
                    color: vagaFilter === f ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
                    fontWeight: vagaFilter === f ? 600 : 400,
                  }}>
                  {f}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {filteredJobs.map((j) => (
                <div key={j.id} className="p-5 rounded-2xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{j.title}</div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded-full" style={{ background: 'var(--color-secondary)' }}>{j.area}</span>
                        <span className="px-2 py-0.5 rounded-full" style={{ background: 'var(--color-secondary)' }}>{j.type}</span>
                        <span className="px-2 py-0.5 rounded-full" style={{ background: 'var(--color-secondary)' }}>{j.mode}</span>
                        <span className="px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(26,92,255,0.08)', color: 'var(--color-accent)' }}>{j.salary}</span>
                        <span className="px-2 py-0.5 rounded-full font-semibold" style={{ background: j.status === 'Ativa' ? '#2ea84f20' : 'var(--color-secondary)', color: j.status === 'Ativa' ? '#2ea84f' : 'var(--color-muted-foreground)' }}>{j.status}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{j.applicants}</div>
                      <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>candidatos</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-xs" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                      Prazo: {j.deadline}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => { setStageFilter('Todos'); setJobFilter(j.title); setSection('candidatos') }}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
                        style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                        Ver candidatos
                      </button>
                      {j.status === 'Ativa' && (
                        <button className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                          style={{ background: 'var(--color-accent)', color: '#fff' }}>
                          Editar vaga
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CANDIDATOS ── */}
        {section === 'candidatos' && (
          <div className="p-6 flex flex-col gap-5">
            <div className="rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              style={{ background: 'rgba(26,92,255,0.06)', border: '1px solid rgba(26,92,255,0.16)' }}>
              <div>
                <div className="font-semibold text-sm">Retorno obrigatório em até 7 dias</div>
                <p className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                  Atualizar a etapa ou enviar feedback avisa o candidato automaticamente. Dois retornos vencem nas próximas 24 horas.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full shrink-0"
                style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)', fontFamily: 'var(--font-mono)' }}>
                2 PRIORITÁRIOS
              </span>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-muted-foreground)' }}>Vaga</label>
                <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}
                  className="text-sm px-3 py-2 rounded-xl border outline-none"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-card)', fontFamily: 'var(--font-sans)', color: 'var(--color-foreground)' }}>
                  <option value="Todas">Todas as vagas</option>
                  {JOBS.map((j) => <option key={j.id} value={j.title}>{j.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-muted-foreground)' }}>Etapa</label>
                <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}
                  className="text-sm px-3 py-2 rounded-xl border outline-none"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-card)', fontFamily: 'var(--font-sans)', color: 'var(--color-foreground)' }}>
                  <option value="Todos">Todas as etapas</option>
                  {STAGES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="self-end text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                {filteredCandidates.length} candidato{filteredCandidates.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Kanban-style stage columns for desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-4">
              {['Triagem', 'Entrevista técnica', 'Proposta enviada'].map((stage) => {
                const col = filteredCandidates.filter((c) => candidateStages[c.id] === stage)
                return (
                  <div key={stage} className="rounded-2xl p-4" style={{ background: 'var(--color-secondary)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: stageColor[stage] + '25', color: stageColor[stage] }}>{stage}</span>
                      <span className="text-xs font-mono" style={{ color: 'var(--color-muted-foreground)' }}>{col.length}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {col.map((c) => (
                        <div key={c.id} className="p-3 rounded-xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                          <div className="flex items-center gap-2 mb-2">
                            <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-lg object-cover" style={{ background: 'var(--color-muted)' }} />
                            <div>
                              <div className="text-xs font-semibold">{c.name}</div>
                              <div className="text-[10px]" style={{ color: 'var(--color-muted-foreground)' }}>{c.course.split(' · ')[1]}</div>
                            </div>
                            <span className="ml-auto text-xs font-bold" style={{ color: c.match >= 90 ? '#2ea84f' : 'var(--color-foreground)' }}>{c.match}%</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] mb-2" style={{ color: feedbackSent[c.id] ? '#2ea84f' : 'var(--color-muted-foreground)' }}>
                            <span>{feedbackSent[c.id] ? 'Retorno enviado' : `Retorno em ${c.feedbackDue}`}</span>
                            {!feedbackSent[c.id] && (
                              <button onClick={() => sendFeedback(c.id)} className="font-semibold" style={{ color: 'var(--color-accent)' }}>
                                Enviar agora
                              </button>
                            )}
                          </div>
                          <div className="flex gap-1.5">
                            <button onClick={() => advanceStage(c.id)} className="flex-1 py-1 rounded-full text-[11px] font-semibold transition-all hover:scale-105" style={{ background: 'var(--color-accent)', color: '#fff' }}>Avançar</button>
                            <button onClick={() => rejectCandidate(c.id)} className="flex-1 py-1 rounded-full text-[11px] border transition-colors" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)' }}>Recusar</button>
                          </div>
                        </div>
                      ))}
                      {col.length === 0 && <div className="text-xs text-center py-6" style={{ color: 'var(--color-muted-foreground)' }}>Nenhum candidato</div>}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* List for mobile */}
            <div className="lg:hidden rounded-2xl border overflow-hidden" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              {filteredCandidates.map((c) => (
                <CandidateRow key={c.id} c={c} stage={candidateStages[c.id]} feedbackSent={!!feedbackSent[c.id]} onFeedback={() => sendFeedback(c.id)} onAdvance={() => advanceStage(c.id)} onReject={() => rejectCandidate(c.id)} />
              ))}
              {filteredCandidates.length === 0 && <div className="p-8 text-center text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Nenhum candidato encontrado</div>}
            </div>
          </div>
        )}

        {/* ── MENSAGENS ── */}
        {section === 'mensagens' && (
          <div className="flex h-[calc(100vh-65px)]">
            {/* Lista */}
            <div className="w-64 shrink-0 border-r overflow-y-auto" style={{ borderColor: 'var(--color-border)' }}>
              {MESSAGES.map((m) => (
                <button key={m.id} onClick={() => setActiveMsg(m.id)}
                  className="w-full text-left px-4 py-4 border-b transition-colors"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: activeMsg === m.id ? 'var(--color-secondary)' : 'transparent',
                  }}>
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img src={m.avatar} alt={m.from} className="w-9 h-9 rounded-xl object-cover" style={{ background: 'var(--color-muted)' }} />
                      {m.unread > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-bold flex items-center justify-center rounded-full" style={{ background: 'var(--color-accent)', color: '#fff' }}>{m.unread}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold truncate">{m.from}</span>
                        <span className="text-[10px] shrink-0 ml-1" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>{m.time}</span>
                      </div>
                      <div className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--color-muted-foreground)' }}>{m.last}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Conversa */}
            {activeMsg !== null ? (
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="px-5 py-3 border-b flex items-center gap-3" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card)' }}>
                  {(() => {
                    const m = MESSAGES.find((x) => x.id === activeMsg)!
                    return (
                      <>
                        <img src={m.avatar} alt={m.from} className="w-8 h-8 rounded-xl object-cover" style={{ background: 'var(--color-muted)' }} />
                        <div>
                          <div className="text-sm font-semibold">{m.from}</div>
                          <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{m.role}</div>
                        </div>
                      </>
                    )
                  })()}
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                  {(convos[activeMsg] ?? []).map((msg, i) => (
                    <div key={i} className={`flex ${msg.me ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-[70%] px-4 py-2.5 rounded-2xl text-sm"
                        style={{
                          background: msg.me ? 'var(--color-accent)' : 'var(--color-secondary)',
                          color: msg.me ? '#fff' : 'var(--color-foreground)',
                          borderRadius: msg.me ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        }}>
                        <p>{msg.text}</p>
                        <p className="text-[10px] mt-1 opacity-60 text-right" style={{ fontFamily: 'var(--font-mono)' }}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Input */}
                <div className="px-4 py-3 border-t flex gap-2" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card)' }}>
                  <input value={msgInput} onChange={(e) => setMsgInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
                    placeholder="Escreva uma mensagem…"
                    className="flex-1 px-4 py-2.5 rounded-full text-sm border outline-none"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--color-background)', fontFamily: 'var(--font-sans)', color: 'var(--color-foreground)' }} />
                  <button onClick={sendMsg}
                    className="px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                    style={{ background: 'var(--color-accent)', color: '#fff' }}>
                    Enviar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center flex-col gap-2" style={{ color: 'var(--color-muted-foreground)' }}>
                <span className="text-3xl">💬</span>
                <p className="text-sm">Selecione uma conversa</p>
              </div>
            )}
          </div>
        )}

        {/* ── RELATÓRIOS ── */}
        {section === 'relatorios' && (
          <div className="p-6 flex flex-col gap-6">
            {/* KPI row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Taxa de conversão', value: '1,16%', sub: 'candidatos → contratados', color: '#2ea84f' },
                { label: 'Tempo médio de contratação', value: '18 dias', sub: 'da publicação à oferta', color: 'var(--color-accent)' },
                { label: 'Custo por contratação', value: 'R$ 0', sub: 'plataforma gratuita', color: '#5b6bd6' },
                { label: 'Satisfação dos contratados', value: '94%', sub: 'pesquisa pós-ingresso', color: '#e8a52b' },
              ].map((k) => (
                <div key={k.label} className="p-5 rounded-2xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                  <div className="text-xs mb-2 uppercase tracking-widest" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>{k.label}</div>
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: k.color }}>{k.value}</div>
                  <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Candidatos por vaga */}
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Candidatos por vaga</div>
              {JOBS.map((j) => {
                const maxApplicants = Math.max(...JOBS.map((x) => x.applicants))
                const pct = (j.applicants / maxApplicants) * 100
                return (
                  <div key={j.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="truncate max-w-[70%]">{j.title}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted-foreground)' }}>{j.applicants}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-secondary)' }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: j.status === 'Ativa' ? 'var(--color-accent)' : 'var(--color-muted)' }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Etapas */}
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Distribuição por etapa</div>
              <div className="flex flex-wrap gap-4">
                {STAGES.slice(0, 3).map((s) => {
                  const count = Object.values(candidateStages).filter((v) => v === s).length
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: stageColor[s] }} />
                      <span className="text-sm">{s}</span>
                      <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-mono)' }}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                ↓ Exportar CSV
              </button>
              <button className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                ↓ Exportar PDF
              </button>
            </div>
          </div>
        )}

        {/* ── CONFIGURAÇÕES ── */}
        {section === 'configuracoes' && (
          <div className="p-6 max-w-2xl flex flex-col gap-5">
            <CfgCard title="Dados da empresa">
              <CfgRow label="Nome da empresa">
                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="cfg-input" />
              </CfgRow>
              <CfgRow label="E-mail de RH">
                <input value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} className="cfg-input" />
              </CfgRow>
              <CfgRow label="Site da empresa">
                <input value={companySite} onChange={(e) => setCompanySite(e.target.value)} className="cfg-input" />
              </CfgRow>
            </CfgCard>

            <CfgCard title="Notificações">
              {[
                { label: 'E-mail', desc: 'Receber alertas de novas candidaturas por e-mail', val: notifEmail, set: setNotifEmail },
                { label: 'SMS', desc: 'Receber SMS para entrevistas confirmadas', val: notifSMS, set: setNotifSMS },
                { label: 'In-app', desc: 'Notificações dentro da plataforma', val: notifApp, set: setNotifApp },
              ].map(({ label, desc, val, set }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'var(--color-border)' }}>
                  <div>
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{desc}</div>
                  </div>
                  <button onClick={() => set(!val)}
                    className="w-10 h-6 rounded-full transition-all relative shrink-0"
                    style={{ background: val ? 'var(--color-accent)' : 'var(--color-muted)' }}>
                    <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                      style={{ left: val ? '1.25rem' : '0.125rem' }} />
                  </button>
                </div>
              ))}
            </CfgCard>

            <CfgCard title="Segurança">
              <CfgRow label="Senha atual">
                <input type="password" placeholder="••••••••" className="cfg-input" />
              </CfgRow>
              <CfgRow label="Nova senha">
                <input type="password" placeholder="••••••••" className="cfg-input" />
              </CfgRow>
              <CfgRow label="Confirmar nova senha">
                <input type="password" placeholder="••••••••" className="cfg-input" />
              </CfgRow>
            </CfgCard>

            <div className="flex items-center gap-3">
              <button onClick={() => setSaved(true)}
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Salvar alterações
              </button>
              {saved && <span className="text-sm" style={{ color: '#2ea84f' }}>✓ Salvo com sucesso</span>}
            </div>

            <div className="p-4 rounded-2xl border text-sm" style={{ borderColor: '#e84c2b40', background: '#e84c2b08', color: '#e84c2b' }}>
              <strong>Zona de risco:</strong> encerrar conta apaga todos os dados permanentemente.
              <button className="ml-3 underline text-sm">Encerrar conta</button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .cfg-input {
          width: 100%; padding: 0.65rem 0.9rem; border-radius: 0.65rem;
          border: 1px solid var(--color-border); background: var(--color-background);
          color: var(--color-foreground); font-size: 0.875rem; outline: none;
          font-family: var(--font-sans); transition: border-color 0.15s;
        }
        .cfg-input:focus { border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(26,92,255,0.1); }
        .cfg-input::placeholder { color: var(--color-muted-foreground); }
      `}</style>
    </div>
  )
}

// ── shared sub-components ────────────────────────────────────────────────────
function CandidateRow({ c, stage, feedbackSent, onFeedback, onAdvance, onReject }: {
  c: typeof CANDIDATES[0]
  stage: string
  feedbackSent: boolean
  onFeedback: () => void
  onAdvance: () => void
  onReject: () => void
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b last:border-0 hover:bg-[var(--color-secondary)] transition-colors"
      style={{ borderColor: 'var(--color-border)' }}>
      <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-xl object-cover shrink-0" style={{ background: 'var(--color-muted)' }} />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{c.name}</div>
        <div className="text-xs truncate" style={{ color: 'var(--color-muted-foreground)' }}>{c.course}</div>
        <button
          onClick={onFeedback}
          disabled={feedbackSent}
          className="text-[10px] font-semibold mt-1 disabled:cursor-default"
          style={{ color: feedbackSent ? '#2ea84f' : c.feedbackDue === 'Hoje' ? '#e84c2b' : 'var(--color-accent)' }}
        >
          {feedbackSent ? 'Retorno enviado' : `Enviar feedback · ${c.feedbackDue}`}
        </button>
      </div>
      <div className="hidden sm:block text-xs truncate max-w-[160px]" style={{ color: 'var(--color-muted-foreground)' }}>{c.role}</div>
      <span className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
        style={{ background: (stageColor[stage] ?? '#aaa') + '20', color: stageColor[stage] ?? '#aaa' }}>
        {stage}
      </span>
      <div className="text-right shrink-0">
        <div className="text-sm font-bold" style={{ color: c.match >= 90 ? '#2ea84f' : 'var(--color-foreground)' }}>{c.match}%</div>
        <div className="text-[10px]" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>match</div>
      </div>
      <div className="flex gap-1.5">
        <button onClick={onAdvance} className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
          style={{ background: 'var(--color-accent)', color: '#fff' }}>Avançar</button>
        <button onClick={onReject} className="px-3 py-1.5 rounded-full text-xs border transition-colors"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)' }}>Recusar</button>
      </div>
    </div>
  )
}

function CfgCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
      <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>{title}</div>
      {children}
    </div>
  )
}

function CfgRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: 'var(--color-foreground)' }}>{label}</label>
      {children}
    </div>
  )
}
