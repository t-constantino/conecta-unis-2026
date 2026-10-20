import { useState } from 'react'

interface Props {
  onNavigate: (s: string) => void
}

const AREAS = ['Tecnologia', 'Engenharia', 'Administração', 'Marketing', 'Direito', 'Design', 'Saúde', 'Finanças', 'Recursos Humanos', 'Logística']
const TYPES = ['Estágio', 'Trainee', 'CLT', 'PJ', 'Temporário']
const MODES = ['Presencial', 'Híbrido', 'Remoto']
const INTERVIEW_FORMATS = ['On-line', 'Presencial', 'On-line ou presencial']
const LEVELS = ['Sem experiência', '6 meses', '1 ano', '2 anos+']
const BENEFITS = ['Vale-refeição', 'Vale-transporte', 'Plano de saúde', 'Auxílio home-office', 'Bolsa educação', 'Gympass', 'Stock options', 'PLR']

type Step = 1 | 2 | 3

export default function PublishJob({ onNavigate }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [published, setPublished] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [area, setArea] = useState('')
  const [type, setType] = useState('')
  const [mode, setMode] = useState('')
  const [location, setLocation] = useState('')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')
  const [interviewFormat, setInterviewFormat] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [level, setLevel] = useState('')
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [deadline, setDeadline] = useState('')
  const [slots, setSlots] = useState('1')
  const [university, setUniversity] = useState('')
  const [challengePrompt, setChallengePrompt] = useState('Analise um fluxo simples de cadastro e descreva, em passos objetivos, como você melhoraria a experiência do usuário.')
  const [feedbackMessage, setFeedbackMessage] = useState('Recebemos sua candidatura e atualizaremos seu status assim que a avaliação desta etapa for concluída.')
  const salaryValid = Number(salaryMin) > 0 && Number(salaryMax) >= Number(salaryMin)

  function toggleBenefit(b: string) {
    setSelectedBenefits((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b])
  }

  function addSkill() {
    const s = skillInput.trim()
    if (s && !skills.includes(s)) setSkills((prev) => [...prev, s])
    setSkillInput('')
  }

  function handlePublish() {
    if (!salaryValid || !interviewFormat) return
    setPublished(true)
  }

  if (published) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: 'var(--color-background)' }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: 'rgba(26,92,255,0.1)' }}>
          <svg className="w-10 h-10" style={{ color: 'var(--color-accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>Vaga publicada!</h1>
        <p className="text-base mb-2 max-w-sm" style={{ color: 'var(--color-muted-foreground)' }}>
          <strong>{title || 'Sua vaga'}</strong> já está visível para milhares de alunos cadastrados na Conecta Unis.
        </p>
        <p className="text-sm mb-10" style={{ color: 'var(--color-muted-foreground)' }}>
          O microdesafio de 15 minutos e o retorno automático em até 7 dias já estão ativos.
        </p>
        <div className="flex gap-3">
          <button onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{ background: 'var(--color-accent)', color: '#fff' }}>
            Ver no dashboard
          </button>
          <button onClick={() => { setPublished(false); setStep(1); setTitle('') }}
            className="px-6 py-3 rounded-full font-semibold text-sm border transition-colors"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
            Publicar outra vaga
          </button>
        </div>
      </div>
    )
  }

  const steps = [
    { n: 1, label: 'Informações básicas' },
    { n: 2, label: 'Requisitos e benefícios' },
    { n: 3, label: 'Revisão e publicação' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b px-6 py-4 flex items-center gap-4"
        style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <button onClick={() => onNavigate('dashboard')} className="text-sm flex items-center gap-1.5"
          style={{ color: 'var(--color-muted-foreground)' }}>
          ← Dashboard
        </button>
        <span className="font-bold text-base ml-2" style={{ fontFamily: 'var(--font-display)' }}>
          Publicar nova vaga
        </span>

        {/* Step indicators */}
        <div className="hidden sm:flex items-center gap-2 ml-auto">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: step >= s.n ? 'var(--color-accent)' : 'var(--color-secondary)',
                    color: step >= s.n ? '#fff' : 'var(--color-muted-foreground)',
                  }}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className="text-xs hidden md:block"
                  style={{ color: step === s.n ? 'var(--color-foreground)' : 'var(--color-muted-foreground)', fontWeight: step === s.n ? 600 : 400 }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 h-px" style={{ background: step > s.n ? 'var(--color-accent)' : 'var(--color-border)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <SectionCard title="Dados da vaga">
              <FormRow label="Título da vaga *">
                <input value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Estágio em Engenharia de Software" className="fi" required />
              </FormRow>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormRow label="Área *">
                  <select value={area} onChange={(e) => setArea(e.target.value)} className="fi">
                    <option value="">Selecione…</option>
                    {AREAS.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </FormRow>
                <FormRow label="Regime *">
                  <select value={type} onChange={(e) => setType(e.target.value)} className="fi">
                    <option value="">Selecione…</option>
                    {TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </FormRow>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormRow label="Modalidade *">
                  <div className="flex gap-2 flex-wrap">
                    {MODES.map((m) => (
                      <button key={m} type="button" onClick={() => setMode(m)}
                        className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                        style={{
                          borderColor: mode === m ? 'var(--color-accent)' : 'var(--color-border)',
                          background: mode === m ? 'rgba(26,92,255,0.08)' : 'transparent',
                          color: mode === m ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
                        }}>
                        {m}
                      </button>
                    ))}
                  </div>
                </FormRow>
                <FormRow label="Localização">
                  <input value={location} onChange={(e) => setLocation(e.target.value)}
                    placeholder="São Paulo, SP" className="fi"
                    disabled={mode === 'Remoto'} />
                </FormRow>
              </div>
            </SectionCard>

            <SectionCard title="Remuneração">
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                A faixa salarial é obrigatória e será exibida aos candidatos.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormRow label="Mínimo (R$) *">
                  <input value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="2.000" className="fi" type="number" min="1" required />
                </FormRow>
                <FormRow label="Máximo (R$) *">
                  <input value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="3.500" className="fi" type="number" min={salaryMin || '1'} required />
                </FormRow>
              </div>
            </SectionCard>

            <SectionCard title="Entrevistas">
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                Informe como as entrevistas poderão acontecer para alinhar expectativas desde o início.
              </p>
              <FormRow label="Formato da entrevista *">
                <div className="flex gap-2 flex-wrap">
                  {INTERVIEW_FORMATS.map((format) => (
                    <button key={format} type="button" onClick={() => setInterviewFormat(format)}
                      className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                      style={{
                        borderColor: interviewFormat === format ? 'var(--color-accent)' : 'var(--color-border)',
                        background: interviewFormat === format ? 'rgba(26,92,255,0.08)' : 'transparent',
                        color: interviewFormat === format ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
                      }}>
                      {format}
                    </button>
                  ))}
                </div>
              </FormRow>
            </SectionCard>

            <SectionCard title="Descrição da vaga">
              <FormRow label="Descrição completa *">
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva as responsabilidades, o time, o ambiente de trabalho e o impacto que o candidato terá…"
                  rows={5} className="fi resize-none" />
              </FormRow>
            </SectionCard>

            <div className="flex justify-end">
              <button onClick={() => setStep(2)}
                disabled={!title || !area || !type || !mode || !salaryValid || !interviewFormat}
                className="px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-40"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Próxima etapa →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <SectionCard title="Requisitos">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <FormRow label="Nível de experiência">
                  <select value={level} onChange={(e) => setLevel(e.target.value)} className="fi">
                    <option value="">Selecione…</option>
                    {LEVELS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </FormRow>
                <FormRow label="Número de vagas">
                  <input value={slots} onChange={(e) => setSlots(e.target.value)} type="number" min="1" className="fi" />
                </FormRow>
              </div>

              <FormRow label="Prazo de inscrição">
                <input value={deadline} onChange={(e) => setDeadline(e.target.value)}
                  type="date" className="fi" />
              </FormRow>

              <FormRow label="Habilidades desejadas">
                <div className="flex gap-2">
                  <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Ex: React, Python, Excel…" className="fi flex-1" />
                  <button type="button" onClick={addSkill}
                    className="px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{ background: 'var(--color-secondary)', color: 'var(--color-foreground)' }}>
                    + Adicionar
                  </button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((s) => (
                      <span key={s} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border"
                        style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-mono)' }}>
                        {s}
                        <button onClick={() => setSkills((prev) => prev.filter((x) => x !== s))}
                          className="opacity-50 hover:opacity-100 ml-1">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </FormRow>

              <FormRow label="Outros requisitos">
                <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Ex: Inglês intermediário, disponibilidade para viagens, cursando a partir do 4.º semestre…"
                  rows={3} className="fi resize-none" />
              </FormRow>
            </SectionCard>

            <SectionCard title="Microdesafio prático · 15 minutos">
              <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                Substitua cartas de apresentação por uma atividade curta, objetiva e relacionada à rotina da vaga.
              </p>
              <FormRow label="Enunciado do desafio *">
                <textarea
                  value={challengePrompt}
                  onChange={(e) => setChallengePrompt(e.target.value)}
                  placeholder="Descreva uma tarefa que possa ser respondida em até 15 minutos."
                  rows={4}
                  className="fi resize-none"
                  required
                />
              </FormRow>
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl" style={{ background: 'var(--color-secondary)' }}>
                <span className="text-sm">Tempo limite configurado pela plataforma</span>
                <strong className="text-sm" style={{ color: 'var(--color-accent)' }}>15 minutos</strong>
              </div>
            </SectionCard>

            <SectionCard title="Feedback obrigatório · até 7 dias">
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(26,92,255,0.06)', border: '1px solid rgba(26,92,255,0.16)' }}>
                <div className="font-semibold text-sm mb-1">Proteção contra o silêncio no processo</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
                  A vaga só pode ser publicada com o compromisso de atualizar cada candidatura. Se não houver ação manual, a Conecta Unis envia o retorno básico abaixo no sétimo dia.
                </p>
              </div>
              <FormRow label="Mensagem automática de acompanhamento *">
                <textarea
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  rows={3}
                  className="fi resize-none"
                  required
                />
              </FormRow>
            </SectionCard>

            <SectionCard title="Benefícios">
              <div className="flex flex-wrap gap-2">
                {BENEFITS.map((b) => (
                  <button key={b} type="button" onClick={() => toggleBenefit(b)}
                    className="px-4 py-2 rounded-full text-sm border transition-all"
                    style={{
                      borderColor: selectedBenefits.includes(b) ? 'var(--color-accent)' : 'var(--color-border)',
                      background: selectedBenefits.includes(b) ? 'rgba(26,92,255,0.08)' : 'transparent',
                      color: selectedBenefits.includes(b) ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
                      fontWeight: selectedBenefits.includes(b) ? 600 : 400,
                    }}>
                    {selectedBenefits.includes(b) ? '✓ ' : ''}{b}
                  </button>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Segmentação por universidade (opcional)">
              <FormRow label="Restringir a uma universidade específica">
                <input value={university} onChange={(e) => setUniversity(e.target.value)}
                  placeholder="Ex: USP, Unicamp, FGV — deixe em branco para todas" className="fi" />
              </FormRow>
            </SectionCard>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)}
                className="px-6 py-3 rounded-full text-sm border font-semibold transition-colors"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                ← Voltar
              </button>
              <button onClick={() => setStep(3)}
                disabled={!challengePrompt.trim() || !feedbackMessage.trim()}
                className="px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Revisar vaga →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Preview */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div className="p-4 rounded-2xl text-sm flex items-start gap-3"
              style={{ background: 'rgba(26,92,255,0.07)', border: '1px solid rgba(26,92,255,0.2)', color: 'var(--color-accent)' }}>
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
              </svg>
              Esta é a pré-visualização de como a vaga aparecerá para os alunos na plataforma.
            </div>

            {/* Preview card */}
            <div className="rounded-3xl border p-8" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold"
                  style={{ background: 'var(--color-accent)', color: '#fff' }}>
                  N
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    {title || '(Título da vaga)'}
                  </h2>
                  <div className="text-sm mt-0.5" style={{ color: 'var(--color-muted-foreground)' }}>
                    Nubank · {location || mode || '—'}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {type && <Tag>{type}</Tag>}
                {mode && <Tag>{mode}</Tag>}
                {salaryMin && salaryMax && (
                  <Tag accent>R$ {parseInt(salaryMin).toLocaleString('pt-BR')}–{parseInt(salaryMax).toLocaleString('pt-BR')}/mês</Tag>
                )}
                <Tag>Desafio de 15 min</Tag>
                <Tag>Retorno em até 7 dias</Tag>
                <Tag>{interviewFormat}</Tag>
              </div>

              {description && (
                <div className="mb-6">
                  <div className="text-xs font-semibold tracking-widest uppercase mb-2"
                    style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Sobre a vaga</div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>{description}</p>
                </div>
              )}

              <div className="mb-6">
                <div className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Microdesafio prático</div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>{challengePrompt}</p>
              </div>

              {skills.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-semibold tracking-widest uppercase mb-2"
                    style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Habilidades</div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full border"
                        style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-mono)' }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedBenefits.length > 0 && (
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase mb-2"
                    style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>Benefícios</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBenefits.map((b) => (
                      <span key={b} className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: 'var(--color-secondary)' }}>{b}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary list */}
            <div className="rounded-2xl border divide-y" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)', '--tw-divide-opacity': 1 } as React.CSSProperties}>
              {[
                ['Vagas disponíveis', slots],
                ['Prazo de inscrição', deadline || '—'],
                ['Nível de experiência', level || '—'],
                ['Segmentação', university || 'Todas as universidades'],
                ['Prazo de feedback', 'Até 7 dias'],
                ['Formato de entrevista', interviewFormat],
                ['Faixa salarial', salaryMin && salaryMax ? `R$ ${parseInt(salaryMin).toLocaleString('pt-BR')}–${parseInt(salaryMax).toLocaleString('pt-BR')}/mês` : 'Obrigatória'],
                ['Vídeo de apresentação', 'Opcional · até 60 segundos'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between px-5 py-3 text-sm"
                  style={{ borderColor: 'var(--color-border)' }}>
                  <span style={{ color: 'var(--color-muted-foreground)' }}>{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full text-sm border font-semibold transition-colors"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                ← Voltar
              </button>
              <button onClick={handlePublish}
                disabled={!salaryValid || !interviewFormat}
                className="px-8 py-3 rounded-full font-bold text-sm transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'var(--color-accent)', color: '#fff' }}>
                Publicar vaga agora ✓
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
        .fi:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
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
      <label className="text-xs font-semibold" style={{ color: 'var(--color-foreground)' }}>{label}</label>
      {children}
    </div>
  )
}

function Tag({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span className="text-sm px-3 py-1 rounded-full font-medium"
      style={{
        background: accent ? 'rgba(26,92,255,0.1)' : 'var(--color-secondary)',
        color: accent ? 'var(--color-accent)' : 'var(--color-foreground)',
      }}>
      {children}
    </span>
  )
}
