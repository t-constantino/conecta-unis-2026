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
  const go = (s: string) => setScreen(s as Screen)

  // Define os botões da barra flutuante com base em quem está logado
  const getNavItems = (): NavItem[] => {
    switch (userRole) {
      case 'aluno':
        return [
          { key: 'landing', label: 'Início' },
          { key: 'jobs', label: 'Vagas' },
          { key: 'profile', label: 'Perfil' },
        ]
      case 'empresa':
        return [
          { key: 'landing', label: 'Início' },
          { key: 'dashboard', label: 'Painel Empresa' },
          { key: 'publish', label: 'Publicar Vaga' },
        ]
      case 'admin':
        return [
          { key: 'admin', label: 'Painel Admin' },
        ]
      default: // visitor / não logado
        return [
          { key: 'landing', label: 'Início' },
          { key: 'student-login', label: 'Entrar Aluno' },
          { key: 'student-register', label: 'Cadastrar Aluno' },
          { key: 'company-login', label: 'Empresa' },
        ]
    }
  }

  const navItems = getNavItems()

  // Função auxiliar ao logar com sucesso para atualizar o papel do usuário
  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role)
    if (role === 'admin') setScreen('admin')
    else if (role === 'empresa') setScreen('dashboard')
    else setScreen('profile')
  }

  return (
    <div className="min-h-screen pb-20" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Barra flutuante de navegação dinâmica baseada no perfil */}
      {navItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1 rounded-full px-2 py-2 shadow-2xl overflow-x-auto max-w-[95vw]"
          style={{ background: 'var(--color-foreground)' }}>
          {navItems.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                if (key === 'admin' && userRole !== 'admin') {
                  setScreen('admin-login')
                } else {
                  setScreen(key)
                }
              }}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                background: screen === key ? 'var(--color-accent)' : 'transparent',
                color: screen === key ? '#fff' : '#8899bb',
              }}
            >
              {label}
            </button>
          ))}
          {userRole !== 'visitor' && (
            <button
              onClick={() => { setUserRole('visitor'); setScreen('landing'); }}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              Sair
            </button>
          )}
        </div>
      )}

      {screen === 'landing'           && <LandingPage onNavigate={go} />}
      {screen === 'student-login'     && <LoginPage role="aluno" initialMode="login" onNavigate={(s) => { setUserRole('aluno'); go(s); }} />}
      {screen === 'student-register'  && <LoginPage role="aluno" initialMode="cadastro" onNavigate={(s) => { setUserRole('aluno'); go(s); }} />}
      {screen === 'company-login'     && <LoginPage role="empresa" onNavigate={(s) => { setUserRole('empresa'); go(s); }} />}
      {screen === 'jobs'              && <JobSearch onNavigate={go} />}
      {screen === 'profile'           && <StudentProfile onNavigate={go} />}
      {screen === 'dashboard'         && <CompanyDashboard onNavigate={go} />}
      {screen === 'publish'           && <PublishJob onNavigate={go} />}
      {screen === 'apply'             && <JobApplication onNavigate={go} />}
      {screen === 'admin-login'       && <AdminLogin onNavigate={go} onLoginSuccess={() => handleLoginSuccess('admin')} />}
      {screen === 'admin'             && <AdminDashboard onNavigate={go} />}
    </div>
  )
}
