interface SignUpFormProps {
    signUpWithEmail: ({ emailAddress, password }: { emailAddress: string, password: string }) => void
    clerkError: string
}

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Globe } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const SignupForm = ({ signUpWithEmail, clerkError }: SignUpFormProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#050A18] text-white flex flex-col">
            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none"></div>
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#FF3D00]/30 via-[#FF00E5]/20 to-transparent blur-3xl opacity-40 pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-0 right-0 w-full h-[500px] bg-gradient-to-tl from-[#00FFD1]/30 via-[#7000FF]/20 to-transparent blur-3xl opacity-40 pointer-events-none animate-pulse"></div>

            <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full border border-[#FF00E5]/20 animate-[spin_20s_linear_infinite] pointer-events-none"></div>
            <div className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-[#00FFD1]/20 animate-[spin_30s_linear_infinite_reverse] pointer-events-none"></div>

            <header className="container mx-auto py-4 px-4 md:px-6 relative z-10">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
                            <Globe className="h-8 w-8 text-white relative z-10" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                            WebifyPro
                        </span>
                    </Link>
                </div>
            </header>


            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-75"></div>
                        <div className="relative bg-[#0A1228]/90 rounded-lg p-8 shadow-xl backdrop-blur-sm">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                                    Create an Account
                                </h1>
                                <p className="text-[#A4B8D3] mt-2">Join WebifyPro and start building your online presence</p>
                            </div>
                            <form className="space-y-6" onSubmit={(e) => {
                                e.preventDefault();
                                const target = e.target as typeof e.target & {
                                    email: { value: string };
                                    password: { value: string };
                                }
                                const email = target.email.value;
                                const password = target.password.value;
                                signUpWithEmail({ emailAddress: email, password: password })
                            }}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-white">
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            className="bg-[#050A18] border-[#1E293B] focus:border-[#FF00E5] focus:ring-[#FF00E5] text-white placeholder:text-[#A4B8D3]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-white">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            className="bg-[#050A18] border-[#1E293B] focus:border-[#FF00E5] focus:ring-[#FF00E5] text-white placeholder:text-[#A4B8D3]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        className="bg-[#050A18] border-[#1E293B] focus:border-[#FF00E5] focus:ring-[#FF00E5] text-white placeholder:text-[#A4B8D3]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company" className="text-white">
                                        Company Name (Optional)
                                    </Label>
                                    <Input
                                        id="company"
                                        placeholder="Your Business"
                                        className="bg-[#050A18] border-[#1E293B] focus:border-[#FF00E5] focus:ring-[#FF00E5] text-white placeholder:text-[#A4B8D3]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-white">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="bg-[#050A18] border-[#1E293B] focus:border-[#FF00E5] focus:ring-[#FF00E5] text-white placeholder:text-[#A4B8D3] pr-10"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A4B8D3] hover:text-white"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-[#A4B8D3]">
                                        Password must be at least 8 characters long with a number and a special character.
                                    </p>
                                </div>

                                <div className="flex items-start space-x-2">
                                    <Checkbox id="terms" className="mt-1" />
                                    <Label htmlFor="terms" className="text-sm text-[#A4B8D3]">
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-[#FF00E5] hover:underline">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-[#FF00E5] hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </Label>
                                </div>

                                <Button className="w-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_15px_rgba(255,61,0,0.4)]" type='submit'>
                                    Create Account
                                </Button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-[#1E293B]"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="bg-[#0A1228] px-2 text-[#A4B8D3]">Or sign up with</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="border-[#1E293B] text-white hover:bg-[#1E293B]/50">
                                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                        Google
                                    </Button>
                                    <Button variant="outline" className="border-[#1E293B] text-white hover:bg-[#1E293B]/50">
                                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                                        </svg>
                                        Facebook
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                <p className="text-[#A4B8D3]">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-[#FF00E5] hover:underline font-medium">
                                        Sign in
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

export default SignupForm