# ⚡ Portfolio — Termux Edition

Zero native dependencies. No Prisma. No database. Runs anywhere.

## ✅ Termux Setup (step by step)

```bash
# 1. Install Node.js in Termux
pkg update && pkg install nodejs

# 2. Enter the project folder
cd portfolio-termux

# 3. Install dependencies (no native binaries)
npm install

# 4. Start the dev server
npm run dev
```

Done. Visit: http://localhost:3000

---

## 🔐 Admin Panel

| | |
|---|---|
| URL | http://localhost:3000/admin/login |
| Email | admin@portfolio.dev |
| Password | admin123 |

Admin data is saved in **localStorage** (persists across reloads).  
To permanently update the public portfolio, edit **data/mock.ts**.

---

## ✏️ How to Customize Your Content

Open `data/mock.ts` and edit the exported objects:

```ts
export const mockProfile = {
  name: 'Your Name',          // ← change this
  title: 'Your Job Title',    // ← change this
  email: 'you@email.com',     // ← change this
  // ...
}
```

Save the file → the dev server hot-reloads automatically.

---

## 📁 File Structure

```
data/
  mock.ts          ← ALL your content lives here
lib/
  store.ts         ← localStorage CRUD (swap with Supabase later)
  utils.ts         ← helpers
app/
  page.tsx         ← Public portfolio (reads from mock.ts)
  admin/
    login/         ← Mock auth (email+password check)
    dashboard/     ← Stats overview
    profile/       ← Edit profile
    projects/      ← CRUD projects
    experience/    ← CRUD experience
    skills/        ← CRUD skills
    certifications/← CRUD certs
    travels/       ← CRUD travels
components/
  portfolio/       ← Cinematic public UI
  admin/           ← Admin UI components
```

---

## ☁️ Deploy + Connect Supabase Later

When you're ready to go live with a real database:

1. Create a Supabase project at supabase.com
2. Create tables matching the interfaces in `data/mock.ts`
3. Replace functions in `lib/store.ts` with Supabase calls:

```ts
// Before (localStorage):
export function getProjects() {
  return read<Project[]>(KEY.projects, mockProjects)
}

// After (Supabase):
export async function getProjects() {
  const { data } = await supabase.from('projects').select('*').order('order')
  return data ?? []
}
```

---

## 🔧 Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
```

No database setup. No migrations. No binary downloads. Just works.
