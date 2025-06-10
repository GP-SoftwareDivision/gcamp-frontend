'use client'

import { ElementType, InputHTMLAttributes, Ref, ReactNode } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  label: string
  editable: boolean
  icon?: ElementType
  inputRef?: Ref<HTMLInputElement>
  error?: string
  suffixIcon?: ReactNode
  onSuffixClick?: () => void
}

export default function InputField({
  label,
  editable,
  icon: Icon,
  inputRef,
  error,
  suffixIcon,
  onSuffixClick,
  ...props
}: InputProps) {
  return (
    <div className='w-full'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      <div className='relative'>
        {Icon && (
          <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
        )}
        <input
          {...props}
          ref={inputRef}
          readOnly={!editable}
          className={`w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} ${
            Icon ? 'pl-10' : 'pl-4'
          } ${suffixIcon ? 'pr-10' : 'pr-4'} py-2 text-sm text-gray-900 bg-white shadow-sm
  focus:outline-none focus:ring-2 focus:ring-gray-900
  ${editable ? 'hover:border-black' : ''} 
  ${!editable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
        />
        {suffixIcon && (
          <button
            type='button'
            onClick={onSuffixClick}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
          >
            {suffixIcon}
          </button>
        )}
      </div>
      {error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
    </div>
  )
}
