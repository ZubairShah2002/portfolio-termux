import {
  mockProfile, mockExperience, mockSkills,
  mockProjects, mockCertifications, mockTravels,
} from '@/data/mock'
import PortfolioClient from '@/components/portfolio/PortfolioClient'

export default function HomePage() {
  return (
    <PortfolioClient
      profile={mockProfile}
      experience={mockExperience}
      skills={mockSkills}
      projects={mockProjects}
      certifications={mockCertifications}
      travels={mockTravels}
    />
  )
}
