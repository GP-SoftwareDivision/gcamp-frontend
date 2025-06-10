'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  UserCircle,
  MonitorSmartphone,
  Cpu,
  BellRing,
  HelpCircle,
  History,
  LogOut,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import AlertModal from '@/components/AlertModal'
import { motion } from 'framer-motion'

const navigation = [
  { name: '회원정보', href: '/home', icon: UserCircle },
  { name: '센서정보', href: '/dataSensor', icon: MonitorSmartphone },
  { name: '센서킷관리', href: '/sensorKit', icon: Cpu },
  { name: '알림내역', href: '/notification', icon: BellRing },
  { name: '문의사항', href: '/inquiry', icon: HelpCircle },
  { name: '이력관리', href: '/log', icon: History },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NavigationSidebar({
  isHovered,
  setIsHovered,
}: {
  isHovered: boolean
  setIsHovered: (value: boolean) => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [showLogoutAlert, setShowLogoutAlert] = useState(false)

  const handleLogout = () => {
    setShowLogoutAlert(false)
    router.push('/login')
  }

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: -10 }}
      animate={{ width: isHovered ? 180 : 64, opacity: isHovered ? 1 : 0.9 }}
      transition={{ type: 'tween', duration: 0.2 }}
      className='hidden lg:fixed lg:inset-y-2 lg:z-50 lg:flex lg:flex-col ml-4 overflow-hidden items-center bg-white border border-gray-300 rounded-xl shadow-sm'
    >
      <div className='flex grow flex-col overflow-y-auto w-full py-4'>
        <div className='flex h-16 items-center justify-center'>
          <Image
            className='mb-4'
            alt='GCAMP Logo'
            src={isHovered ? '/images/logo.png' : '/images/smallLogo.png'}
            width={isHovered ? 135 : 36}
            height={36}
          />
        </div>

        <nav className='flex flex-1 flex-col justify-between'>
          <ul role='list' className='flex flex-col gap-y-4'>
            <li>
              <ul role='list' className='space-y-4'>
                {navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          'group flex items-center gap-x-4 py-3 text-sm font-medium transition-all duration-150 rounded-xl relative overflow-hidden',
                          isHovered ? 'pl-4 pr-2 justify-start' : 'justify-center',
                          isActive
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        )}
                      >
                        {isActive && isHovered && (
                          <span className='absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-gray-800' />
                        )}
                        <item.icon
                          className={classNames(
                            'w-6 h-6 shrink-0',
                            isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-700'
                          )}
                        />
                        {isHovered && <span className='truncate'>{item.name}</span>}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          </ul>

          <div className='pt-6'>
            <button
              type='button'
              onClick={() => setShowLogoutAlert(true)}
              className={classNames(
                'cursor-pointer flex items-center gap-x-4 py-3 w-full text-sm font-medium text-gray-800 hover:text-black transition-all duration-150 rounded-xl',
                isHovered ? 'pl-4 pr-2 justify-start' : 'justify-center'
              )}
            >
              <LogOut className='w-6 h-6 shrink-0 text-gray-500 group-hover:text-black' />
              {isHovered && <span>로그아웃</span>}
            </button>
          </div>
        </nav>
      </div>

      <AlertModal
        open={showLogoutAlert}
        type='error'
        title='로그아웃 하시겠습니까?'
        confirmText='로그아웃'
        cancelText='취소'
        onCancel={() => setShowLogoutAlert(false)}
        onConfirm={handleLogout}
      />
    </motion.div>
  )
}
