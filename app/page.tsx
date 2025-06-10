'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('YOUR_ACCESS_TOKEN')

    if (!token) {
      router.replace('/login')
    } else {
      router.replace('/home')
    }
  }, [router])
}
