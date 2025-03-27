"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Bell,
  CreditCard,
  Download,
  Eye,
  Filter,
  Globe,
  HelpCircle,
  LineChart,
  Mail,
  Menu,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"

export default function CustomersPage() {
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
                placeholder="Search customers..."
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

          {/* Customers content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                    Customers
                  </h1>
                  <p className="text-[#A4B8D3]">Manage your customer database and relationships</p>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </div>
              </div>

              {/* Customer stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Total Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">3,248</div>
                        <div className="text-xs text-[#A4B8D3]">
                          <span className="text-[#00FFD1]">+86</span> this month
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#7000FF]/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-[#7000FF]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Active Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">1,842</div>
                        <div className="text-xs text-[#A4B8D3]">
                          <span className="text-[#00FFD1]">+12%</span> from last month
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#FF00E5]/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-[#FF00E5]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Avg. Spend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">$128.50</div>
                        <div className="text-xs text-[#A4B8D3]">
                          <span className="text-[#00FFD1]">+8%</span> from last month
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#FF3D00]/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-[#FF3D00]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Retention Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">68.2%</div>
                        <div className="text-xs text-[#A4B8D3]">
                          <span className="text-[#00FFD1]">+4.5%</span> from last month
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-[#00FFD1]" />
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
                    placeholder="Search customers by name, email, or location..."
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

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="bg-[#0A1228] border border-[#1E293B]">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    All Customers
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Active
                  </TabsTrigger>
                  <TabsTrigger
                    value="inactive"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Inactive
                  </TabsTrigger>
                  <TabsTrigger
                    value="vip"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    VIP
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#1E293B]">
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">CUSTOMER</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">EMAIL</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">LOCATION</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">ORDERS</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">SPENT</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">STATUS</th>
                              <th className="text-right py-3 px-4 text-xs font-medium text-[#A4B8D3]">ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                name: "Alex Johnson",
                                email: "alex.johnson@example.com",
                                location: "New York, USA",
                                orders: 12,
                                spent: "$1,245.89",
                                status: "Active",
                                avatar: "/placeholder.svg?height=32&width=32",
                              },
                              {
                                name: "Sarah Williams",
                                email: "sarah.w@example.com",
                                location: "London, UK",
                                orders: 8,
                                spent: "$879.50",
                                status: "Active",
                                avatar: "/placeholder.svg?height=32&width=32",
                              },
                              {
                                name: "Michael Brown",
                                email: "michael.b@example.com",
                                location: "Toronto, Canada",
                                orders: 5,
                                spent: "$432.20",
                                status: "Inactive",
                                avatar: "/placeholder.svg?height=32&width=32",
                              },
                              {
                                name: "Emily Davis",
                                email: "emily.davis@example.com",
                                location: "Sydney, Australia",
                                orders: 18,
                                spent: "$2,154.30",
                                status: "VIP",
                                avatar: "/placeholder.svg?height=32&width=32",
                              },
                              {
                                name: "David Wilson",
                                email: "david.w@example.com",
                                location: "Berlin, Germany",
                                orders: 3,
                                spent: "$245.80",
                                status: "Active",
                                avatar: "/placeholder.svg?height=32&width=32",
                              },
                              {
                                name: "Jennifer Taylor",
                                email: "jennifer.t@example.com",
                                location: "Paris, France",
                                orders: 9,
                                spent: "$978.60",
                                status: "VIP",
                                avatar: "/placeholder.svg?height=32&width=32",
                              },
                              {
                                name: "Robert Miller",
                                email: "robert.m@example.com",
                                location: "Tokyo, Japan",
                                orders: 2,
                                spent: "$189.99",
                                status: "Inactive",
                                avatar: "/placeholder.svg?height=32&width=32",
                              },
                              {
                                name: "Lisa Anderson",
                                email: "lisa.a@example.com",
                                location: "Chicago, USA",
                                orders: 7,
                                spent: "$654.40",
                                status: "Active",
                                avatar: "/placeholder.svg?height=32&width=32",
                              },
                            ].map((customer, i) => (
                              <tr key={i} className="border-b border-[#1E293B] last:border-0">
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-3">
                                    <Image
                                      src={customer.avatar || "/placeholder.svg"}
                                      alt={customer.name}
                                      width={32}
                                      height={32}
                                      className="rounded-full"
                                    />
                                    <span className="font-medium">{customer.name}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-[#A4B8D3]">{customer.email}</td>
                                <td className="py-3 px-4 text-sm text-[#A4B8D3]">{customer.location}</td>
                                <td className="py-3 px-4 text-sm">{customer.orders}</td>
                                <td className="py-3 px-4 text-sm font-medium">{customer.spent}</td>
                                <td className="py-3 px-4">
                                  <Badge
                                    className={
                                      customer.status === "Active"
                                        ? "bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30"
                                        : customer.status === "VIP"
                                          ? "bg-[#FF00E5]/10 text-[#FF00E5] border-[#FF00E5]/30"
                                          : "bg-[#A4B8D3]/10 text-[#A4B8D3] border-[#A4B8D3]/30"
                                    }
                                  >
                                    {customer.status}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Eye className="h-4 w-4 text-[#A4B8D3]" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Mail className="h-4 w-4 text-[#A4B8D3]" />
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
                        <Users className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Active Customers</h3>
                        <p className="text-[#A4B8D3] mb-4">You have 1,842 active customers.</p>
                        <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                          View Active Customers
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="inactive" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center py-6">
                        <Users className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Inactive Customers</h3>
                        <p className="text-[#A4B8D3] mb-4">You have 1,406 inactive customers.</p>
                        <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                          View Inactive Customers
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="vip" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center py-6">
                        <Users className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">VIP Customers</h3>
                        <p className="text-[#A4B8D3] mb-4">You have 124 VIP customers.</p>
                        <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                          View VIP Customers
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

