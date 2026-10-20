import { useState } from 'react'
import LandingPage from './screens/LandingPage'
import JobSearch from './screens/JobSearch'
import StudentProfile from './screens/StudentProfile'
import CompanyDashboard from './screens/CompanyDashboard'
import LoginPage from './screens/LoginPage'
import PublishJob from './screens/PublishJob'
import JobApplication from './screens/JobApplication'

type Screen = 'landing' | 'jobs' | 'profile' | 'dashboard' | 'student-login' | 'company-login' | 'publish' | 'apply'

const NAV: { key: Screen; label: string }[] = [
  { key: 'landing', label: 'Landing' },
  { key: 'student-login', label: 'Login Aluno' },
  { key: 'company-login', label: 'Login Empresa' },
  { key: 'jobs', label: 'Vagas' },
  { key: 'apply', label: 'Candidatura' },
  { key: 'profile', label: 'Perfil' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'publish', label: 'Publicar Vaga' },
]

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const go = (s: string) => setScreen(s as Screen)

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Prototype nav pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1 rounded-full px-2 py-2 shadow-2xl"
        style={{ background: 'var(--color-foreground)' }}>
        {NAV.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setScreen(key)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap"
            style={{
              background: screen === key ? 'var(--color-accent)' : 'transparent',
              color: screen === key ? '#fff' : '#8899bb',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {screen === 'landing'   && <LandingPage onNavigate={go} />}
      {screen === 'student-login' && <LoginPage role="aluno" onNavigate={go} />}
      {screen === 'company-login' && <LoginPage role="empresa" onNavigate={go} />}
      {screen === 'jobs'      && <JobSearch onNavigate={go} />}
      {screen === 'profile'   && <StudentProfile onNavigate={go} />}
      {screen === 'dashboard' && <CompanyDashboard onNavigate={go} />}
      {screen === 'publish'   && <PublishJob onNavigate={go} />}
      {screen === 'apply'     && <JobApplication onNavigate={go} />}
    </div>
  )
}
