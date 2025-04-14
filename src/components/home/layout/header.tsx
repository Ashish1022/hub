"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { Globe, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);
    const router = useRouter();

    const handleClick = ()=>{
        router.push('/store')
    }

    return (
        <header className="container mx-auto py-4 px-4 md:px-6 relative z-20">
            {/* Background Blur Overlay */}
            {menuOpen && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-lg z-10" onClick={closeMenu}></div>
            )}

            <div className="flex items-center justify-between relative z-20">
                <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
                        <Globe className="h-8 w-8 text-white relative z-10" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                    ZERO | HUB
                    </span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="#features" className="text-sm hover:text-[#FF3D00] transition-colors">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm hover:text-[#FF00E5] transition-colors">
                        Pricing
                    </Link>
                    <Link href="#testimonials" className="text-sm hover:text-[#00FFD1] transition-colors">
                        Testimonials
                    </Link>
                    <Link href="#faq" className="text-sm hover:text-[#7000FF] transition-colors">
                        FAQ
                    </Link>
                    <Link href="/docs" className="text-sm hover:text-[#FF3D00] transition-colors">
                        Docs
                    </Link>
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/sign-in" className="text-sm hover:text-[#FF3D00] transition-colors">
                        Login
                    </Link>
                    <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_20px_rgba(255,61,0,0.4)]" onClick={handleClick}>
                        Get Started
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <nav className="md:hidden absolute top-16 left-0 w-full p-4 flex flex-col items-center gap-4 shadow-lg z-20">
                    <Link href="#features" className="text-sm text-white hover:text-[#FF3D00] transition-colors" onClick={closeMenu}>
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm text-white hover:text-[#FF00E5] transition-colors" onClick={closeMenu}>
                        Pricing
                    </Link>
                    <Link href="#testimonials" className="text-sm text-white hover:text-[#00FFD1] transition-colors" onClick={closeMenu}>
                        Testimonials
                    </Link>
                    <Link href="#faq" className="text-sm text-white hover:text-[#7000FF] transition-colors" onClick={closeMenu}>
                        FAQ
                    </Link>
                    <Link href="/docs" className="text-sm text-white hover:text-[#FF3D00] transition-colors" onClick={closeMenu}>
                        Docs
                    </Link>
                    <Link href="/sign-in" className="text-sm text-white hover:text-[#FF3D00] transition-colors" onClick={closeMenu}>
                        Login
                    </Link>
                    <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_20px_rgba(255,61,0,0.4)] w-full" onClick={closeMenu}>
                        Get Started
                    </Button>
                </nav>
            )}
        </header>
    )
}

export default Header