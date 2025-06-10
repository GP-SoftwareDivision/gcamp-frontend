import ClientSensorKit from '@/app/(nav)/sensorKit/ClientSensorKit'

// ✅ page.tsx (server component)
export const metadata = {
  title: '센서킷관리',
}

export default function HomePage() {
  return <ClientSensorKit />
}
