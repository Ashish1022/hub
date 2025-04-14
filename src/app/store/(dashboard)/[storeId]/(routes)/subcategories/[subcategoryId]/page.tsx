import DecorativeElements from '@/components/decorative-elements';
import SubcategoryForm from '@/components/store/forms/subcategories';
import DashboardNav from '@/components/store/layout/dashboard-nav';
import prismadb from '@/lib/db/prismadb';
import React from 'react'

const page = async (props: { params: Promise<{ storeId: string; subcategoryId: string }> }) => {

    const params = await props.params;

    const subcategory = await prismadb.subcategory.findUnique({
        where: {
            id: params.subcategoryId,
        },
        include: {
            products: true,
        }
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className="min-h-screen bg-[#050A18] text-white">
            <DecorativeElements />
            <div className="flex h-screen overflow-hidden">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardNav>
                        <SubcategoryForm initialData={subcategory} categories={categories} />
                    </DashboardNav>
                </div>
            </div>
        </div>
    )
}

export default page