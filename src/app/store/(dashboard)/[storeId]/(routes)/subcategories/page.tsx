import React from 'react'
import { format } from 'date-fns';
import prismadb from '@/lib/db/prismadb';
import { SubCategoryColumn } from './_components/column';
import SubCategoryClient from './_components/subcategory-client';

const SubCategories = async (props: { params: Promise<{ categoryId: string }> }) => {
    const params = await props.params
    const subcategories = await prismadb.subcategory.findMany({
        where: {
            categoryId: params.categoryId,
        },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedSubcategories: SubCategoryColumn[] = subcategories.map((item) => ({
        id: item.id,
        name: item.name,
        categoryName: item.category.name,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }))

    return (
        <div className='flex flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SubCategoryClient data={formattedSubcategories} />
            </div>
        </div>
    )
}

export default SubCategories