import { Globe } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AuthHeader = () => {
  return (
    <header className="container mx-auto py-4 px-4 md:px-6 relative z-10">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#0ea5e9] blur-lg opacity-70 rounded-full"></div>
            <Globe className="h-8 w-8 text-white relative z-10" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#0ea5e9] text-transparent bg-clip-text">
            ZERO | HUB
          </span>
        </Link>
      </div>
    </header>
  )
}

export default AuthHeader