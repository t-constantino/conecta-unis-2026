import { useState, useEffect } from 'react'

interface Props {
  onNavigate: (s: string) => void
}

interface Student {
  id: number | string
  nome_completo: string
  universidade: string
  curso: string
  email: string
  criado_em?: string
}

interface Company {
  id: number | string
  nome_fantasia: string
  cnpj: string
  email: string
  criado_em?: string
}

interface ContactMessage {
  id: number | string
  nome: string
  email: string
  mensagem: string
  criado_em?: string
}

export default function AdminDashboard({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<'alunos' | 'empresas' | 'mensagens'>('alunos')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const [students, setStudents] = useState<Student[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])

  // Busca os dados reais do banco Neon via API /api/admin
  const fetchAdminData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin')
      if (res.ok) {
        const data = await res.json()
        if (data.estudantes) setStudents(data.estudantes)
        if (data.empresas) setCompanies(data.empresas)
        if (data.contatos) setMessages(data.contatos)
      }
    } catch (err) {
      console.error('Erro ao buscar dados do admin:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminData()
  }, [])

  // Deletar Aluno
  const handleDeleteStudent = async (id: number | string) => {
    if (!confirm('Deseja realmente remover este aluno?')) return
    try {
      const res = await fetch('/api/admin', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'estudante' }),
      })
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== id))
      } else {
        alert('Erro ao excluir aluno.')
      }
    } catch (err) {
      alert('Erro de conexão.')
    }
  }

  // Deletar Empresa
  const handleDeleteCompany = async (id: number | string) => {
    if (!confirm('Deseja realmente remover esta empresa?')) return
    try {
      const res = await fetch('/api/admin', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'empresa' }),
      })
      if (res.ok) {
        setCompanies((prev) => prev.filter((c) => c.id !== id))
      } else {
        alert('Erro ao excluir empresa.')
      }
    } catch (err) {
      alert('Erro de conexão.')
    }
  }

  // Deletar Mensagem de Contato
  const handleDeleteMessage = async (id: number | string) => {
    if (!confirm('Deseja realmente excluir esta mensagem?')) return
    try {
      const res = await fetch('/api/admin', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'contato' }),
      })
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id))
      } else {
        alert('Erro ao excluir mensagem.')
      }
    } catch (err) {
      alert('Erro de conexão.')
    }
  }

  const filteredStudents = students.filter(
    (s) =>
      s.nome_completo?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.universidade?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredCompanies = companies.filter(
    (c) =>
      c.nome_fantasia?.toLowerCase().includes(search.toLowerCase()) ||
      c.cnpj?.includes(search) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredMessages = messages.filter(
    (m) =>
      m.nome?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.mensagem?.toLowerCase().includes(search.toLowerCase())
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
              {tab === 'alunos' && `Alunos (${students.length})`}
              {tab === 'empresas' && `Empresas (${companies.length})`}
              {tab === 'mensagens' && `Mensagens (${messages.length})`}
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
                        Nenhum aluno cadastrado.
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
                    <th className="py-4 px-6">E-mail</th>
                    <th className="py-4 px-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm" style={{ borderColor: 'var(--color-border)' }}>
                  {filteredCompanies.map((c) => (
                    <tr key={c.id} className="hover:bg-[var(--color-secondary)]/50 transition-colors">
                      <td className="py-4 px-6 font-semibold">{c.nome_fantasia}</td>
                      <td className="py-4 px-6 font-mono text-xs">{c.cnpj}</td>
                      <td className="py-4 px-6 font-mono text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{c.email}</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteCompany(c.id)}
                          className="text-xs px-3 py-1.5 rounded-full font-semibold text-red-600 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCompanies.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                        Nenhuma empresa cadastrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MENSAGENS DE CONTATO */}
        {activeTab === 'mensagens' && (
          <div className="grid gap-4">
            {filteredMessages.map((m) => (
              <div key={m.id} className="p-6 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{m.nome}</span>
                    <span className="text-xs font-mono" style={{ color: 'var(--color-accent)' }}>{m.email}</span>
                    {m.criado_em && (
                      <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                        • {new Date(m.criado_em).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--color-muted-foreground)' }}>{m.mensagem}</p>
                </div>
                <button
                  onClick={() => handleDeleteMessage(m.id)}
                  className="self-start md:self-center text-xs px-3 py-1.5 rounded-full font-semibold text-red-600 bg-red-500/10 hover:bg-red-500/20 transition-colors whitespace-nowrap"
                >
                  Excluir Mensagem
                </button>
              </div>
            ))}
            {filteredMessages.length === 0 && (
              <div className="p-8 text-center rounded-3xl border text-sm" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)', color: 'var(--color-muted-foreground)' }}>
                Nenhuma mensagem recebida.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
