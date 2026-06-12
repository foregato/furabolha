"use client";

import { useState, useEffect, useRef } from "react";

// ─── Utility ───────────────────────────────────────────────────────────────
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ─── Animated Counter ──────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

// ─── Phone Mockup ──────────────────────────────────────────────────────────
function PhoneMockup({ rotate = 0, delay = 0, content }) {
  return (
    <div
      className="relative select-none"
      style={{
        transform: `rotate(${rotate}deg)`,
        animation: `floatPhone 6s ease-in-out ${delay}s infinite`,
      }}
    >
      {/* Phone frame */}
      <div className="relative w-[180px] rounded-[32px] bg-[#1a1a1a] p-[3px] shadow-2xl border border-white/10">
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[30px] bg-[#0A0A0A] aspect-[9/19]">
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#1a1a1a] rounded-full z-10" />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-8 pb-2">
              <span className="text-white/40 text-[9px] font-medium">Fora da Bolha</span>
              <div className="w-5 h-5 rounded-full bg-[#E53935]/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#E53935]" />
              </div>
            </div>
            {/* Feed posts */}
            <div className="flex flex-col gap-2 px-2 flex-1 overflow-hidden">
              {content.map((item, i) => (
                <div key={i} className="bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
                  <div
                    className="w-full h-16 flex items-end p-2"
                    style={{
                      background: `linear-gradient(135deg, ${item.bg1}, ${item.bg2})`,
                    }}
                  >
                    <div>
                      <div className="text-white text-[8px] font-bold leading-tight">{item.name}</div>
                      <div className="text-white/70 text-[7px]">{item.role}</div>
                    </div>
                  </div>
                  <div className="px-2 py-1.5">
                    <p className="text-white/60 text-[7px] leading-relaxed line-clamp-2">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E53935]/30 flex items-center justify-center">
                          <div className="w-1 h-1 bg-[#E53935] rounded-full" />
                        </div>
                        <span className="text-white/30 text-[6px]">{item.likes}</span>
                      </div>
                      <span className="text-white/20 text-[6px]">{item.city}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section wrapper ───────────────────────────────────────────────────────
function Section({ children, className = "", dark = false }) {
  return (
    <section
      className={cn(
        "w-full px-6 md:px-12 lg:px-24 py-20 md:py-32",
        dark ? "bg-[#0A0A0A]" : "bg-white",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function ForaDaBolhaLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  const phone1Content = [
    {
      name: "Maria Santos",
      role: "Pescadora · Amazônia",
      bg1: "#0f4c75",
      bg2: "#1b262c",
      text: "Hoje acordei às 4h para preparar as redes. O rio ainda está cheio de neblina...",
      likes: "2.4k",
      city: "Belém, PA",
    },
    {
      name: "João Ferreira",
      role: "Agricultor · Sertão",
      bg1: "#8b4513",
      bg2: "#5c3317",
      text: "A chuva chegou depois de 90 dias. As plantas começaram a brotar hoje de manhã...",
      likes: "1.8k",
      city: "Mossoró, RN",
    },
    {
      name: "Aiko Tanaka",
      role: "Chef · Tokyo",
      bg1: "#c0392b",
      bg2: "#7d0b0b",
      text: "Ramen de miso com 12 horas de caldo. Esta receita é da família há 3 gerações...",
      likes: "5.1k",
      city: "Tokyo, JP",
    },
  ];

  const phone2Content = [
    {
      name: "Carlos Oliveira",
      role: "Professor · Interior",
      bg1: "#1a6b3c",
      bg2: "#0d4a28",
      text: "23 alunos em uma sala, da 1ª à 5ª série juntos. É desafiador, mas cada progresso vale...",
      likes: "3.7k",
      city: "Chapada, BA",
    },
    {
      name: "Amara Diallo",
      role: "Estudante · Senegal",
      bg1: "#6d4c41",
      bg2: "#3e2723",
      text: "Primeiro dia no Brasil. A língua é diferente mas as pessoas parecem muito calorosas...",
      likes: "4.2k",
      city: "São Paulo, SP",
    },
    {
      name: "Pedro Alves",
      role: "Minerador · Pará",
      bg1: "#37474f",
      bg2: "#1c2933",
      text: "300 metros abaixo do chão todos os dias. Poucas pessoas entendem o que é isso...",
      likes: "6.8k",
      city: "Carajás, PA",
    },
  ];

  const testimonials = [
    {
      quote:
        "Conheci realidades que nunca teria encontrado no Instagram. Agora entendo o Brasil de verdade.",
      name: "Fernanda Costa",
      role: "Designer, São Paulo",
      initials: "FC",
      color: "#E53935",
    },
    {
      quote:
        "Passei a enxergar o Brasil de outra forma. Cada dia descubro uma história que muda minha perspectiva.",
      name: "Rafael Mendes",
      role: "Desenvolvedor, Recife",
      initials: "RM",
      color: "#E53935",
    },
    {
      quote:
        "Todo dia descubro algo inesperado. Ontem aprendi sobre a vida de um ceramista no interior do Ceará.",
      name: "Luana Almeida",
      role: "Professora, Porto Alegre",
      initials: "LA",
      color: "#E53935",
    },
  ];

  const passportStats = [
    { icon: "🌎", value: 24, suffix: "", label: "cidades descobertas" },
    { icon: "🇧🇷", value: 8, suffix: "", label: "estados visitados" },
    { icon: "🌍", value: 3, suffix: "", label: "países explorados" },
    { icon: "💼", value: 17, suffix: "", label: "profissões conhecidas" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * { font-family: 'Inter', sans-serif; }
        
        @keyframes floatPhone {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-16px) rotate(var(--rot, 0deg)); }
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.15; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .fade-up { animation: fadeUp 0.8s ease forwards; }
        .fade-up-delay-1 { animation: fadeUp 0.8s ease 0.15s forwards; opacity: 0; }
        .fade-up-delay-2 { animation: fadeUp 0.8s ease 0.3s forwards; opacity: 0; }
        .fade-up-delay-3 { animation: fadeUp 0.8s ease 0.45s forwards; opacity: 0; }
        
        .btn-primary {
          background: #E53935;
          color: white;
          transition: all 0.2s ease;
        }
        .btn-primary:hover {
          background: #c62828;
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(229,57,53,0.35);
        }
        .btn-primary:active { transform: translateY(0); }
        
        .btn-outline {
          background: transparent;
          color: white;
          border: 1.5px solid rgba(255,255,255,0.3);
          transition: all 0.2s ease;
        }
        .btn-outline:hover {
          border-color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.05);
          transform: translateY(-1px);
        }
        
        .card-feature {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
        }
        .card-feature:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(229,57,53,0.3);
          transform: translateY(-4px);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #E53935 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .noise-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
        
        .passport-card {
          background: linear-gradient(135deg, #1a1200 0%, #2d1f00 100%);
          border: 1px solid rgba(255,200,50,0.2);
        }
        
        .passport-stat {
          border-bottom: 1px solid rgba(255,200,50,0.1);
          transition: all 0.2s ease;
        }
        .passport-stat:hover {
          background: rgba(255,200,50,0.05);
        }
        .passport-stat:last-child { border-bottom: none; }

        .section-white { background: #ffffff; color: #0A0A0A; }
        .section-dark { background: #0A0A0A; color: #ffffff; }
        .section-gray { background: #f5f5f5; color: #0A0A0A; }
        
        .comparison-col-traditional {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .comparison-col-bolha {
          background: rgba(229,57,53,0.08);
          border: 1px solid rgba(229,57,53,0.25);
        }
        
        .testimonial-card {
          background: #ffffff;
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.1);
          border-color: #E53935;
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#E53935] flex items-center justify-center shadow-lg shadow-red-900/30">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="10" cy="10" r="3" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-white tracking-tight text-sm">
            Fora da Bolha
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Como funciona", "Explorar", "Passaporte"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white/50 hover:text-white text-sm transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:block btn-outline px-5 py-2 rounded-full text-sm font-medium">
            Entrar
          </button>
          <button className="btn-primary px-5 py-2 rounded-full text-sm font-medium">
            Criar conta
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden pt-20">
        {/* Background orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(229,57,53,0.12) 0%, transparent 70%)",
            animation: "pulseRing 8s ease-in-out infinite",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)",
            animation: "pulseRing 10s ease-in-out 2s infinite",
            filter: "blur(60px)",
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 mb-8 fade-up">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E53935] animate-pulse" />
                Uma nova forma de descobrir o mundo
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6 fade-up-delay-1"
              >
                Saia da sua{" "}
                <span className="gradient-text">bolha.</span>
              </h1>

              <p className="text-white/55 text-lg md:text-xl leading-relaxed mb-10 max-w-lg fade-up-delay-2">
                Descubra como vivem pessoas de outras cidades, profissões e
                culturas. Uma rede social criada para ampliar perspectivas,
                não reforçar algoritmos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 fade-up-delay-3">
                <button className="btn-primary px-8 py-4 rounded-full text-base font-semibold">
                  Criar conta grátis
                </button>
                <button className="btn-outline px-8 py-4 rounded-full text-base font-medium flex items-center justify-center gap-2">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 7l5 3-5 3V7z"
                      fill="white"
                    />
                  </svg>
                  Ver como funciona
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 mt-10 fade-up-delay-3">
                <div className="flex -space-x-2">
                  {["#E53935", "#c62828", "#b71c1c", "#ef5350"].map(
                    (c, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-[#0A0A0A]"
                        style={{ background: c }}
                      />
                    )
                  )}
                </div>
                <p className="text-white/40 text-sm">
                  <span className="text-white/80 font-semibold">+12.400</span>{" "}
                  pessoas já saíram da bolha
                </p>
              </div>
            </div>

            {/* Phones */}
            <div className="relative flex items-center justify-center h-[480px] lg:h-[560px]">
              {/* Center glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(229,57,53,0.15) 0%, transparent 65%)",
                  filter: "blur(20px)",
                }}
              />
              <div
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-120%, -50%) rotate(-8deg)",
                  "--rot": "-8deg",
                  animation: "floatPhone 7s ease-in-out 0s infinite",
                }}
              >
                <PhoneMockup content={phone1Content} />
              </div>
              <div
                className="absolute z-10"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  "--rot": "0deg",
                  animation: "floatPhone 6s ease-in-out 0.5s infinite",
                }}
              >
                <div className="relative">
                  <PhoneMockup content={phone2Content} />
                  {/* Red badge */}
                  <div className="absolute -top-2 -right-2 bg-[#E53935] text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-red-900/40 z-20">
                    FORA DA BOLHA
                  </div>
                </div>
              </div>
              <div
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(20%, -45%) rotate(7deg)",
                  "--rot": "7deg",
                  animation: "floatPhone 8s ease-in-out 1s infinite",
                  opacity: 0.7,
                }}
              >
                <PhoneMockup content={phone1Content.slice().reverse()} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-white text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-white/50 animate-pulse" />
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────────────────── */}
      <section className="section-white py-20 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-4">
              O problema
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tight leading-tight">
              Os algoritmos mostram
              <br />
              <span className="text-[#E53935]">mais do mesmo.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Traditional */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-[#e5e5e5] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#888]" />
                </div>
                <span className="font-bold text-[#888] text-sm tracking-wide uppercase">
                  Redes Tradicionais
                </span>
              </div>
              <div className="space-y-4">
                {[
                  "Mesmo conteúdo, todos os dias",
                  "Mesmas opiniões de sempre",
                  "Mesmas pessoas do seu círculo",
                  "Algoritmos que te prendem na bolha",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-[#666] text-base"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#e5e5e5] flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-0.5 bg-[#aaa] rounded-full" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Fora da Bolha */}
            <div className="rounded-2xl border border-[#E53935]/20 bg-[#E53935]/5 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-[#E53935] flex items-center justify-center shadow-lg shadow-red-400/20">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeDasharray="2 1.5"
                    />
                    <circle cx="8" cy="8" r="2" fill="white" />
                  </svg>
                </div>
                <span className="font-bold text-[#E53935] text-sm tracking-wide uppercase">
                  Fora da Bolha
                </span>
              </div>
              <div className="space-y-4">
                {[
                  "Novas cidades a cada acesso",
                  "Novas culturas e realidades",
                  "Novas perspectivas de vida",
                  "Algoritmo que expande o seu mundo",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-[#0A0A0A] text-base font-medium"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#E53935] flex items-center justify-center flex-shrink-0 shadow-sm shadow-red-300/40">
                      <svg
                        viewBox="0 0 10 10"
                        fill="none"
                        className="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 5.5l2 2 4-4"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <section className="section-dark py-20 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-4">
              Como funciona
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Explore o mundo através
              <br />
              das pessoas.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📍",
                title: "Descubra novas cidades",
                desc: "Veja o cotidiano de pessoas que vivem em lugares que você nunca visitou. Do interior do Nordeste ao coração de Tóquio.",
              },
              {
                icon: "💼",
                title: "Conheça novas profissões",
                desc: "Entenda a realidade de quem trabalha em áreas completamente diferentes da sua. Pescadores, astronautas, agricultores.",
              },
              {
                icon: "🌎",
                title: "Viaje sem sair de casa",
                desc: "Explore culturas, hábitos e estilos de vida do Brasil e do mundo. Cada scroll é uma janela para uma realidade diferente.",
              },
            ].map((card, i) => (
              <div key={i} className="card-feature rounded-2xl p-8 group cursor-pointer">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-3">
                  {card.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#E53935] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Saiba mais
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8h10M9 5l4 3-4 3"
                      stroke="#E53935"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABA FORA DA BOLHA ────────────────────────────────────────── */}
      <section className="section-white py-20 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-4">
                Funcionalidade principal
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tight leading-tight mb-6">
                Uma aba criada para{" "}
                <span className="text-[#E53935]">surpreender você.</span>
              </h2>
              <p className="text-[#555] text-lg leading-relaxed mb-8">
                Diferente das redes sociais tradicionais, aqui você encontra
                conteúdo que normalmente nunca apareceria no seu feed. O
                algoritmo trabalha para expandir seus horizontes, não para
                te manter na mesma bolha.
              </p>
              <div className="space-y-4">
                {[
                  "Pessoas de realidades completamente diferentes da sua",
                  "Histórias autênticas de todo o Brasil e do mundo",
                  "Culturas, tradições e modos de vida inéditos",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#E53935] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-red-200">
                      <svg
                        viewBox="0 0 10 10"
                        fill="none"
                        className="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 5.5l2 2 4-4"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[#444] text-base">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-10 btn-primary px-8 py-4 rounded-full text-base font-semibold">
                Explorar a aba Fora da Bolha
              </button>
            </div>

            {/* Feed mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-xs">
                <div className="bg-[#0A0A0A] rounded-3xl p-4 border border-white/10 shadow-2xl">
                  {/* App bar */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <span className="text-white/30 text-xs">Feed</span>
                    <div className="bg-[#E53935] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      FORA DA BOLHA
                    </div>
                    <span className="text-white/30 text-xs">●●●</span>
                  </div>
                  {/* Posts */}
                  <div className="space-y-3">
                    {[
                      {
                        name: "Dona Lurdes",
                        role: "Interior do Piauí",
                        color: "#8b4513",
                        emoji: "🌾",
                        text: "Colheita do milho hoje de manhã cedo. A família toda ajudou.",
                      },
                      {
                        name: "José Pescador",
                        role: "Manaus, AM",
                        color: "#0f4c75",
                        emoji: "🎣",
                        text: "Rio cheio hoje. Pesquei mais de 40kg de tambaqui antes do sol nascer.",
                      },
                      {
                        name: "Prof. Ana",
                        role: "Chapada Diamantina",
                        color: "#1a6b3c",
                        emoji: "📚",
                        text: "Escola com 18 alunos de idades diferentes. Mas que turma especial.",
                      },
                      {
                        name: "Amara",
                        role: "Senegal → São Paulo",
                        color: "#6d4c41",
                        emoji: "🌍",
                        text: "3 anos no Brasil. A saudade da família ainda dói mas me adaptei.",
                      },
                      {
                        name: "Seu Raimundo",
                        role: "Agricultor, Ceará",
                        color: "#9e6b2e",
                        emoji: "🌵",
                        text: "Mesmo com a seca, minha horta resistiu. Fé e tecnologia juntos.",
                      },
                    ].map((post, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-all duration-200 cursor-pointer"
                      >
                        <div
                          className="h-12 flex items-end px-3 pb-2"
                          style={{
                            background: `linear-gradient(to bottom right, ${post.color}ee, ${post.color}88)`,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{post.emoji}</span>
                            <div>
                              <p className="text-white text-[9px] font-semibold leading-tight">
                                {post.name}
                              </p>
                              <p className="text-white/60 text-[8px]">
                                {post.role}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-2">
                          <p className="text-white/60 text-[8px] leading-relaxed">
                            {post.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PASSPORT ────────────────────────────────────────────────── */}
      <section className="section-dark py-20 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Passport visual */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="passport-card rounded-3xl p-8 w-full max-w-sm shadow-2xl relative overflow-hidden">
                {/* Watermark */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ opacity: 0.04 }}
                >
                  <span
                    className="text-[120px] font-black text-yellow-200 tracking-tight select-none"
                    style={{ transform: "rotate(-15deg)" }}
                  >
                    🌎
                  </span>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div>
                    <p className="text-yellow-400/60 text-[10px] tracking-[0.2em] uppercase font-medium mb-1">
                      Passaporte Digital
                    </p>
                    <p className="text-yellow-100 font-black text-xl tracking-tight">
                      Fora da Bolha
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-yellow-400/30 flex items-center justify-center">
                    <span className="text-2xl">🌐</span>
                  </div>
                </div>

                <div className="border-t border-yellow-400/10 mb-6" />

                {/* Stats */}
                <div className="space-y-1 relative z-10">
                  {passportStats.map((stat, i) => (
                    <div
                      key={i}
                      className="passport-stat flex items-center justify-between py-3 px-2 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{stat.icon}</span>
                        <span className="text-yellow-100/60 text-sm">
                          {stat.label}
                        </span>
                      </div>
                      <span className="text-yellow-300 font-black text-xl tabular-nums">
                        <Counter target={stat.value} />
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-yellow-400/10 mt-6 pt-4 relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-yellow-400/40 text-[8px] tracking-[0.15em] uppercase">
                      Explorador desde
                    </p>
                    <p className="text-yellow-200/70 text-xs font-medium mt-0.5">
                      Janeiro de 2025
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {["🇧🇷", "🇯🇵", "🇳🇬"].map((f) => (
                      <span key={f} className="text-lg">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-4">
                Passaporte Digital
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                Transforme descoberta
                <br />
                em <span className="text-[#E53935]">conquista.</span>
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-8">
                Cada nova cidade visitada, cultura explorada e profissão
                conhecida se transforma em uma conquista no seu passaporte
                digital. Quanto mais você descobre, mais sua visão de mundo
                se expande.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Usuários ativos", value: "12k+" },
                  { label: "Cidades na plataforma", value: "380+" },
                  { label: "Países representados", value: "47" },
                  { label: "Histórias compartilhadas", value: "95k+" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-5"
                  >
                    <p className="text-[#E53935] font-black text-2xl">{s.value}</p>
                    <p className="text-white/40 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="section-gray py-20 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-4">
              Depoimentos
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tight">
              O que dizem quem
              <br />
              saiu da bolha.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card rounded-2xl p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array(5)
                    .fill(0)
                    .map((_, si) => (
                      <svg
                        key={si}
                        viewBox="0 0 16 16"
                        fill="#E53935"
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4 4.3 12.3 5 8.2 2 5.3l4.2-.7L8 1z" />
                      </svg>
                    ))}
                </div>
                <p className="text-[#0A0A0A] text-base leading-relaxed mb-6 font-medium">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A0A0A] text-sm">{t.name}</p>
                    <p className="text-[#888] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-40 px-6 md:px-12 lg:px-24 bg-[#0A0A0A] overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(229,57,53,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[#E53935] font-semibold text-sm tracking-widest uppercase mb-6">
            Comece agora
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
            O mundo é maior
            <br />
            que sua <span className="gradient-text">timeline.</span>
          </h2>
          <p className="text-white/50 text-xl leading-relaxed mb-12">
            Comece hoje a explorar novas perspectivas.
            <br />
            Grátis, para sempre.
          </p>
          <button className="btn-primary px-12 py-5 rounded-full text-lg font-bold shadow-2xl shadow-red-900/30 inline-flex items-center gap-3">
            Entrar no Fora da Bolha
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10h12M12 6l4 4-4 4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className="text-white/20 text-sm mt-6">
            Sem cartão de crédito · Sem compromisso
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 px-6 md:px-12 lg:px-24 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#E53935] flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
                <circle
                  cx="10"
                  cy="10"
                  r="7"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="3 2"
                />
                <circle cx="10" cy="10" r="3" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-white text-sm">Fora da Bolha</span>
          </div>
          <div className="flex gap-6 text-white/30 text-sm">
            {["Termos", "Privacidade", "Contato", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-white/20 text-xs">
            © 2025 Fora da Bolha. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
