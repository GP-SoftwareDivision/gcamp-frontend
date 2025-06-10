'use client'

import Select from 'react-select'

interface OptionType<T = string> {
  label: string
  value: T
}

interface MultiSelectProps<T = string> {
  label: string
  editable: boolean
  options: OptionType<T>[]
  value: OptionType<T>[]
  onChange: (value: OptionType<T>[]) => void
  error?: string
}

export default function MultiSelectField<T = string>({
  label,
  editable,
  options,
  value,
  onChange,
  error,
}: MultiSelectProps<T>) {
  return (
    <div className='w-full'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
      {editable ? (
        <Select
          isMulti
          options={options}
          value={value}
          isSearchable
          placeholder='선택하세요'
          onChange={(selected) => onChange(selected as OptionType<T>[])}
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
              borderColor: error ? '#ef4444' : state.isFocused ? 'black' : '#d1d5db',
              boxShadow: 'none !important',
              outline: 'none !important',
              '&:hover': {
                borderColor: error ? '#ef4444' : '#111827',
              },
              fontSize: '14px',
              transition: 'all 0.2s ease',
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
            multiValue: (base) => ({
              ...base,
              backgroundColor: 'black',
              borderRadius: '4px',
              padding: '2px 6px',
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: 'white',
              fontWeight: '500',
              padding: '0 4px',
            }),
            multiValueRemove: (base) => ({
              ...base,
              backgroundColor: 'transparent',
              color: 'white',
              cursor: 'pointer',
              ':hover': {
                color: '#ef4444',
                backgroundColor: 'transparent',
              },
            }),
          }}
        />
      ) : (
        <div className='text-gray-800 text-sm py-2'>
          {value.map((v) => v.label).join(', ') || '선택 없음'}
        </div>
      )}
      {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
    </div>
  )
}
