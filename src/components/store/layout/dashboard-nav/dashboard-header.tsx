"use client"

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserButton, useUser } from '@clerk/nextjs';
import { BarChart3, Bell, CreditCard, Globe, Grid3X3, HelpCircle, Layers, LineChart, Menu, Package, Search, Settings, ShoppingBag, Tag, Users } from 'lucide-react'
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useState } from 'react';

interface DashboardHeaderProps {
    searchPlaceholder?: string;
}

const DashboardHeader = ({ searchPlaceholder }: DashboardHeaderProps) => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user } = useUser();
    const { storeId } = useParams();
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`)
    }

    const navItems = [
        { href: `/store/${storeId}`, label: "Dashboard", icon: BarChart3 },
        { href: `/store/${storeId}/analytics`, label: "Analytics", icon: LineChart },
        { href: `/store/${storeId}/products`, label: "Products", icon: Package },
        { href: `/store/${storeId}/categories`, label: "Categories", icon: Tag },
        { href: `/store/${storeId}/subcategories`, label: "Subcategories", icon: Grid3X3 },
        { href: `/store/${storeId}/collections`, label: "Collections", icon: Layers },
        { href: `/store/${storeId}/orders`, label: "Orders", icon: ShoppingBag },
        { href: `/store/${storeId}/customers`, label: "Customers", icon: Users },
        { href: `/store/${storeId}/payments`, label: "Payments", icon: CreditCard },
    ];

    return (
        <>
            <header className="h-16 border-b border-[#1E293B] bg-[#050A18]/80 backdrop-blur-sm flex items-center justify-between px-4">
                <div className="flex items-center md:hidden">
                    <Button variant="ghost" size="icon" className="mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu className="h-5 w-5 text-[#A4B8D3]" />
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
                        <Globe className="h-6 w-6 text-white relative z-10" />
                    </div>
                </div>

                <div className="text-lg font-medium hidden md:block"></div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                        <input
                            type="search"
                            placeholder={searchPlaceholder || "Search..."}
                            className="w-64 h-9 rounded-md border border-[#1E293B] bg-[#0A1228] py-2 pl-10 pr-4 text-sm text-white placeholder:text-[#A4B8D3] focus:outline-none focus:ring-1 focus:ring-[#FF00E5]"
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5 text-[#A4B8D3]" />
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF3D00]"></span>
                    </Button>

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] p-[2px]">
                            <div className="w-full h-full rounded-full bg-[#0A1228] flex items-center justify-center">
                                <span className="text-xs font-bold text-[#FF3D00] flex items-center justify-center">
                                    <UserButton />
                                </span>
                            </div>
                        </div>
                        <span className="text-sm font-medium hidden md:inline-block">{`${user?.firstName || ""} ${user?.lastName || ""}`}</span>
                    </div>
                </div>
            </header>
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                    <div className="fixed inset-y-0 left-0 w-64 bg-[#0A1228]/95 border-r border-[#1E293B] p-4 overflow-y-auto">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
                                <Globe className="h-8 w-8 text-white relative z-10" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                                ZERO | HUB
                            </span>
                        </div>
                        <nav className="space-y-1 flex-1">
                            {navItems.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors",
                                        isActive(href) && "bg-[#FF00E5]/10 text-[#FF00E5] font-medium"
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{label}</span>
                                </Link>
                            ))}
                        </nav>
                        <div className="pt-4 border-t border-[#1E293B] mt-6">
                            <Link
                                href={`/store/${storeId}/settings`}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors",
                                    isActive(`/store/${storeId}/settings`) && "bg-[#FF00E5]/10 text-[#FF00E5] font-medium",
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Settings className="h-5 w-5" />
                                <span>Settings</span>
                            </Link>
                            <Link
                                href="/docs"
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <HelpCircle className="h-5 w-5" />
                                <span>Help & Documentation</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DashboardHeader