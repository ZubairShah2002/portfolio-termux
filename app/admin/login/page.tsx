'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@/data/mock'
import { setAdminAuth } from '@/lib/store'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 600))
    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      setAdminAuth(true)
      router.push('/admin/dashboard')
    } else {
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07080a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,#a78bfa,#6366f1)', filter: 'blur(140px)', opacity: 0.06 }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,#6ee7b7,#3b82f6)', filter: 'blur(120px)', opacity: 0.06 }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(rgba(255,255,255,0.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.9) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 15, background: 'rgba(110,231,183,0.1)', border: '1px solid rgba(110,231,183,0.2)', marginBottom: 18, fontSize: 22 }}>⚡</div>
          <h1 style={{ color: 'white', fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 5 }}>Admin Panel</h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Sign in to manage your portfolio</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 32, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
          <form onSubmit={submit}>
            {[['email','email','admin@portfolio.dev'],['password','password','••••••••']].map(([k,t,pl]) => (
              <div key={k} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 700, marginBottom: 7 }}>{k}</label>
                <input type={t} value={form[k as 'email'|'password']} placeholder={pl} onChange={e => setForm(f => ({...f,[k]:e.target.value}))} required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 14px', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit' }}
                  onFocus={e => { e.target.style.borderColor='rgba(110,231,183,0.4)'; e.target.style.background='rgba(255,255,255,0.06)' }}
                  onBlur={e => { e.target.style.borderColor='rgba(255,255,255,0.08)'; e.target.style.background='rgba(255,255,255,0.04)' }} />
              </div>
            ))}

            {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 9, padding: '9px 13px', marginBottom: 16, color: '#f87171', fontSize: 13 }}>{error}</div>}

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: 13, borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: loading?'not-allowed':'pointer', border: 'none', fontFamily: 'inherit', background: '#10b981', color: '#000', boxShadow: '0 0 30px rgba(110,231,183,0.25)', transition: 'all 0.3s', opacity: loading?0.7:1 }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div style={{ marginTop: 20, padding: '11px 13px', background: 'rgba(110,231,183,0.05)', border: '1px solid rgba(110,231,183,0.1)', borderRadius: 9 }}>
            <div style={{ color: 'rgba(110,231,183,0.7)', fontSize: 10, fontWeight: 700, marginBottom: 3 }}>Default Credentials</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: 'monospace' }}>admin@portfolio.dev / admin123</div>
            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 3 }}>Edit credentials in data/mock.ts</div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 12 }}>
          <a href="/" style={{ color: 'rgba(110,231,183,0.5)', textDecoration: 'none' }}>← Back to Portfolio</a>
        </p>
      </div>
    </div>
  )
}
