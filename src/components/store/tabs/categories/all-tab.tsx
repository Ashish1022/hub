"use client";

import { CategoryColumn } from '@/app/store/(dashboard)/[storeId]/(routes)/categories/_components/columns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const AllTab = ({ data }: { data: CategoryColumn[] }) => {

    const { storeId } = useParams();
    const router = useRouter();

    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#1E293B]">
                                <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">CATEGORY</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">DESCRIPTION</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">SLUG</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">PRODUCTS</th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">STATUS</th>
                                <th className="text-right py-3 px-4 text-xs font-medium text-[#A4B8D3]">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((category, i) => (
                                <tr key={i} className="border-b border-[#1E293B] last:border-0">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={category.image || "/placeholder.svg"}
                                                alt={category.name}
                                                width={40}
                                                height={40}
                                                className="rounded-md"
                                            />
                                            <span className="font-medium">{category.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-[#A4B8D3]">{category.description}</td>
                                    <td className="py-3 px-4 text-sm text-[#A4B8D3]">{category.slug}</td>
                                    <td className="py-3 px-4 text-sm text-[#A4B8D3]">{category.products}</td>
                                    <td className="py-3 px-4">
                                        <Badge
                                            className={
                                                category.status === "Active"
                                                    ? "bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30"
                                                    : category.status === "Draft"
                                                        ? "bg-[#A4B8D3]/10 text-[#A4B8D3] border-[#A4B8D3]/30"
                                                        : category.status === "Archived"
                                                            ? "bg-[#FF3D00]/10 text-[#FF3D00] border-[#FF3D00]/30"
                                                            : "bg-[#1E293B] text-[#A4B8D3]"
                                            }
                                        >
                                            {category.status}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={() => router.push(`/store/${storeId}/products/${category.id}`)}>
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