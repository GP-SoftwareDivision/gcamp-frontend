'use client'

import { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sensorSchema, SensorFormValues } from '@/validation/sensorSchema'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import AlertModal from '@/components/AlertModal'
import { CpuIcon, BarcodeIcon, Settings2Icon, XIcon, CheckIcon, PlugIcon } from 'lucide-react'

const typeOptions = [
  { label: '온도', value: '온도' },
  { label: '습도', value: '습도' },
  { label: '이산화탄소', value: '이산화탄소' },
  { label: '일사량', value: '일사량' },
  { label: '지온', value: '지온' },
  { label: '토양수분', value: '토양수분' },
  { label: '수소이온농도(pH)', value: '수소이온농도(pH)' },
  { label: '염류농도(EC)', value: '염류농도(EC)' },
]

const statusOptions = [
  { label: '정상', value: 'STATUS001' },
  { label: '비정상', value: 'STATUS002' },
  { label: '점검중', value: 'STATUS003' },
  { label: '불량', value: 'STATUS004' },
  { label: '폐기', value: 'STATUS005' },
]

interface SensorRegisterModalProps {
  onClose: () => void
}

export default function SensorRegisterModal({ onClose }: SensorRegisterModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SensorFormValues>({
    resolver: zodResolver(sensorSchema),
    mode: 'onChange',
    defaultValues: {
      sensorname: '',
      type: '',
      code: '',
    },
  })

  const onSubmit = (data: SensorFormValues) => {
    console.log('✅ 센서 등록 정보 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
    console.log(JSON.stringify(data, null, 2))
    console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑')

    alert('센서 등록 성공!')
    setShowConfirmModal(false)
    onClose()
  }

  const sensorFieldsValid =
    !!watch('sensorname') &&
    !!watch('type') &&
    !!watch('code') &&
    !errors.sensorname &&
    !errors.type &&
    !errors.code

  return (
    <>
      <div className='fixed inset-0 z-[100] backdrop-blur-sm bg-black/20 flex items-center justify-center'>
        <div ref={modalRef} className='bg-[#F9F9F9] rounded-xl p-6 shadow-lg w-[50vw]'>
          <h2 className='text-xl font-bold mb-4'>센서 등록</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-5 gap-4'>
              <Controller
                name='sensorname'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='센서 이름'
                    icon={CpuIcon}
                    editable
                    error={errors.sensorname?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='type'
                control={control}
                render={({ field }) => (
                  <SelectField
                    label='센서 타입'
                    icon={Settings2Icon}
                    editable
                    options={typeOptions}
                    value={typeOptions.find((opt) => opt.value === field.value) || null}
                    onChange={(option) => field.onChange(option?.value || '')}
                    error={errors.type?.message}
                  />
                )}
              />
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <SelectField
                    label='센서 상태'
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
                name='code'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='센서 코드'
                    icon={BarcodeIcon}
                    editable
                    error={errors.code?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='kitCode'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='KIT 코드'
                    icon={CpuIcon}
                    editable
                    error={errors.kitCode?.message}
                    {...field}
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
                disabled={!sensorFieldsValid}
                onClick={() => setShowConfirmModal(true)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors ${
                  !sensorFieldsValid
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
          title={`${watch('sensorname') || ''} 센서를 등록하시겠습니까?`}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleSubmit(onSubmit, (errors) => {
            console.error('❌ 센서 등록 유효성 실패:', errors)
          })}
        />
      )}
    </>
  )
}
