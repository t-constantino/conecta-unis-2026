import { useState } from 'react'
import LandingPage from './screens/LandingPage'
import JobSearch from './screens/JobSearch'
import StudentProfile from './screens/StudentProfile'
import CompanyDashboard from './screens/CompanyDashboard'
import LoginPage from './screens/LoginPage'
import PublishJob from './screens/PublishJob'
import JobApplication from './screens/JobApplication'
import AdminDashboard from './screens/AdminDashboard'
import AdminLogin from './screens/AdminLogin'

type Screen = 'landing' | 'jobs' | 'profile' | 'dashboard' | 'student-login' | 'student-register' | 'company-login' | 'publish' | 'apply' | 'admin' | 'admin-login'
type UserRole = 'visitor' | 'aluno' | 'empresa' | 'admin'

interface NavItem {
  key: Screen
  label: string
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [userRole, setUserRole] = useState<UserRole>('visitor')
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const go = (s: string) => setScreen(s as Screen)

  // Define os botões da barra inferior de acordo com o papel do usuário
  const getNavItems = (): NavItem[] => {
    switch (userRole) {
      case 'aluno':
        return [
          { key: 'landing', label: 'Página Inicial' },
          { key: 'jobs', label: 'Vagas' },
          { key: 'profile', label: 'Perfil' },
        ]
      case 'empresa':
        return [
          { key: 'landing', label: 'Página Inicial' },
          { key: 'dashboard', label: 'Painel Empresa' },
        ]
      case 'admin':
        return [
          { key: 'admin', label: 'Painel Admin' },
        ]
      default: // Visitante / não logado
        return [
          { key: 'landing', label: 'Página Inicial' },
          { key: 'student-login', label: 'Entrar (Aluno)' },
          { key: 'student-register', label: 'Cadastrar (Aluno)' },
          { key: 'company-login', label: 'Empresa' },
        ]
    }
  }

  const navItems = getNavItems()

  const handleNavClick = (key: Screen) => {
    if (key === 'admin' && !isAdminAuthenticated) {
      setScreen('admin-login')
    } else {
      setScreen(key)
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Barra flutuante dinâmica baseada no papel */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1 rounded-full px-2 py-2 shadow-2xl overflow-x-auto max-w-[95vw]"
        style={{ background: 'var(--color-foreground)' }}>
        {navItems.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleNavClick(key)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap"
            style={{
              background: screen === key || (key === 'admin' && screen === 'admin-login') ? 'var(--color-accent)' : 'transparent',
              color: screen === key || (key === 'admin' && screen === 'admin-login') ? '#fff' : '#8899bb',
            }}
          >
            {label}
          </button>
        ))}

        {/* Botão de Sair se estiver logado */}
        {userRole !== 'visitor' && (
          <button
            onClick={() => {
              setUserRole('visitor')
              setIsAdminAuthenticated(false)
              setScreen('landing')
            }}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-red-400 hover:text-red-300 transition-colors whitespace-nowrap"
          >
            Sair
          </button>
        )}
      </div>

      {screen === 'landing'           && <LandingPage onNavigate={go} />}
      {screen === 'student-login'     && <LoginPage role="aluno" initialMode="login" onNavigate={(s) => { setUserRole('aluno'); go(s); }} />}
      {screen === 'student-register'  && <LoginPage role="aluno" initialMode="cadastro" onNavigate={(s) => { setUserRole('aluno'); go(s); }} />}
      {screen === 'company-login'     && <LoginPage role="empresa" onNavigate={(s) => { setUserRole('empresa'); go(s); }} />}
      {screen === 'jobs'              && <JobSearch onNavigate={go} />}
      {screen === 'profile'           && <StudentProfile onNavigate={go} />}
      {screen === 'dashboard'         && <CompanyDashboard onNavigate={go} />}
      {screen === 'publish'           && <PublishJob onNavigate={go} />}
      {screen === 'apply'             && <JobApplication onNavigate={go} />}
      {screen === 'admin-login'       && <AdminLogin onNavigate={go} onLoginSuccess={() => { setIsAdminAuthenticated(true); setUserRole('admin'); }} />}
      {screen === 'admin'             && (isAdminAuthenticated ? <AdminDashboard onNavigate={go} /> : <AdminLogin onNavigate={go} onLoginSuccess={() => { setIsAdminAuthenticated(true); setUserRole('admin'); }} />)}
    </div>
  )
}
