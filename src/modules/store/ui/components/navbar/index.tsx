import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import MainNav from './main-nav';
import prismadb from '@/lib/db/prismadb';
import StoreSwitcher from '../store-switcher';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';

const Navbar = async () => {

    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })

    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4'>
                <Link href='/'>
                    <div className='p-4 flex items-center gap-1'>
                        <p className='text-xl font-semibold tracking-tight'>ZERO | HUB</p>
                    </div>
                </Link>
                <MainNav className='mx-6' />
                <div className='ml-auto flex items-center space-x-4'>
                    <Link href='https://zerocart.vercel.app'>
                        <p className='flex gap-2 hover:border-b border-white text-sm cursor-pointer items-center'>
                            <SquareArrowOutUpRight className='size-4' />
                            Visit
                        </p>
                    </Link>
                    <UserButton afterSwitchSessionUrl='/' />
                </div>
            </div>
        </div>
    )
}

export default Navbar