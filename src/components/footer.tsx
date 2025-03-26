import { Globe } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#050A18] border-t border-[#1E293B] py-8 px-4 md:px-6 relative z-10">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
                                <Globe className="h-6 w-6 text-white relative z-10" />
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                            ZERO | HUB
                            </span>
                        </Link>
                        <p className="text-[#A4B8D3] mb-4 text-sm md:text-base">The all-in-one platform to establish and grow your business online.</p>
                        <div className="flex gap-3 flex-wrap">
                            {["#FF3D00", "#FF00E5", "#7000FF", "#00FFD1"].map((color, index) => (
                                <Link key={index} href="#" className={`w-8 h-8 rounded-full bg-[#0A1228] flex items-center justify-center text-[#A4B8D3] hover:text-[${color}] hover:bg-[#0A1228]/80 transition-colors`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                        <circle cx="12" cy="12" r="10"></circle>
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    </div>
                    {[
                        { title: "Product", links: ["Features", "Pricing", "Templates", "Integrations", "Enterprise"] },
                        { title: "Resources", links: ["Blog", "Documentation", "Community", "Tutorials", "Support"] },
                        { title: "Company", links: ["About", "Careers", "Contact", "Privacy Policy", "Terms of Service"] }
                    ].map((section, index) => (
                        <div key={index}>
                            <h3 className="font-bold text-lg mb-4 text-white">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] transition-colors text-sm md:text-base">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-[#1E293B] pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <p className="text-[#A4B8D3] text-xs md:text-sm">&copy; {new Date().getFullYear()} ZERO | HUB. All rights reserved.</p>
                    <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((policy, index) => (
                            <Link key={index} href="#" className="text-[#A4B8D3] hover:text-[#FF3D00] text-xs md:text-sm transition-colors">
                                {policy}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
