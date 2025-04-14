import { Globe } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#050A18] border-t border-[#1E293B] py-12 px-4 md:px-6 relative z-10">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
                                <Globe className="h-6 w-6 text-white relative z-10" />
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                                WebifyPro
                            </span>
                        </Link>
                        <p className="text-[#A4B8D3] mb-4">The all-in-one platform to establish and grow your business online.</p>
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="w-8 h-8 rounded-full bg-[#0A1228] flex items-center justify-center text-[#A4B8D3] hover:text-[#FF3D00] hover:bg-[#0A1228]/80 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                className="w-8 h-8 rounded-full bg-[#0A1228] flex items-center justify-center text-[#A4B8D3] hover:text-[#FF00E5] hover:bg-[#0A1228]/80 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                className="w-8 h-8 rounded-full bg-[#0A1228] flex items-center justify-center text-[#A4B8D3] hover:text-[#7000FF] hover:bg-[#0A1228]/80 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                className="w-8 h-8 rounded-full bg-[#0A1228] flex items-center justify-center text-[#A4B8D3] hover:text-[#00FFD1] hover:bg-[#0A1228]/80 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect width="4" height="12" x="2" y="9"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-white">Product</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors">
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors">
                                    Integrations
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors">
                                    Enterprise
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-white">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors">
                                    Tutorials
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] transition-colors">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-white">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#1E293B] pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-[#A4B8D3] text-sm">&copy; {new Date().getFullYear()} WebifyPro. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-[#A4B8D3] hover:text-[#FF00E5] text-sm transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-[#A4B8D3] hover:text-[#7000FF] text-sm transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
