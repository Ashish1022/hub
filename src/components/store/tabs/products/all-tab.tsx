"use client"

import { ProductColumn } from '@/app/store/(dashboard)/[storeId]/(routes)/products/_components/columns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const AllTab = ({ data }: { data: ProductColumn[] }) => {

    const router = useRouter();
    const { storeId } = useParams();

    return (
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
                                            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={() => router.push(`/store/${storeId}/products/${product.id}`)}>
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
    )
}

export default AllTab