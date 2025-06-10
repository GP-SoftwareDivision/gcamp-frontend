'use client'

import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'

interface SendMessageBoxProps {
  username: string
  phone: string
  onSend: (message: string) => void
  onCancel?: () => void
}

interface FormValues {
  message: string
}

const getByteLength = (text: string): number => {
  return new TextEncoder().encode(text).length
}

export default function SendMessageBox({ username, phone, onSend, onCancel }: SendMessageBoxProps) {
  const DEFAULT_TEXT = `안녕하세요. ${username}님 골든플래닛 입니다. `
  const MAX_BYTES = 90

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { message: '' },
  })

  const message = watch('message')
  const fullMessage = DEFAULT_TEXT + (message || '')
  const totalBytes = getByteLength(fullMessage)
  const isValid = totalBytes <= MAX_BYTES && message.trim().length > 0

  const onSubmit = (data: FormValues) => {
    const finalMessage = DEFAULT_TEXT + data.message.trim()
    console.log('📤 이름:', username)
    console.log('📞 전화번호:', phone)
    console.log('💬 전송 메시지:', finalMessage)
    onSend(finalMessage)
    reset()
  }

  return createPortal(
    <div
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm'
      onClick={onCancel}
    >
      <div
        className='w-full max-w-lg p-6 bg-white rounded-2xl shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-2 text-sm text-gray-700'>{DEFAULT_TEXT}</div>

          <textarea
            id='message'
            rows={6}
            {...register('message', {
              required: '내용을 입력해주세요.',
              validate: (value) =>
                getByteLength(DEFAULT_TEXT + value) <= MAX_BYTES ||
                `총 문자 바이트를 ${MAX_BYTES}byte 이하로 입력해주세요.`,
            })}
            className='mt-2 block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6'
            placeholder='추가로 보낼 내용을 입력하세요...'
          />

          <div className='flex justify-between items-center mt-2 text-sm text-gray-500'>
            <span>
              총 문자 바이트: {totalBytes} / {MAX_BYTES}byte
            </span>
            {errors.message && <span className='text-red-500'>{errors.message.message}</span>}
          </div>

          {/* ✅ 버튼 중앙 정렬 및 폭 조정 */}
          <div className='flex justify-center gap-4 mt-6'>
            {onCancel && (
              <button
                type='button'
                onClick={onCancel}
                className='min-w-[120px] px-6 py-2 rounded-2xl border border-gray-300 bg-[#F9F9F9] text-sm font-medium text-gray-700 hover:bg-gray-100'
              >
                취소
              </button>
            )}
            <button
              type='submit'
              disabled={!isValid}
              className={`min-w-[120px] px-6 py-2 rounded-2xl text-sm font-medium transition-all ${
                isValid
                  ? 'bg-black text-white hover:bg-gray-900 cursor-pointer'
                  : 'bg-gray-300 text-white cursor-not-allowed'
              }`}
            >
              전송
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}
