"use client"

import Heading from '@/components/store/layout/heading'
import StoreCard from '@/components/store/store-card'
import AllTab from '@/components/store/tabs/products/all-tab'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUp, Download, Filter, Package, Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { ProductColumn } from './columns'
import ActiveTab from '@/components/store/tabs/products/active-tab'
import DraftTab from '@/components/store/tabs/products/draft-tab'
import ArchivedTab from '@/components/store/tabs/products/archived-tab'

const ProductsClient = ({ data }: { data: ProductColumn[] }) => {

    const params = useParams();
    const [activeTab, setActiveTab] = useState("all");
    const tabs = ["all", "active", "draft", "archived"];

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <Heading title={'Products'} description={'Manage your product inventory and catalog'} />
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]"
                        asChild
                    >
                        <Link href={`/store/${params.storeId}/products/add`}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StoreCard title={'Total Products'} value={data.length.toString()} ChangeIcon={ArrowUp} change={'+12 this month'} bgColor={'bg-[#7000FF]/10'} iconColor={'text-[#7000FF]'} icon={Package} />
                <StoreCard title={'Total Products'} value={data.length.toString()} ChangeIcon={ArrowUp} change={'+12 this month'} bgColor={'bg-[#7000FF]/10'} iconColor={'text-[#7000FF]'} icon={Package} />
                <StoreCard title={'Total Products'} value={data.length.toString()} ChangeIcon={ArrowUp} change={'+12 this month'} bgColor={'bg-[#7000FF]/10'} iconColor={'text-[#7000FF]'} icon={Package} />
                <StoreCard title={'Total Products'} value={data.length.toString()} ChangeIcon={ArrowUp} change={'+12 this month'} bgColor={'bg-[#7000FF]/10'} iconColor={'text-[#7000FF]'} icon={Package} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                    <Input
                        placeholder="Search products..."
                        className="pl-10 bg-[#0A1228] border-[#1E293B] text-white placeholder:text-[#A4B8D3] focus-visible:ring-[#FF00E5]"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="bg-[#0A1228] border border-[#1E293B]">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab}
                            value={tab}
                            className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="all" className="mt-4">
                    <AllTab data={data} />
                </TabsContent>
                <TabsContent value="active" className="mt-4">
                    <ActiveTab />
                </TabsContent>
                <TabsContent value="draft" className="mt-4">
                    <DraftTab />
                </TabsContent>
                <TabsContent value="archived" className="mt-4">
                    <ArchivedTab />
                </TabsContent>
            </Tabs>
        </>
    )
}

export default ProductsClient