import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Video Generator - Transform Text & Images into Stunning Videos',
  description: 'Create professional videos instantly with AI. Generate videos from text prompts or animate static images. Free AI video generation tool with advanced features.',
  keywords: 'AI video generator, text to video, image to video, AI video creation, video generation, artificial intelligence video',
  authors: [{ name: 'AI Video Generator' }],
  creator: 'AI Video Generator',
  publisher: 'AI Video Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://aivideogen.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AI Video Generator - Transform Text & Images into Stunning Videos',
    description: 'Create professional videos instantly with AI. Generate videos from text prompts or animate static images.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://aivideogen.com',
    siteName: 'AI Video Generator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Video Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Video Generator - Transform Text & Images into Stunning Videos',
    description: 'Create professional videos instantly with AI. Generate videos from text prompts or animate static images.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Navbar />
          <div className="relative z-10">
            {children}
          </div>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}

