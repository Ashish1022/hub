import DecorativeElements from '@/components/decorative-elements';
import ProductForm from '@/components/store/forms/products';
import DashboardNav from '@/components/store/layout/dashboard-nav';
import prismadb from '@/lib/db/prismadb';
import React from 'react'

const Product = async (props: { params: Promise<{ productId: string; storeId: string }> }) => {

  const params = await props.params;
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      images: true,
      attributes: true,
      variants: true,
      customFields: true,
      reviews: true,
      orderItems: true,
      categoryRelations: true,
      collectionRelations: true,
      brandRelation: true,
    }
  });
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    }
  });
  const subcategories = await prismadb.subcategory.findMany({
    where: {
      storeId: params.storeId
    }
  });
  return (
    <div className="min-h-screen bg-[#050A18] text-white">
      <DecorativeElements />
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardNav>
            <ProductForm initialData={product} categories={categories} subcategories={subcategories} />
          </DashboardNav>
        </div>
      </div>
    </div>
  )
}

export default Product