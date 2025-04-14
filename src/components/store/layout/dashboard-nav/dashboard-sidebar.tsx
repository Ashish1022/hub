"use client"

import { cn } from '@/lib/utils';
import { BarChart3, CreditCard, Globe, Grid3X3, HelpCircle, Layers, LineChart, Package, Settings, ShoppingBag, Tag, Users } from 'lucide-react'
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'

const DashboardSidebar = () => {

    const { storeId } = useParams();
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || (path !== `/store/${storeId}` && pathname.startsWith(`${path}/`));
    };    

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
        <aside className="hidden md:flex md:w-64 lg:w-72 flex-col bg-[#0A1228]/80 border-r border-[#1E293B] p-4">
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
                >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </Link>
                <Link
                    href="/docs"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
                >
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Documentation</span>
                </Link>
            </div>
        </aside>
    )
}

export default DashboardSidebar