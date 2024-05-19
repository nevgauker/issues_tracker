import '@radix-ui/themes/styles.css'
import './theme-config.css'
import './globals.css'
import type { Metadata } from 'next'
import { Theme, ThemePanel } from '@radix-ui/themes'
import { Inter } from 'next/font/google'
import Navbar from './Navbar'
import SessionWrapper from './components/SessionWrapper'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Issues Tracking App',
  description: 'tracks bugs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionWrapper>
      <html lang='en' className={inter.variable}>
        <body className={inter.className}>
          <Theme accentColor='purple'>
            <Navbar />
            <main className='p-5'>{children}</main>
          </Theme>
        </body>
      </html>
    </SessionWrapper>
  )
}
