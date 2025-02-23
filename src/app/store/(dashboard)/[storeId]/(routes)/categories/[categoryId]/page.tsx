import React from 'react'
import CategoryForm from './_components/category-form';
import prismadb from '@/lib/db/prismadb';


const Category = async (props: { params: Promise<{ storeId: string; categoryId:string }> }) => {
    const params = await props.params
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    });

    const collection = await prismadb.collection.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className='flex flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CategoryForm initialData={category} collections={collection}/>
            </div>
        </div>
    )
}

export default Category