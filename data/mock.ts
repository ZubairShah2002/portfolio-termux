// ============================================================
// MOCK DATA STORE — Zubair Shah Portfolio
// All portfolio content lives here.
// To connect to Supabase later: replace each export with
// a fetch from your Supabase table using the same shape.
// ============================================================

export interface Profile {
  id: string
  name: string
  title: string
  tagline: string
  bio: string
  bioExtra: string
  email: string
  github: string
  linkedin: string
  twitter: string
  website: string
  avatar: string
  available: boolean
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string
  color: string
  current: boolean
  order: number
}

export interface Skill {
  id: string
  category: string
  items: string[]
  color: string
  order: number
}

export interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  color: string
  emoji: string
  githubUrl: string
  liveUrl: string
  featured: boolean
  order: number
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  color: string
  imageUrl: string
  credUrl: string
  order: number
}

export interface Travel {
  id: string
  city: string
  country: string
  description: string
  emoji: string
  mapX: number
  mapY: number
  imageUrl: string
  order: number
}

// ── Profile ────────────────────────────────────────────────
export const mockProfile: Profile = {
  id: '1',
  name: 'Zubair Shah',
  title: 'QC Mattress ( BerexTech MY )',
  tagline: 'Delivering quality assurance and precision-driven solutions at BerexTech Malaysia.',
  bio: 'Dedicated QC professional at BerexTech MY, specialising in mattress quality control and production standards. Passionate about ensuring every product meets the highest benchmarks of comfort, safety, and durability.',
  bioExtra: "When I am not on the production floor, I explore tech tools that streamline QC workflows, document best practices, and contribute to a culture of continuous improvement.",
  email: 'zubairshah2002@gmail.com',
  github: 'github.com/ZubairShah2002',
  linkedin: 'linkedin.com/in/zubairshah',
  twitter: '',
  website: '',
  avatar: '',
  available: true,
}

// ── Experience ─────────────────────────────────────────────
export const mockExperience: Experience[] = [
  {
    id: '1',
    company: 'BerexTech MY',
    role: 'QC Mattress',
    period: '2023 – Present',
    description: 'Conducting comprehensive quality control inspections on mattress production lines. Ensuring all units meet BerexTech quality and safety standards before shipment.',
    color: '#6ee7b7',
    current: true,
    order: 0,
  },
  {
    id: '2',
    company: 'BerexTech MY',
    role: 'QC Trainee',
    period: '2022 – 2023',
    description: 'Trained in quality inspection methodologies, production floor safety, and documentation of defect reports. Built strong foundation in QC processes.',
    color: '#a78bfa',
    current: false,
    order: 1,
  },
]

// ── Skills ─────────────────────────────────────────────────
export const mockSkills: Skill[] = [
  {
    id: '1',
    category: 'Quality Control',
    items: ['Visual Inspection', 'Defect Analysis', 'Root Cause Analysis', 'Statistical Sampling', 'ISO Standards'],
    color: '#6ee7b7',
    order: 0,
  },
  {
    id: '2',
    category: 'Production',
    items: ['Production Floor QC', 'Process Monitoring', 'Yield Optimisation', 'Safety Compliance', 'SOP Development'],
    color: '#a78bfa',
    order: 1,
  },
  {
    id: '3',
    category: 'Documentation',
    items: ['Defect Reporting', 'QC Checklists', 'Audit Records', 'Excel / Google Sheets', 'MS Word'],
    color: '#f472b6',
    order: 2,
  },
  {
    id: '4',
    category: 'Tech Tools',
    items: ['Next.js', 'React', 'TypeScript', 'GitHub', 'Vercel', 'Tailwind CSS'],
    color: '#38bdf8',
    order: 3,
  },
]

// ── Projects ───────────────────────────────────────────────
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Portfolio Website',
    description: 'Personal portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Deployed on Vercel with zero native dependencies.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    color: '#6ee7b7',
    emoji: '🌐',
    githubUrl: 'https://github.com/ZubairShah2002/portfolio-termux',
    liveUrl: 'https://portfolio-termux.vercel.app',
    featured: true,
    order: 0,
  },
  {
    id: '2',
    name: 'QC Inspection Tracker',
    description: 'Internal tool for logging daily mattress QC inspections, defect counts, and batch pass/fail rates with local data persistence.',
    tech: ['React', 'localStorage', 'TypeScript'],
    color: '#a78bfa',
    emoji: '🔍',
    githubUrl: 'https://github.com/ZubairShah2002',
    liveUrl: '',
    featured: true,
    order: 1,
  },
  {
    id: '3',
    name: 'Defect Report Generator',
    description: 'Automated defect report formatter that converts raw inspection data into structured PDF-ready documents for management review.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    color: '#f472b6',
    emoji: '📋',
    githubUrl: 'https://github.com/ZubairShah2002',
    liveUrl: '',
    featured: false,
    order: 2,
  },
  {
    id: '4',
    name: 'Admin CMS Dashboard',
    description: 'Fully functional admin panel built into this portfolio for managing content without any database or backend dependency.',
    tech: ['Next.js', 'React', 'TypeScript'],
    color: '#fb923c',
    emoji: '⚙️',
    githubUrl: 'https://github.com/ZubairShah2002/portfolio-termux',
    liveUrl: 'https://portfolio-termux.vercel.app/admin/login',
    featured: false,
    order: 3,
  },
]

// ── Certifications ─────────────────────────────────────────
export const mockCertifications: Certification[] = [
  {
    id: '1',
    name: 'Quality Control Professional',
    issuer: 'BerexTech MY',
    year: '2023',
    color: '#6ee7b7',
    imageUrl: '',
    credUrl: '',
    order: 0,
  },
  {
    id: '2',
    name: 'ISO 9001 Awareness',
    issuer: 'Internal Training',
    year: '2023',
    color: '#a78bfa',
    imageUrl: '',
    credUrl: '',
    order: 1,
  },
  {
    id: '3',
    name: 'Workplace Safety (OSH)',
    issuer: 'DOSH Malaysia',
    year: '2022',
    color: '#f472b6',
    imageUrl: '',
    credUrl: '',
    order: 2,
  },
]

// ── Travels ────────────────────────────────────────────────
export const mockTravels: Travel[] = [
  {
    id: '1',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    description: 'Home base. Working at BerexTech MY headquarters in the Greater KL area.',
    emoji: '🏙️',
    mapX: 74,
    mapY: 55,
    imageUrl: '',
    order: 0,
  },
  {
    id: '2',
    city: 'Johor Bahru',
    country: 'Malaysia',
    description: 'Attended regional QC and manufacturing standards training sessions.',
    emoji: '🏭',
    mapX: 75,
    mapY: 57,
    imageUrl: '',
    order: 1,
  },
  {
    id: '3',
    city: 'Penang',
    country: 'Malaysia',
    description: 'Participated in cross-facility quality audit and process benchmarking.',
    emoji: '🌴',
    mapX: 73,
    mapY: 52,
    imageUrl: '',
    order: 2,
  },
]

// ── Admin credentials (mock only, no real auth) ────────────
export const ADMIN_EMAIL = 'admin@portfolio.dev'
export const ADMIN_PASSWORD = 'admin123'
