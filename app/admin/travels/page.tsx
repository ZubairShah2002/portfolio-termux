'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminAuth, getTravels, saveTravels, newId } from '@/lib/store'
import type { Travel } from '@/data/mock'
import { PageHeader, Btn, Input, Textarea, Modal, Toast, Row, Empty } from '@/components/admin/AdminUI'

const BLANK: Omit<Travel,'id'> = { city:'', country:'', description:'', emoji:'📍', mapX:50, mapY:50, imageUrl:'', order:0 }

export default function TravelsPage() {
  const router = useRouter()
  const [items, setItems] = useState<Travel[]>([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Travel|null>(null)
  const [form, setForm] = useState(BLANK)
  const [toast, setToast] = useState<{msg:string;type:'success'|'error'}|null>(null)

  useEffect(() => { if (!getAdminAuth()) { router.push('/admin/login'); return }; setItems(getTravels()) }, [router])

  const openNew = () => { setEditing(null); setForm({ ...BLANK, order: items.length }); setModal(true) }
  const openEdit = (t: Travel) => { setEditing(t); setForm({ city:t.city, country:t.country, description:t.description, emoji:t.emoji, mapX:t.mapX, mapY:t.mapY, imageUrl:t.imageUrl, order:t.order }); setModal(true) }
  const close = () => { setModal(false); setEditing(null) }
  const set = (k: keyof typeof BLANK) => (v: string | number) => setForm(f => ({ ...f, [k]: v }))

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    let updated: Travel[]
    if (editing) updated = items.map(i => i.id === editing.id ? { ...editing, ...form } : i)
    else updated = [...items, { id: newId(), ...form }]
    saveTravels(updated); setItems(updated); close()
    setToast({ msg: editing ? 'Updated!' : 'Created!', type: 'success' })
  }

  const del = (id: string, city: string) => {
    if (!confirm(`Delete "${city}"?`)) return
    const updated = items.filter(i => i.id !== id)
    saveTravels(updated); setItems(updated)
    setToast({ msg: 'Deleted', type: 'success' })
  }

  return (
    <div>
      <PageHeader title="Audit Travels" subtitle={`${items.length} locations`} action={<Btn onClick={openNew}>+ Add Location</Btn>} />
      {items.length === 0 ? <Empty label="Travel Location" onAdd={openNew} /> : items.map(t => (
        <Row key={t.id} onClick={() => openEdit(t)}>
          <span style={{ fontSize: 24 }}>{t.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontWeight: 700 }}>{t.city}, {t.country}</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 2 }}>{t.description}</div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, fontFamily: 'monospace', marginRight: 8 }}>({t.mapX}%, {t.mapY}%)</div>
          <div style={{ display: 'flex', gap: 7 }}>
            <Btn onClick={ev => { ev?.stopPropagation(); openEdit(t) }} variant="secondary" size="sm">Edit</Btn>
            <Btn onClick={ev => { ev?.stopPropagation(); del(t.id, t.city) }} variant="danger" size="sm">Delete</Btn>
          </div>
        </Row>
      ))}
      <Modal open={modal} onClose={close} title={editing ? 'Edit Location' : 'New Location'}>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: 10, alignItems: 'end' }}>
            <Input label="City" value={form.city} onChange={set('city')} required placeholder="Tokyo" />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 700, marginBottom: 6 }}>Emoji</label>
              <input value={form.emoji} onChange={e => set('emoji')(e.target.value)} style={{ width: '100%', height: 42, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, color: 'white', fontSize: 22, outline: 'none', textAlign: 'center', boxSizing: 'border-box' as const }} />
            </div>
          </div>
          <Input label="Country" value={form.country} onChange={set('country')} required placeholder="Japan" />
          <Textarea label="Description" value={form.description} onChange={set('description')} required rows={3} placeholder="What did you do there?" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 700, marginBottom: 6 }}>Map X (0–100%)</label>
              <input type="number" min={0} max={100} value={form.mapX} onChange={e => setForm(f => ({...f, mapX: parseFloat(e.target.value)||50}))} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, padding: '9px 12px', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 700, marginBottom: 6 }}>Map Y (0–100%)</label>
              <input type="number" min={0} max={100} value={form.mapY} onChange={e => setForm(f => ({...f, mapY: parseFloat(e.target.value)||50}))} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, padding: '9px 12px', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }} />
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginBottom: 16, marginTop: -8 }}>Left=0%, Right=100%, Top=0%, Bottom=100%</p>
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
