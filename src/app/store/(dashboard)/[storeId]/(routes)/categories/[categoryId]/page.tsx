import DecorativeElements from '@/components/decorative-elements'
import CategoryForm from '@/components/store/forms/categories'
import DashboardNav from '@/components/store/layout/dashboard-nav'
import prismadb from '@/lib/db/prismadb'
import React from 'react'

const page = async (props: { params: Promise<{ storeId: string; categoryId: string }> }) => {

    const params = await props.params;

    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId,
        },
        include: {
            products: true,
        }
    })

    return (
        <div className="min-h-screen bg-[#050A18] text-white">
            <DecorativeElements />
            <div className="flex h-screen overflow-hidden">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardNav>
                        <CategoryForm initialData={category} />
                    </DashboardNav>
                </div>
            </div>
        </div>
    )
}

export default page