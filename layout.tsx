import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

// ✅ Noto Sans KR 폰트 선언
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'], // 한글 포함 기본 서브셋
  weight: ['400', '500', '700'], // 필요에 따라 굵기 선택
  variable: '--font-noto-sans-kr', // 변수 이름 (선택 사항)
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GCAMP',
  description: 'GCAMP - admin dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className={`${notoSansKr.variable} antialiased`}>{children}</body>
    </html>
  )
}
