import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zubair Shah — QC Mattress ( Berex Tech MY )',
  description: 'Quality Control professional with 5 years of comprehensive experience in IQC, OQC, line QC, and DQC, committed to delivering consistent product quality and manufacturing excellence.',
  keywords: ['Software Engineer', 'Full Stack', 'Next.js', 'React', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Zubair Shah' }],
  openGraph: {
    title: 'Zubair Shah — QC Mattress ( Berex Tech MY )',
    description: 'Quality Control professional with 5 years of comprehensive experience in IQC, OQC, line QC, and DQC, committed to delivering consistent product quality and manufacturing excellence.',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
