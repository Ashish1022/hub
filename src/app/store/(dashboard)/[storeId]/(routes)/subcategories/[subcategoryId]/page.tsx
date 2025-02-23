import React from 'react'
import prismadb from '@/lib/db/prismadb';
import SubCategoryForm from './_components/subcategory-form';

const SubCategory = async (props: { params: Promise<{ subcategoryId: string; categoryId:string}> }) => {
    const params = await props.params
    const subcategory = await prismadb.subcategory.findUnique({
        where: {
            id: params.subcategoryId
        }
    });

    const category = await prismadb.category.findMany({
        where: {
            storeId: params.categoryId
        }
    })

    return (
        <div className='flex flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SubCategoryForm initialData={subcategory} categories={category}/>
            </div>
        </div>
    )
}

export default SubCategory