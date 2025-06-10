import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'GCAMP',
    template: 'GCAMP - %s',
  },
  description: 'GCAMP - admin dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={`${notoSansKr.variable} antialiased`}>{children}</body>
    </html>
  )
}
