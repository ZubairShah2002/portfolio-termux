'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminAuth, getProjects, saveProjects, newId } from '@/lib/store'
import type { Project } from '@/data/mock'
import { PageHeader, Btn, Input, Textarea, ColorPicker, Toggle, TagInput, Modal, Toast, Row, Empty } from '@/components/admin/AdminUI'

const BLANK: Omit<Project,'id'> = { name:'', description:'', tech:[], color:'#6ee7b7', emoji:'🚀', githubUrl:'', liveUrl:'', featured:false, order:0 }

export default function ProjectsPage() {
  const router = useRouter()
  const [items, setItems] = useState<Project[]>([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Project|null>(null)
  const [form, setForm] = useState(BLANK)
  const [toast, setToast] = useState<{msg:string;type:'success'|'error'}|null>(null)

  useEffect(() => { if (!getAdminAuth()) { router.push('/admin/login'); return }; setItems(getProjects()) }, [router])

  const openNew = () => { setEditing(null); setForm({ ...BLANK, order: items.length }); setModal(true) }
  const openEdit = (p: Project) => { setEditing(p); setForm({ name:p.name, description:p.description, tech:[...p.tech], color:p.color, emoji:p.emoji, githubUrl:p.githubUrl, liveUrl:p.liveUrl, featured:p.featured, order:p.order }); setModal(true) }
  const close = () => { setModal(false); setEditing(null) }
  const set = (k: keyof typeof BLANK) => (v: any) => setForm(f => ({ ...f, [k]: v }))

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    let updated: Project[]
    if (editing) {
      updated = items.map(i => i.id === editing.id ? { ...editing, ...form } : i)
    } else {
      updated = [...items, { id: newId(), ...form }]
    }
    saveProjects(updated); setItems(updated); close()
    setToast({ msg: editing ? 'Project updated!' : 'Project created!', type: 'success' })
  }

  const del = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    const updated = items.filter(i => i.id !== id)
    saveProjects(updated); setItems(updated)
    setToast({ msg: 'Project deleted', type: 'success' })
  }

  return (
    <div>
      <PageHeader title="Projects" subtitle={`${items.length} projects`} action={<Btn onClick={openNew}>+ Add Project</Btn>} />
      {items.length === 0 ? <Empty label="Project" onAdd={openNew} /> : items.map(p => (
        <Row key={p.id} onClick={() => openEdit(p)}>
          <span style={{ fontSize: 26 }}>{p.emoji}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ color: 'white', fontWeight: 700 }}>{p.name}</span>
              {p.featured && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 5, background: 'rgba(110,231,183,0.12)', color: '#6ee7b7', fontWeight: 700 }}>FEATURED</span>}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description}</div>
            <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap' }}>
              {p.tech.slice(0,4).map(t => <span key={t} style={{ fontSize: 10, padding: '2px 6px', borderRadius: 5, background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}20` }}>{t}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            <Btn onClick={e => { e?.stopPropagation(); openEdit(p) }} variant="secondary" size="sm">Edit</Btn>
            <Btn onClick={e => { e?.stopPropagation(); del(p.id, p.name) }} variant="danger" size="sm">Delete</Btn>
          </div>
        </Row>
      ))}

      <Modal open={modal} onClose={close} title={editing ? 'Edit Project' : 'New Project'}>
        <form onSubmit={save}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: 10, alignItems: 'end' }}>
            <Input label="Project Name" value={form.name} onChange={set('name')} required placeholder="My Project" />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 700, marginBottom: 6 }}>Emoji</label>
              <input value={form.emoji} onChange={e => set('emoji')(e.target.value)} style={{ width: '100%', height: 42, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, color: 'white', fontSize: 22, outline: 'none', textAlign: 'center', boxSizing: 'border-box' as const }} />
            </div>
          </div>
          <Textarea label="Description" value={form.description} onChange={set('description')} required rows={3} placeholder="What does this project do?" />
          <TagInput label="Tech Stack" value={form.tech} onChange={set('tech')} placeholder="Add tech, press Enter" />
          <ColorPicker label="Accent Color" value={form.color} onChange={set('color')} />
          <Input label="GitHub URL" value={form.githubUrl} onChange={set('githubUrl')} placeholder="https://github.com/..." />
          <Input label="Live URL" value={form.liveUrl} onChange={set('liveUrl')} placeholder="https://..." />
          <Toggle label="Featured project" value={form.featured} onChange={set('featured')} />
          <div style={{ display: 'flex', gap: 9, justifyContent: 'flex-end', marginTop: 6 }}>
            <Btn onClick={close} variant="ghost">Cancel</Btn>
            <Btn type="submit">{editing ? 'Update' : 'Create'}</Btn>
          </div>
        </form>
      </Modal>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
