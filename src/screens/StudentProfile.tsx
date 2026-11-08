import { useState } from 'react'
import BackButton from '../components/BackButton'

interface Props {
  onNavigate: (s: string) => void
}

const skills = ['React', 'TypeScript', 'Python', 'SQL', 'Git', 'Figma', 'Node.js', 'Docker']

const experiences = [
  {
    role: 'Monitoria de Cálculo Numérico', org: 'Faculdade Unis São Lourenço', period: 'Mar 2024 – Dez 2024',
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
  course: 'Análise e Desenvolvimento de Sistemas',
  university: 'Unis',
  semester: '4.º semestre',
  location: 'São Lourenço, MG',
  about: 'Desenvolvedora apaixonada por criar produtos que impactam pessoas. Tenho experiência em desenvolvimento web fullstack, com foco em React e Node.js. Busco uma oportunidade de estágio onde possa crescer e contribuir em projetos desafiadores.',
}

function loadProfile(): ProfileData {
  try {
    const registeredUser = localStorage.getItem('conecta_user')
    if (registeredUser) {
      const parsedUser = JSON.parse(registeredUser)
      return {
        ...DEFAULT_PROFILE,
        name: parsedUser.nome_completo || DEFAULT_PROFILE.name,
        university: parsedUser.universidade || DEFAULT_PROFILE.university,
        course: parsedUser.curso || DEFAULT_PROFILE.course,
      }
    }

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
          
          {/* Info CORRIGIDA (com z-index e posicionamento correto para não sumir atrás da capa) */}
          <div className="px-6 pb-6 relative z-10">
            <div className="flex flex-wrap items-end gap-4 -mt-12 mb-4">
              {avatarFailed ? (
                <div
                  className="w-20 h-20 shrink-0 rounded-2xl border-4 flex items-center justify-center text-xl font-bold relative z-10"
                  style={{ borderColor: 'var(--color-card)', background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
