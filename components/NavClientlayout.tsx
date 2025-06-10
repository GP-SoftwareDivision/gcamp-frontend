'use client'

import { useState } from 'react'
import NavigationSidebar from '@/components/NavigationSidebar'

export default function NavClientlayout({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='h-screen flex bg-[#f9f9f9] overflow-hidden'>
      <NavigationSidebar isHovered={isHovered} setIsHovered={setIsHovered} />

      <main className={`flex-1 transition-all duration-200 ${isHovered ? 'ml-47' : 'ml-18'}`}>
        <div className='p-2 w-full h-full'>
          <div className='bg-white rounded-xl shadow-md p-4 border border-gray-300 h-full overflow-hidden'>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
