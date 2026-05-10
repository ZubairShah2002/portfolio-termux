// ============================================================
// MOCK DATA STORE
// All portfolio content lives here.
// To connect to Supabase later: replace each export with
// a fetch from your Supabase table using the same shape.
//
// Example Supabase swap:
//   export async function getProfile() {
//     const { data } = await supabase.from('profile').select('*').single()
//     return data
//   }
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
  tagline: 'Quality is Not an Option, It’s a Standard',
  bio: 'Quality Control professional with 5 years of comprehensive experience in IQC, OQC, line QC, and DQC, committed to delivering consistent product quality and manufacturing excellence.',
  bioExtra: "Quality Control professional with 5 years of comprehensive experience in IQC, OQC, line QC, and DQC, committed to delivering consistent product quality and manufacturing excellence.",
  email: 'Zubairpro3415@gmail.com',
  github: 'github.com/zubairshah2002',
  linkedin: '-',
  twitter: '-',
  website: 'Zubair.dev',
  avatar: '',
  available: true,
}

// ── Experience ─────────────────────────────────────────────
export const mockExperience: Experience[] = [
  {
    id: '1',
    company: 'Vercel',
    role: 'Staff Engineer',
    period: '2022 – Present',
    description: 'Led Edge Runtime infrastructure, reducing cold starts by 73%. Architected the CI/CD pipeline serving 800K+ developers worldwide.',
    color: '#6ee7b7',
    current: true,
    order: 0,
  },
  {
    id: '2',
    company: 'Stripe',
    role: 'Senior Engineer',
    period: '2019 – 2022',
    description: 'Built core payment orchestration processing $500B+ annually. Designed fraud ML pipeline cutting chargebacks by 41%.',
    color: '#a78bfa',
    current: false,
    order: 1,
  },
  {
    id: '3',
    company: 'Figma',
    role: 'Frontend Engineer',
    period: '2017 – 2019',
    description: 'Co-built the real-time WebGL renderer and multiplayer cursor system now used by 4M+ daily designers.',
    color: '#f472b6',
    current: false,
    order: 2,
  },
  {
    id: '4',
    company: 'Airbnb',
    role: 'Junior Engineer',
    period: '2015 – 2017',
    description: 'Launched the React Native app across 12 countries. Search ranking algorithm improved conversion by 18%.',
    color: '#fb923c',
    current: false,
    order: 3,
  },
]

// ── Skills ─────────────────────────────────────────────────
export const mockSkills: Skill[] = [
  {
    id: '1',
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Three.js', 'WebGL', 'Framer Motion'],
    color: '#6ee7b7',
    order: 0,
  },
  {
    id: '2',
    category: 'Backend',
    items: ['Node.js', 'Go', 'Rust', 'GraphQL', 'tRPC', 'PostgreSQL'],
    color: '#a78bfa',
    order: 1,
  },
  {
    id: '3',
    category: 'Infrastructure',
    items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Edge'],
    color: '#f472b6',
    order: 2,
  },
  {
    id: '4',
    category: 'Design',
    items: ['Figma', 'Motion Design', 'Design Systems', 'Accessibility', 'UX Research'],
    color: '#38bdf8',
    order: 3,
  },
]

// ── Projects ───────────────────────────────────────────────
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Nebula DB',
    description: 'Distributed graph database. Sub-millisecond queries at planetary scale. 12K GitHub stars.',
    tech: ['Rust', 'WASM', 'CRDT'],
    color: '#6ee7b7',
    emoji: '🌌',
    githubUrl: 'https://github.com',
    liveUrl: '',
    featured: true,
    order: 0,
  },
  {
    id: '2',
    name: 'Prism UI',
    description: 'Motion-first design system used by 300+ companies. Fully accessible, theme-aware components.',
    tech: ['React', 'TypeScript', 'Radix'],
    color: '#a78bfa',
    emoji: '✦',
    githubUrl: 'https://github.com',
    liveUrl: 'https://prism.ui',
    featured: true,
    order: 1,
  },
  {
    id: '3',
    name: 'Flux Analytics',
    description: 'Real-time analytics engine — 10B events/day. P99 latency under 8ms globally.',
    tech: ['Go', 'ClickHouse', 'Edge'],
    color: '#f472b6',
    emoji: '⚡',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 2,
  },
  {
    id: '4',
    name: 'CodeLens AI',
    description: 'AI code review that understands architecture and intent. 50K+ repos integrated.',
    tech: ['Python', 'LLMs', 'VSCode'],
    color: '#fb923c',
    emoji: '🔬',
    githubUrl: 'https://github.com',
    liveUrl: 'https://codelens.ai',
    featured: false,
    order: 3,
  },
  {
    id: '5',
    name: 'Orbit CMS',
    description: 'Headless CMS with visual editor compiling to edge-optimized assets. Fortune 500 users.',
    tech: ['Next.js', 'Tiptap', 'S3'],
    color: '#38bdf8',
    emoji: '🛸',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    order: 4,
  },
  {
    id: '6',
    name: 'Signal SDK',
    description: 'FIPS 140-2 compliant E2E messaging SDK for enterprise. Used in healthcare & finance.',
    tech: ['Rust', 'WebCrypto', 'WASM'],
    color: '#34d399',
    emoji: '🔐',
    githubUrl: 'https://github.com',
    liveUrl: '',
    featured: false,
    order: 5,
  },
]

// ── Certifications ─────────────────────────────────────────
export const mockCertifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
    color: '#fb923c',
    imageUrl: '',
    credUrl: '',
    order: 0,
  },
  {
    id: '2',
    name: 'Certified Kubernetes Admin',
    issuer: 'CNCF',
    year: '2022',
    color: '#38bdf8',
    imageUrl: '',
    credUrl: '',
    order: 1,
  },
  {
    id: '3',
    name: 'Google Cloud Professional',
    issuer: 'Google Cloud',
    year: '2023',
    color: '#34d399',
    imageUrl: '',
    credUrl: '',
    order: 2,
  },
  {
    id: '4',
    name: 'HashiCorp Terraform',
    issuer: 'HashiCorp',
    year: '2022',
    color: '#a78bfa',
    imageUrl: '',
    credUrl: '',
    order: 3,
  },
]

// ── Travels ────────────────────────────────────────────────
export const mockTravels: Travel[] = [
  {
    id: '1',
    city: 'Tokyo',
    country: 'Japan',
    description: "Audited fintech infrastructure for Rakuten's payment division",
    emoji: '🗼',
    mapX: 79,
    mapY: 36,
    imageUrl: '',
    order: 0,
  },
  {
    id: '2',
    city: 'Berlin',
    country: 'Germany',
    description: "Architecture review for N26's core banking platform",
    emoji: '🏛️',
    mapX: 50,
    mapY: 26,
    imageUrl: '',
    order: 1,
  },
  {
    id: '3',
    city: 'Singapore',
    country: 'Singapore',
    description: 'GovTech citizen digital identity system consultancy',
    emoji: '🦁',
    mapX: 74,
    mapY: 55,
    imageUrl: '',
    order: 2,
  },
  {
    id: '4',
    city: 'San Francisco',
    country: 'USA',
    description: "Embedded with Anthropic's infrastructure team for 3 months",
    emoji: '🌉',
    mapX: 10,
    mapY: 33,
    imageUrl: '',
    order: 3,
  },
  {
    id: '5',
    city: 'Dubai',
    country: 'UAE',
    description: 'Designed DIFC blockchain trade finance protocol',
    emoji: '🏙️',
    mapX: 60,
    mapY: 43,
    imageUrl: '',
    order: 4,
  },
]

// ── Admin credentials (mock only, no real auth) ────────────
export const ADMIN_EMAIL = 'admin@portfolio.dev'
export const ADMIN_PASSWORD = 'admin123'
