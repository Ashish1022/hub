import React from 'react'
import ProductForm from './_components/product-form';
import prismadb from '@/lib/db/prismadb';

const Product = async (props: { params: Promise<{ productId: string; storeId: string }> }) => {
    const params = await props.params;
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    });

    const collections = await prismadb.collection.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    const images = await prismadb.image.findMany({
        where: {
            productId: product?.id,
        }
    })

    const categoryIds = categories.map(category => category.id);
    const subcategories = await prismadb.subcategory.findMany({
        where: {
            categoryId: {
                in: categoryIds,
            },
        },
    });


    return (
        <div className='flex flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductForm initialData={product} categories={categories} subcategories={subcategories} images={images} collections={collections}/>
            </div>
        </div>
    )
}

export default Product