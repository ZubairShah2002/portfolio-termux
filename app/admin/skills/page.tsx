'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminAuth, getSkills, saveSkills, newId } from '@/lib/store'
import type { Skill } from '@/data/mock'
import { PageHeader, Btn, Input, ColorPicker, TagInput, Modal, Toast, Row, Empty } from '@/components/admin/AdminUI'

const BLANK: Omit<Skill,'id'> = { category:'', items:[], color:'#6ee7b7', order:0 }

export default function SkillsPage() {
  const router = useRouter()
  const [items, setItems] = useState<Skill[]>([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Skill|null>(null)
  const [form, setForm] = useState(BLANK)
  const [toast, setToast] = useState<{msg:string;type:'success'|'error'}|null>(null)

  useEffect(() => { if (!getAdminAuth()) { router.push('/admin/login'); return }; setItems(getSkills()) }, [router])

  const openNew = () => { setEditing(null); setForm({ ...BLANK, order: items.length }); setModal(true) }
  const openEdit = (s: Skill) => { setEditing(s); setForm({ category:s.category, items:[...s.items], color:s.color, order:s.order }); setModal(true) }
  const close = () => { setModal(false); setEditing(null) }
  const set = (k: keyof typeof BLANK) => (v: any) => setForm(f => ({ ...f, [k]: v }))

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    let updated: Skill[]
    if (editing) updated = items.map(i => i.id === editing.id ? { ...editing, ...form } : i)
    else updated = [...items, { id: newId(), ...form }]
    saveSkills(updated); setItems(updated); close()
    setToast({ msg: editing ? 'Updated!' : 'Created!', type: 'success' })
  }

  const del = (id: string, cat: string) => {
    if (!confirm(`Delete "${cat}"?`)) return
    const updated = items.filter(i => i.id !== id)
    saveSkills(updated); setItems(updated)
    setToast({ msg: 'Deleted', type: 'success' })
  }

  return (
    <div>
      <PageHeader title="Skills" subtitle={`${items.length} categories`} action={<Btn onClick={openNew}>+ Add Category</Btn>} />
      {items.length === 0 ? <Empty label="Skill Category" onAdd={openNew} /> : items.map(s => (
        <Row key={s.id} onClick={() => openEdit(s)}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, boxShadow: `0 0 7px ${s.color}`, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <span style={{ color: 'white', fontWeight: 700 }}>{s.category}</span>
            <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap' }}>
              {s.items.map(t => <span key={t} style={{ fontSize: 10, padding: '2px 6px', borderRadius: 5, background: `${s.color}12`, color: s.color }}>{t}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            <Btn onClick={ev => { ev?.stopPropagation(); openEdit(s) }} variant="secondary" size="sm">Edit</Btn>
            <Btn onClick={ev => { ev?.stopPropagation(); del(s.id, s.category) }} variant="danger" size="sm">Delete</Btn>
          </div>
        </Row>
      ))}
      <Modal open={modal} onClose={close} title={editing ? 'Edit Category' : 'New Skill Category'}>
        <form onSubmit={save}>
          <Input label="Category Name" value={form.category} onChange={set('category')} required placeholder="Frontend, Backend..." />
          <TagInput label="Skills / Technologies" value={form.items} onChange={set('items')} placeholder="Add skill, press Enter" />
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
