'use client'

import { Dialog } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface AlertModalProps {
  open: boolean
  type?: 'success' | 'error' | 'confirm'
  title: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export default function AlertModal({
  open,
  type = 'confirm',
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: AlertModalProps) {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleClose = () => {
    setIsOpen(false)
    onCancel?.()
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className='text-blue-500 size-12' />
      case 'error':
        return <AlertCircle className='text-red-500 size-12' />
      default:
        return <AlertCircle className='text-gray-500 size-12' />
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className='relative z-[9999]'>
      <div className='fixed inset-0 bg-black/30 backdrop-blur-sm' aria-hidden='true' />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-xl transition-all'>
          {/* 아이콘 + 제목 중앙 정렬 */}
          <div className='flex flex-col items-center justify-center mb-10 mt-4 text-center'>
            {getIcon()}
            <Dialog.Title className='text-base font-semibold text-gray-900 mt-4'>
              {title}
            </Dialog.Title>
          </div>

          {/* 서브 메시지 */}
          {message && <p className='text-sm text-gray-600 mb-6 text-center'>{message}</p>}

          {/* ✅ 버튼 중앙 정렬 + 넓게 */}
          <div className='flex justify-center gap-4'>
            <button
              onClick={handleClose}
              className={`cursor-pointer min-w-[120px] px-6 py-2 rounded-2xl border text-sm font-medium ${
                type === 'error'
                  ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                onConfirm?.()
              }}
              className={`cursor-pointer min-w-[120px] px-6 py-2 rounded-2xl text-sm font-medium ${
                type === 'error'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : type === 'success'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-black text-white'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
