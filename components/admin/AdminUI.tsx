'use client'
import { useState, useRef } from 'react'

export function AdminCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: 24, ...style }}>
      {children}
    </div>
  )
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
      <div>
        <h1 style={{ color: 'white', fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 3 }}>{title}</h1>
        {subtitle && <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Btn({ children, onClick, variant = 'primary', size = 'md', disabled = false, type = 'button' }: {
  children: React.ReactNode; onClick?: (e?: React.MouseEvent) => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'; disabled?: boolean; type?: 'button' | 'submit'
}) {
  const vs: Record<string, React.CSSProperties> = {
    primary: { background: '#10b981', color: '#000' },
    secondary: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' },
    danger: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' },
    ghost: { background: 'transparent', color: 'rgba(255,255,255,0.5)' },
  }
  const ss: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 13px', fontSize: 12, borderRadius: 9 },
    md: { padding: '10px 18px', fontSize: 14, borderRadius: 12 },
    lg: { padding: '12px 26px', fontSize: 15, borderRadius: 13 },
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ ...vs[variant], ...ss[size], fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer', border: (vs[variant] as any).border || 'none', fontFamily: 'inherit', transition: 'all 0.2s', opacity: disabled ? 0.5 : 1, display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
      {children}
    </button>
  )
}

export function Input({ label, value, onChange, type = 'text', placeholder = '', required = false, hint }: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; required?: boolean; hint?: string
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 700, marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#f87171', marginLeft: 3 }}>*</span>}
      </label>
      <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} required={required}
        style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, padding: '10px 13px', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit', transition: 'all 0.2s' }}
        onFocus={e => { e.target.style.borderColor = 'rgba(110,231,183,0.4)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)' }} />
      {hint && <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 3 }}>{hint}</div>}
    </div>
  )
}

export function Textarea({ label, value, onChange, placeholder = '', rows = 3, required = false }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; rows?: number; required?: boolean
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 700, marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#f87171', marginLeft: 3 }}>*</span>}
      </label>
      <textarea value={value} placeholder={placeholder} rows={rows} onChange={e => onChange(e.target.value)} required={required}
        style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, padding: '10px 13px', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, fontFamily: 'inherit', resize: 'vertical', transition: 'all 0.2s' }}
        onFocus={e => { e.target.style.borderColor = 'rgba(110,231,183,0.4)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)' }} />
    </div>
  )
}

export function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const PRESETS = ['#6ee7b7','#a78bfa','#f472b6','#fb923c','#38bdf8','#34d399','#fbbf24','#f87171','#818cf8','#e879f9']
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 700, marginBottom: 9 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {PRESETS.map(c => (
          <button key={c} onClick={() => onChange(c)} type="button"
            style={{ width: 26, height: 26, borderRadius: 7, background: c, border: value === c ? '2px solid white' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s', transform: value === c ? 'scale(1.2)' : 'scale(1)' }} />
        ))}
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          style={{ width: 34, height: 34, borderRadius: 7, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', background: 'transparent', padding: 2 }} />
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: 'monospace' }}>{value}</span>
      </div>
    </div>
  )
}

export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 500 }}>{label}</span>
      <button type="button" onClick={() => onChange(!value)}
        style={{ width: 44, height: 24, borderRadius: 12, background: value ? '#10b981' : 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
      </button>
    </div>
  )
}

export function TagInput({ label, value, onChange, placeholder = 'Add item, press Enter' }: {
  label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string
}) {
  const [input, setInput] = useState('')
  const add = () => { const t = input.trim(); if (t && !value.includes(t)) { onChange([...value, t]); setInput('') } }
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 700, marginBottom: 6 }}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 7 }}>
        {value.map(tag => (
          <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 8, background: 'rgba(110,231,183,0.1)', border: '1px solid rgba(110,231,183,0.2)', color: '#6ee7b7', fontSize: 12 }}>
            {tag}
            <button type="button" onClick={() => onChange(value.filter(t => t !== tag))} style={{ background: 'none', border: 'none', color: 'rgba(110,231,183,0.6)', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 7 }}>
        <input value={input} placeholder={placeholder} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9, padding: '8px 12px', color: 'white', fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
          onFocus={e => e.target.style.borderColor = 'rgba(110,231,183,0.35)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        <Btn onClick={add} variant="secondary" size="sm">Add</Btn>
      </div>
    </div>
  )
}

export function Toast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error'; onClose: () => void }) {
  return (
    <div className="animate-slide-up" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999, padding: '12px 18px', borderRadius: 13, fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 9, ...(type === 'success' ? { background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#6ee7b7' } : { background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }) }}>
      <span>{type === 'success' ? '✓' : '✕'}</span>
      {message}
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', marginLeft: 4, opacity: 0.6, fontSize: 16 }}>×</button>
    </div>
  )
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }} />
      <div style={{ position: 'relative', zIndex: 1, background: '#0e1013', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <h2 style={{ color: 'white', fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function StatCard({ label, value, color = '#6ee7b7', icon }: { label: string; value: number | string; color?: string; icon: string }) {
  return (
    <AdminCard>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.2em', fontWeight: 700, marginBottom: 7 }}>{label}</div>
          <div style={{ color: 'white', fontSize: 30, fontWeight: 900, letterSpacing: '-0.03em' }}>{value}</div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, background: `${color}12`, border: `1px solid ${color}22` }}>{icon}</div>
      </div>
    </AdminCard>
  )
}

export function Row({ children, onClick }: { children: React.ReactNode; onClick?: (e?: React.MouseEvent) => void }) {
  return (
    <div onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 11, border: '1px solid rgba(255,255,255,0.05)', marginBottom: 7, cursor: onClick ? 'pointer' : 'default', transition: 'all 0.2s' }}
      onMouseEnter={e => { if (onClick) { const t = e.currentTarget as HTMLElement; t.style.background = 'rgba(255,255,255,0.03)'; t.style.borderColor = 'rgba(255,255,255,0.1)' } }}
      onMouseLeave={e => { const t = e.currentTarget as HTMLElement; t.style.background = 'transparent'; t.style.borderColor = 'rgba(255,255,255,0.05)' }}>
      {children}
    </div>
  )
}

export function Empty({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '56px 24px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16 }}>
      <div style={{ fontSize: 38, marginBottom: 14, opacity: 0.4 }}>◇</div>
      <div style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: 6 }}>No {label} yet</div>
      <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, marginBottom: 18 }}>Click below to add your first entry</div>
      <Btn onClick={onAdd}>+ Add {label}</Btn>
    </div>
  )
}
