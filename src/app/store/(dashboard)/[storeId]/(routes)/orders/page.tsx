"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  Download,
  Eye,
  Filter,
  Globe,
  HelpCircle,
  LineChart,
  Menu,
  MoreHorizontal,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import Navbar from "../../_components/navbar"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-[#050A18] text-white">
      {/* Decorative elements */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#FF3D00]/10 via-[#FF00E5]/10 to-transparent blur-3xl opacity-30 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-full h-[500px] bg-gradient-to-tl from-[#00FFD1]/10 via-[#7000FF]/10 to-transparent blur-3xl opacity-30 pointer-events-none"></div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 lg:w-72 flex-col bg-[#0A1228]/80 border-r border-[#1E293B] p-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
              <Globe className="h-8 w-8 text-white relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
              ZERO | HUB
            </span>
          </div>
          <Navbar/>
          <div className="pt-4 border-t border-[#1E293B] mt-6">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <Link
              href="/docs"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help & Documentation</span>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-[#1E293B] bg-[#050A18]/80 backdrop-blur-sm flex items-center justify-between px-4">
            <div className="flex items-center md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5 text-[#A4B8D3]" />
              </Button>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] blur-lg opacity-70 rounded-full"></div>
                <Globe className="h-6 w-6 text-white relative z-10" />
              </div>
            </div>

            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
              <input
                type="search"
                placeholder="Search orders..."
                className="w-64 h-9 rounded-md border border-[#1E293B] bg-[#0A1228] py-2 pl-10 pr-4 text-sm text-white placeholder:text-[#A4B8D3] focus:outline-none focus:ring-1 focus:ring-[#FF00E5]"
              />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-[#A4B8D3]" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF3D00]"></span>
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#0A1228] flex items-center justify-center">
                    <span className="text-xs font-bold text-[#FF3D00] flex items-center justify-center">
                      <UserButton />
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium hidden md:inline-block">{`${user?.firstName} ${user?.lastName}`}</span>
              </div>
            </div>
          </header>

          {/* Orders content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                    Orders
                  </h1>
                  <p className="text-[#A4B8D3]">Manage and track customer orders</p>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                    <Calendar className="h-4 w-4 mr-2" />
                    Last 30 days
                  </Button>
                  <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                    <Download className="h-4 w-4 mr-2" />
                    Export Orders
                  </Button>
                </div>
              </div>

              {/* Order stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Total Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">1,248</div>
                        <div className="text-xs text-[#A4B8D3]">
                          <span className="text-[#00FFD1]">+8%</span> from last month
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#7000FF]/10 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-[#7000FF]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">42</div>
                        <div className="text-xs text-[#A4B8D3]">
                          <span className="text-[#FF3D00]">+12</span> new today
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
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Shipped</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">86</div>
                        <div className="text-xs text-[#A4B8D3]">
                          <span className="text-[#00FFD1]">+24</span> this week
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#FF3D00]/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-[#FF3D00]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Delivered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">1,120</div>
                        <div className="text-xs text-[#A4B8D3]">
                          <span className="text-[#00FFD1]">+6%</span> from last month
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-[#00FFD1]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                  <Input
                    placeholder="Search orders by ID, customer, or product..."
                    className="pl-10 bg-[#0A1228] border-[#1E293B] text-white placeholder:text-[#A4B8D3] focus-visible:ring-[#FF00E5]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="bg-[#0A1228] border border-[#1E293B]">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    All Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Pending
                  </TabsTrigger>
                  <TabsTrigger
                    value="processing"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Processing
                  </TabsTrigger>
                  <TabsTrigger
                    value="shipped"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Shipped
                  </TabsTrigger>
                  <TabsTrigger
                    value="delivered"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Delivered
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#1E293B]">
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">ORDER ID</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">CUSTOMER</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">DATE</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">STATUS</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">TOTAL</th>
                              <th className="text-right py-3 px-4 text-xs font-medium text-[#A4B8D3]">ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                id: "#ORD-7245",
                                customer: "Alex Johnson",
                                date: "Jul 21, 2023",
                                status: "Delivered",
                                total: "$59.99",
                              },
                              {
                                id: "#ORD-7244",
                                customer: "Sarah Williams",
                                date: "Jul 20, 2023",
                                status: "Processing",
                                total: "$89.99",
                              },
                              {
                                id: "#ORD-7243",
                                customer: "Michael Brown",
                                date: "Jul 19, 2023",
                                status: "Shipped",
                                total: "$69.99",
                              },
                              {
                                id: "#ORD-7242",
                                customer: "Emily Davis",
                                date: "Jul 18, 2023",
                                status: "Delivered",
                                total: "$39.99",
                              },
                              {
                                id: "#ORD-7241",
                                customer: "David Wilson",
                                date: "Jul 17, 2023",
                                status: "Processing",
                                total: "$29.99",
                              },
                              {
                                id: "#ORD-7240",
                                customer: "Jennifer Taylor",
                                date: "Jul 16, 2023",
                                status: "Pending",
                                total: "$149.99",
                              },
                              {
                                id: "#ORD-7239",
                                customer: "Robert Miller",
                                date: "Jul 15, 2023",
                                status: "Shipped",
                                total: "$79.99",
                              },
                              {
                                id: "#ORD-7238",
                                customer: "Lisa Anderson",
                                date: "Jul 14, 2023",
                                status: "Delivered",
                                total: "$119.99",
                              },
                            ].map((order, i) => (
                              <tr key={i} className="border-b border-[#1E293B] last:border-0">
                                <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                                <td className="py-3 px-4 text-sm">{order.customer}</td>
                                <td className="py-3 px-4 text-sm text-[#A4B8D3]">{order.date}</td>
                                <td className="py-3 px-4">
                                  <Badge
                                    className={
                                      order.status === "Delivered"
                                        ? "bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30"
                                        : order.status === "Processing"
                                          ? "bg-[#FF00E5]/10 text-[#FF00E5] border-[#FF00E5]/30"
                                          : order.status === "Shipped"
                                            ? "bg-[#7000FF]/10 text-[#7000FF] border-[#7000FF]/30"
                                            : "bg-[#FF3D00]/10 text-[#FF3D00] border-[#FF3D00]/30"
                                    }
                                  >
                                    {order.status}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4 text-sm font-medium">{order.total}</td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Eye className="h-4 w-4 text-[#A4B8D3]" />
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

                <TabsContent value="pending" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center py-6">
                        <ShoppingBag className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Pending Orders</h3>
                        <p className="text-[#A4B8D3] mb-4">You have 18 pending orders that need attention.</p>
                        <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                          View Pending Orders
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="processing" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center py-6">
                        <Package className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Processing Orders</h3>
                        <p className="text-[#A4B8D3] mb-4">You have 24 orders currently being processed.</p>
                        <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                          View Processing Orders
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="shipped" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center py-6">
                        <Truck className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Shipped Orders</h3>
                        <p className="text-[#A4B8D3] mb-4">You have 86 orders that have been shipped.</p>
                        <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                          View Shipped Orders
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="delivered" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center py-6">
                        <ShoppingBag className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Delivered Orders</h3>
                        <p className="text-[#A4B8D3] mb-4">You have 1,120 orders that have been delivered.</p>
                        <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                          View Delivered Orders
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

