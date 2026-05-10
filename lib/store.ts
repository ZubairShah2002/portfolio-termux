// ============================================================
// CLIENT-SIDE STORE
// Uses localStorage to persist admin edits during the session.
// On page load, reads from localStorage or falls back to mock data.
// When you connect Supabase, replace localStorage calls with API calls.
// ============================================================

import {
  mockProfile, mockExperience, mockSkills, mockProjects,
  mockCertifications, mockTravels,
  type Profile, type Experience, type Skill,
  type Project, type Certification, type Travel,
} from '@/data/mock'

const KEY = {
  profile: 'portfolio_profile',
  experience: 'portfolio_experience',
  skills: 'portfolio_skills',
  projects: 'portfolio_projects',
  certifications: 'portfolio_certifications',
  travels: 'portfolio_travels',
  auth: 'portfolio_admin_auth',
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

// ── Profile ────────────────────────────────────────────────
export function getProfile(): Profile {
  return read<Profile>(KEY.profile, mockProfile)
}
export function saveProfile(p: Profile): void {
  write(KEY.profile, p)
}

// ── Experience ─────────────────────────────────────────────
export function getExperience(): Experience[] {
  return read<Experience[]>(KEY.experience, mockExperience)
}
export function saveExperience(items: Experience[]): void {
  write(KEY.experience, items)
}

// ── Skills ─────────────────────────────────────────────────
export function getSkills(): Skill[] {
  return read<Skill[]>(KEY.skills, mockSkills)
}
export function saveSkills(items: Skill[]): void {
  write(KEY.skills, items)
}

// ── Projects ───────────────────────────────────────────────
export function getProjects(): Project[] {
  return read<Project[]>(KEY.projects, mockProjects)
}
export function saveProjects(items: Project[]): void {
  write(KEY.projects, items)
}

// ── Certifications ─────────────────────────────────────────
export function getCertifications(): Certification[] {
  return read<Certification[]>(KEY.certifications, mockCertifications)
}
export function saveCertifications(items: Certification[]): void {
  write(KEY.certifications, items)
}

// ── Travels ────────────────────────────────────────────────
export function getTravels(): Travel[] {
  return read<Travel[]>(KEY.travels, mockTravels)
}
export function saveTravels(items: Travel[]): void {
  write(KEY.travels, items)
}

// ── Auth (mock) ────────────────────────────────────────────
export function setAdminAuth(value: boolean): void {
  write(KEY.auth, value)
}
export function getAdminAuth(): boolean {
  return read<boolean>(KEY.auth, false)
}
export function clearAdminAuth(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(KEY.auth)
}

// ── Reset all data to defaults ─────────────────────────────
export function resetAllData(): void {
  if (typeof window === 'undefined') return
  Object.values(KEY).forEach(k => localStorage.removeItem(k))
}

// ── ID generator ──────────────────────────────────────────
export function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
