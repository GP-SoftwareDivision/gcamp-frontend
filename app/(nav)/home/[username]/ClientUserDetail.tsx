'use client'

import { useParams, useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mockUserDetails } from '@/mock/data'
import { useEffect, useState } from 'react'
import {
  XIcon,
  CheckIcon,
  HomeIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  Trash2,
  MapPinIcon,
  LocateIcon,
  MailCheckIcon,
  SproutIcon,
} from 'lucide-react'
import AddressSearchModal from '@/components/AddressSearchModal'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import MultiSelectField from '@/components/MultiSelectField'
import AlertModal from '@/components/AlertModal'
import { UserFormValues, userSchema, FarmType } from '@/validation/userSchema'
import EmptyFarmInfoCard from '@/components/EmptyFarmInfoCard'
type OptionType<T = string> = {
  label: string
  value: T
}
const cropOptions: OptionType[] = [
  { label: '토마토', value: 'TOM001' },
  { label: '토마토(일반)', value: 'TOM002' },
  { label: '마스카라', value: 'TOM003' },
  { label: '완숙토마토', value: 'TOM004' },
  { label: '찰토마토', value: 'TOM005' },
  { label: '쿠마토', value: 'TOM006' },
  { label: '릴리앙스', value: 'TOM007' },
  { label: '대저토마토', value: 'TOM008' },
  { label: '기타토마토', value: 'TOM009' },
]

const sensorKitOptions: OptionType<{
  sensorKitId: number
  name: string
  type: string
  code: string
  status: string
  mac: string
}>[] = [
  {
    label: '센서킷11',
    value: {
      sensorKitId: 11,
      name: '센서킷11',
      type: '하우스',
      code: 'sensor-001',
      status: '정상',
      mac: 'E80011223344',
    },
  },
  {
    label: '센서킷2',
    value: {
      sensorKitId: 21,
      name: '센서킷2',
      type: '노지',
      code: 'sensor-002',
      status: '정상',
      mac: 'E80099887766',
    },
  },
  {
    label: '센서킷22',
    value: {
      sensorKitId: 22,
      name: '센서킷22',
      type: '노지',
      code: 'sensor-003',
      status: '정상',
      mac: 'E80044556677',
    },
  },
  {
    label: '센서킷3',
    value: {
      sensorKitId: 3,
      name: '센서킷3',
      type: '하우스',
      code: 'sensorkit-003',
      status: '정상',
      mac: 'E845ACCF5CD1',
    },
  },
  {
    label: '센서킷4',
    value: {
      sensorKitId: 4,
      name: '센서킷4',
      type: '노지',
      code: 'sensorkit-004',
      status: '정상',
      mac: 'E831CDAF7F4C',
    },
  },
  {
    label: '센서킷5',
    value: {
      sensorKitId: 5,
      name: '센서킷5',
      type: '노지',
      code: 'sensorkit-005',
      status: '정상',
      mac: 'E831CDAF7DC4',
    },
  },
]

export default function ClientUserDetailPage() {
  const { username } = useParams()
  const router = useRouter()
  const user = mockUserDetails.find((u) => u.username === String(username))

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: { name: '', username: '', phone: '', email: '', farms: [] },
  })

  const values = watch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFarmIndex, setSelectedFarmIndex] = useState<number | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [deleteFarmIndex, setDeleteFarmIndex] = useState<number | null>(null)

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        phone: user.phone,
        email: user.email,
        farms: user.farmDetails.map((farm) => ({
          farm_name: farm.farmName || '',
          address: farm.address || '',
          zip_code: String(farm.zipCode) || '',
          address_detail: farm.addressDetail || '',
          crop: farm.goodCode || '',
          sensor_name: farm.sensorKitDetails.map((sensor) => sensor.name),
        })),
      })
    }
  }, [user, reset])

  const handleAddFarm = () => {
    setValue(
      'farms',
      [
        ...values.farms,
        {
          farm_name: '',
          address: '',
          zip_code: '',
          address_detail: '',
          crop: '',
          sensor_name: [],
        },
      ],
      { shouldDirty: true, shouldValidate: true }
    )
  }

  const handleFarmChange = (index: number, field: keyof FarmType, value: string | string[]) => {
    const updated = values.farms.map((f, i) => (i === index ? { ...f, [field]: value } : f))
    setValue('farms', updated, { shouldDirty: true, shouldValidate: true })
  }

  const handleDeleteFarm = (index: number) => {
    const updated = values.farms.filter((_, i) => i !== index)
    setValue('farms', updated, { shouldDirty: true, shouldValidate: true })
  }

  const handleAddressComplete = (address: string, zipCode: string) => {
    if (selectedFarmIndex !== null) {
      const updated = values.farms.map((farm, idx) =>
        idx === selectedFarmIndex ? { ...farm, address, zip_code: zipCode } : farm
      )
      setValue('farms', updated, { shouldDirty: true, shouldValidate: true })
    }
    setIsModalOpen(false)
  }

  const onSubmit = () => setShowAlert(true)
  const handleConfirmUpdate = () => {
    setShowAlert(false)
    router.back()
  }

  if (!user) return <div className='text-xl p-8'>존재하지 않는 사용자입니다.</div>

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white p-12 max-w-screen mx-auto h-[calc(100vh-100px)] overflow-y-auto'
    >
      <div className='flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-4 mb-6 gap-2'>
        <h2 className='text-2xl font-semibold text-gray-800'>회원 상세정보</h2>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={handleAddFarm}
            className='cursor-pointer flex items-center gap-2 px-4 py-1.5 border border-gray-300 bg-[#f5f5f5] text-gray-800 rounded-full text-sm hover:bg-gray-200 transition'
          >
            <HomeIcon className='w-4 h-4' />
            추가
          </button>

          <button
            type='button'
            onClick={() => router.back()}
            className='cursor-pointer flex items-center gap-2 px-4 py-1.5 border border-gray-300 bg-[#f5f5f5] text-gray-800 rounded-full text-sm hover:bg-gray-200 transition'
          >
            <XIcon className='w-4 h-4' />
            취소
          </button>

          <button
            type='submit'
            disabled={isSubmitting || !isDirty}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors
              ${
                isSubmitting || !isDirty
                  ? 'bg-gray-300 text-white cursor-not-allowed'
                  : 'bg-gray-900 hover:bg-black text-white cursor-pointer'
              }`}
          >
            <CheckIcon className='w-4 h-4' />
            수정
          </button>
        </div>
      </div>

      {/* 사용자 정보 */}
      <div className='flex flex-col gap-4 p-6 bg-[#F9F9F9] shadow-sm border border-gray-200 rounded-2xl'>
        <h3 className='text-lg font-semibold text-gray-800'>사용자 정보</h3>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <InputField
                label='아이디'
                icon={UserIcon}
                {...field}
                editable={false}
                error={errors.username?.message}
              />
            )}
          />
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputField
                label='이름'
                icon={UserIcon}
                {...field}
                editable
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <InputField
                label='연락처'
                icon={PhoneIcon}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                editable
                error={errors.phone?.message}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <InputField
                label='이메일'
                icon={MailIcon}
                {...field}
                editable
                error={errors.email?.message}
              />
            )}
          />
        </div>
      </div>
      {/* 농장 정보 */}

      {values.farms.length > 0 ? (
        values.farms.map((farm, index) => {
          const usedSensorNames = values.farms.flatMap((f, i) => (i === index ? [] : f.sensor_name))
          const availableSensorOptions = sensorKitOptions.filter(
            (opt) => !usedSensorNames.includes(opt.label)
          )
          return (
            <div
              key={index}
              className='flex flex-col gap-4 p-5 bg-[#F9F9F9] shadow-sm rounded-2xl border border-gray-200 relative mt-6'
            >
              <button
                type='button'
                onClick={() => setDeleteFarmIndex(index)}
                className='cursor-pointer absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 text-sm rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition'
              >
                <Trash2 className='w-4 h-4' /> 삭제
              </button>
              <h3 className='text-lg font-semibold text-gray-800'>{farm.farm_name || `농장`}</h3>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <InputField
                  label='농장명'
                  value={farm.farm_name}
                  onChange={(e) => handleFarmChange(index, 'farm_name', e.target.value)}
                  editable
                  error={errors?.farms?.[index]?.farm_name?.message}
                  icon={HomeIcon}
                />
                <SelectField
                  label='작물명'
                  icon={SproutIcon}
                  options={cropOptions}
                  value={cropOptions.find((opt) => opt.value === farm.crop) || null}
                  onChange={(opt) => handleFarmChange(index, 'crop', opt?.value || '')}
                  error={errors?.farms?.[index]?.crop?.message}
                  editable
                />
                <InputField
                  label='기본주소'
                  icon={MapPinIcon}
                  value={farm.address}
                  onChange={(e) => handleFarmChange(index, 'address', e.target.value)}
                  onFocus={() => {
                    setSelectedFarmIndex(index)
                    setIsModalOpen(true)
                  }}
                  error={errors?.farms?.[index]?.address?.message}
                  editable
                  readOnly
                />
                <InputField
                  label='상세주소'
                  icon={LocateIcon}
                  value={farm.address_detail}
                  onChange={(e) => handleFarmChange(index, 'address_detail', e.target.value)}
                  editable
                  error={errors?.farms?.[index]?.address_detail?.message}
                />
                <InputField
                  label='우편번호'
                  icon={MailCheckIcon}
                  value={farm.zip_code}
                  onChange={(e) => handleFarmChange(index, 'zip_code', e.target.value)}
                  editable
                  error={errors?.farms?.[index]?.zip_code?.message}
                  readOnly
                />
                <MultiSelectField
                  label='센서 KIT'
                  editable
                  options={availableSensorOptions}
                  value={availableSensorOptions.filter((opt) =>
                    farm.sensor_name.includes(opt.label)
                  )}
                  onChange={(selected) =>
                    handleFarmChange(
                      index,
                      'sensor_name',
                      selected.map((s) => s.label)
                    )
                  }
                  error={errors?.farms?.[index]?.sensor_name?.message}
                />
              </div>
            </div>
          )
        })
      ) : (
        <div className='mt-6'>
          <EmptyFarmInfoCard>농장이 존재하지 않습니다.</EmptyFarmInfoCard>
        </div>
      )}

      {/* 모달 & Alert */}
      {isModalOpen && (
        <AddressSearchModal
          onClose={() => setIsModalOpen(false)}
          onComplete={handleAddressComplete}
        />
      )}

      <AlertModal
        open={showAlert}
        type='confirm'
        title={`${values.name || '회원'} 정보를 수정하시겠습니까?`}
        confirmText='확인'
        cancelText='취소'
        onCancel={() => router.back()}
        onConfirm={handleConfirmUpdate}
      />

      <AlertModal
        open={deleteFarmIndex !== null}
        type='error'
        title={`${values.farms[deleteFarmIndex ?? 0]?.farm_name || '농장'}을 삭제하시겠습니까?`}
        confirmText='삭제'
        cancelText='취소'
        onCancel={() => setDeleteFarmIndex(null)}
        onConfirm={() => {
          if (deleteFarmIndex !== null) handleDeleteFarm(deleteFarmIndex)
          setDeleteFarmIndex(null)
        }}
      />
    </form>
  )
}
