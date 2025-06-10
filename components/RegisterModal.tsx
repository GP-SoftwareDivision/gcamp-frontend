'use client'

import { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signSchema, SignFormValues } from '@/validation/signUpSchema'
import InputField from '@/components/InputField'
import SelectField from '@/components/SelectField'
import MultiSelectField from '@/components/MultiSelectField'
import AddressSearchModal from '@/components/AddressSearchModal'
import AlertModal from '@/components/AlertModal'

import {
  MailIcon,
  PhoneIcon,
  UserIcon,
  KeyIcon,
  LockIcon,
  XIcon,
  CheckIcon,
  MapPin,
  LocateIcon,
  MailCheckIcon,
  SproutIcon,
  Eye,
  EyeOff,
  HomeIcon,
} from 'lucide-react'

export interface SensorKitType {
  sensorKitId: number
  name: string
  type: string
  code: string
  status: string
  mac: string
}

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

const sensorKitOptions: OptionType<SensorKitType>[] = [
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

interface RegisterModalProps {
  onClose: () => void
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignFormValues>({
    resolver: zodResolver(signSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      newPassword: '',
      confirmationPassword: '',
      name: '',
      email: '',
      phone: '',
      farmRegisterReq: [],
    },
  })

  const onSubmit = (data: SignFormValues) => {
    const cleanedPhone = data.phone.replace(/-/g, '')
    const updatedData = {
      ...data,
      phone: cleanedPhone,
    }

    console.log('✅ 회원가입 정보 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓')
    console.log(JSON.stringify(updatedData, null, 2))
    console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑')

    alert('회원가입 성공!')
    onClose()
  }

  const userFieldsValid =
    !!watch('username') &&
    !!watch('newPassword') &&
    !!watch('confirmationPassword') &&
    !!watch('name') &&
    !!watch('email') &&
    !!watch('phone') &&
    !errors.username &&
    !errors.newPassword &&
    !errors.confirmationPassword &&
    !errors.name &&
    !errors.email &&
    !errors.phone

  const handleAddressComplete = (address: string, zonecode: string) => {
    setValue('farmRegisterReq.0.address', address)
    setValue('farmRegisterReq.0.zipCode', zonecode)
    setShowAddressModal(false)
  }

  return (
    <>
      <div className='fixed inset-0 z-[100] backdrop-blur-sm bg-black/20 flex items-center justify-center'>
        <div ref={modalRef} className='bg-[#F9F9F9] rounded-xl p-6 shadow-lg w-[40vw]'>
          <h2 className='text-xl font-bold mb-4'>회원 등록</h2>
          <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
            <h1 className='col-span-2 text-base font-semibold text-gray-700 mt-4'>
              회원정보(필수)
            </h1>
            <div className='grid grid-cols-2 gap-4'>
              <Controller
                name='username'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='아이디'
                    icon={UserIcon}
                    editable
                    error={errors.username?.message}
                    {...field}
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
                    editable
                    error={errors.name?.message}
                    {...field}
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
                    editable
                    error={errors.email?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='phone'
                control={control}
                render={({ field }) => {
                  const formatPhone = (value: string) => {
                    const onlyNums = value.replace(/[^\d]/g, '').slice(0, 11)
                    if (onlyNums.length < 4) return onlyNums
                    if (onlyNums.length < 8) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
                    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7)}`
                  }
                  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const formatted = formatPhone(e.target.value)
                    field.onChange(formatted)
                  }
                  return (
                    <InputField
                      label='연락처'
                      icon={PhoneIcon}
                      editable
                      error={errors.phone?.message}
                      value={field.value}
                      onChange={handlePhoneChange}
                    />
                  )
                }}
              />
              <Controller
                name='newPassword'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='비밀번호'
                    icon={KeyIcon}
                    editable
                    type={showPassword ? 'text' : 'password'}
                    error={errors.newPassword?.message}
                    suffixIcon={
                      showPassword ? (
                        <Eye className='size-4 text-gray-700' />
                      ) : (
                        <EyeOff className='size-4 text-gray-400' />
                      )
                    }
                    onSuffixClick={() => setShowPassword(!showPassword)}
                    {...field}
                  />
                )}
              />
              <Controller
                name='confirmationPassword'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='비밀번호 확인'
                    icon={LockIcon}
                    editable
                    type={showConfirmPassword ? 'text' : 'password'}
                    error={errors.confirmationPassword?.message}
                    suffixIcon={
                      showConfirmPassword ? (
                        <Eye className='size-4 text-gray-700' />
                      ) : (
                        <EyeOff className='size-4 text-gray-400' />
                      )
                    }
                    onSuffixClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    {...field}
                  />
                )}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <h1 className='col-span-2 text-base font-semibold text-gray-700'>농장 정보 (선택)</h1>
              <Controller
                name='farmRegisterReq.0.farmName'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='농장명'
                    icon={HomeIcon}
                    editable
                    error={errors?.farmRegisterReq?.[0]?.farmName?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='farmRegisterReq.0.address'
                control={control}
                render={({ field }) => (
                  <div onClick={() => setShowAddressModal(true)}>
                    <InputField
                      label='주소'
                      icon={MapPin}
                      editable
                      error={errors?.farmRegisterReq?.[0]?.address?.message}
                      {...field}
                      readOnly
                    />
                  </div>
                )}
              />
              <Controller
                name='farmRegisterReq.0.addressDetail'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='상세주소'
                    icon={LocateIcon}
                    editable
                    error={errors?.farmRegisterReq?.[0]?.addressDetail?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name='farmRegisterReq.0.zipCode'
                control={control}
                render={({ field }) => (
                  <InputField
                    icon={MailCheckIcon}
                    label='우편번호'
                    editable
                    error={errors?.farmRegisterReq?.[0]?.zipCode?.message}
                    {...field}
                    readOnly
                  />
                )}
              />
              <Controller
                name='farmRegisterReq.0.goodCode'
                control={control}
                render={({ field }) => (
                  <SelectField
                    label='작물'
                    editable
                    icon={SproutIcon}
                    options={cropOptions}
                    value={cropOptions.find((opt) => opt.value === field.value) || null}
                    onChange={(option) => field.onChange(option?.value || '')}
                    error={errors?.farmRegisterReq?.[0]?.goodCode?.message}
                  />
                )}
              />
              <Controller
                name='farmRegisterReq.0.sensorKitCode'
                control={control}
                render={({ field }) => (
                  <MultiSelectField
                    label='센서 KIT'
                    editable
                    options={sensorKitOptions}
                    value={sensorKitOptions.filter((opt) =>
                      (field.value ?? []).includes(opt.label)
                    )}
                    onChange={(selected) => field.onChange(selected.map((s) => s.label))}
                    error={errors?.farmRegisterReq?.[0]?.sensorKitCode?.message}
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
                disabled={!userFieldsValid}
                onClick={() => setShowConfirmModal(true)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors ${
                  !userFieldsValid
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

      {showAddressModal && (
        <AddressSearchModal
          onClose={() => setShowAddressModal(false)}
          onComplete={handleAddressComplete}
        />
      )}

      {showConfirmModal && (
        <AlertModal
          open={showConfirmModal}
          type='confirm'
          title={`${watch('name') || '회원'}님을 등록하시겠습니까?`}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleSubmit(onSubmit)}
        />
      )}
    </>
  )
}
