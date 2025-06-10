'use client'

import { useRef, useEffect } from 'react'
import DaumPostcodeEmbed from 'react-daum-postcode'

interface Props {
  onClose: () => void
  onComplete: (address: string, zonecode: string) => void
}

interface DaumPostcodeData {
  address: string
  zonecode: string
  buildingName: string
  apartment: string
  roadAddress: string
  jibunAddress: string
  autoJibunAddress: string
  autoRoadAddress: string
  userSelectedType: 'J' | 'R'
}

export default function AddressSearchModal({ onClose, onComplete }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleComplete = (data: DaumPostcodeData) => {
    onComplete(data.address, data.zonecode)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div className='fixed inset-0 z-[100] backdrop-blur-sm bg-black/20 flex items-center justify-center'>
      <div ref={modalRef} className='bg-white rounded-xl p-6 shadow-lg w-[600px]'>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </div>
    </div>
  )
}
