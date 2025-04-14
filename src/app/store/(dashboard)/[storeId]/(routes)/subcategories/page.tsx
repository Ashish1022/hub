import prismadb from '@/lib/db/prismadb';
import React from 'react'
import { SubcategoryColumn } from './_components/columns';
import DashboardNav from '@/components/store/layout/dashboard-nav';
import SubcategoryClient from './_components/subcategory-client';

const page = async (props: { params: Promise<{ storeId: string }> }) => {

  const params = await props.params;

  const subcategories = await prismadb.subcategory.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      products: true,
      category: true,
    }
  })

  const filterdSubcategories: SubcategoryColumn[] = subcategories.map((subcategory) => {
    return {
      id: subcategory.id,
      name: subcategory.name,
      image: subcategory.imageUrl,
      parent: subcategory.category.name,
      description: subcategory.description,
      slug: subcategory.slug,
      products: subcategory.products.length,
      status: subcategory.isActive ? 'Active' : 'Archived'
    }
  });

  console.log(filterdSubcategories)

  return (
    <DashboardNav>
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <SubcategoryClient data={filterdSubcategories} />
        </div>
      </div>
    </DashboardNav>
  )
}

export default page