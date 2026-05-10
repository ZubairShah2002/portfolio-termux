'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminAuth, getExperience, saveExperience, newId } from '@/lib/store'
import type { Experience } from '@/data/mock'
import { PageHeader, Btn, Input, Textarea, ColorPicker, Toggle, Modal, Toast, Row, Empty } from '@/components/admin/AdminUI'

const BLANK: Omit<Experience,'id'> = { company:'', role:'', period:'', description:'', color:'#6ee7b7', current:false, order:0 }

export default function ExperiencePage() {
  const router = useRouter()
  const [items, setItems] = useState<Experience[]>([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Experience|null>(null)
  const [form, setForm] = useState(BLANK)
  const [toast, setToast] = useState<{msg:string;type:'success'|'error'}|null>(null)

  useEffect(() => { if (!getAdminAuth()) { router.push('/admin/login'); return }; setItems(getExperience()) }, [router])

  const openNew = () => { setEditing(null); setForm({ ...BLANK, order: items.length }); setModal(true) }
  const openEdit = (e: Experience) => { setEditing(e); setForm({ company:e.company, role:e.role, period:e.period, description:e.description, color:e.color, current:e.current, order:e.order }); setModal(true) }
  const close = () => { setModal(false); setEditing(null) }
  const set = (k: keyof typeof BLANK) => (v: any) => setForm(f => ({ ...f, [k]: v }))

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    let updated: Experience[]
    if (editing) updated = items.map(i => i.id === editing.id ? { ...editing, ...form } : i)
    else updated = [...items, { id: newId(), ...form }]
    saveExperience(updated); setItems(updated); close()
    setToast({ msg: editing ? 'Updated!' : 'Created!', type: 'success' })
  }

  const del = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    const updated = items.filter(i => i.id !== id)
    saveExperience(updated); setItems(updated)
    setToast({ msg: 'Deleted', type: 'success' })
  }

  return (
    <div>
      <PageHeader title="Experience" subtitle={`${items.length} roles`} action={<Btn onClick={openNew}>+ Add Role</Btn>} />
      {items.length === 0 ? <Empty label="Experience" onAdd={openNew} /> : items.map(e => (
        <Row key={e.id} onClick={() => openEdit(e)}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${e.color}`, background: `${e.color}30`, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ color: 'white', fontWeight: 700 }}>{e.company}</span>
              <span style={{ color: e.color, fontSize: 13 }}>{e.role}</span>
              {e.current && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 5, background: 'rgba(110,231,183,0.12)', color: '#6ee7b7', fontWeight: 700 }}>NOW</span>}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 1 }}>{e.period}</div>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            <Btn onClick={ev => { ev?.stopPropagation(); openEdit(e) }} variant="secondary" size="sm">Edit</Btn>
            <Btn onClick={ev => { ev?.stopPropagation(); del(e.id, e.company) }} variant="danger" size="sm">Delete</Btn>
          </div>
        </Row>
      ))}
      <Modal open={modal} onClose={close} title={editing ? 'Edit Experience' : 'New Experience'}>
        <form onSubmit={save}>
          <Input label="Company" value={form.company} onChange={set('company')} required placeholder="Vercel" />
          <Input label="Role" value={form.role} onChange={set('role')} required placeholder="Staff Engineer" />
          <Input label="Period" value={form.period} onChange={set('period')} required placeholder="2022 – Present" />
          <Textarea label="Description" value={form.description} onChange={set('description')} required rows={4} placeholder="Key achievements..." />
          <ColorPicker label="Accent Color" value={form.color} onChange={set('color')} />
          <Toggle label="Current role" value={form.current} onChange={set('current')} />
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
