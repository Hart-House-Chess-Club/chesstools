import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChessTools',
  description: 'ChessTools for organizers, players, and arbiters worldwide.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        <Navbar />
        {/* <main className="container mx-auto p-4"> */}
          {children}
        {/* </main> */}
      </body>
    </html>
  )
}

