import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zubair Shah — QC Mattress | BerexTech MY',
  description:
    'Zubair Shah — QC Mattress professional at BerexTech MY. Dedicated to delivering quality assurance, precision inspection, and production excellence in Malaysia.',
  keywords: [
    'Zubair Shah',
    'QC Mattress',
    'BerexTech MY',
    'Quality Control',
    'Malaysia',
    'Manufacturing QC',
    'Portfolio',
  ],
  authors: [{ name: 'Zubair Shah' }],
  openGraph: {
    title: 'Zubair Shah — QC Mattress | BerexTech MY',
    description:
      'Zubair Shah — QC Mattress professional at BerexTech MY. Quality assurance, precision inspection, and production excellence.',
    type: 'website',
    url: 'https://portfolio-termux.vercel.app',
    siteName: 'Zubair Shah Portfolio',
    images: [
      {
        url: 'https://portfolio-termux.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zubair Shah — QC Mattress | BerexTech MY',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zubair Shah — QC Mattress | BerexTech MY',
    description:
      'QC Mattress professional at BerexTech MY. Quality assurance and production excellence.',
    images: ['https://portfolio-termux.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL('https://portfolio-termux.vercel.app'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#07080a" />
      </head>
      <body>{children}</body>
    </html>
  )
}
