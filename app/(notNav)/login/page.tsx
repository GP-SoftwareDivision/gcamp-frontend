'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

interface LoginFormValues {
  username: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    mode: 'onChange',
  })

  const { username, password } = watch()

  const isValid = username?.trim() !== '' && password?.trim() !== ''

  const onSubmit = (data: LoginFormValues) => {
    console.log('✅ 로그인 데이터:', data)
    router.push('/home') // 로그인 API 연결 시 수정
  }

  return (
    <div className='flex h-full flex-1'>
      <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <Image
              alt='GCAMP Logo'
              src='https://www.goldenplanet.co.kr/images/logo.png'
              width={350}
              height={350}
            />
          </div>

          <div className='mt-10'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              {/* 아이디 */}
              <div>
                <label htmlFor='username' className='block text-sm font-medium text-gray-800'>
                  아이디
                </label>
                <div className='mt-2'>
                  <input
                    id='username'
                    {...register('username')}
                    className='block w-full rounded-xl bg-white px-3 py-2.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 sm:text-sm'
                    placeholder='아이디'
                  />
                </div>
              </div>

              {/* 비밀번호 */}
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-800'>
                  비밀번호
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    type='password'
                    {...register('password')}
                    className='block w-full rounded-xl bg-white px-3 py-2.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 sm:text-sm'
                    placeholder='비밀번호'
                  />
                </div>
              </div>

              {/* 로그인 버튼 */}
              <div>
                <button
                  type='submit'
                  disabled={!isValid || isSubmitting}
                  className={`flex w-full justify-center items-center gap-2 py-3 rounded-xl px-3 text-sm font-semibold text-white shadow-sm transition-colors ${
                    isValid
                      ? 'bg-black hover:bg-black cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 배경 이미지 */}
      <div className='relative hidden w-0 flex-1 lg:block'>
        <Image
          alt=''
          src='https://www.goldenplanet.co.kr/images/index/sect2-img0.png'
          className='absolute inset-0 size-full object-cover'
          width={1000}
          height={1000}
        />
      </div>
    </div>
  )
}
