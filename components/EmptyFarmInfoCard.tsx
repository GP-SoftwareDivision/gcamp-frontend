'use client'

import { XCircleIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function EmptyFarmInfoCard({ children }: Props) {
  return (
    <div className='flex flex-col justify-center items-center gap-3 bg-transparent h-screen '>
      <div className='flex items-center gap-2 text-base font-medium'>
        <XCircleIcon className='w-6 h-6 text-gray-400' />
        <span className='text-base text-gray-500'>{children}</span>
      </div>
    </div>
  )
}
