'use client'

import { useState, useEffect, useRef } from 'react'
import type { Profile, Experience, Skill, Project, Certification, Travel } from '@/data/mock'

// ── Hooks ──────────────────────────────────────────────────
function useMousePos() {
  const [p, setP] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const h = (e: MouseEvent) => setP({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return p
}

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const h = () => setY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return y
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [iv, setIv] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIv(true) },
      { threshold }
    )
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [threshold])
  return [ref, iv] as const
}

// ── Types ──────────────────────────────────────────────────
interface Props {
  profile: Profile
  experience: Experience[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  travels: Travel[]
}

// ── Base glass style ───────────────────────────────────────
const GS: React.CSSProperties = {
  background: 'rgba(255,255,255,0.028)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 18,
}

// ── Glass component ────────────────────────────────────────
function Glass({
  children, style = {}, onClick, onMouseEnter, onMouseLeave,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
}) {
  return (
    <div
      style={{ ...GS, ...style }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

// ── Section label ──────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.35em',
      textTransform: 'uppercase', color: 'rgba(110,231,183,0.7)', marginBottom: 12,
    }}>
      <span style={{ width: 32, height: 1, background: 'rgba(110,231,183,0.4)', display: 'block' }} />
      {text}
      <span style={{ width: 32, height: 1, background: 'rgba(110,231,183,0.4)', display: 'block' }} />
    </div>
  )
}

// ── Scroll reveal ──────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, iv] = useInView()
  return (
    <div ref={ref} style={{
      opacity: iv ? 1 : 0,
      transform: iv ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

// ── Magnetic button ────────────────────────────────────────
function MagBtn({ children, href, primary }: { children: React.ReactNode; href: string; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    setPos({
      x: (e.clientX - r.left - r.width / 2) * 0.28,
      y: (e.clientY - r.top - r.height / 2) * 0.28,
    })
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    setPos({ x: 0, y: 0 })
    const t = e.currentTarget as HTMLElement
    if (primary) {
      t.style.background = '#10b981'
      t.style.boxShadow = '0 0 40px rgba(110,231,183,0.35)'
    } else {
      t.style.background = 'rgba(255,255,255,0.028)'
    }
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    const t = e.currentTarget as HTMLElement
    if (primary) {
      t.style.background = '#6ee7b7'
      t.style.boxShadow = '0 0 70px rgba(110,231,183,0.55)'
    } else {
      t.style.background = 'rgba(255,255,255,0.08)'
    }
  }

  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '13px 30px',
    borderRadius: 16,
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    transform: `translate(${pos.x}px,${pos.y}px)`,
    transition: 'transform 0.1s ease-out, box-shadow 0.3s, background 0.3s',
  }

  const variantStyle: React.CSSProperties = primary
    ? { background: '#10b981', color: '#000', boxShadow: '0 0 40px rgba(110,231,183,0.35)' }
    : { ...GS, color: '#fff' }

  return (
    <a
      href={href}
      ref={ref}
      style={{ ...baseStyle, ...variantStyle }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  )
}

// ── Animated background ────────────────────────────────────
function Background({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.9) 1px,transparent 1px)',
        backgroundSize: '64px 64px',
      }} />
      {/* Mouse orb */}
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        filter: 'blur(140px)', opacity: 0.06,
        background: 'radial-gradient(circle,#6ee7b7,#3b82f6)',
        left: mouse.x - 350, top: mouse.y - 350,
        transition: 'left 1.2s ease-out, top 1.2s ease-out',
      }} />
      {/* Static orbs */}
      <div style={{ position: 'absolute', top: -200, right: -200, width: 800, height: 800, borderRadius: '50%', filter: 'blur(160px)', opacity: 0.05, background: 'radial-gradient(circle,#a78bfa,#ec4899)' }} />
      <div style={{ position: 'absolute', bottom: -200, left: -100, width: 700, height: 700, borderRadius: '50%', filter: 'blur(130px)', opacity: 0.05, background: 'radial-gradient(circle,#38bdf8,#6ee7b7)' }} />
    </div>
  )
}

// ── Navbar ─────────────────────────────────────────────────
function Navbar({ scrollY }: { scrollY: number }) {
  const scrolled = scrollY > 60
  const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Contact']

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', paddingTop: 14, pointerEvents: 'none' }}>
      <div style={{
        pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28,
        padding: scrolled ? '10px 22px' : '12px 22px',
        borderRadius: 18,
        width: 'min(720px, calc(100vw - 28px))',
        background: scrolled ? 'rgba(255,255,255,0.04)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.5)' : 'none',
        transition: 'all 0.5s ease',
      }}>
        <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.04em', color: 'white' }}>
          <span style={{ color: '#6ee7b7' }}>A</span>C
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>.</span>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
          {navLinks.map(n => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#6ee7b7')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              {n}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          style={{ padding: '7px 16px', borderRadius: 12, fontSize: 12, fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', transition: 'all 0.3s' }}
          onMouseEnter={e => { const t = e.currentTarget; t.style.background = 'rgba(110,231,183,0.15)'; t.style.borderColor = 'rgba(110,231,183,0.4)' }}
          onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'rgba(255,255,255,0.06)'; t.style.borderColor = 'rgba(255,255,255,0.1)' }}
        >
          Hire Me →
        </a>
      </div>
    </nav>
  )
}

// ── Hero ───────────────────────────────────────────────────
function Hero({ profile }: { profile: Profile }) {
  const [on, setOn] = useState(false)
  const mouse = useMousePos()

  useEffect(() => { setTimeout(() => setOn(true), 200) }, [])

  const W = typeof window !== 'undefined' ? window.innerWidth : 1200
  const H = typeof window !== 'undefined' ? window.innerHeight : 800
  const px = (mouse.x / W - 0.5) * 14
  const py = (mouse.y / H - 0.5) * 14

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '0 24px' }}>
      {/* Concentric rings */}
      {[360, 560, 760, 960].map((sz, i) => (
        <div key={i} className="animate-pulse-slow" style={{
          position: 'absolute', width: sz, height: sz, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.03)', pointerEvents: 'none',
          animationDelay: `${i * 0.7}s`, animationDuration: `${5 + i * 1.3}s`,
        }} />
      ))}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900,
        transform: `translate(${px * 0.22}px,${py * 0.22}px)`,
        transition: 'transform 0.15s ease-out',
      }}>
        {/* Available badge */}
        {profile.available && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 18px', borderRadius: 999,
            border: '1px solid rgba(110,231,183,0.22)', background: 'rgba(110,231,183,0.06)',
            color: '#6ee7b7', fontSize: 13, fontWeight: 600, marginBottom: 28,
            opacity: on ? 1 : 0,
            transform: on ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <span className="animate-pulse-slow" style={{ width: 8, height: 8, borderRadius: '50%', background: '#6ee7b7' }} />
            Available for engagements
          </div>
        )}

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(52px,9.5vw,108px)', fontWeight: 900,
          letterSpacing: '-0.04em', lineHeight: 0.9, color: 'white', marginBottom: 18,
          opacity: on ? 1 : 0,
          transform: on ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          {profile.name}
        </h1>

        {/* Title gradient */}
        <div style={{
          fontSize: 'clamp(18px,2.8vw,30px)', fontWeight: 300, marginBottom: 22,
          background: 'linear-gradient(135deg,#6ee7b7,#a78bfa,#f472b6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          opacity: on ? 1 : 0,
          transform: on ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
        }}>
          {profile.title}
        </div>

        {/* Tagline */}
        <p style={{
          color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(15px,1.5vw,18px)',
          maxWidth: 540, margin: '0 auto 44px', lineHeight: 1.75,
          opacity: on ? 1 : 0,
          transform: on ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
        }}>
          {profile.tagline}
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center',
          opacity: on ? 1 : 0,
          transform: on ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
        }}>
          <MagBtn href="#projects" primary>View My Work</MagBtn>
          <MagBtn href="#contact">Let&apos;s Connect</MagBtn>
        </div>
      </div>

      {/* Floating stats */}
      <div style={{ position: 'absolute', right: 24, bottom: 80, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[['8+', 'Years'], ['50+', 'Projects'], ['12K', 'Stars']].map(([n, l]) => (
          <Glass key={l} style={{ padding: '10px 16px', textAlign: 'right' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'white' }}>{n}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.3em' }}>{l}</div>
          </Glass>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: on ? 1 : 0, transition: 'opacity 0.7s ease 0.8s',
      }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)', position: 'relative', overflow: 'hidden' }}>
          <div className="animate-scroll-dot" style={{ position: 'absolute', top: 0, width: '100%', height: 18, background: 'rgba(110,231,183,0.6)' }} />
        </div>
      </div>
    </section>
  )
}

// ── About ──────────────────────────────────────────────────
function About({ profile }: { profile: Profile }) {
  const features = [
    ['⚡', 'Performance', 'Obsessed with sub-10ms UX'],
    ['🎨', 'Design', 'Pixel-perfect, motion-first'],
    ['🔐', 'Security', 'Zero-trust architecture'],
    ['🌍', 'Scale', 'Systems built for billions'],
  ]

  return (
    <section id="about" style={{ padding: '120px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal>
        <SectionLabel text="About Me" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 52, marginTop: 16, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(34px,4.5vw,56px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 22 }}>
              <span style={{ color: 'white' }}>Engineering the </span>
              <span style={{ background: 'linear-gradient(135deg,#6ee7b7,#a78bfa,#f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                impossible.
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, lineHeight: 1.8, marginBottom: 18 }}>{profile.bio}</p>
            {profile.bioExtra && (
              <p style={{ color: 'rgba(255,255,255,0.28)', lineHeight: 1.8, fontSize: 14 }}>{profile.bioExtra}</p>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {features.map(([icon, title, sub]) => (
              <Glass
                key={title}
                style={{ padding: 20, cursor: 'default', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(110,231,183,0.2)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(110,231,183,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{title}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, lineHeight: 1.6 }}>{sub}</div>
              </Glass>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ── Experience ─────────────────────────────────────────────
function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <section id="experience" style={{ padding: '120px 24px', maxWidth: 860, margin: '0 auto' }}>
      <Reveal>
        <SectionLabel text="Experience" />
        <h2 style={{ fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 900, color: 'white', margin: '12px 0 52px', lineHeight: 1.05 }}>
          Where I&apos;ve <span style={{ color: 'rgba(255,255,255,0.2)' }}>Shipped.</span>
        </h2>
      </Reveal>

      <div style={{ position: 'relative' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: 14, top: 8, bottom: 8, width: 1, background: 'linear-gradient(to bottom,rgba(110,231,183,0.4),rgba(167,139,250,0.15),transparent)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {items.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 80}>
              <div style={{ paddingLeft: 48, position: 'relative' }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: 6, top: 20, width: 17, height: 17, borderRadius: '50%',
                  border: `2px solid ${exp.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 12px ${exp.color}50`,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: exp.color }} />
                </div>

                <Glass
                  style={{ padding: 22, transition: 'border-color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                    <div>
                      <span style={{ color: 'white', fontWeight: 900, fontSize: 18 }}>{exp.company}</span>
                      <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 8px' }}>·</span>
                      <span style={{ color: exp.color, fontWeight: 600 }}>{exp.role}</span>
                      {exp.current && (
                        <span style={{ marginLeft: 8, fontSize: 10, padding: '2px 7px', borderRadius: 6, background: 'rgba(110,231,183,0.12)', color: '#6ee7b7', fontWeight: 700 }}>NOW</span>
                      )}
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, fontFamily: 'monospace' }}>{exp.period}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.75 }}>{exp.description}</p>
                </Glass>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Skills ─────────────────────────────────────────────────
function SkillsSection({ items }: { items: Skill[] }) {
  return (
    <section id="skills" style={{ padding: '120px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal>
        <SectionLabel text="Skills" />
        <h2 style={{ fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 900, color: 'white', margin: '12px 0 52px', lineHeight: 1.05 }}>
          Tech <span style={{ color: 'rgba(255,255,255,0.2)' }}>Arsenal.</span>
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 18 }}>
        {items.map((sk, i) => (
          <Reveal key={sk.id} delay={i * 60}>
            <Glass style={{ padding: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: sk.color, marginBottom: 14 }}>
                {sk.category}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {sk.items.map(item => (
                  <span
                    key={item}
                    style={{ padding: '4px 11px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'default', transition: 'all 0.2s' }}
                    onMouseEnter={e => {
                      const t = e.currentTarget
                      t.style.color = 'white'
                      t.style.background = 'rgba(255,255,255,0.08)'
                      t.style.borderColor = 'rgba(255,255,255,0.18)'
                    }}
                    onMouseLeave={e => {
                      const t = e.currentTarget
                      t.style.color = 'rgba(255,255,255,0.5)'
                      t.style.background = 'rgba(255,255,255,0.04)'
                      t.style.borderColor = 'rgba(255,255,255,0.06)'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Glass>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── Projects ───────────────────────────────────────────────
function ProjectsSection({ items }: { items: Project[] }) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="projects" style={{ padding: '120px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal>
        <SectionLabel text="Projects" />
        <h2 style={{ fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 900, color: 'white', margin: '12px 0 52px', lineHeight: 1.05 }}>
          What I&apos;ve <span style={{ color: 'rgba(255,255,255,0.2)' }}>Built.</span>
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 18 }}>
        {items.map((p, i) => {
          const isH = hovered === p.id
          return (
            <Reveal key={p.id} delay={i * 55}>
              <div
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: 24, borderRadius: 18,
                  background: 'rgba(255,255,255,0.028)',
                  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                  borderWidth: 1, borderStyle: 'solid',
                  borderColor: isH ? `${p.color}30` : 'rgba(255,255,255,0.07)',
                  boxShadow: isH ? `0 20px 60px ${p.color}12` : 'none',
                  transform: `scale(${isH ? 1.02 : 1})`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 38, marginBottom: 14 }}>{p.emoji}</div>
                <h3 style={{ fontWeight: 900, fontSize: 19, marginBottom: 7, color: isH ? p.color : 'white', transition: 'color 0.2s' }}>
                  {p.name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{p.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: p.githubUrl || p.liveUrl ? 14 : 0 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 7, fontFamily: 'monospace', background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}>{t}</span>
                  ))}
                </div>
                {(p.githubUrl || p.liveUrl) && (
                  <div style={{ display: 'flex', gap: 12 }}>
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
                        onClick={e => e.stopPropagation()}>
                        GitHub →
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 12, color: p.color, textDecoration: 'none' }}
                        onClick={e => e.stopPropagation()}>
                        Live →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

// ── Travels ────────────────────────────────────────────────
function TravelsSection({ items }: { items: Travel[] }) {
  const [active, setActive] = useState(0)
  if (items.length === 0) return null

  return (
    <section id="travels" style={{ padding: '120px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal>
        <SectionLabel text="Audit Travel" />
        <h2 style={{ fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 900, color: 'white', margin: '12px 0 52px', lineHeight: 1.05 }}>
          Where I&apos;ve <span style={{ color: 'rgba(255,255,255,0.2)' }}>Traveled.</span>
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 22, alignItems: 'start' }}>
        {/* Map */}
        <Glass style={{ height: 300, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 60%, rgba(110,231,183,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(167,139,250,0.06) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.07)', fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase' }}>World Map</span>
          </div>
          {items.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              style={{
                position: 'absolute',
                left: `${t.mapX}%`, top: `${t.mapY}%`,
                width: 15, height: 15, borderRadius: '50%',
                borderWidth: 2, borderStyle: 'solid',
                borderColor: active === i ? '#6ee7b7' : 'rgba(255,255,255,0.3)',
                background: active === i ? 'rgba(110,231,183,0.4)' : 'rgba(255,255,255,0.1)',
                transform: `translate(-50%,-50%) scale(${active === i ? 1.6 : 1})`,
                boxShadow: active === i ? '0 0 14px #6ee7b7' : 'none',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
            />
          ))}
        </Glass>

        {/* Location list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {items.map((t, i) => (
            <Glass
              key={t.id}
              onClick={() => setActive(i)}
              style={{
                padding: 14, cursor: 'pointer',
                borderColor: active === i ? 'rgba(110,231,183,0.25)' : 'rgba(255,255,255,0.07)',
                background: active === i ? 'rgba(110,231,183,0.04)' : 'rgba(255,255,255,0.028)',
                transition: 'all 0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                <span style={{ fontSize: 22 }}>{t.emoji}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: active === i ? '#6ee7b7' : 'white' }}>{t.city}</span>
                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>{t.country}</span>
                  </div>
                  {active === i && (
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 3, lineHeight: 1.6 }}>{t.description}</p>
                  )}
                </div>
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Certifications ─────────────────────────────────────────
function CertificationsSection({ items }: { items: Certification[] }) {
  if (items.length === 0) return null

  return (
    <section id="certifications" style={{ padding: '80px 24px 120px', maxWidth: 1100, margin: '0 auto' }}>
      <Reveal>
        <SectionLabel text="Certifications" />
        <h2 style={{ fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 900, color: 'white', margin: '12px 0 52px', lineHeight: 1.05 }}>
          Verified <span style={{ color: 'rgba(255,255,255,0.2)' }}>Expertise.</span>
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 14 }}>
        {items.map((c, i) => (
          <Reveal key={c.id} delay={i * 60}>
            <Glass
              style={{ padding: 22, transition: 'transform 0.3s, border-color 0.3s' }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 11, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900, background: `${c.color}15`, border: `1px solid ${c.color}25`, color: c.color }}>
                {c.imageUrl
                  ? <img src={c.imageUrl} alt={c.name} style={{ width: 28, height: 28, objectFit: 'contain', borderRadius: 6 }} />
                  : '✓'
                }
              </div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 13, marginBottom: 3, lineHeight: 1.4 }}>{c.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginBottom: 6 }}>{c.issuer}</div>
              <div style={{ color: c.color, fontSize: 12, fontFamily: 'monospace' }}>{c.year}</div>
            </Glass>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── Contact ────────────────────────────────────────────────
function ContactSection({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.035)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 13, padding: '11px 15px',
    color: 'white', fontSize: 14, outline: 'none',
    transition: 'all 0.2s', boxSizing: 'border-box', fontFamily: 'inherit',
  }

  const socials: [string, string, string][] = [
    ['Email', profile.email, 'white'],
    ['GitHub', profile.github, '#6ee7b7'],
    ['LinkedIn', profile.linkedin, '#a78bfa'],
  ]

  return (
    <section id="contact" style={{ padding: '120px 24px', maxWidth: 900, margin: '0 auto' }}>
      <Reveal>
        <SectionLabel text="Contact" />
        <h2 style={{ fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 14 }}>
          <span style={{ color: 'white' }}>Let&apos;s build </span>
          <span style={{ background: 'linear-gradient(135deg,#6ee7b7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            something legendary.
          </span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 16, marginBottom: 44 }}>
          Currently open to select senior &amp; staff engagements.
        </p>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22 }}>
        {/* Form */}
        <Glass style={{ padding: 30 }}>
          <form onSubmit={handleSubmit}>
            {(['name', 'email'] as const).map(field => (
              <div key={field} style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 700, marginBottom: 7 }}>
                  {field}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  value={form[field]}
                  placeholder={field === 'email' ? 'your@email.com' : 'Your name'}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(110,231,183,0.35)'; e.target.style.background = 'rgba(255,255,255,0.055)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; e.target.style.background = 'rgba(255,255,255,0.035)' }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 22 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 700, marginBottom: 7 }}>
                Message
              </label>
              <textarea
                value={form.message}
                rows={5}
                placeholder="Tell me about your project..."
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => { e.target.style.borderColor = 'rgba(110,231,183,0.35)'; e.target.style.background = 'rgba(255,255,255,0.055)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; e.target.style.background = 'rgba(255,255,255,0.035)' }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%', padding: 13, borderRadius: 13,
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.3s',
                ...(sent
                  ? { background: 'rgba(110,231,183,0.12)', color: '#6ee7b7', border: '1px solid rgba(110,231,183,0.3)' }
                  : { background: '#10b981', color: '#000', border: 'none', boxShadow: '0 0 35px rgba(110,231,183,0.28)' }
                ),
              }}
            >
              {sent ? '✓ Message Sent!' : 'Send Message →'}
            </button>
          </form>
        </Glass>

        {/* Social links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {socials.filter(([, v]) => v).map(([label, value, color]) => (
            <Glass
              key={label}
              style={{ padding: 18, transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
            >
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.35em', marginBottom: 5 }}>{label}</div>
              <div style={{ color, fontFamily: 'monospace', fontSize: 13 }}>{value}</div>
            </Glass>
          ))}

          <Glass style={{ padding: 18, background: 'linear-gradient(135deg,rgba(110,231,183,0.04),rgba(167,139,250,0.04))', borderColor: 'rgba(110,231,183,0.12)' }}>
            <div style={{ color: '#6ee7b7', fontWeight: 700, fontSize: 13, marginBottom: 5 }}>Open to Work</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, lineHeight: 1.6 }}>
              Senior/staff roles, consulting &amp; fractional CTO engagements.
            </div>
          </Glass>
        </div>
      </div>
    </section>
  )
}

// ── Main export ────────────────────────────────────────────
export default function PortfolioClient({ profile, experience, skills, projects, certifications, travels }: Props) {
  const scrollY = useScrollY()
  const mouse = useMousePos()
  const [loading, setLoading] = useState(true)

  useEffect(() => { setTimeout(() => setLoading(false), 1600) }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#07080a', color: 'white', overflowX: 'hidden', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      {/* Loading screen */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200, background: '#07080a',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: loading ? 1 : 0, pointerEvents: loading ? 'auto' : 'none',
        transition: 'opacity 0.7s ease',
      }}>
        <div style={{ position: 'relative', width: 54, height: 54, marginBottom: 22 }}>
          <div className="animate-ping-ring" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(110,231,183,0.2)' }} />
          <div className="animate-spin-ring" style={{ position: 'absolute', inset: 5, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#6ee7b7', borderRightColor: 'rgba(110,231,183,0.3)' }} />
          <div className="animate-pulse-slow" style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '1px solid rgba(167,139,250,0.2)' }} />
        </div>
        <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase' }}>Loading</div>
      </div>

      {/* Main content */}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.7s ease' }}>
        <Background mouse={mouse} />
        <Navbar scrollY={scrollY} />
        <Hero profile={profile} />
        <About profile={profile} />
        <ExperienceSection items={experience} />
        <SkillsSection items={skills} />
        <ProjectsSection items={projects} />
        <TravelsSection items={travels} />
        <CertificationsSection items={certifications} />
        <ContactSection profile={profile} />
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '36px 24px', textAlign: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: 13 }}>
            © {new Date().getFullYear()} {profile.name} ·{' '}
            <span style={{ color: 'rgba(110,231,183,0.4)' }}>Every pixel intentional.</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
