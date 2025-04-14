import DashboardNav from '@/components/store/layout/dashboard-nav'
import prismadb from '@/lib/db/prismadb'
import React from 'react'
import { CategoryColumn } from './_components/columns';
import CategoryClient from './_components/category-client';

const page = async (props: { params: Promise<{ storeId: string }> }) => {

    const params = await props.params;

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            products: true,
        },
    });

    const formattedCategories: CategoryColumn[] = categories.map((category) => {
        return {
            id: category.id,
            name: category.name,
            image: category.imageUrl,
            description: category.description,
            slug: category.slug,
            products: category.products.length,
            status: category.isActive ? 'Active' : 'Archived'
        }
    });

    return (
        <DashboardNav>
            <div className="p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    <CategoryClient data={formattedCategories} />
                </div>
            </div>
        </DashboardNav>
    )
}

export default page