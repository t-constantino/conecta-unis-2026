import { useState } from 'react'

type Screen = 'landing' | 'jobs' | 'profile' | 'dashboard' | 'student-login' | 'student-register' | 'company-login' | 'admin-login' | 'publish'

interface Props {
  onNavigate: (s: Screen) => void
}

const partners = [
  'Itaú', 'Ambev', 'Magazine Luiza', 'Totvs', 'Nubank', 'Porto Seguro', 'Vivo', 'Embraer',
]

const stats = [
  { value: '48.200', label: 'alunos cadastrados' },
  { value: '3.700', label: 'vagas ativas' },
  { value: '890', label: 'empresas parceiras' },
  { value: '94%', label: 'satisfação dos contratados' },
]

export default function LandingPage({ onNavigate }: Props) {
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const dados = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      mensagem: formData.get('mensagem'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        form.reset();
      } else {
        alert('Erro ao enviar: ' + (result.error || 'Tente novamente.'));
      }
    } catch (err) {
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col justify-between" style={{ background: 'var(--color-background)', color: 'var(--color-foreground)' }}>
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-8 py-5 border-b"
        style={{ background: 'var(--color-foreground)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-background)', fontFamily: 'var(--font-display)' }}>
          Conecta<span style={{ color: 'var(--color-accent)' }}>Unis</span>
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('student-login')}
            className="text-xs md:text-sm px-4 py-2 rounded-full border transition-all hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
          >
            Sou Aluno
          </button>
          <button
            onClick={() => onNavigate('company-login')}
            className="text-xs md:text-sm px-4 py-2 rounded-full border transition-all hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
          >
            Sou Empresa
          </button>
          <button
            onClick={() => onNavigate('admin-login')}
            className="text-xs md:text-sm px-4 py-2 rounded-full font-semibold transition-all hover:scale-105"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            Área Admin
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-32 md:py-40 max-w-4xl mx-auto">
        <span className="inline-block mb-6 text-xs font-mono tracking-widest uppercase px-4 py-1.5 rounded-full border"
          style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
          Plataforma de Carreiras Universitárias
        </span>
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Conectando talentos universitários <br />ao <span style={{ color: 'var(--color-accent)' }}>mercado de trabalho.</span>
        </h1>
        
        <p className="text-base md:text-lg mb-10 max-w-2xl leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
          Acelere sua carreira ou encontre os melhores profissionais formados nas unidades Unis com processos transparentes e ágeis.
        </p>

        {/* Botões centrais de acesso rápido */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <button
            onClick={() => onNavigate('student-login')}
            className="px-8 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105 shadow-lg"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            Entrar como Aluno →
          </button>
          <button
            onClick={() => onNavigate('company-login')}
            className="px-8 py-4 rounded-full font-semibold text-sm border transition-colors hover:bg-[var(--color-secondary)]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            Acesso Empresas
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-20 pt-16 border-t" style={{ borderColor: 'var(--color-border)' }}>
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS TICKER */}
      <div className="py-6 border-y overflow-hidden" style={{ borderColor: 'var(--color-border)', background: 'var(--color-secondary)' }}>
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="text-sm font-semibold tracking-widest uppercase opacity-40"
              style={{ fontFamily: 'var(--font-mono)' }}>{p}</span>
          ))}
        </div>
      </div>

      {/* CONTACT FORM SECTION (MANTIDA INTACTA) */}
      <section className="py-24 px-8 md:px-16 max-w-4xl mx-auto w-full">
        <div className="rounded-3xl p-8 md:p-12 border shadow-sm" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card)' }}>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs tracking-widest uppercase px-3 py-1 rounded-full border mb-4 inline-block font-mono"
              style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
              Fale Conosco
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ fontFamily: 'var(--font-display)' }}>
              Entre em contato
            </h2>
            <p className="text-sm mt-3" style={{ color: 'var(--color-muted-foreground)' }}>
              Tem dúvidas ou quer trazer sua empresa para a Conecta Unis? Mande sua mensagem!
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>Nome</label>
              <input
                type="text"
                name="nome"
                required
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-background)', color: 'var(--color-foreground)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>E-mail</label>
              <input
                type="email"
                name="email"
                required
                placeholder="seu.email@exemplo.com"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-background)', color: 'var(--color-foreground)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-foreground)' }}>Mensagem</label>
              <textarea
                name="mensagem"
                required
                rows={4}
                placeholder="Escreva sua mensagem aqui..."
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-background)', color: 'var(--color-foreground)' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'var(--color-accent)', color: '#fff' }}
            >
              {loading ? 'Enviando...' : 'Enviar mensagem'}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 px-8 md:px-16" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
            Conecta<span style={{ color: 'var(--color-accent)' }}>Unis</span>
          </span>
          <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
            © 2026 Conecta Unis — Conectando universidades ao mercado de trabalho
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
