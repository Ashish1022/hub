import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsForm from './_components/settings-form';
import prismadb from '@/lib/db/prismadb';


const SettingsPage = async (props: { params: Promise<{ storeId: string }> }) => {

    const params = await props.params

    const { userId } = await auth();
    if (!userId) {
        return (
            redirect('/sign-in')
        )
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId
        }
    })

    if (!store) {
        redirect('/')
    }

    return (
        <div className='flex flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}

export default SettingsPage