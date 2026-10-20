import { useState } from 'react'

type Screen = 'landing' | 'jobs' | 'profile' | 'dashboard' | 'student-login' | 'company-login' | 'publish'

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

const steps = [
  { num: '01', title: 'Crie seu perfil', body: 'Monte um currículo interativo e, se quiser, grave uma apresentação de 60 segundos.' },
  { num: '02', title: 'Mostre seu potencial', body: 'Resolva um microdesafio prático de 15 minutos no lugar de longas cartas de apresentação.' },
  { num: '03', title: 'Receba retorno', body: 'Acompanhe cada etapa e receba um feedback obrigatório da empresa em até 7 dias.' },
]

const commitments = [
  { marker: '7 DIAS', title: 'Feedback sem vácuo', body: 'Toda empresa assume o compromisso de atualizar o status ou enviar um retorno automático em até 7 dias.' },
  { marker: '15 MIN', title: 'Desafio rápido e prático', body: 'Uma tarefa curta mostra como você pensa e substitui textos longos e etapas repetitivas.' },
  { marker: '60 SEG', title: 'Vídeo opcional', body: 'Uma apresentação direta, gravada no app, para destacar comunicação, repertório e energia.' },
]

const testimonials = [
  {
    name: 'Isabela Torres',
    course: 'Engenharia de Produção — USP',
    company: 'Estagiária na Embraer',
    text: 'Em duas semanas já tinha três entrevistas agendadas. A plataforma é objetiva e o processo de candidatura é muito mais humano que os portais tradicionais.',
    avatar: 'https://images.unsplash.com/photo-1696200327543-4e0d3f62ee1f?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'Rafael Moura',
    course: 'Ciência da Computação — Unicamp',
    company: 'Dev Trainee no Nubank',
    text: 'O match por habilidades técnicas fez toda diferença. A Conecta Unis me apresentou para empresas que realmente valorizavam meu stack.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'Camila Neves',
    course: 'Administração — FGV',
    company: 'Analista Júnior na Magazine Luiza',
    text: 'Eu sabia exatamente em que etapa estava. Acompanhar a candidatura com transparência deixou todo o processo menos ansioso.',
    avatar: 'https://images.unsplash.com/photo-1744036096938-4519bc2e47fe?w=80&h=80&fit=crop&auto=format',
  },
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
    <div className="overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-8 py-4"
        style={{ background: 'var(--color-foreground)' }}>
        <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-background)', fontFamily: 'var(--font-display)' }}>
          Conecta<span style={{ color: 'var(--color-accent)' }}>Unis</span>
        </span>

        <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: 'var(--color-muted)' }}>
          <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors">Vagas</button>
          <button className="hover:text-white transition-colors">Empresas</button>
          <button className="hover:text-white transition-colors">Para Universidades</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('student-login')} className="text-sm px-4 py-2 rounded-full border transition-colors"
            style={{ borderColor: 'var(--color-muted)', color: 'var(--color-muted)' }}>
            Entrar como aluno
          </button>
          <button onClick={() => onNavigate('student-login')} className="text-sm px-4 py-2 rounded-full font-semibold transition-all hover:scale-105"
            style={{ background: 'var(--color-accent)', color: '#fff' }}>
            Cadastre-se grátis
          </button>
        </div>
      </nav>

      {/* HERO — split canvas */}
      <section className="min-h-screen grid md:grid-cols-2" style={{ paddingTop: '64px' }}>
        {/* Left — dark */}
        <div className="flex flex-col justify-center px-10 md:px-16 py-20"
          style={{ background: 'var(--color-foreground)' }}>
          <span className="inline-block mb-6 text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border w-fit"
            style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
            Plataforma de carreiras universitárias
          </span>
          <h1 className="text-5xl md:text-6xl leading-none mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-background)' }}>
            Seu primeiro emprego começa <em>aqui.</em>
          </h1>
          <p className="text-lg mb-10 leading-relaxed max-w-md" style={{ color: 'var(--color-muted)' }}>
            A Conecta Unis conecta universitários brasileiros às melhores oportunidades de estágio e emprego — com transparência, agilidade e sem burocracia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => onNavigate('jobs')}
              className="px-7 py-4 rounded-full font-semibold text-base transition-all hover:scale-105"
              style={{ background: 'var(--color-accent)', color: '#fff' }}>
              Explorar vagas →
            </button>
            <button onClick={() => onNavigate('company-login')}
              className="px-7 py-4 rounded-full font-semibold text-base border transition-colors"
              style={{ borderColor: 'var(--color-muted)', color: 'var(--color-muted)' }}>
              Sou empresa
            </button>
          </div>
        </div>

        {/* Right — image with blue tint overlay */}
        <div className="relative flex items-end overflow-hidden" style={{ background: '#0a2463' }}>
          <img
            src="https://images.unsplash.com/photo-1758691737278-3af15b37af48?w=900&h=800&fit=crop&auto=format"
            alt="Dois colegas discutindo trabalho em escritório moderno"
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,36,99,0.55) 0%, rgba(26,92,255,0.25) 100%)' }} />
          {/* Stats overlay */}
          <div className="relative z-10 m-8 grid grid-cols-2 gap-3 w-full max-w-sm">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl px-4 py-3 backdrop-blur-md"
                style={{ background: 'rgba(10,15,30,0.78)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="text-2xl font-bold" style={{ color: '#fff', fontFamily: 'var(--font-display)' }}>{s.value}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS TICKER */}
      <div className="py-5 border-y overflow-hidden" style={{ borderColor: 'var(--color-border)', background: 'var(--color-secondary)' }}>
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="text-sm font-semibold tracking-widest uppercase opacity-40"
              style={{ fontFamily: 'var(--font-mono)' }}>{p}</span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="py-28 px-8 md:px-16 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl leading-tight max-w-xs" style={{ fontFamily: 'var(--font-display)' }}>
            Como funciona
          </h2>
          <p className="max-w-sm text-base leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>
            Três etapas simples para ir do cadastro à contratação.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="group p-8 rounded-3xl border transition-all hover:shadow-lg"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card)' }}>
              <span className="block text-5xl font-bold mb-6 transition-colors"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-muted)' }}>
                {s.num}
              </span>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted-foreground)' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORM COMMITMENTS */}
      <section className="px-8 md:px-16 pb-28 max-w-6xl mx-auto">
        <div className="rounded-3xl p-8 md:p-10" style={{ background: 'var(--color-foreground)', color: 'var(--color-background)' }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <div className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                Compromisso Conecta Unis
              </div>
              <h2 className="text-3xl md:text-4xl max-w-lg" style={{ fontFamily: 'var(--font-display)' }}>
                Processos mais curtos, humanos e transparentes.
              </h2>
            </div>
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Regras simples que protegem o tempo do estudante e ajudam empresas a avaliar potencial de forma objetiva.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {commitments.map((item) => (
              <div key={item.title} className="rounded-2xl p-5 border" style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}>
                <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold mb-4"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)', fontFamily: 'var(--font-mono)' }}>
                  {item.marker}
                </span>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-8 md:px-16" style={{ background: 'var(--color-foreground)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-16" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-background)' }}>
            Quem já <em>conectou</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name}
                    className="w-10 h-10 rounded-full object-cover" style={{ background: 'var(--color-muted)' }} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--color-background)' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'var(--font-mono)' }}>{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="py-24 px-8 md:px-16 max-w-4xl mx-auto">
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
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-blue-600"
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
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-blue-600"
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
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-blue-600 resize-none"
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

      {/* CTA BANNER */}
      <section className="py-24 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl max-w-md leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Pronto para dar o próximo passo?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => onNavigate('profile')}
            className="px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105"
            style={{ background: 'var(--color-accent)', color: '#fff' }}>
            Criar perfil de aluno
          </button>
          <button onClick={() => onNavigate('dashboard')}
            className="px-8 py-4 rounded-full font-semibold text-base border transition-colors"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}>
            Publicar vagas
          </button>
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
