import React from 'react'
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';
import prismadb from '@/lib/db/prismadb';
import { ProductColumn } from './_components/columns';
import ProductClient from './_components/product-client';

const Products = async (props: { params: Promise<{ storeId: string }> }) => {
  const params = await props.params;
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      subcategory:true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    subcategory: item.subcategory?.name as string,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}

export default Products