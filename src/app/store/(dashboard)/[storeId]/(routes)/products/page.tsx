import DashboardNav from '@/components/store/layout/dashboard-nav';
import React from 'react'
import ProductsClient from './_components/products-client';
import prismadb from '@/lib/db/prismadb';
import { ProductColumn } from './_components/columns';

const Products = async (props: { params: Promise<{ storeId: string }> }) => {

  const params = await props.params;
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      images: true,
      variants: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedProducts: ProductColumn[] = products.map((product) => {
    const totalStock = product.variants.reduce((total, variant) => total + variant.stockQuantity, 0);

    return {
      id: product.id,
      name: product.name,
      image: product.images.length > 0 ? product.images[0].url : "",
      category: product.category,
      status: product.status,
      inventory: totalStock,
      regularPrice: Number(product.regularPrice),
    }
  })

  return (
    <DashboardNav searchPlaceholder="Search products...">
      <main className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <ProductsClient data={formattedProducts} />
        </div>
      </main>
    </DashboardNav>
  )
}

export default Products