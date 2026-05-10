'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { clearAdminAuth } from '@/lib/store'

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '◈' },
  { href: '/admin/profile', label: 'Profile', icon: '◉' },
  { href: '/admin/experience', label: 'Experience', icon: '◎' },
  { href: '/admin/projects', label: 'Projects', icon: '◇' },
  { href: '/admin/skills', label: 'Skills', icon: '◆' },
  { href: '/admin/certifications', label: 'Certifications', icon: '◑' },
  { href: '/admin/travels', label: 'Travels', icon: '◐' },
]

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === '/admin/login'

  const logout = () => {
    clearAdminAuth()
    router.push('/admin/login')
  }

  if (isLogin) return <>{children}</>

  return (
    <div style={{ minHeight: '100vh', background: '#07080a', fontFamily: "'Space Grotesk', system-ui, sans-serif", display: 'flex' }}>
      {/* Grid bg */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.015, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      <div style={{ position: 'fixed', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,#a78bfa,#6366f1)', filter: 'blur(150px)', opacity: 0.04, pointerEvents: 'none' }} />

      {/* Sidebar */}
      <aside style={{ width: 230, flexShrink: 0, background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '24px 14px', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        {/* Logo — ZS initials */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(110,231,183,0.1)', border: '1px solid rgba(110,231,183,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>⚡</div>
          <div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: 14, letterSpacing: '-0.02em' }}>
              <span style={{ color: '#6ee7b7' }}>Z</span>S Portfolio
            </div>
            <div style={{ color: 'rgba(110,231,183,0.6)', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em' }}>CMS ADMIN</div>
          </div>
        </div>

        {/* Nav */}
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderRadius: 10, textDecoration: 'none', fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#6ee7b7' : 'rgba(255,255,255,0.45)', background: active ? 'rgba(110,231,183,0.08)' : 'transparent', border: active ? '1px solid rgba(110,231,183,0.15)' : '1px solid transparent', marginBottom: 2, transition: 'all 0.2s' }}>
              <span style={{ fontSize: 15, opacity: active ? 1 : 0.6 }}>{icon}</span>
              {label}
            </Link>
          )
        })}

        {/* Bottom */}
        <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a href="/" target="_blank" rel="noopener"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 11px', borderRadius: 9, textDecoration: 'none', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 2, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
            ↗ View Portfolio
          </a>
          <button onClick={logout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 11px', borderRadius: 9, fontSize: 12, color: 'rgba(239,68,68,0.55)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.9)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(239,68,68,0.55)')}>
            ⏻ Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 230, flex: 1, padding: 30, position: 'relative', zIndex: 1 }}>
        {children}
      </main>
    </div>
  )
}
