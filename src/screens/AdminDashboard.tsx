import { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'

interface Props {
  onNavigate: (s: string) => void
}

interface Student {
  id: number | string
  nome_completo: string
  universidade: string
  curso: string
  email: string
  status?: 'Ativo' | 'Pendente'
}

interface Company {
  id: number | string
  nome: string
  cnpj: string
  email: string
  vagas_ativas: number
  status: 'Aprovada' | 'Em análise'
}

interface ContactMessage {
  id: number | string
  nome: string
  email: string
  mensagem: string
  data?: string
}

export default function AdminDashboard({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<'alunos' | 'empresas' | 'mensagens'>('alunos')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const [students, setStudents] = useState<Student[]>([
    { id: 1, nome_completo: 'Julie Costa', universidade: 'Unis São Lourenço', curso: 'Análise e Desenv. de Sistemas', email: 'julie.costa@unis.edu.br', status: 'Ativo' },
    { id: 2, nome_completo: 'Lucas Andrade', universidade: 'Unis Varginha', curso: 'Engenharia de Produção', email: 'lucas.andrade@unis.edu.br', status: 'Ativo' },
    { id: 3, nome_completo: 'Mariana Silva', universidade: 'Unis Cataguases', curso: 'Administração', email: 'mariana.silva@unis.edu.br', status: 'Pendente' },
  ])

  const [companies, setCompanies] = useState<Company[]>([
    { id: 1, nome: 'Nubank', cnpj: '18.236.120/0001-58', email: 'rh@nubank.com.br', vagas_ativas: 12, status: 'Aprovada' },
    { id: 2, nome: 'Totvs', cnpj: '53.113.791/0001-22', email: 'talentos@totvs.com.br', vagas_ativas: 8, status: 'Aprovada' },
    { id: 3, nome: 'TechSul Minas', cnpj: '42.890.112/0001-09', email: 'contato@techsul.com.br', vagas_ativas: 2, status: 'Em análise' },
  ])

  const [messages, setMessages] = useState<ContactMessage[]>([
    { id: 1, nome: 'Carlos Mendes', email: 'carlos@empresa.com', mensagem: 'Gostaria de cadastrar nossa empresa para divulgar vagas de estágio em TI.', data: 'Hoje, 10:45' },
  ])

  useEffect(() => {
    async function fetchAdminData() {
      setLoading(true)
      try {
        const res = await fetch('/api/admin')
        if (res.ok) {
          const data = await res.json()
          if (data.students) setStudents(data.students)
          if (data.companies) setCompanies(data.companies)
          if (data.messages) setMessages(data.messages)
        }
      } catch {
        // Mantém os dados locais caso o endpoint /api/admin ainda não exista
      } finally {
        setLoading(false)
      }
    }
    fetchAdminData()
  }, [])

  const handleDeleteStudent = (id: number | string) => {
    if (confirm('Deseja realmente remover este aluno?')) {
      setStudents((prev) => prev.filter((s) => s.id !== id))
    }
  }

  const handleToggleCompanyStatus = (id: number | string) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Aprovada' ? 'Em análise' : 'Aprovada' } : c
      )
    )
  }

  const filteredStudents = students.filter(
    (s) =>
      s.nome_completo.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.universidade.toLowerCase().includes(search.toLowerCase())
  )

  const filteredCompanies = companies.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.cnpj.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--color-background)' }}>
      {/* HEADER */}
      <header className="px-8 md:px-14 py-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ background: 'var(--color-foreground)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="flex items-center gap-4">
          <BackButton onClick={() => onNavigate('landing')} light />
          <div>
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>
              Administração do Sistema
            </span>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>
              Painel Conecta<span style={{ color: 'var(--color-accent)' }}>Unis</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, e-mail ou unidade..."
            className="px-4 py-2.5 rounded-full text-sm outline-none w-full md:w-72"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 md:px-14 pt-10">
        {/* MÉTRICAS RÁPIDAS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-6 rounded-3xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div className="text-xs font-mono uppercase mb-1" style={{ color: 'var(--color-muted-foreground)' }}>Alunos Cadastrados</div>
            <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{students.length}</div>
          </div>
          <div className="p-6 rounded-3xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div className="text-xs font-mono uppercase mb-1" style={{ color: 'var(--color-muted-foreground)' }}>Empresas Parceiras</div>
            <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{companies.length}</div>
          </div>
          <div className="p-6 rounded-3xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div className="text-xs font-mono uppercase mb-1" style={{ color: 'var(--color-muted-foreground)' }}>Mensagens Recebidas</div>
            <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{messages.length}</div>
          </div>
        </div>

        {/* ABAS DE NAVEGAÇÃO */}
        <div className="flex gap-2 mb-6 border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
          {(['alunos', 'empresas', 'mensagens'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all"
              style={{
                background: activeTab === tab ? 'var(--color-accent)' : 'var(--color-secondary)',
                color: activeTab === tab ? '#fff' : 'var(--color-foreground)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading && <p className="text-sm mb-4" style={{ color: 'var(--color-muted-foreground)' }}>Sincronizando com o banco de dados...</p>}

        {/* TABELA DE ALUNOS */}
        {activeTab === 'alunos' && (
          <div className="rounded-3xl border overflow-hidden" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-xs font-mono uppercase" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)' }}>
                    <th className="py-4 px-6">Nome</th>
                    <th className="py-4 px-6">Unidade / Curso</th>
                    <th className="py-4 px-6">E-mail</th>
                    <th className="py-4 px-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm" style={{ borderColor: 'var(--color-border)' }}>
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-[var(--color-secondary)]/50 transition-colors">
                      <td className="py-4 px-6 font-semibold">{s.nome_completo}</td>
                      <td className="py-4 px-6">
                        <div>{s.universidade}</div>
                        <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{s.curso}</div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs">{s.email}</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteStudent(s.id)}
                          className="text-xs px-3 py-1.5 rounded-full font-semibold text-red-600 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                        Nenhum aluno encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TABELA DE EMPRESAS */}
        {activeTab === 'empresas' && (
          <div className="rounded-3xl border overflow-hidden" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-xs font-mono uppercase" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)' }}>
                    <th className="py-4 px-6">Empresa</th>
                    <th className="py-4 px-6">CNPJ</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm" style={{ borderColor: 'var(--color-border)' }}>
                  {filteredCompanies.map((c) => (
                    <tr key={c.id} className="hover:bg-[var(--color-secondary)]/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold">{c.nome}</div>
                        <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{c.email}</div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs">{c.cnpj}</td>
                      <td className="py-4 px-6">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: c.status === 'Aprovada' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)',
                            color: c.status === 'Aprovada' ? '#16a34a' : '#ca8a04',
                          }}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleToggleCompanyStatus(c.id)}
                          className="text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          {c.status === 'Aprovada' ? 'Suspender' : 'Aprovar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MENSAGENS DE CONTATO */}
        {activeTab === 'mensagens' && (
          <div className="grid gap-4">
            {messages.map((m) => (
              <div key={m.id} className="p-6 rounded-3xl border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold">{m.nome}</span>
                    <span className="text-xs font-mono ml-3" style={{ color: 'var(--color-muted-foreground)' }}>{m.email}</span>
                  </div>
                  {m.data && <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{m.data}</span>}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>{m.mensagem}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
