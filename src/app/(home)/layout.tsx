import prismadb from '@/lib/db/prismadb';
import { HomeLayout } from '@/modules/home/ui/layout/home-layout'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const Layout = async ({
    children
}: {
    children: React.ReactNode
}) => {

    const { userId } = await auth();

    if (userId) {
        const store = await prismadb.store.findFirst({
            where: {
                userId: userId
            }
        });
        if (store) {
            redirect(`/store`);
        }
    }

    return (
        <HomeLayout>
            {children}
        </HomeLayout>
    )
}

export default Layout