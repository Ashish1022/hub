import React from 'react'
import { format } from 'date-fns'
import prismadb from '@/lib/db/prismadb';
import CollectionClient from './_components/collection-client';
import { CollectionColumn } from './_components/columns';

const Collections = async (props: { params: Promise<{ storeId: string }> }) => {

    const params = await props.params
    const collections = await prismadb.collection.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedCollections: CollectionColumn[] = collections.map((item) => ({
        id: item.id,
        label: item.label,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CollectionClient data={formattedCollections} />
            </div>
        </div>
    )
}

export default Collections