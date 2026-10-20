import { useState } from 'react'
import BackButton from '../components/BackButton'

interface Props {
  onNavigate: (s: string) => void
}

const skills = ['React', 'TypeScript', 'Python', 'SQL', 'Git', 'Figma', 'Node.js', 'Docker']

const experiences = [
  {
    role: 'Monitoria de Cálculo Numérico', org: 'Universidade de São Paulo', period: 'Mar 2024 – Dez 2024',
    desc: 'Auxílio a 40+ alunos, elaboração de listas de exercícios e revisão de provas.',
  },
  {
    role: 'Desenvolvedora Frontend Voluntária', org: 'ONG Código Aberto', period: 'Jun 2024 – Presente',
    desc: 'Construção de plataforma de doações com React e integração com API de pagamentos.',
  },
]

const certs = [
  { name: 'Google Data Analytics Certificate', issuer: 'Coursera / Google', year: '2024' },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2025' },
]

const applications = [
  { company: 'Nubank', role: 'Estágio em Engenharia de Software', status: 'Entrevista on-line', date: '18 set 2026', color: '#5b6bd6', feedback: 'Atualizado há 2 dias', challenge: 'Concluído' },
  { company: 'Embraer', role: 'Estágio em Engenharia Aeronáutica', status: 'Análise de currículo', date: '12 set 2026', color: '#e8a52b', feedback: 'Retorno até 24 set', challenge: 'Concluído' },
  { company: 'TOTVS', role: 'Dev Front-end Júnior', status: 'Rejeitado', date: '05 set 2026', color: '#e84c2b', feedback: 'Feedback recebido', challenge: 'Concluído' },
]

const STUDENT_AVATAR = 'https://images.unsplash.com/photo-1648478445898-ae81dfa8701b?auto=format&fit=crop&crop=faces&w=480&h=480&q=85'
const PROFILE_STORAGE_KEY = 'conecta-unis-student-profile'
const AVATAR_STORAGE_KEY = 'conecta-unis-student-avatar'
const VIDEO_STORAGE_KEY = 'conecta-unis-student-video'

interface ProfileData {
  name: string
  course: string
  university: string
  semester: string
  location: string
  about: string
}

const DEFAULT_PROFILE: ProfileData = {
  name: 'Julie Costa',
  course: 'Ciência da Computação',
  university: 'USP',
  semester: '7.º semestre',
  location: 'São Paulo, SP',
  about: 'Desenvolvedora apaixonada por criar produtos que impactam pessoas. Tenho experiência em desenvolvimento web fullstack, com foco em React e Node.js. Busco uma oportunidade de estágio onde possa crescer e contribuir em projetos desafiadores.',
}

function loadProfile() {
  try {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!stored) return DEFAULT_PROFILE
    const parsed = JSON.parse(stored) as Partial<ProfileData>
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      name: parsed.name === 'Júlia Mendes' ? DEFAULT_PROFILE.name : parsed.name || DEFAULT_PROFILE.name,
    } as ProfileData
  } catch {
    return DEFAULT_PROFILE
  }
}

function loadAvatar() {
  try {
    const stored = localStorage.getItem(AVATAR_STORAGE_KEY)
    return !stored || stored.includes('julia-mendes-ai.svg') ? STUDENT_AVATAR : stored
  } catch {
    return STUDENT_AVATAR
  }
}

export default function StudentProfile({ onNavigate }: Props) {
  const [tab, setTab] = useState<'perfil' | 'candidaturas'>('perfil')
  const [profile, setProfile] = useState<ProfileData>(loadProfile)
  const [draft, setDraft] = useState<ProfileData>(profile)
  const [avatar, setAvatar] = useState(loadAvatar)
  const [draftAvatar, setDraftAvatar] = useState(avatar)
  const [avatarFailed, setAvatarFailed] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [videoResume, setVideoResume] = useState(() => {
    try {
      return localStorage.getItem(VIDEO_STORAGE_KEY) || ''
    } catch {
      return ''
    }
  })

  function handleVideoResume(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.files?.[0]?.name || ''
    setVideoResume(name)
    try {
      if (name) localStorage.setItem(VIDEO_STORAGE_KEY, name)
      else localStorage.removeItem(VIDEO_STORAGE_KEY)
    } catch {
      // The selected video remains visible for the current session.
    }
  }

  function openEditor() {
    setDraft(profile)
    setDraftAvatar(avatar)
    setSaved(false)
    setEditing(true)
  }

  function updateDraft(field: keyof ProfileData, value: string) {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setDraftAvatar(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextProfile = {
      ...draft,
      name: draft.name.trim(),
      course: draft.course.trim(),
      university: draft.university.trim(),
      semester: draft.semester.trim(),
      location: draft.location.trim(),
      about: draft.about.trim(),
    }

    setProfile(nextProfile)
    setAvatar(draftAvatar)
    setAvatarFailed(false)
    setEditing(false)
    setSaved(true)

    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfile))
      localStorage.setItem(AVATAR_STORAGE_KEY, draftAvatar)
    } catch {
      // The profile still updates for the current session if browser storage is unavailable.
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center gap-3"
        style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <BackButton onClick={() => onNavigate('landing')} />
        <span className="font-bold text-lg ml-2" style={{ fontFamily: 'var(--font-display)' }}>
          Conecta<span style={{ color: 'var(--color-accent)' }}>Unis</span>
        </span>
        <span className="text-sm ml-auto" style={{ color: 'var(--color-muted-foreground)' }}>Meu Perfil</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile card */}
        <div className="rounded-3xl overflow-hidden mb-6" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          {/* Cover */}
          <div className="h-28 relative overflow-hidden"
            style={{ background: '#0a2463' }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a2463 0%, #1a5cff 100%)' }} />
          </div>
          {/* Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-wrap items-end gap-4 -mt-10 mb-4">
              {avatarFailed ? (
                <div
                  className="w-20 h-20 shrink-0 rounded-2xl border-4 flex items-center justify-center text-xl font-bold"
                  style={{ borderColor: 'var(--color-card)', background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                  aria-label="Foto de perfil de Julie Costa"
                >
                  JC
                </div>
              ) : (
                <img
                  src={avatar}
                  alt={`Foto de perfil de ${profile.name}`}
                  className="w-20 h-20 shrink-0 rounded-2xl object-cover border-4"
                  style={{ borderColor: 'var(--color-card)', background: 'var(--color-muted)' }}
                  onError={() => setAvatarFailed(true)}
                />
              )}
              <div className="mb-1 min-w-0">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{profile.name}</h1>
                <div className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                  {profile.course} · {profile.university} · {profile.semester}
                </div>
              </div>
              <div className="w-full sm:w-auto sm:ml-auto flex flex-wrap gap-2">
                <button onClick={openEditor} className="px-4 py-2 rounded-full text-sm font-semibold border transition-colors"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                  Editar perfil
                </button>
                <button className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: 'var(--color-accent)', color: '#fff' }}>
                  Ver como empresa
                </button>
                {saved && (
                  <span className="w-full text-xs text-right" style={{ color: 'var(--color-accent)' }}>
                    Perfil atualizado com sucesso
                  </span>
                )}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:flex gap-4 sm:gap-6 border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
              {[
                [videoResume ? '100%' : '85%', 'Perfil completo'],
                ['12', 'Candidaturas'],
                ['3', 'Entrevistas'],
                [profile.location, 'Localização'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>{v}</div>
                  <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-full w-fit"
          style={{ background: 'var(--color-secondary)' }}>
          {(['perfil', 'candidaturas'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2 rounded-full text-sm font-medium capitalize transition-all"
              style={{
                background: tab === t ? 'var(--color-foreground)' : 'transparent',
                color: tab === t ? 'var(--color-background)' : 'var(--color-muted-foreground)',
              }}>
              {t === 'candidaturas' ? 'Candidaturas' : 'Perfil'}
            </button>
          ))}
        </div>

        {tab === 'perfil' && (
          <div className="grid md:grid-cols-3 gap-5">
            {/* Left col */}
            <div className="md:col-span-2 flex flex-col gap-5">
              {/* About */}
              <Section title="Sobre">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
                  {profile.about}
                </p>
              </Section>

              {/* Experience */}
              <Section title="Experiências">
                {experiences.map((e) => (
                  <div key={e.role} className="mb-5 last:mb-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-sm">{e.role}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--color-accent)' }}>{e.org}</div>
                      </div>
                      <span className="text-xs shrink-0" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                        {e.period}
                      </span>
                    </div>
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>{e.desc}</p>
                  </div>
                ))}
              </Section>

              {/* Certs */}
              <Section title="Certificações">
                {certs.map((c) => (
                  <div key={c.name} className="flex items-center justify-between py-3 border-b last:border-0"
                    style={{ borderColor: 'var(--color-border)' }}>
                    <div>
                      <div className="font-semibold text-sm">{c.name}</div>
                      <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{c.issuer}</div>
                    </div>
                    <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted-foreground)' }}>{c.year}</span>
                  </div>
                ))}
              </Section>
            </div>

            {/* Right col */}
            <div className="flex flex-col gap-5">
              {/* Skills */}
              <Section title="Habilidades">
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full border font-medium"
                      style={{ borderColor: 'var(--color-border)', fontFamily: 'var(--font-mono)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Education */}
              <Section title="Formação">
                <div className="text-sm font-semibold">Bacharelado em Ciência da Computação</div>
                <div className="text-sm mt-0.5" style={{ color: 'var(--color-accent)' }}>Universidade de São Paulo</div>
                <div className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                  2022 – 2026 · CR 8.4
                </div>
              </Section>

              <Section title="Vídeo de 60 segundos">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-semibold">Apresentação pessoal</span>
                  <span className="text-[10px] px-2 py-1 rounded-full" style={{ background: 'var(--color-secondary)', color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                    OPCIONAL
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-muted-foreground)' }}>
                  Mostre sua comunicação e energia sem substituir a avaliação das suas competências.
                </p>
                <label className="cursor-pointer block text-center px-4 py-2.5 rounded-full text-sm font-semibold border"
                  style={{ borderColor: videoResume ? 'var(--color-accent)' : 'var(--color-border)', color: videoResume ? 'var(--color-accent)' : 'var(--color-foreground)' }}>
                  {videoResume || 'Gravar ou enviar vídeo'}
                  <input
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm"
                    capture="user"
                    className="sr-only"
                    onChange={handleVideoResume}
                  />
                </label>
              </Section>

              <Section title="Próxima entrevista">
                <div className="rounded-2xl p-4" style={{ background: 'var(--color-secondary)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
                    <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                      On-line
                    </span>
                  </div>
                  <div className="text-sm font-semibold">Entrevista técnica · Nubank</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                    Amanhã, 14h · Google Meet
                  </div>
                  <button
                    type="button"
                    className="w-full mt-3 px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                  >
                    Acessar sala on-line
                  </button>
                </div>
              </Section>

              {/* Profile completeness */}
              <Section title="Completude do perfil">
                <div className="mb-2 flex justify-between text-sm">
                  <span>{videoResume ? '100%' : '85%'}</span>
                  <span style={{ color: 'var(--color-muted-foreground)' }}>{videoResume ? 'Completo' : 'Muito bom'}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-secondary)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: videoResume ? '100%' : '85%', background: 'var(--color-accent)' }} />
                </div>
                {!videoResume && (
                  <p className="text-xs mt-3" style={{ color: 'var(--color-muted-foreground)' }}>
                    O vídeo é opcional, mas pode completar sua apresentação.
                  </p>
                )}
              </Section>
            </div>
          </div>
        )}

        {tab === 'candidaturas' && (
          <div className="flex flex-col gap-3">
            {applications.map((a) => (
              <div key={a.role} className="flex items-center gap-4 p-5 rounded-2xl border"
                style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{a.role}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted-foreground)' }}>{a.company}</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--color-secondary)', color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                      Desafio: {a.challenge}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(26,92,255,0.08)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                      {a.feedback}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: a.color + '20', color: a.color }}>
                    {a.status}
                  </span>
                  <div className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
          style={{ background: 'rgba(10,15,30,0.6)' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-title"
        >
          <form
            onSubmit={saveProfile}
            className="w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border p-6"
            style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 id="edit-profile-title" className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Editar perfil
                </h2>
                <p className="text-sm mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
                  Atualize as informações que as empresas verão.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                style={{ background: 'var(--color-secondary)', color: 'var(--color-foreground)' }}
                aria-label="Fechar edição"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl mb-5" style={{ background: 'var(--color-background)' }}>
              <img
                src={draftAvatar}
                alt="Prévia da foto de perfil"
                className="w-24 h-24 rounded-2xl object-cover shrink-0"
                style={{ background: 'var(--color-muted)' }}
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="font-semibold">Foto de perfil</div>
                <p className="text-xs mt-1 mb-3" style={{ color: 'var(--color-muted-foreground)' }}>
                  Use JPG, PNG ou WebP. A imagem será recortada em formato quadrado.
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <label
                    className="cursor-pointer px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                  >
                    Escolher foto
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleAvatarUpload} className="sr-only" />
                  </label>
                  <button
                    type="button"
                    onClick={() => setDraftAvatar(STUDENT_AVATAR)}
                    className="px-4 py-2 rounded-full text-sm font-semibold border"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
                  >
                    Restaurar foto original
                  </button>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <EditField label="Nome completo">
                <input value={draft.name} onChange={(event) => updateDraft('name', event.target.value)} className="profile-input" required />
              </EditField>
              <EditField label="Localização">
                <input value={draft.location} onChange={(event) => updateDraft('location', event.target.value)} className="profile-input" required />
              </EditField>
              <EditField label="Curso">
                <input value={draft.course} onChange={(event) => updateDraft('course', event.target.value)} className="profile-input" required />
              </EditField>
              <EditField label="Universidade">
                <input value={draft.university} onChange={(event) => updateDraft('university', event.target.value)} className="profile-input" required />
              </EditField>
              <EditField label="Semestre">
                <input value={draft.semester} onChange={(event) => updateDraft('semester', event.target.value)} className="profile-input" required />
              </EditField>
            </div>

            <div className="mt-4">
              <EditField label="Sobre você">
                <textarea
                  value={draft.about}
                  onChange={(event) => updateDraft('about', event.target.value)}
                  className="profile-input resize-none"
                  rows={4}
                  required
                />
              </EditField>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-sm font-semibold"
                style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      )}

      <style>{`
        .profile-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          color: var(--color-foreground);
          font: inherit;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .profile-input:focus {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(26,92,255,0.1);
        }
      `}</style>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
      <div className="text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function EditField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold">{label}</span>
      {children}
    </label>
  )
}
