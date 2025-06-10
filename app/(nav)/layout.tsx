import type { Metadata } from 'next'
import NavClientlayout from '@/components/NavClientlayout'

export const metadata: Metadata = {
  title: {
    default: 'GCAMP',
    template: 'GCAMP - %s',
  },
  description: 'GCAMP - admin dashboard',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <NavClientlayout>{children}</NavClientlayout>
}
