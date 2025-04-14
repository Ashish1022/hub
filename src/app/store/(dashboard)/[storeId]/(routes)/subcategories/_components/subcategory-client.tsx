"use client"

import React, { useState } from 'react'
import { SubcategoryColumn } from './columns'
import { useParams } from 'next/navigation';
import { Heading } from '@/components/store/forms/categories/heading';
import { Button } from '@/components/ui/button';
import { ArrowUp, Filter, Plus, Search, Tag } from 'lucide-react';
import Link from 'next/link';
import StoreCard from '@/components/store/store-card';
import { Input } from '@/components/ui/input';
import AllTab from '@/components/store/tabs/subcategories/all-tab';

const SubcategoryClient = ({ data }: { data: SubcategoryColumn[] }) => {

    const params = useParams();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <Heading title='Categories' description='Manage your product categories' />
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]"
                        asChild
                    >
                        <Link href={`/store/${params.storeId}/subcategories/add`}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Subcategory
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StoreCard title={'Total Categories'} value={data.length.toString()} ChangeIcon={ArrowUp} change={'+2  this month'} bgColor={'bg-[#7000FF]/10'} iconColor={'text-[#7000FF]'} icon={Tag} />
                <StoreCard title={'Total Categories'} value={'8'} ChangeIcon={ArrowUp} change={'+2  this month'} bgColor={'bg-[#7000FF]/10'} iconColor={'text-[#7000FF]'} icon={Tag} />
                <StoreCard title={'Total Categories'} value={'8'} ChangeIcon={ArrowUp} change={'+2  this month'} bgColor={'bg-[#7000FF]/10'} iconColor={'text-[#7000FF]'} icon={Tag} />
                <StoreCard title={'Total Categories'} value={'8'} ChangeIcon={ArrowUp} change={'+2  this month'} bgColor={'bg-[#7000FF]/10'} iconColor={'text-[#7000FF]'} icon={Tag} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                    <Input
                        placeholder="Search subcategories..."
                        className="pl-10 bg-[#0A1228] border-[#1E293B] text-white placeholder:text-[#A4B8D3] focus-visible:ring-[#FF00E5]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <AllTab data={data} />
        </>
    )
}

export default SubcategoryClient