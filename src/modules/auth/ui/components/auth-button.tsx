"use client"

import { Button } from '@/components/ui/button'
import { UserCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AuthButton = () => {

  const router = useRouter()

  const handleClick = () => {
    router.push('/sign-in')
  }

  return (
    <Button className='px-4 py-2 text-sm font-medium rounded-xl shadow-none' onClick={handleClick}>
      <UserCircleIcon />
      Sign up
    </Button>
  )
}

export default AuthButton