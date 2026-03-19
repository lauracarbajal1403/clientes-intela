"use client"
import type React from "react"
import { useState, useEffect, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import NominikChatbot from "@/app/nominik"
import {
  Clock, Shield, CheckCircle2,
  ChevronRight, Send, Phone, Mail, MessageCircle,
  BriefcaseBusiness, UserCheck, LayoutDashboard, FileText, Award
} from 'lucide-react'

const LOGOS = [
  { src: "/Simplytech.png",         alt: "Simplytech"    },
  { src: "/Ricatto.png",            alt: "Ricatto"       },
  { src: "/MXHEALTH.png",           alt: "MX Health"     },
  { src: "/Logo-intela.png",        alt: "Intela"        },
  { src: "/Novogas.png",            alt: "Novogas"       },
  { src: "/Logo_Alertyx_white.png", alt: "Alertyx"       },
  { src: "/Logo.png",               alt: "Logo"          },
  { src: "/Bizhub.png",             alt: "Bizhub"        },
  { src: "/Linkepro.png",           alt: "Linkepro"      },
  { src: "/Factor.png",             alt: "Factor"        },
  { src: "/BrisSandoval.png",       alt: "Bris Sandoval" },
  { src: "/Abogados.png",           alt: "Abogados"      },
]

const comparison = [
  { feature: "Tiempo de procesamiento", traditional: "2-3 días",            nommy: "5 minutos" },
  { feature: "Riesgo de errores",        traditional: "Alto (manual)",       nommy: "Mínimo (automatizado)" },
  { feature: "Cumplimiento IMSS",        traditional: "Complejo/Manual",     nommy: "Automático y Garantizado" },
  { feature: "Acceso a la información",  traditional: "Archivos locales",    nommy: "Nube 24/7" },
  { feature: "Costo operativo",          traditional: "Alto (horas hombre)", nommy: "Optimizado y Justo" },
]

const testimonials = [
  {
    stars: 5,
    text: "Migrar de Intela a Nommy fue la mejor decisión. Automatizamos el 70% de las tareas manuales de nómina en solo dos semanas.",
    name: "Laura Martínez",
    role: "Directora de RRHH @ TechSolutions",
    avatar: "/BrisSandoval.png",
  },
  {
    stars: 5,
    text: "La precisión en los cálculos y la facilidad para generar reportes nos ha ahorrado horas de auditoría interna.",
    name: "Carlos Ruiz",
    role: "CFO @ Grupo Industrial MX",
    avatar: "/Ricatto.png",
  },
  {
    stars: 5,
    text: "El soporte técnico es excepcional. Realmente entienden las necesidades de las empresas mexicanas.",
    name: "Sofía Vega",
    role: "Gerente de Operaciones @ Innova Retail",
    avatar: "/Factor.png",
  },
]

const features = [
  {
    icon: <BriefcaseBusiness size={22} />,
    title: 'Reclutamiento con IA',
    desc: 'Encuentra al mejor talento en tiempo récord. Nuestra IA califica y filtra candidatos automáticamente.',
  },
  {
    icon: <Clock size={22} />,
    title: 'Control de Asistencia',
    desc: 'Check-in inteligente con geolocalización y reconocimiento facial para una gestión precisa.',
  },
  {
    icon: <LayoutDashboard size={22} />,
    title: 'Expediente Digital',
    desc: 'Toda la información de tus colaboradores en un solo lugar, segura y siempre disponible.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Cumplimiento Legal',
    desc: 'Actualizaciones automáticas ante cambios en leyes laborales y fiscales. Evita multas.',
  },
  {
    icon: <UserCheck size={22} />,
    title: 'Evaluación de Desempeño',
    desc: 'Mide el crecimiento de tu equipo con KPIs claros y retroalimentación en tiempo real.',
  },
  {
    icon: <FileText size={22} />,
    title: 'Nómina Automatizada',
    desc: 'Cálculos complejos resueltos en segundos. Dispersión masiva y timbrado inmediato.',
  },
]

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "", telefono: "", colaboradores: "1 - 20 empleados" })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setMounted(true)
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!mounted) return null

  const scrollToForm = () => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    window.open('/gracias', '_blank')
    try {
      const response = await fetch("/api/send-demo-request", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok) setFormData({ nombre: "", empresa: "", email: "", telefono: "", colaboradores: "1 - 20 empleados" })
      else setMessage(data.error || "Hubo un error. Por favor intenta de nuevo.")
    } catch { setMessage("Error al enviar. Por favor intenta de nuevo.") }
    finally { setIsLoading(false) }
  }

  const orange = '#4db8a8'
  const navy  = '#1d3461'
  const purple = '#4db8a8'
  const purpleLight = '#5ecfc0'
  const purpleDark = '#2ea898'

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", backgroundColor: '#ffffff' }}>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(150deg, #f8f9ff 0%, #f0f2ff 60%, #f8f9ff 100%)', padding: isMobile ? '56px 20px 48px' : '80px 40px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '48px' : '60px', alignItems: 'center' }}>

          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#e0f7f3', border: '1px solid #9fe0d8', borderRadius: '999px', padding: '6px 14px', marginBottom: '28px' }}>
              <Award size={13} color={purple} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: purple, letterSpacing: '0.05em' }}>BENEFICIO EXCLUSIVO PARA FAMILIA INTELA</span>
            </div>

            <h1 style={{ fontSize: isMobile ? '40px' : 'clamp(40px, 5vw, 58px)', fontWeight: 900, color: navy, lineHeight: 1.05, marginBottom: '20px' }}>
              La evolución de tu<br />nómina{' '}
              <span style={{ color: purple }}>comienza aquí.</span>
            </h1>
            <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.7, marginBottom: '32px', maxWidth: '480px' }}>
              Simplifica tus procesos contables y laborales con la plataforma inteligente que ya confían los líderes de Intela. Menos errores, más tiempo para tu gente.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
              {['Cálculos automáticos sin errores', 'Cumplimiento legal 100% garantizado', 'Implementación prioritaria para clientes Intela', 'Soporte especializado 24/7'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color={orange} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '15px', color: '#334155' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form card */}
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: isMobile ? '28px 20px' : '36px', boxShadow: '0 4px 40px rgba(0,0,0,0.10)', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: navy, marginBottom: '6px' }}>Agenda tu Demo</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Descubre cómo Nommy puede transformar tu operación en 15 minutos.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>NOMBRE</label>
                  <Input placeholder="Tu nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>EMPRESA</label>
                  <Input placeholder="Nombre empresa" value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} required />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>EMAIL CORPORATIVO</label>
                <Input type="email" placeholder="ejemplo@empresa.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>TELÉFONO / WHATSAPP</label>
                <Input type="tel" placeholder="+52 (33) 0000 0000" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
              </div>
              {message && <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#991b1b', fontSize: '13px' }}>{message}</div>}
              <button type="submit" disabled={isLoading}
                style={{ backgroundColor: purple, color: 'white', padding: '16px', borderRadius: '10px', fontWeight: 800, fontSize: '15px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
                {isLoading ? "Enviando..." : <>Solicitar Acceso Prioritario <span style={{ fontSize: '18px' }}>→</span></>}
              </button>
              <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', margin: 0 }}>
                Al solicitar la demo, aceptas nuestros <u>Términos</u> y <u>Aviso de Privacidad</u>.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── LOGOS CARRUSEL ── */}
      <section style={{ padding: isMobile ? '32px 0' : '60px 0', backgroundColor: '#1d3461', overflow: 'hidden' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.12em', marginBottom: '28px', textAlign: 'center' }}>
          EMPRESAS QUE YA TRANSFORMARON SU NÓMINA
        </p>
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .logo-track {
            display: flex;
            align-items: center;
            width: max-content;
            animation: marquee 28s linear infinite;
          }
          .logo-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div className="logo-track">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} style={{
                width: isMobile ? '120px' : '160px',
                height: isMobile ? '56px' : '72px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: isMobile ? '40px' : '64px',
              }}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    opacity: 0.35,
                    filter: 'grayscale(1)',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.35')}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="beneficios" style={{ padding: isMobile ? '60px 20px' : '88px 40px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: purple, letterSpacing: '0.12em', marginBottom: '12px' }}>FUNCIONALIDADES</p>
          <h2 style={{ fontSize: isMobile ? '28px' : 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: navy, marginBottom: '16px', lineHeight: 1.15 }}>
            Todo lo que necesitas para gestionar tu capital humano
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '620px', margin: '0 auto 56px', lineHeight: 1.6 }}>
            Nommy no es solo un software de nómina, es el ecosistema completo para potenciar el crecimiento de tu empresa.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
            {features.map((card, i) => (
              <div key={i} style={{ backgroundColor: '#f8f9ff', borderRadius: '16px', padding: '32px 28px', textAlign: 'left', border: '1px solid #eef0ff', transition: 'box-shadow 0.2s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(77,184,168,0.10)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0f7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: purple }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: navy, marginBottom: '10px' }}>{card.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MIGRATE / ALLIANCE ── */}
      <section id="intela" style={{ padding: isMobile ? '60px 20px' : '88px 40px', background: `linear-gradient(135deg, ${purpleDark} 0%, ${purple} 60%, ${purpleLight} 100%)` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '80px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '999px', padding: '6px 14px', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'white', letterSpacing: '0.08em' }}>ALIANZA ESTRATÉGICA</span>
            </div>
            <h2 style={{ fontSize: isMobile ? '32px' : 'clamp(32px, 4vw, 46px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '20px' }}>
              ¿Por qué migrar de Intela a Nommy?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '36px' }}>
              Como marca hermana de Intela, hemos diseñado un proceso de transición transparente y lleno de beneficios para que tu operación no se detenga.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { title: 'Migración de Datos Gratuita', desc: 'Nos encargamos de pasar toda tu información histórica sin costo.' },
                { title: 'Tarifa Preferencial', desc: 'Descuentos exclusivos permanentes por ser cliente Intela.' },
                { title: 'Integración Nativa', desc: 'Nommy se conecta perfectamente con tus herramientas actuales de Intela.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <ChevronRight size={14} color="white" />
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: 'white', margin: '0 0 4px' }}>{item.title}</p>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <Image src="/si.png" alt="Migración Intela a Nommy" width={600} height={450}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '-16px', right: isMobile ? '0' : '-16px', backgroundColor: 'white', borderRadius: '14px', padding: '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', maxWidth: '220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', letterSpacing: '0.08em' }}>ESTADO DE MIGRACIÓN</span>
              </div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: navy, margin: 0, lineHeight: 1.4 }}>
                98% de clientes Intela reportan satisfacción total tras el primer mes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: isMobile ? '60px 20px' : '88px 40px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: navy, marginBottom: '48px' }}>
            Lo que dicen nuestros clientes
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '28px 24px', textAlign: 'left', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                  {[0,1,2,3,4].map(j => <span key={j} style={{ color: '#fbbf24', fontSize: '18px' }}>★</span>)}
                </div>
                <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.75, marginBottom: '24px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, backgroundColor: '#f1f5f9' }}>
                    <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: navy, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARACIÓN ── */}
      <section style={{ padding: isMobile ? '60px 20px' : '88px 40px', backgroundColor: '#f8f9ff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '38px', fontWeight: 900, color: navy, marginBottom: '12px' }}>
            ¿Por qué cambiar a Nommy?
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '48px' }}>
            Compara la eficiencia de nuestra plataforma contra los métodos tradicionales.
          </p>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', backgroundColor: '#f8f9ff', padding: '14px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: navy, textAlign: 'left' }}>Característica</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', textAlign: 'center' }}>Método Tradicional</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: purple, textAlign: 'center' }}>Con Nommy</span>
            </div>
            {comparison.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', padding: '16px 24px', borderBottom: i < comparison.length - 1 ? '1px solid #f1f5f9' : 'none', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#334155', textAlign: 'left' }}>{row.feature}</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span style={{ color: '#ef4444', fontSize: '13px' }}>✕</span>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>{row.traditional}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span style={{ color: orange, fontSize: '13px' }}>✓</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: navy }}>{row.nommy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 40px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ background: `linear-gradient(135deg, ${purpleDark} 0%, ${purple} 60%, ${purpleLight} 100%)`, borderRadius: '24px', padding: isMobile ? '48px 28px' : '64px 56px', textAlign: 'center' }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '38px', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
              ¿Listo para llevar tu nómina al siguiente nivel?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px' }}>
              Únete a las cientos de empresas que ya transformaron su gestión de capital humano con Nommy.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={scrollToForm} style={{ backgroundColor: 'white', color: purple, padding: '14px 28px', borderRadius: '999px', fontWeight: 800, fontSize: '15px', border: 'none', cursor: 'pointer' }}>
                Solicitar Demo Ahora
              </button>
              <a href='https://wa.me/523315179175' target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'transparent', color: 'white', padding: '14px 28px', borderRadius: '999px', fontWeight: 700, fontSize: '15px', border: '1.5px solid rgba(255,255,255,0.5)', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
                Hablar con un Experto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact-form" style={{ padding: isMobile ? '60px 20px' : '88px 40px', backgroundColor: '#1d3461' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '80px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: isMobile ? '32px' : 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: '20px' }}>
              ¿Listo para automatizar tu nómina?
            </h2>
            <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.7, marginBottom: '36px' }}>
              Únete a las empresas que ya están ahorrando horas de trabajo administrativo cada mes.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: <Phone size={18} color={orange} />, label: 'Ventas', value: '(33) 1517 9175', href: 'https://wa.me/523315179175' },
                { icon: <Mail size={18} color={orange} />, label: 'Email', value: 'ventas@nommy.mx', href: 'mailto:ventas@nommy.mx' },
                { icon: <MessageCircle size={18} color={orange} />, label: 'WhatsApp', value: 'Chatea con nosotros', href: 'https://wa.me/523315179175' },
              ].map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#1d3461', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{c.label}</p>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: 'white', margin: 0 }}>{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: isMobile ? '24px 20px' : '36px', boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: navy, marginBottom: '24px', textAlign: 'center' }}>
              Solicita tu Demo Gratis
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>NOMBRE COMPLETO</label>
                <Input placeholder="Ej. Juan Pérez" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>EMAIL</label>
                  <Input type="email" placeholder="juan@empresa.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>EMPRESA</label>
                  <Input placeholder="Tu Empresa S.A." value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} required />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>COLABORADORES</label>
                <select value={formData.colaboradores} onChange={(e) => setFormData({ ...formData, colaboradores: e.target.value })} required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#1d3461', backgroundColor: 'white', outline: 'none' }}>
                  <option>1 - 20 empleados</option>
                  <option>21 - 50 empleados</option>
                  <option>51 - 100 empleados</option>
                  <option>Más de 100</option>
                </select>
              </div>
              {message && <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#991b1b', fontSize: '13px' }}>{message}</div>}
              <button type="submit" disabled={isLoading}
                style={{ backgroundColor: purple, color: 'white', padding: '14px', borderRadius: '10px', fontWeight: 800, fontSize: '15px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {isLoading ? "Enviando..." : <><span>Solicitar Demo Ahora</span><Send size={15} /></>}
              </button>
              <p style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', margin: 0 }}>
                Al solicitar la demo, aceptas nuestros Términos y Condiciones y Aviso de Privacidad.
              </p>
            </form>
          </div>
        </div>
      </section>

      <NominikChatbot />
    </div>
  )
}