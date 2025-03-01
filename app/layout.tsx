import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chesstools',
  description: 'Chesstools for organizers, players, and arbiters worldwide.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {/* <main className="container mx-auto p-4"> */}
          {children}
        {/* </main> */}
      </body>
    </html>
  )
}

