"use client"

import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { DollarSign, Download, Edit, Filter, MoreHorizontal, Package, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { ProductColumn } from './columns';

const ProductClient = ({ data }: { data: ProductColumn[] }) => {

    const params = useParams();
    const [activeTab, setActiveTab] = useState("all");
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                        Products
                    </h1>
                    <p className="text-[#A4B8D3]">Manage your product inventory and catalog</p>
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
                        <Link href={`/store/${params.storeId}/products/add`}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-[#A4B8D3]">Total Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">{data.length}</div>
                                <div className="text-xs text-[#A4B8D3]">
                                    <span className="text-[#00FFD1]">+12</span> this month
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#7000FF]/10 flex items-center justify-center">
                                <Package className="h-5 w-5 text-[#7000FF]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-[#A4B8D3]">Low Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">24</div>
                                <div className="text-xs text-[#A4B8D3]">
                                    <span className="text-[#FF3D00]">+8</span> this week
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#FF3D00]/10 flex items-center justify-center">
                                <Package className="h-5 w-5 text-[#FF3D00]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-[#A4B8D3]">Top Sellers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">36</div>
                                <div className="text-xs text-[#A4B8D3]">
                                    <span className="text-[#00FFD1]">+5</span> this month
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#FF00E5]/10 flex items-center justify-center">
                                <Package className="h-5 w-5 text-[#FF00E5]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-[#A4B8D3]">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">$24,780</div>
                                <div className="text-xs text-[#A4B8D3]">
                                    <span className="text-[#00FFD1]">+12%</span> this month
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
                                <DollarSign className="h-5 w-5 text-[#00FFD1]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
                    <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                    >
                        All Products
                    </TabsTrigger>
                    <TabsTrigger
                        value="active"
                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                    >
                        Active
                    </TabsTrigger>
                    <TabsTrigger
                        value="draft"
                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                    >
                        Draft
                    </TabsTrigger>
                    <TabsTrigger
                        value="archived"
                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                    >
                        Archived
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[#1E293B]">
                                            <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">PRODUCT</th>
                                            <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">CATEGORY</th>
                                            <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">STATUS</th>
                                            <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">INVENTORY</th>
                                            <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">PRICE</th>
                                            <th className="text-right py-3 px-4 text-xs font-medium text-[#A4B8D3]">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((product, i) => (
                                            <tr key={i} className="border-b border-[#1E293B] last:border-0">
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src={product.image || "/placeholder.svg"}
                                                            alt={product.name}
                                                            width={40}
                                                            height={40}
                                                            className="rounded-md"
                                                        />
                                                        <span className="font-medium">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-[#A4B8D3]">{product.category}</td>
                                                <td className="py-3 px-4">
                                                    <Badge
                                                        className={
                                                            product.status === "Active"
                                                                ? "bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30"
                                                                : product.status === "Draft"
                                                                    ? "bg-[#A4B8D3]/10 text-[#A4B8D3] border-[#A4B8D3]/30"
                                                                    : product.status === "Low Stock"
                                                                        ? "bg-[#FF3D00]/10 text-[#FF3D00] border-[#FF3D00]/30"
                                                                        : "bg-[#1E293B] text-[#A4B8D3]"
                                                        }
                                                    >
                                                        {product.status}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 px-4 text-sm">
                                                    {product.inventory > 0 ? product.inventory : "Out of stock"}
                                                </td>
                                                <td className="py-3 px-4 text-sm font-medium">{product.regularPrice}</td>
                                                <td className="py-3 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={() => router.push(`/store/${params.storeId}/products/${product.id}`)}>
                                                            <Edit className="h-4 w-4 text-[#A4B8D3]" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4 text-[#A4B8D3]" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="active" className="mt-4">
                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="text-center py-6">
                                <Package className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">Active Products</h3>
                                <p className="text-[#A4B8D3] mb-4">You have 186 active products in your inventory.</p>
                                <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                                    View Active Products
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="draft" className="mt-4">
                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="text-center py-6">
                                <Package className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">Draft Products</h3>
                                <p className="text-[#A4B8D3] mb-4">You have 24 products in draft status.</p>
                                <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                                    View Draft Products
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="archived" className="mt-4">
                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="text-center py-6">
                                <Package className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">Archived Products</h3>
                                <p className="text-[#A4B8D3] mb-4">You have 38 archived products.</p>
                                <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                                    View Archived Products
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}

export default ProductClient