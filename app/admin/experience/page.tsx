'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminAuth, getExperience, saveExperience, newId } from '@/lib/store'
import type { Experience } from '@/data/mock'
import { PageHeader, Btn, Input, Textarea, ColorPicker, Toggle, Modal, Toast, Row, Empty } from '@/components/admin/AdminUI'

const BLANK: Omit<Experience, 'id'> = {
  company: '', role: '', period: '', description: '', color: '#6ee7b7', current: false, order: 0,
}

export default function ExperiencePage() {
  const router = useRouter()
  const [items, setItems] = useState<Experience[]>([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Experience | null>(null)
  const [form, setForm] = useState<Omit<Experience, 'id'>>(BLANK)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (!getAdminAuth()) { router.push('/admin/login'); return }
    setItems(getExperience())
  }, [router])

  const openNew = () => { setEditing(null); setForm({ ...BLANK, order: items.length }); setModal(true) }
  const openEdit = (e: Experience) => {
    setEditing(e)
    setForm({ company: e.company, role: e.role, period: e.period, description: e.description, color: e.color, current: e.current, order: e.order })
    setModal(true)
  }
  const close = () => { setModal(false); setEditing(null) }

  const set = <K extends keyof typeof BLANK>(k: K) => (v: (typeof BLANK)[K]) =>
    setForm(f => ({ ...f, [k]: v }))

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    const updated = editing
      ? items.map(i => (i.id === editing.id ? { ...editing, ...form } : i))
      : [...items, { id: newId(), ...form }]
    saveExperience(updated); setItems(updated); close()
    setToast({ msg: editing ? 'Experience updated!' : 'Experience created!', type: 'success' })
  }

  const del = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    const updated = items.filter(i => i.id !== id)
    saveExperience(updated); setItems(updated)
    setToast({ msg: 'Deleted', type: 'success' })
  }

  return (
    <div>
      <PageHeader
        title="Experience"
        subtitle={`${items.length} role${items.length !== 1 ? 's' : ''} on your timeline`}
        action={<Btn onClick={openNew}>+ Add Role</Btn>}
      />

      {items.length === 0 ? (
        <Empty label="Experience" onAdd={openNew} />
      ) : (
        items.map(exp => (
          <Row key={exp.id} onClick={() => openEdit(exp)}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${exp.color}`, background: `${exp.color}30`, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ color: 'white', fontWeight: 700 }}>{exp.company}</span>
                <span style={{ color: exp.color, fontSize: 13 }}>{exp.role}</span>
                {exp.current && (
                  <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 5, background: 'rgba(110,231,183,0.12)', color: '#6ee7b7', fontWeight: 700 }}>NOW</span>
                )}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 2 }}>{exp.period}</div>
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              <Btn onClick={e => { e?.stopPropagation(); openEdit(exp) }} variant="secondary" size="sm">Edit</Btn>
              <Btn onClick={e => { e?.stopPropagation(); del(exp.id, exp.company) }} variant="danger" size="sm">Delete</Btn>
            </div>
          </Row>
        ))
      )}

      <Modal open={modal} onClose={close} title={editing ? 'Edit Experience' : 'New Experience'}>
        <form onSubmit={save}>
          <Input label="Company" value={form.company} onChange={set('company')} required placeholder="BerexTech MY" />
          <Input label="Role / Title" value={form.role} onChange={set('role')} required placeholder="QC Mattress" />
          <Input label="Period" value={form.period} onChange={set('period')} required placeholder="2023 – Present" />
          <Textarea label="Description" value={form.description} onChange={set('description')} required rows={4} placeholder="Key responsibilities and achievements..." />
          <ColorPicker label="Accent Color" value={form.color} onChange={set('color')} />
          <Toggle label="Current role" value={form.current} onChange={v => setForm(f => ({ ...f, current: v }))} />
          <div style={{ display: 'flex', gap: 9, justifyContent: 'flex-end' }}>
            <Btn onClick={close} variant="ghost">Cancel</Btn>
            <Btn type="submit">{editing ? 'Update' : 'Create'}</Btn>
          </div>
        </form>
      </Modal>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
