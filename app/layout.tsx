import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alex Chen — Staff Software Engineer',
  description: 'Staff Software Engineer. 8+ years building infrastructure and interfaces used by millions.',
  keywords: ['Software Engineer', 'Full Stack', 'Next.js', 'React', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Alex Chen' }],
  openGraph: {
    title: 'Alex Chen — Staff Software Engineer',
    description: 'Staff Software Engineer. 8+ years building infrastructure and interfaces used by millions.',
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
