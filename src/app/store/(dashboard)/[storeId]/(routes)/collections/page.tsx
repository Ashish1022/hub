"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Eye, Filter, Layers, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { DashboardNav } from "../../_components/navbar"

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const collections = [
    {
      id: 1,
      name: "Summer Collection",
      slug: "summer-collection",
      description: "Hot items for the summer season",
      products: 32,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 2,
      name: "New Arrivals",
      slug: "new-arrivals",
      description: "Latest products in our store",
      products: 48,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 3,
      name: "Best Sellers",
      slug: "best-sellers",
      description: "Our most popular products",
      products: 24,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 4,
      name: "Limited Edition",
      slug: "limited-edition",
      description: "Exclusive products with limited availability",
      products: 12,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 5,
      name: "Sale",
      slug: "sale",
      description: "Discounted products",
      products: 36,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 6,
      name: "Winter Collection",
      slug: "winter-collection",
      description: "Products for the winter season",
      products: 18,
      image: "/placeholder.svg?height=40&width=40",
      status: "Draft",
    },
    {
      id: 7,
      name: "Featured Products",
      slug: "featured-products",
      description: "Highlighted products on our store",
      products: 15,
      image: "/placeholder.svg?height=40&width=40",
      status: "Active",
    },
    {
      id: 8,
      name: "Clearance",
      slug: "clearance",
      description: "Products we're clearing out",
      products: 22,
      image: "/placeholder.svg?height=40&width=40",
      status: "Archived",
    },
  ]

  const filteredCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardNav>
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                Collections
              </h1>
              <p className="text-[#A4B8D3]">Manage your product collections</p>
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
                <Link href="/dashboard/collections/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Collection
                </Link>
              </Button>
            </div>
          </div>

          {/* Collection stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Total Collections</CardTitle>
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
                    <Layers className="h-5 w-5 text-[#7000FF]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Active Collections</CardTitle>
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
                    <Layers className="h-5 w-5 text-[#00FFD1]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Draft Collections</CardTitle>
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
                    <Layers className="h-5 w-5 text-[#FF00E5]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Archived Collections</CardTitle>
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
                    <Layers className="h-5 w-5 text-[#FF3D00]" />
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
                placeholder="Search collections..."
                className="pl-10 bg-[#0A1228] border-[#1E293B] text-white placeholder:text-[#A4B8D3] focus-visible:ring-[#FF00E5]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Collections list */}
          <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1E293B]">
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">COLLECTION</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">DESCRIPTION</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">SLUG</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">PRODUCTS</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">STATUS</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-[#A4B8D3]">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCollections.map((collection) => (
                      <tr key={collection.id} className="border-b border-[#1E293B] last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={collection.image || "/placeholder.svg"}
                              alt={collection.name}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                            <span className="font-medium">{collection.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#A4B8D3]">{collection.description}</td>
                        <td className="py-3 px-4 text-sm text-[#A4B8D3]">{collection.slug}</td>
                        <td className="py-3 px-4 text-sm">{collection.products}</td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              collection.status === "Active"
                                ? "bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30"
                                : collection.status === "Draft"
                                  ? "bg-[#A4B8D3]/10 text-[#A4B8D3] border-[#A4B8D3]/30"
                                  : "bg-[#FF3D00]/10 text-[#FF3D00] border-[#FF3D00]/30"
                            }
                          >
                            {collection.status}
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

