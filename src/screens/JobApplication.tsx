import { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'

interface Props {
  onNavigate: (s: string) => void
}

type Step = 1 | 2 | 3 | 4

const VAGAS = [
  { id: 1, company: 'Nubank', role: 'Estágio em Engenharia de Software', type: 'Estágio', mode: 'Híbrido', logo: 'N', color: '#8A05BE', challenge: 'Um usuário abandona o cadastro depois de receber uma mensagem de erro genérica. Em até cinco passos, explique como você investigaria e melhoraria esse fluxo.' },
  { id: 2, company: 'Embraer', role: 'Estágio em Engenharia Aeronáutica', type: 'Estágio', mode: 'Presencial', logo: 'E', color: '#003087', challenge: 'Você identificou uma diferença entre o resultado de uma simulação e um teste real. Descreva como organizaria uma análise inicial segura e objetiva.' },
  { id: 3, company: 'Magazine Luiza', role: 'Trainee Programa ML', type: 'Trainee', mode: 'Híbrido', logo: 'M', color: '#E30613', challenge: 'Uma equipe tem duas prioridades urgentes e recursos para executar apenas uma. Explique quais dados usaria para recomendar uma decisão.' },
]

const STEPS = [
  { n: 1 as Step, label: 'Vaga' },
  { n: 2 as Step, label: 'Dados pessoais' },
  { n: 3 as Step, label: 'Etapa prática' },
  { n: 4 as Step, label: 'Revisão' },
]

const ENGLISH_LEVELS = ['Básico', 'Intermediário', 'Avançado', 'Fluente']
const AVAILABILITY = ['Manhã (08h–12h)', 'Tarde (13h–18h)', 'Noturno (19h–22h)', 'Integral']

export default function JobApplication({ onNavigate }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)
  const [selectedVaga, setSelectedVaga] = useState<number | null>(null)

  // Step 2 — dados pessoais
  const [linkedin, setLinkedin] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [availability, setAvailability] = useState('')
  const [startDate, setStartDate] = useState('')
  const [disability, setDisability] = useState<'sim' | 'nao' | ''>('')

  // Step 3 — questões da vaga
  const [microAnswer, setMicroAnswer] = useState('')
  const [challengeStarted, setChallengeStarted] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(15 * 60)
  const [englishLevel, setEnglishLevel] = useState('')
  const [techStack, setTechStack] = useState('')
  const [salaryExpect, setSalaryExpect] = useState('')
  const [remote, setRemote] = useState<'sim' | 'nao' | ''>('')
  const [videoName, setVideoName] = useState('')

  const vaga = VAGAS.find((v) => v.id === selectedVaga)
  const challengeFinished = challengeStarted && secondsLeft === 0
  const timerLabel = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`

  useEffect(() => {
    if (!challengeStarted || secondsLeft <= 0) return
    const timer = window.setInterval(() => setSecondsLeft((current) => Math.max(0, current - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [challengeStarted, secondsLeft])

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: 'var(--color-background)' }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: 'rgba(26,92,255,0.1)' }}>
          <svg className="w-10 h-10" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>Candidatura enviada!</h1>
        <p className="text-base mb-1 max-w-sm" style={{ color: 'var(--color-muted-foreground)' }}>
          Sua candidatura para <strong>{vaga?.role}</strong> na <strong>{vaga?.company}</strong> foi recebida com sucesso.
        </p>
        <p className="text-sm mb-2" style={{ color: 'var(--color-muted-foreground)' }}>
          A empresa deve atualizar seu status em até <strong>7 dias</strong>. Se isso não acontecer, a plataforma enviará um retorno automático.
        </p>
        <p className="text-xs mb-10 px-4 py-2 rounded-full" style={{ background: 'var(--color-secondary)', color: 'var(--color-muted-foreground)' }}>
          Você pode acompanhar o status em <strong>Perfil → Candidaturas</strong>
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <button onClick={() => onNavigate('profile')}
            className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{ background: 'var(--color-accent)', color: '#fff' }}>
            Ver minhas candidaturas
          </button>
          <button onClick={() => { setSubmitted(false); setStep(1); setSelectedVaga(null) }}
            className="px-6 py-3 rounded-full font-semibold text-sm border transition-colors"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
            Candidatar a outra vaga
          </button>
          <button onClick={() => onNavigate('jobs')}
            className="px-6 py-3 rounded-full font-semibold text-sm border transition-colors"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
            Explorar mais vagas
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      {/* Topbar */}
      <div className="sticky top-0 z-30 border-b px-6 py-4 flex items-center gap-4"
        style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <BackButton onClick={() => step === 1 ? onNavigate('jobs') : setStep((step - 1) as Step)} />
        <span className="font-bold text-base ml-1" style={{ fontFamily: 'var(--font-display)' }}>
          Conecta<span style={{ color: 'var(--color-accent)' }}>Unis</span>
          <span className="font-normal text-sm ml-2" style={{ color: 'var(--color-muted-foreground)' }}>
            · Candidatura
          </span>
        </span>

        {/* Step dots */}
        <div className="flex items-center gap-2 ml-auto">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                  style={{
                    background: step > s.n ? 'var(--color-accent)' : step === s.n ? 'var(--color-foreground)' : 'var(--color-secondary)',
                    color: step >= s.n ? '#fff' : 'var(--color-muted-foreground)',
                  }}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className="text-xs hidden sm:block"
                  style={{ color: step === s.n ? 'var(--color-foreground)' : 'var(--color-muted-foreground)', fontWeight: step === s.n ? 600 : 400 }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-5 h-px hidden sm:block" style={{ background: step > s.n ? 'var(--color-accent)' : 'var(--color-border)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-4 py-10 pb-28">

        {/* STEP 1 — Escolher vaga */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Escolha a vaga
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                Selecione para qual vaga você deseja se candidatar.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {VAGAS.map((v) => (
                <button key={v.id} onClick={() => setSelectedVaga(v.id)}
                  className="text-left p-5 rounded-2xl border transition-all"
                  style={{
                    borderColor: selectedVaga === v.id ? 'var(--color-accent)' : 'var(--color-border)',
                    background: selectedVaga === v.id ? 'rgba(26,92,255,0.04)' : 'var(--color-card)',
                    boxShadow: selectedVaga === v.id ? '0 0 0 2px var(--color-accent)' : undefined,
                  }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                      style={{ background: v.color, color: '#fff' }}>
                      {v.logo}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{v.role}</div>
                      <div className="text-sm mt-0.5" style={{ color: 'var(--color-muted-foreground)' }}>{v.company}</div>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--color-secondary)' }}>{v.type}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--color-secondary)' }}>{v.mode}</span>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                      style={{
                        borderColor: selectedVaga === v.id ? 'var(--color-accent)' : 'var(--color-border)',
                        background: selectedVaga === v.id ? 'var(--color-accent)' : 'transparent',
                      }}>
                      {selectedVaga === v.id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button onClick={() => setStep(2)} disabled={!selectedVaga}
                className="px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — Dados complementares */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Dados complementares
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                Informações adicionais que ajudam o RH a conhecer você melhor.
              </p>
            </div>

            <Card title="Links profissionais">
              <FormRow label="LinkedIn">
                <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="linkedin.com/in/lucasferreira" className="fi" />
              </FormRow>
              <FormRow label="Portfólio / GitHub">
                <input value={portfolio} onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="github.com/lucasferreira ou meusite.dev" className="fi" />
              </FormRow>
            </Card>

            <Card title="Disponibilidade">
              <FormRow label="Qual turno você tem disponível?">
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY.map((a) => (
                    <button key={a} type="button" onClick={() => setAvailability(a)}
                      className="px-4 py-2 rounded-full text-sm border transition-all"
                      style={{
                        borderColor: availability === a ? 'var(--color-accent)' : 'var(--color-border)',
                        background: availability === a ? 'rgba(26,92,255,0.08)' : 'transparent',
                        color: availability === a ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
                        fontWeight: availability === a ? 600 : 400,
                      }}>
                      {a}
                    </button>
                  ))}
                </div>
              </FormRow>
              <FormRow label="Quando pode iniciar?">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="fi" />
              </FormRow>
            </Card>

            <Card title="Diversidade & Inclusão">
              <p className="text-xs mb-3" style={{ color: 'var(--color-muted-foreground)' }}>
                Esta informação é opcional e utilizada apenas para fins de relatórios de inclusão. Não impacta sua candidatura.
              </p>
              <FormRow label="Possui alguma deficiência (PcD)?">
                <div className="flex gap-3">
                  {(['sim', 'nao'] as const).map((v) => (
                    <button key={v} type="button" onClick={() => setDisability(v)}
                      className="px-5 py-2 rounded-full text-sm border transition-all capitalize"
                      style={{
                        borderColor: disability === v ? 'var(--color-accent)' : 'var(--color-border)',
                        background: disability === v ? 'rgba(26,92,255,0.08)' : 'transparent',
                        color: disability === v ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
                        fontWeight: disability === v ? 600 : 400,
                      }}>
                      {v === 'sim' ? 'Sim' : 'Não'}
                    </button>
                  ))}
                </div>
              </FormRow>
            </Card>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)}
                className="px-6 py-3 rounded-full text-sm border font-semibold"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                ← Voltar
              </button>
              <button onClick={() => setStep(3)}
                className="px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Próximo →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Questões da vaga */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Etapa prática
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                Um microdesafio de 15 minutos e perguntas objetivas da <strong>{vaga?.company}</strong>.
              </p>
            </div>

            {/* Vaga mini-card */}
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: vaga?.color, color: '#fff' }}>
                {vaga?.logo}
              </div>
              <div>
                <div className="font-semibold text-sm">{vaga?.role}</div>
                <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{vaga?.company} · {vaga?.type}</div>
              </div>
            </div>

            <Card title="Microdesafio prático · 15 minutos">
              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl"
                style={{ background: 'rgba(26,92,255,0.06)', border: '1px solid rgba(26,92,255,0.16)' }}>
                <div>
                  <div className="font-semibold text-sm mb-1">Uma atividade curta no lugar da carta de apresentação</div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
                    O cronômetro começa quando você abrir o desafio. Sua resposta pode ser objetiva e não precisa estar perfeita.
                  </p>
                </div>
                <div className="text-xl font-bold shrink-0" style={{ color: challengeFinished ? '#e84c2b' : 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                  {timerLabel}
                </div>
              </div>

              {!challengeStarted ? (
                <button
                  type="button"
                  onClick={() => setChallengeStarted(true)}
                  className="w-full py-3 rounded-full font-semibold text-sm"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                >
                  Iniciar microdesafio
                </button>
              ) : (
                <FormRow label="Sua resposta *">
                  <div className="p-4 rounded-xl mb-2 text-sm leading-relaxed" style={{ background: 'var(--color-secondary)' }}>
                    {vaga?.challenge}
                  </div>
                  <textarea
                    value={microAnswer}
                    onChange={(e) => setMicroAnswer(e.target.value)}
                    placeholder="Organize seu raciocínio em passos curtos e objetivos."
                    rows={6}
                    className="fi resize-none"
                    disabled={challengeFinished}
                  />
                  <CharCount value={microAnswer} max={900} />
                  {challengeFinished && (
                    <p className="text-xs" style={{ color: '#e84c2b' }}>
                      Tempo encerrado. A resposta registrada até aqui será considerada.
                    </p>
                  )}
                </FormRow>
              )}
            </Card>

            <Card title="Perguntas de múltipla escolha">
              <FormRow label="3. Qual é o seu nível de inglês?">
                <div className="flex flex-wrap gap-2">
                  {ENGLISH_LEVELS.map((l) => (
                    <button key={l} type="button" onClick={() => setEnglishLevel(l)}
                      className="px-4 py-2 rounded-full text-sm border transition-all"
                      style={{
                        borderColor: englishLevel === l ? 'var(--color-accent)' : 'var(--color-border)',
                        background: englishLevel === l ? 'rgba(26,92,255,0.08)' : 'transparent',
                        color: englishLevel === l ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
                        fontWeight: englishLevel === l ? 600 : 400,
                      }}>
                      {l}
                    </button>
                  ))}
                </div>
              </FormRow>

              <FormRow label="4. Teria disponibilidade para trabalho totalmente remoto, caso necessário?">
                <div className="flex gap-3">
                  {(['sim', 'nao'] as const).map((v) => (
                    <button key={v} type="button" onClick={() => setRemote(v)}
                      className="px-5 py-2 rounded-full text-sm border transition-all"
                      style={{
                        borderColor: remote === v ? 'var(--color-accent)' : 'var(--color-border)',
                        background: remote === v ? 'rgba(26,92,255,0.08)' : 'transparent',
                        color: remote === v ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
                        fontWeight: remote === v ? 600 : 400,
                      }}>
                      {v === 'sim' ? 'Sim' : 'Não'}
                    </button>
                  ))}
                </div>
              </FormRow>
            </Card>

            <Card title="Questões técnicas">
              <FormRow label="5. Liste as principais tecnologias que você domina com nível de proficiência:">
                <textarea value={techStack} onChange={(e) => setTechStack(e.target.value)}
                  placeholder="Ex: React (avançado), Python (intermediário), SQL (intermediário), Git (avançado)…"
                  rows={3} className="fi resize-none" />
              </FormRow>

              <FormRow label="6. Qual sua pretensão salarial (bolsa auxílio)?">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium"
                    style={{ color: 'var(--color-muted-foreground)' }}>R$</span>
                  <input value={salaryExpect} onChange={(e) => setSalaryExpect(e.target.value)}
                    placeholder="2.500" type="number" className="fi pl-9" />
                </div>
              </FormRow>
            </Card>

            <Card title="Currículo em vídeo · 60 segundos (opcional)">
              <p className="text-xs mb-3" style={{ color: 'var(--color-muted-foreground)' }}>
                Grave uma apresentação breve para mostrar sua comunicação e energia. Essa etapa não é obrigatória e não reduz suas chances se for ignorada.
              </p>
              <label className="cursor-pointer flex items-center justify-between gap-4 p-4 rounded-2xl border"
                style={{ borderColor: videoName ? 'var(--color-accent)' : 'var(--color-border)', background: videoName ? 'rgba(26,92,255,0.04)' : 'var(--color-background)' }}>
                <div>
                  <div className="font-semibold text-sm">{videoName || 'Gravar ou escolher vídeo'}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>MP4, MOV ou WebM · máximo recomendado: 60 segundos</div>
                </div>
                <span className="text-sm font-semibold shrink-0" style={{ color: 'var(--color-accent)' }}>{videoName ? 'Trocar' : 'Adicionar'}</span>
                <input
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm"
                  capture="user"
                  className="sr-only"
                  onChange={(e) => setVideoName(e.target.files?.[0]?.name || '')}
                />
              </label>
            </Card>

            <div className="flex justify-between">
              <button onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full text-sm border font-semibold"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                ← Voltar
              </button>
              <button onClick={() => setStep(4)}
                disabled={!challengeStarted || !microAnswer.trim()}
                className="px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Revisar →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — Revisão */}
        {step === 4 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Revise sua candidatura
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                Confira tudo antes de enviar. Após o envio não é possível editar.
              </p>
            </div>

            {/* Vaga */}
            <ReviewBlock title="Vaga selecionada">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0"
                  style={{ background: vaga?.color, color: '#fff' }}>
                  {vaga?.logo}
                </div>
                <div>
                  <div className="font-semibold text-sm">{vaga?.role}</div>
                  <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{vaga?.company} · {vaga?.type} · {vaga?.mode}</div>
                </div>
              </div>
            </ReviewBlock>

            {/* Dados pessoais */}
            <ReviewBlock title="Dados complementares" onEdit={() => setStep(2)}>
              <ReviewRow label="LinkedIn" value={linkedin || '—'} />
              <ReviewRow label="Portfólio" value={portfolio || '—'} />
              <ReviewRow label="Disponibilidade" value={availability || '—'} />
              <ReviewRow label="Início previsto" value={startDate || '—'} />
              <ReviewRow label="PcD" value={disability === 'sim' ? 'Sim' : disability === 'nao' ? 'Não' : '—'} />
            </ReviewBlock>

            {/* Respostas */}
            <ReviewBlock title="Respostas às questões" onEdit={() => setStep(3)}>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: 'var(--color-muted-foreground)' }}>Microdesafio de 15 minutos</div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-foreground)' }}>
                    {microAnswer}
                  </p>
                </div>
                <ReviewRow label="Inglês" value={englishLevel || '—'} />
                <ReviewRow label="Disponível para remoto" value={remote === 'sim' ? 'Sim' : remote === 'nao' ? 'Não' : '—'} />
                <ReviewRow label="Stack técnico" value={techStack || '—'} />
                <ReviewRow label="Pretensão salarial" value={salaryExpect ? `R$ ${parseInt(salaryExpect).toLocaleString('pt-BR')}` : '—'} />
                <ReviewRow label="Vídeo de 60 segundos" value={videoName || 'Não enviado (opcional)'} />
              </div>
            </ReviewBlock>

            {/* Termo */}
            <div className="p-4 rounded-2xl text-sm"
              style={{ background: 'rgba(26,92,255,0.05)', border: '1px solid rgba(26,92,255,0.15)', color: 'var(--color-muted-foreground)' }}>
              Ao enviar, você confirma que todas as informações são verdadeiras e autoriza o compartilhamento com a empresa {vaga?.company}. A empresa se compromete a atualizar o status da candidatura em até 7 dias.
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(3)}
                className="px-6 py-3 rounded-full text-sm border font-semibold"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                ← Voltar
              </button>
              <button onClick={() => setSubmitted(true)}
                className="px-8 py-3 rounded-full font-bold text-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Enviar candidatura ✓
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .fi {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          color: var(--color-foreground);
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
          font-family: var(--font-sans);
        }
        .fi:focus {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(26,92,255,0.1);
        }
        .fi::placeholder { color: var(--color-muted-foreground); }
      `}</style>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-6 flex flex-col gap-4"
      style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
      <div className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>{label}</label>
      {children}
    </div>
  )
}

function CharCount({ value, max }: { value: string; max: number }) {
  const count = value.length
  const over = count > max
  return (
    <div className="text-right text-xs mt-1" style={{ color: over ? '#e84c2b' : 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
      {count}/{max}
    </div>
  )
}

function ReviewBlock({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit?: () => void }) {
  return (
    <div className="rounded-2xl border p-5" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
          {title}
        </div>
        {onEdit && (
          <button onClick={onEdit} className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
            Editar
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b last:border-0 text-sm"
      style={{ borderColor: 'var(--color-border)' }}>
      <span style={{ color: 'var(--color-muted-foreground)' }}>{label}</span>
      <span className="font-medium text-right max-w-[60%] break-words">{value}</span>
    </div>
  )
}
