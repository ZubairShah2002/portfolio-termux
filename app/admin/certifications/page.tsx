'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminAuth, getCertifications, saveCertifications, newId } from '@/lib/store'
import type { Certification } from '@/data/mock'
import { PageHeader, Btn, Input, ColorPicker, Modal, Toast, Row, Empty } from '@/components/admin/AdminUI'

const BLANK: Omit<Certification, 'id'> = {
  name: '', issuer: '', year: '', color: '#6ee7b7', imageUrl: '', credUrl: '', order: 0,
}

export default function CertificationsPage() {
  const router = useRouter()
  const [items, setItems] = useState<Certification[]>([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Certification | null>(null)
  const [form, setForm] = useState<Omit<Certification, 'id'>>(BLANK)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (!getAdminAuth()) { router.push('/admin/login'); return }
    setItems(getCertifications())
  }, [router])

  const openNew = () => { setEditing(null); setForm({ ...BLANK, order: items.length }); setModal(true) }
  const openEdit = (c: Certification) => {
    setEditing(c)
    setForm({ name: c.name, issuer: c.issuer, year: c.year, color: c.color, imageUrl: c.imageUrl, credUrl: c.credUrl, order: c.order })
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
    saveCertifications(updated); setItems(updated); close()
    setToast({ msg: editing ? 'Certification updated!' : 'Certification created!', type: 'success' })
  }

  const del = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    const updated = items.filter(i => i.id !== id)
    saveCertifications(updated); setItems(updated)
    setToast({ msg: 'Deleted', type: 'success' })
  }

  return (
    <div>
      <PageHeader
        title="Certifications"
        subtitle={`${items.length} certification${items.length !== 1 ? 's' : ''}`}
        action={<Btn onClick={openNew}>+ Add Certification</Btn>}
      />

      {items.length === 0 ? (
        <Empty label="Certification" onAdd={openNew} />
      ) : (
        items.map(c => (
          <Row key={c.id} onClick={() => openEdit(c)}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${c.color}15`, border: `1px solid ${c.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, fontWeight: 900, fontSize: 15, flexShrink: 0 }}>
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 700 }}>{c.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{c.issuer} · {c.year}</div>
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              <Btn onClick={e => { e?.stopPropagation(); openEdit(c) }} variant="secondary" size="sm">Edit</Btn>
              <Btn onClick={e => { e?.stopPropagation(); del(c.id, c.name) }} variant="danger" size="sm">Delete</Btn>
            </div>
          </Row>
        ))
      )}

      <Modal open={modal} onClose={close} title={editing ? 'Edit Certification' : 'New Certification'}>
        <form onSubmit={save}>
          <Input label="Certification Name" value={form.name} onChange={set('name')} required placeholder="Quality Control Professional" />
          <Input label="Issuing Organisation" value={form.issuer} onChange={set('issuer')} required placeholder="BerexTech MY" />
          <Input label="Year" value={form.year} onChange={set('year')} required placeholder="2023" />
          <Input label="Credential URL" value={form.credUrl} onChange={set('credUrl')} placeholder="https://credential.link/..." />
          <ColorPicker label="Accent Color" value={form.color} onChange={set('color')} />
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
