"use client"

import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useState } from 'react'

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {

    const pathname = usePathname();
    const { storeId } = useParams();

    const routes = [
        {
            href: `/store/${storeId}`,
            label: 'Dashboard',
            active: pathname === `/store/${storeId}`,
        },
        {
            href: `/store/${storeId}/analytics`,
            label: 'Analytics',
            active: pathname === `/store/${storeId}/analytics`,
        },
        {
            href: `/store/${storeId}/collections`,
            label: 'Collections',
            active: pathname === `/store/${storeId}/collections`,
        },
        {
            href: `/store/${storeId}/categories`,
            label: 'Categories',
            active: pathname === `/store/${storeId}/categories`,
        },
        {
            href: `/store/${storeId}/subcategories`,
            label: 'Sub categories',
            active: pathname === `/store/${storeId}/subcategories`,
        },
        {
            href: `/store/${storeId}/products`,
            label: 'Products',
            active: pathname === `/store/${storeId}/products`,
        },
        {
            href: `/store/${storeId}/orders`,
            label: 'Orders',
            active: pathname === `/store/${storeId}/orders`,
        },
        {
            href: `/store/${storeId}/settings`,
            label: 'Settings',
            active: pathname === `/store/${storeId}/settings`,
        },
    ]

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeSheet = () => setIsOpen(false);

    return (
        <>
            <nav className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)}>
                {routes.map((route) => (
                    <Link key={route.href} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                        {route.label}
                    </Link>
                ))}
            </nav>
            <nav className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <button>
                            <Menu />
                        </button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="flex flex-col gap-6 backdrop-blur-xl shadow-xl"
                    >
                        <SheetTitle>
                            <Link href='/'>
                                <div className='p-4 flex items-center gap-1'>
                                    <p className='text-xl font-semibold tracking-tight'>ZERO | HUB</p>
                                </div>
                            </Link>
                        </SheetTitle>
                        <Separator />
                        {routes.map((route) => (
                            <SheetClose key={route.href} asChild>
                                <Link href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-white" : "text-muted-foreground")}>
                                    {route.label}
                                </Link>
                            </SheetClose>
                        ))}
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    )
}

export default MainNav