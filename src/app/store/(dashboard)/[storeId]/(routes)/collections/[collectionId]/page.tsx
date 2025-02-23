import prismadb from '@/lib/db/prismadb';
import React from 'react'
import CollectionForm from './_components/collection-form';

const Collection = async (props: { params: Promise<{ collectionId: string }> }) => {

    const params = await props.params
    const collection = await prismadb.collection.findUnique({
        where: {
            id: params.collectionId
        }
    });

    return (
        <div className='flex flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CollectionForm initialData={collection}/>
            </div>
        </div>
    )
}

export default Collection