'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAdminAuth, getProjects, getExperience, getSkills, getCertifications, getTravels, getProfile } from '@/lib/store'
import { StatCard, AdminCard } from '@/components/admin/AdminUI'

const LINKS = [
  { href: '/admin/profile', label: 'Edit Profile', icon: '◉', desc: 'Name, title, bio, contact' },
  { href: '/admin/projects', label: 'Projects', icon: '◇', desc: 'Showcase your work' },
  { href: '/admin/experience', label: 'Experience', icon: '◎', desc: 'Career timeline' },
  { href: '/admin/skills', label: 'Skills', icon: '◆', desc: 'Tech & QC skill categories' },
  { href: '/admin/certifications', label: 'Certifications', icon: '◑', desc: 'Credentials & badges' },
  { href: '/admin/travels', label: 'Travels', icon: '◐', desc: 'Locations & audit trips' },
]

export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({ projects: 0, experience: 0, skills: 0, certs: 0, travels: 0 })
  const [profileName, setProfileName] = useState('')
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    if (!getAdminAuth()) { router.push('/admin/login'); return }
    setStats({
      projects: getProjects().length,
      experience: getExperience().length,
      skills: getSkills().length,
      certs: getCertifications().length,
      travels: getTravels().length,
    })
    const p = getProfile()
    setProfileName(p.name)
    setAvailable(p.available)
  }, [router])

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: available ? '#6ee7b7' : '#f87171', boxShadow: available ? '0 0 8px #6ee7b7' : 'none' }} />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
            Portfolio is {available ? 'open to opportunities' : 'not currently available'}
          </span>
        </div>
        <h1 style={{ color: 'white', fontSize: 30, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 4 }}>
          Welcome back, <span style={{ color: '#6ee7b7' }}>{profileName.split(' ')[0]}</span> 👋
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>
          Managing portfolio for{' '}
          <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{profileName}</strong>
          {' '}— QC Mattress @ BerexTech MY
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 13, marginBottom: 32 }}>
        <StatCard label="Projects"    value={stats.projects}   color="#6ee7b7" icon="◇" />
        <StatCard label="Experience"  value={stats.experience} color="#a78bfa" icon="◎" />
        <StatCard label="Skills"      value={stats.skills}     color="#f472b6" icon="◆" />
        <StatCard label="Certs"       value={stats.certs}      color="#fb923c" icon="◑" />
        <StatCard label="Travels"     value={stats.travels}    color="#38bdf8" icon="◐" />
      </div>

      {/* Quick links */}
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 12 }}>
        Quick Access
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 11, marginBottom: 28 }}>
        {LINKS.map(({ href, label, icon, desc }) => (
          <Link
            key={href}
            href={href}
            style={{ display: 'block', padding: '16px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.028)', border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none', transition: 'all 0.25s' }}
            onMouseEnter={e => {
              const t = e.currentTarget as HTMLElement
              t.style.background = 'rgba(255,255,255,0.05)'
              t.style.borderColor = 'rgba(110,231,183,0.2)'
              t.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              const t = e.currentTarget as HTMLElement
              t.style.background = 'rgba(255,255,255,0.028)'
              t.style.borderColor = 'rgba(255,255,255,0.07)'
              t.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 8, color: 'rgba(255,255,255,0.5)' }}>{icon}</div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{label}</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>{desc}</div>
          </Link>
        ))}
      </div>

      {/* Info banner */}
      <AdminCard style={{ background: 'linear-gradient(135deg,rgba(110,231,183,0.04),rgba(167,139,250,0.04))', borderColor: 'rgba(110,231,183,0.12)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
          <div>
            <div style={{ color: '#6ee7b7', fontWeight: 700, fontSize: 13, marginBottom: 5 }}>📱 Termux / Local Mode</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.7 }}>
              Admin edits are saved to browser localStorage. To permanently update what visitors see, edit <code style={{ color: 'rgba(110,231,183,0.6)' }}>data/mock.ts</code> and push to GitHub.
            </div>
          </div>
          <div>
            <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: 13, marginBottom: 5 }}>☁️ Live on Vercel</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.7 }}>
              Your portfolio auto-deploys on every GitHub push. Visit{' '}
              <a href="https://portfolio-termux.vercel.app" target="_blank" rel="noopener noreferrer"
                style={{ color: '#a78bfa' }}>
                portfolio-termux.vercel.app
              </a>
            </div>
          </div>
        </div>
      </AdminCard>
    </div>
  )
}
