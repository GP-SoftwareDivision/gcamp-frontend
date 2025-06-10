import ClientLog from '@/app/(nav)/log/ClientLog'

// ✅ page.tsx (server component)
export const metadata = {
  title: '이력관리',
}

export default function LogPage() {
  return <ClientLog />
}
