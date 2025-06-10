'use client'

import { useParams, useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { XIcon, CheckIcon, SproutIcon, CpuIcon, BarcodeIcon, PlugIcon } from 'lucide-react'

import AlertModal from '@/components/AlertModal'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import { SensorDetailsFormValues, sensorDetailSchema } from '@/validation/sensorSchema'
import { sensorTypeData } from '@/mock/sensorData'

const statusOptions = [
  { label: '정상', value: 'STATUS001' },
  { label: '비정상', value: 'STATUS002' },
  { label: '점검중', value: 'STATUS003' },
  { label: '불량', value: 'STATUS004' },
  { label: '폐기', value: 'STATUS005' },
]

export default function ClientDataSensorDetialPage() {
  const { code } = useParams()
  const router = useRouter()
  const isNew = code === 'new'
  const [showAlert, setShowAlert] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<SensorDetailsFormValues>({
    resolver: zodResolver(sensorDetailSchema),
    mode: 'onChange',
    defaultValues: {
      sensorname: '',
      type: '',
      code: '',
      status: undefined,
      sensorKits: [],
    },
  })

  useEffect(() => {
    if (!isNew) {
      const sensor = sensorTypeData.find((s) => String(s.code) === String(code))
      if (sensor) {
        const allowedStatuses = ['STATUS001', 'STATUS002', 'STATUS003', 'STATUS004', 'STATUS005']
        const safeStatus = allowedStatuses.includes(sensor.status ?? '')
          ? (sensor.status as SensorDetailsFormValues['status'])
          : 'STATUS001'

        reset({
          sensorname: sensor.name,
          type: sensor.typeLabel, // ✅ typeLabel로 실제 이름 표시
          code: sensor.code,
          status: safeStatus,
          sensorKits: sensor.sensorKit
            ? [
                {
                  sensorKitId: sensor.sensorKit.sensorKitId!,
                  name: sensor.sensorKit.name ?? '',
                  type: sensor.sensorKit.type ?? '',
                  code: sensor.sensorKit.code ?? '', // ✅ 센서킷 코드
                  status: sensor.sensorKit.status ?? '',
                  mac: sensor.sensorKit.mac ?? '',
                },
              ]
            : [],
        })
      }
    }
  }, [code, reset, isNew])

  const onSubmit = () => {
    setShowAlert(true)
  }

  const handleConfirmSubmit = () => {
    setShowAlert(false)
    router.back()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white p-12 max-w-screen mx-auto h-[calc(100vh-100px)] overflow-y-auto'
    >
      <div className='flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-4 mb-6 gap-2'>
        <h2 className='text-2xl font-semibold text-gray-800'>
          {isNew ? '센서 등록' : '센서 상세 정보'}
        </h2>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => router.back()}
            className='cursor-pointer flex items-center gap-2 px-4 py-1.5 border border-gray-300 bg-[#f9f9f9] text-gray-800 rounded-full text-sm hover:bg-gray-100 transition'
          >
            <XIcon className='w-4 h-4' />
            취소
          </button>
          <button
            type='submit'
            disabled={isSubmitting || !isDirty || Object.keys(errors).length > 0}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors
              ${
                isSubmitting || !isDirty || Object.keys(errors).length > 0
                  ? 'bg-gray-300 text-white cursor-not-allowed'
                  : 'bg-gray-900 hover:bg-black text-white cursor-pointer'
              }`}
          >
            <CheckIcon className='w-4 h-4' />
            {isNew ? '등록' : '수정'}
          </button>
        </div>
      </div>

      {/* 센서 정보 카드 */}
      <div className='flex flex-col gap-6 min-w-[78.5vw]'>
        <div className='flex flex-col gap-4 p-4 bg-[#F9F9F9] shadow-sm border border-gray-200 rounded-2xl'>
          <h3 className='text-lg font-semibold text-gray-800'>센서 정보</h3>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
            <Controller
              name='sensorname'
              control={control}
              render={({ field }) => (
                <InputField
                  label='센서 이름'
                  icon={CpuIcon}
                  {...field}
                  editable={true}
                  error={errors.sensorname?.message}
                />
              )}
            />
            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <InputField
                  label='센서 타입'
                  icon={SproutIcon}
                  {...field}
                  editable={true}
                  error={errors.type?.message}
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
                  {...field}
                  editable={true}
                  error={errors.code?.message}
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
                  editable={true}
                  options={statusOptions}
                  value={statusOptions.find((opt) => opt.value === field.value) || null}
                  onChange={(opt) => field.onChange(opt?.value)}
                  error={errors.status?.message}
                />
              )}
            />
            <Controller
              name='sensorKits.0.code'
              control={control}
              render={({ field }) => (
                <InputField
                  label='센서 KIT'
                  icon={PlugIcon}
                  {...field}
                  editable={false}
                  error={errors.sensorKits?.[0]?.code?.message}
                />
              )}
            />
          </div>
        </div>
      </div>

      <AlertModal
        open={showAlert}
        type='confirm'
        title={`${watch('sensorname') || '센서'} 정보를 ${isNew ? '등록' : '수정'}하시겠습니까?`}
        confirmText='확인'
        cancelText='취소'
        onCancel={() => setShowAlert(false)}
        onConfirm={handleConfirmSubmit}
      />
    </form>
  )
}
