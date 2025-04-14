"use client"

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import GoogleFacebook from '../google-facebook'
import DecorativeElements from '@/components/decorative-elements'
import AnimatedShapes from '@/components/animated-shapes'
import AuthHeader from '../auth-header'

const Signin = () => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col">
      <DecorativeElements />
      <AnimatedShapes />
      <AuthHeader />
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7c3aed] via-[#0ea5e9] to-[#10b981] rounded-lg blur opacity-75"></div>
            <div className="relative bg-[#0f172a]/90 rounded-lg p-8 shadow-xl backdrop-blur-sm">

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#0ea5e9] text-transparent bg-clip-text">
                  Welcome Back
                </h1>
                <p className="text-[#94a3b8] mt-2">Sign in to your ZERO | HUB account</p>
              </div>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-[#0f172a] border-[#1e293b] focus:border-[#7c3aed] focus:ring-[#7c3aed] text-white placeholder:text-[#94a3b8]"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Link href="/forgot-password" className="text-sm text-[#0ea5e9] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-[#0f172a] border-[#1e293b] focus:border-[#7c3aed] focus:ring-[#7c3aed] text-white placeholder:text-[#94a3b8] pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm text-[#94a3b8]">
                    Remember me for 30 days
                  </Label>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#7c3aed] to-[#0ea5e9] hover:opacity-90 text-white border-0 shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                  Sign In
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1e293b]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-[#0f172a] px-2 text-[#94a3b8]">Or continue with</span>
                  </div>
                </div>
                <GoogleFacebook />
              </form>
              <div className="mt-6 text-center text-sm">
                <p className="text-[#94a3b8]">
                  Don't have an account?{" "}
                  <Link href="/sign-up" className="text-[#0ea5e9] hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin