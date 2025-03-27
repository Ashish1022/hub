"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Eye, Filter, MoreHorizontal, Plus, Search, Tag, Trash2 } from "lucide-react"
import { DashboardNav } from "../../_components/navbar"

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      id: 1,
      name: "Apparel",
      slug: "apparel",
      description: "Clothing and fashion items",
      products: 124,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 2,
      name: "Electronics",
      slug: "electronics",
      description: "Electronic devices and accessories",
      products: 86,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      slug: "home-kitchen",
      description: "Home decor and kitchen items",
      products: 57,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 4,
      name: "Beauty & Personal Care",
      slug: "beauty-personal-care",
      description: "Beauty products and personal care items",
      products: 42,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      slug: "sports-outdoors",
      description: "Sports equipment and outdoor gear",
      products: 35,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 6,
      name: "Toys & Games",
      slug: "toys-games",
      description: "Toys, games, and entertainment items",
      products: 28,
      image: "/placeholder.svg?height=40&width=40",
      status: "Draft",
    },
    {
      id: 7,
      name: "Books & Media",
      slug: "books-media",
      description: "Books, music, and media items",
      products: 19,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 8,
      name: "Seasonal",
      slug: "seasonal",
      description: "Seasonal and holiday items",
      products: 12,
      image: "/placeholder.svg?height=40&width=40",
      status: "Archived",
    },
  ]

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardNav>
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                Categories
              </h1>
              <p className="text-[#A4B8D3]">Manage your product categories</p>
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
                <Link href="/dashboard/categories/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Link>
              </Button>
            </div>
          </div>

          {/* Category stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Total Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-xs text-[#A4B8D3]">
                      <span className="text-[#00FFD1]">+2</span> this month
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#7000FF]/10 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-[#7000FF]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Active Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">6</div>
                    <div className="text-xs text-[#A4B8D3]">
                      <span className="text-[#00FFD1]">+1</span> this month
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-[#00FFD1]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Draft Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-xs text-[#A4B8D3]">
                      <span className="text-[#FF00E5]">+1</span> this month
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#FF00E5]/10 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-[#FF00E5]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Archived Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-xs text-[#A4B8D3]">
                      <span className="text-[#FF3D00]">+0</span> this month
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#FF3D00]/10 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-[#FF3D00]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
              <Input
                placeholder="Search categories..."
                className="pl-10 bg-[#0A1228] border-[#1E293B] text-white placeholder:text-[#A4B8D3] focus-visible:ring-[#FF00E5]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories list */}
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
                    {filteredCategories.map((category) => (
                      <tr key={category.id} className="border-b border-[#1E293B] last:border-0">
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
                        <td className="py-3 px-4 text-sm">{category.products}</td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              category.status === "Active"
                                ? "bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30"
                                : category.status === "Draft"
                                  ? "bg-[#A4B8D3]/10 text-[#A4B8D3] border-[#A4B8D3]/30"
                                  : "bg-[#FF3D00]/10 text-[#FF3D00] border-[#FF3D00]/30"
                            }
                          >
                            {category.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4 text-[#A4B8D3]" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4 text-[#A4B8D3]" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4 text-[#A4B8D3]" />
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
        </div>
      </div>
    </DashboardNav>
  )
}

