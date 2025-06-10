// ✅ page.tsx (서버 컴포넌트)
import type { Metadata } from 'next'
import ClientSensorDetail from './ClientDataSensorDetial'

export const metadata: Metadata = {
  title: '센서 상세정보',
}

export default function Page() {
  return <ClientSensorDetail />
}
