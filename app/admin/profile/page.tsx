'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminAuth, getProfile, saveProfile } from '@/lib/store'
import type { Profile } from '@/data/mock'
import { PageHeader, Input, Textarea, Toggle, Btn, Toast } from '@/components/admin/AdminUI'

const EMPTY: Profile = {
  id: '1', name: '', title: '', tagline: '', bio: '', bioExtra: '',
  email: '', github: '', linkedin: '', twitter: '', website: '', avatar: '', available: true,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.028)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 16 }}>
      <h3 style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' as const, marginBottom: 18 }}>{title}</h3>
      {children}
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const [form, setForm] = useState<Profile>(EMPTY)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (!getAdminAuth()) { router.push('/admin/login'); return }
    setForm({ ...EMPTY, ...getProfile() })
  }, [router])

  const set = (k: keyof Profile) => (v: string | boolean) =>
    setForm(f => ({ ...f, [k]: v }))

  const save = () => {
    saveProfile(form)
    setToast({ msg: 'Profile saved! Push to GitHub for live update.', type: 'success' })
  }

  return (
    <div style={{ maxWidth: 680 }}>
      <PageHeader
        title="Profile"
        subtitle="Your personal info shown on the public portfolio"
        action={<Btn onClick={save}>✓ Save Changes</Btn>}
      />

      <Section title="Identity">
        <Input label="Full Name" value={form.name} onChange={set('name')} required placeholder="Zubair Shah" />
        <Input label="Job Title / Role" value={form.title} onChange={set('title')} required placeholder="QC Mattress ( BerexTech MY )" />
        <Input label="Tagline" value={form.tagline} onChange={set('tagline')} placeholder="Short tagline shown below your title" />
        <Toggle label="Available for opportunities" value={form.available} onChange={set('available')} />
      </Section>

      <Section title="Bio">
        <Textarea label="Primary Bio" value={form.bio} onChange={set('bio')} rows={4} required placeholder="Your main biography shown in the About section..." />
        <Textarea label="Secondary Bio" value={form.bioExtra} onChange={set('bioExtra')} rows={3} placeholder="Additional paragraph (interests, hobbies, values...)" />
      </Section>

      <Section title="Contact &amp; Social">
        <Input label="Email" value={form.email} onChange={set('email')} type="email" required placeholder="you@email.com" />
        <Input label="GitHub" value={form.github} onChange={set('github')} placeholder="github.com/ZubairShah2002" />
        <Input label="LinkedIn" value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/zubairshah" />
        <Input label="Twitter / X" value={form.twitter} onChange={set('twitter')} placeholder="twitter.com/username" />
        <Input label="Website" value={form.website} onChange={set('website')} placeholder="https://yoursite.com" />
      </Section>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, flexWrap: 'wrap', gap: 12 }}>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
          ⚠ For permanent live updates, edit{' '}
          <code style={{ color: 'rgba(110,231,183,0.5)' }}>data/mock.ts</code> and push to GitHub.
        </p>
        <Btn onClick={save} size="lg">✓ Save All Changes</Btn>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
