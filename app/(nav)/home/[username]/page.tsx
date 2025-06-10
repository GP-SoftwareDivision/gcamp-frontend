// ✅ page.tsx (서버 컴포넌트)
import type { Metadata } from 'next'
import ClientUserDetail from './ClientUserDetail'

export const metadata: Metadata = {
  title: '회원 상세정보',
}

export default function Page() {
  return <ClientUserDetail />
}
