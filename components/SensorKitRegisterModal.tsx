'use client'

import { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { sensorKitSchema, SensorKitFormValues } from '@/validation/sensorKitSchema'

import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import AlertModal from '@/components/AlertModal'

import { CpuIcon, BarcodeIcon, PlugIcon, SproutIcon, XIcon, CheckIcon } from 'lucide-react'

// ✅ 상태 & 유형 옵션
const statusOptions = [
  { label: '정상', value: '정상' },
  { label: '이상', value: '이상' },
  { label: '점검중', value: '점검중' },
  { label: '불량', value: '불량' },
  { label: '폐기', value: '폐기' },
]

const typeOptions = [
  { label: '하우스', value: '하우스' },
  { label: '노지', value: '노지' },
]

interface SensorKitRegisterModalProps {
  onClose: () => void
}

export default function SensorKitRegisterModal({ onClose }: SensorKitRegisterModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SensorKitFormValues>({
    resolver: zodResolver(sensorKitSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      code: '',
      mac: '',
      status: '정상',
      type: '하우스',
      useStatus: '사용중', // ✅ 스키마 필수
      sensorRes: [], // ✅ 스키마 필수
    },
  })

  const onSubmit = (data: SensorKitFormValues) => {
    console.log('✅ 센서킷 등록 정보 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
    console.log(JSON.stringify(data, null, 2))
    console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑')

    alert('센서킷 등록 성공!')
    setShowConfirmModal(false)
    onClose()
  }

  const sensorKitFieldsValid =
    !!watch('name') &&
    !!watch('code') &&
    !!watch('mac') &&
    !!watch('status') &&
    !!watch('type') &&
    !errors.name &&
    !errors.code &&
    !errors.mac &&
    !errors.status &&
    !errors.type

  return (
    <>
      <div className='fixed inset-0 z-[100] backdrop-blur-sm bg-black/20 flex items-center justify-center'>
        <div ref={modalRef} className='bg-[#F9F9F9] rounded-xl p-6 shadow-lg w-[50vw]'>
          <h2 className='text-xl font-bold mb-4'>센서킷 등록</h2>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-5 gap-4'>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='센서킷 이름'
                    icon={CpuIcon}
                    editable
                    error={errors.name?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name='code'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='센서킷 코드'
                    icon={BarcodeIcon}
                    editable
                    error={errors.code?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name='mac'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='MAC 주소'
                    icon={PlugIcon}
                    editable
                    error={errors.mac?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <SelectField
                    label='센서킷 상태'
                    icon={PlugIcon}
                    editable
                    options={statusOptions}
                    value={statusOptions.find((opt) => opt.value === field.value) || null}
                    onChange={(option) => field.onChange(option?.value || '')}
                    error={errors.status?.message}
                  />
                )}
              />

              <Controller
                name='type'
                control={control}
                render={({ field }) => (
                  <SelectField
                    label='센서킷 유형'
                    icon={SproutIcon}
                    editable
                    options={typeOptions}
                    value={typeOptions.find((opt) => opt.value === field.value) || null}
                    onChange={(option) => field.onChange(option?.value || '')}
                    error={errors.type?.message}
                  />
                )}
              />
            </div>

            <div className='flex justify-end gap-2 pt-6'>
              <button
                type='button'
                onClick={onClose}
                className='cursor-pointer flex items-center gap-2 px-5 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 text-sm'
              >
                <XIcon className='w-4 h-4' /> 취소
              </button>

              <button
                type='button'
                disabled={!sensorKitFieldsValid}
                onClick={() => setShowConfirmModal(true)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors ${
                  !sensorKitFieldsValid
                    ? 'bg-gray-300 text-white cursor-not-allowed'
                    : 'bg-black text-white cursor-pointer'
                }`}
              >
                <CheckIcon className='w-4 h-4' /> 등록
              </button>
            </div>
          </form>
        </div>
      </div>

      {showConfirmModal && (
        <AlertModal
          open={showConfirmModal}
          type='confirm'
          title={`${watch('name') || ''} 센서킷을 등록하시겠습니까?`}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleSubmit(onSubmit, (errors) => {
            console.error('❌ 센서킷 등록 유효성 실패:', errors)
          })}
        />
      )}
    </>
  )
}
