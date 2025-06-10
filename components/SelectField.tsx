'use client'

import { ElementType } from 'react'
import Select, { components, ControlProps, GroupBase } from 'react-select'

interface OptionType {
  label: string
  value: string
}

interface SelectProps {
  label: string
  editable: boolean
  icon?: ElementType
  options: OptionType[]
  value: OptionType | null
  onChange: (value: OptionType | null) => void
  error?: string
}

export default function SelectField({
  label,
  editable,
  icon: Icon,
  options,
  value,
  onChange,
  error,
}: SelectProps) {
  const CustomControl = (props: ControlProps<OptionType, false, GroupBase<OptionType>>) => (
    <components.Control {...props}>
      {Icon && <Icon className='ml-2 mr-1 w-4 h-4 text-gray-400' />}
      {props.children}
    </components.Control>
  )

  return (
    <div className='w-full'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      {editable ? (
        <Select
          components={{ Control: Icon ? CustomControl : undefined }}
          options={options}
          value={value}
          isSearchable
          onChange={onChange}
          isClearable
          placeholder='선택하세요'
          menuPlacement='auto'
          menuPosition='fixed'
          classNamePrefix='react-select'
          styles={{
            control: (base, state) => ({
              ...base,
              minHeight: '40px',
              backgroundColor: 'white',
              borderRadius: '8px',
              borderWidth: state.isFocused ? '3px' : '1px',
              borderColor: error ? '#ef4444' : state.isFocused ? '#111827' : '#d1d5db',
              boxShadow: 'none !important',
              outline: 'none !important',
              fontSize: '14px',
              paddingLeft: Icon ? '4px' : '8px',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: error ? '#ef4444' : '#111827',
              },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? '#e5e7eb' : state.isFocused ? '#f3f4f6' : 'white',
              color: '#111827',
              fontSize: '14px',
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              borderRadius: '8px',
            }),
          }}
        />
      ) : (
        <div className='text-sm text-gray-800'>{value?.label || '-'}</div>
      )}
      {error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
    </div>
  )
}
