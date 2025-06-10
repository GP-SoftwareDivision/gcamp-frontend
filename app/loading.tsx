'use client'

import Image from 'next/image'

export default function Loading() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white z-[9999]'>
      <Image src='/images/loadingAnimation.svg' alt='로딩 중' width={100} height={100} priority />
    </div>
  )
}
