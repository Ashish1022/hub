import prismadb from '@/lib/db/prismadb';
import { format } from 'date-fns'
import React from 'react'
import CategoryClient from './_components/category-client';
import { CategoryColumn } from './_components/columns';

const Categories = async (props: { params: Promise<{ storeId: string; }> }) => {

    const params = await props.params
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            collection: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        collectionLabel: item.collection.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))

    return (
        <div className='flex flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}

export default Categories