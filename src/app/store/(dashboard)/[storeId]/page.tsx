"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Globe,
  HelpCircle,
  LineChart,
  Menu,
  Package,
  PieChart,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

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

          <nav className="space-y-1 flex-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#FF00E5]/10 text-[#FF00E5] font-medium"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
              <LineChart className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/dashboard/products"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
              <Package className="h-5 w-5" />
              <span>Products</span>
            </Link>
            <Link
              href="/dashboard/orders"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Orders</span>
            </Link>
            <Link
              href="/dashboard/customers"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>Customers</span>
            </Link>
            <Link
              href="/dashboard/payments"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </Link>
          </nav>

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
                placeholder="Search..."
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
                    <span className="text-xs font-bold text-[#FF3D00]">JD</span>
                  </div>
                </div>
                <span className="text-sm font-medium hidden md:inline-block">John Doe</span>
              </div>
            </div>
          </header>

          {/* Dashboard content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                    Store Dashboard
                  </h1>
                  <p className="text-[#A4B8D3]">Welcome back, John! Here's what's happening with your store today.</p>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                    <Calendar className="h-4 w-4 mr-2" />
                    Last 30 days
                  </Button>
                  <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">$24,780</div>
                        <div className="flex items-center text-xs text-[#00FFD1]">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>12% from last month</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#FF3D00]/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-[#FF3D00]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Total Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">342</div>
                        <div className="flex items-center text-xs text-[#00FFD1]">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>8% from last month</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#FF00E5]/10 flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-[#FF00E5]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">New Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">86</div>
                        <div className="flex items-center text-xs text-[#00FFD1]">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>24% from last month</span>
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
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">3.2%</div>
                        <div className="flex items-center text-xs text-[#FF3D00]">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          <span>0.5% from last month</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
                        <PieChart className="h-5 w-5 text-[#00FFD1]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="bg-[#0A1228] border border-[#1E293B]">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger
                    value="reports"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Reports
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Notifications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Chart */}
                    <Card className="lg:col-span-2 bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Sales Overview</CardTitle>
                          <Badge className="bg-[#FF00E5]/10 text-[#FF00E5] hover:bg-[#FF00E5]/20 border-[#FF00E5]/30">
                            +12.5%
                          </Badge>
                        </div>
                        <CardDescription className="text-[#A4B8D3]">Monthly sales performance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] relative">
                          {/* Simulated chart */}
                          <div className="absolute inset-x-0 bottom-0 h-[250px] flex items-end justify-between px-2">
                            {Array.from({ length: 12 }).map((_, i) => {
                              const height = Math.floor(Math.random() * 100) + 50
                              return (
                                <div key={i} className="w-full mx-0.5">
                                  <div
                                    className="bg-gradient-to-t from-[#FF3D00] to-[#FF00E5] rounded-t-sm opacity-80"
                                    style={{ height: `${height}px` }}
                                  ></div>
                                  <div className="text-xs text-[#A4B8D3] text-center mt-2">
                                    {
                                      [
                                        "Jan",
                                        "Feb",
                                        "Mar",
                                        "Apr",
                                        "May",
                                        "Jun",
                                        "Jul",
                                        "Aug",
                                        "Sep",
                                        "Oct",
                                        "Nov",
                                        "Dec",
                                      ][i]
                                    }
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          {/* Y-axis labels */}
                          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-[#A4B8D3] py-2">
                            <div>$25k</div>
                            <div>$20k</div>
                            <div>$15k</div>
                            <div>$10k</div>
                            <div>$5k</div>
                            <div>$0</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Top Products */}
                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Top Products</CardTitle>
                        <CardDescription className="text-[#A4B8D3]">Best selling products this month</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { name: "Premium T-Shirt", sales: 182, revenue: "$3,640", growth: 12 },
                            { name: "Designer Hoodie", sales: 124, revenue: "$4,960", growth: 8 },
                            { name: "Vintage Jeans", sales: 96, revenue: "$2,880", growth: -3 },
                            { name: "Leather Wallet", sales: 88, revenue: "$1,760", growth: 5 },
                            { name: "Smart Watch Band", sales: 64, revenue: "$1,920", growth: 15 },
                          ].map((product, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between pb-3 border-b border-[#1E293B] last:border-0 last:pb-0"
                            >
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-[#A4B8D3]">{product.sales} sales</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{product.revenue}</div>
                                <div className={`text-xs ${product.growth > 0 ? "text-[#00FFD1]" : "text-[#FF3D00]"}`}>
                                  {product.growth > 0 ? "+" : ""}
                                  {product.growth}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Orders */}
                  <Card className="mt-6 bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Orders</CardTitle>
                        <Button
                          variant="outline"
                          className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50 text-xs h-8"
                        >
                          View All
                        </Button>
                      </div>
                      <CardDescription className="text-[#A4B8D3]">Latest customer orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#1E293B]">
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">ORDER ID</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">CUSTOMER</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">PRODUCT</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">DATE</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">AMOUNT</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                id: "#ORD-7245",
                                customer: "Alex Johnson",
                                product: "Premium T-Shirt",
                                date: "Jul 21, 2023",
                                amount: "$59.99",
                                status: "Delivered",
                              },
                              {
                                id: "#ORD-7244",
                                customer: "Sarah Williams",
                                product: "Designer Hoodie",
                                date: "Jul 20, 2023",
                                amount: "$89.99",
                                status: "Processing",
                              },
                              {
                                id: "#ORD-7243",
                                customer: "Michael Brown",
                                product: "Vintage Jeans",
                                date: "Jul 19, 2023",
                                amount: "$69.99",
                                status: "Shipped",
                              },
                              {
                                id: "#ORD-7242",
                                customer: "Emily Davis",
                                product: "Leather Wallet",
                                date: "Jul 18, 2023",
                                amount: "$39.99",
                                status: "Delivered",
                              },
                              {
                                id: "#ORD-7241",
                                customer: "David Wilson",
                                product: "Smart Watch Band",
                                date: "Jul 17, 2023",
                                amount: "$29.99",
                                status: "Processing",
                              },
                            ].map((order, i) => (
                              <tr key={i} className="border-b border-[#1E293B] last:border-0">
                                <td className="py-3 px-4 text-sm">{order.id}</td>
                                <td className="py-3 px-4 text-sm">{order.customer}</td>
                                <td className="py-3 px-4 text-sm">{order.product}</td>
                                <td className="py-3 px-4 text-sm text-[#A4B8D3]">{order.date}</td>
                                <td className="py-3 px-4 text-sm font-medium">{order.amount}</td>
                                <td className="py-3 px-4">
                                  <Badge
                                    className={
                                      order.status === "Delivered"
                                        ? "bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30"
                                        : order.status === "Processing"
                                          ? "bg-[#FF00E5]/10 text-[#FF00E5] border-[#FF00E5]/30"
                                          : "bg-[#7000FF]/10 text-[#7000FF] border-[#7000FF]/30"
                                    }
                                  >
                                    {order.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Traffic Sources */}
                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Traffic Sources</CardTitle>
                        <CardDescription className="text-[#A4B8D3]">
                          Where your visitors are coming from
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] relative">
                          {/* Simulated pie chart */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-48 h-48">
                              <div
                                className="absolute inset-0 rounded-full border-8 border-[#FF3D00] opacity-80"
                                style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 0, 50% 0)" }}
                              ></div>
                              <div
                                className="absolute inset-0 rounded-full border-8 border-[#FF00E5] opacity-80"
                                style={{ clipPath: "polygon(50% 50%, 50% 0, 0 0, 0 50%)" }}
                              ></div>
                              <div
                                className="absolute inset-0 rounded-full border-8 border-[#7000FF] opacity-80"
                                style={{ clipPath: "polygon(50% 50%, 0 50%, 0 100%, 50% 100%)" }}
                              ></div>
                              <div
                                className="absolute inset-0 rounded-full border-8 border-[#00FFD1] opacity-80"
                                style={{ clipPath: "polygon(50% 50%, 50% 100%, 100% 100%, 100% 50%)" }}
                              ></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-[#0A1228]"></div>
                              </div>
                            </div>
                          </div>

                          {/* Legend */}
                          <div className="absolute bottom-0 inset-x-0 flex justify-center space-x-4">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-[#FF3D00] rounded-full mr-2"></div>
                              <span className="text-xs">Direct (40%)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-[#FF00E5] rounded-full mr-2"></div>
                              <span className="text-xs">Social (25%)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-[#7000FF] rounded-full mr-2"></div>
                              <span className="text-xs">Organic (20%)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-[#00FFD1] rounded-full mr-2"></div>
                              <span className="text-xs">Referral (15%)</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Visitor Demographics */}
                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Visitor Demographics</CardTitle>
                        <CardDescription className="text-[#A4B8D3]">Age and gender distribution</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] relative">
                          {/* Simulated bar chart */}
                          <div className="absolute inset-x-0 bottom-0 h-[250px] flex items-end justify-between px-2">
                            {[65, 85, 95, 75, 55, 45].map((height, i) => (
                              <div key={i} className="w-full mx-1 flex flex-col items-center">
                                <div className="w-full flex flex-col items-center">
                                  <div
                                    className="w-full bg-[#FF00E5] rounded-t-sm opacity-80"
                                    style={{ height: `${height * 0.7}px` }}
                                  ></div>
                                  <div
                                    className="w-full bg-[#7000FF] rounded-t-sm opacity-80 mt-1"
                                    style={{ height: `${height * 0.5}px` }}
                                  ></div>
                                </div>
                                <div className="text-xs text-[#A4B8D3] text-center mt-2">
                                  {["18-24", "25-34", "35-44", "45-54", "55-64", "65+"][i]}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Legend */}
                          <div className="absolute top-4 right-4 flex flex-col space-y-2">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-[#FF00E5] rounded-full mr-2"></div>
                              <span className="text-xs">Female</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-[#7000FF] rounded-full mr-2"></div>
                              <span className="text-xs">Male</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="reports" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Available Reports</CardTitle>
                      <CardDescription className="text-[#A4B8D3]">
                        Download detailed reports for your store
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            name: "Sales Report",
                            description: "Detailed breakdown of all sales",
                            date: "Last updated: Jul 21, 2023",
                          },
                          {
                            name: "Inventory Report",
                            description: "Current stock levels and product performance",
                            date: "Last updated: Jul 20, 2023",
                          },
                          {
                            name: "Customer Analytics",
                            description: "Customer demographics and behavior",
                            date: "Last updated: Jul 19, 2023",
                          },
                          {
                            name: "Marketing Performance",
                            description: "Campaign effectiveness and ROI",
                            date: "Last updated: Jul 18, 2023",
                          },
                        ].map((report, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-4 border border-[#1E293B] rounded-lg"
                          >
                            <div>
                              <div className="font-medium">{report.name}</div>
                              <div className="text-sm text-[#A4B8D3]">{report.description}</div>
                              <div className="text-xs text-[#A4B8D3] mt-1">{report.date}</div>
                            </div>
                            <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Recent Notifications</CardTitle>
                      <CardDescription className="text-[#A4B8D3]">
                        Stay updated with your store activities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            title: "New Order Received",
                            description: "Order #ORD-7245 has been placed by Alex Johnson",
                            time: "10 minutes ago",
                            type: "order",
                          },
                          {
                            title: "Low Stock Alert",
                            description: "Premium T-Shirt (Black, L) is running low on stock",
                            time: "1 hour ago",
                            type: "inventory",
                          },
                          {
                            title: "Payment Received",
                            description: "Payment of $89.99 received for order #ORD-7244",
                            time: "3 hours ago",
                            type: "payment",
                          },
                          {
                            title: "New Review",
                            description: "Sarah Williams left a 5-star review for Designer Hoodie",
                            time: "5 hours ago",
                            type: "review",
                          },
                          {
                            title: "Shipping Update",
                            description: "Order #ORD-7243 has been shipped via FedEx",
                            time: "1 day ago",
                            type: "shipping",
                          },
                        ].map((notification, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 border border-[#1E293B] rounded-lg">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notification.type === "order"
                                  ? "bg-[#FF3D00]/10"
                                  : notification.type === "inventory"
                                    ? "bg-[#FF00E5]/10"
                                    : notification.type === "payment"
                                      ? "bg-[#00FFD1]/10"
                                      : notification.type === "review"
                                        ? "bg-[#7000FF]/10"
                                        : "bg-[#FF3D00]/10"
                              }`}
                            >
                              {notification.type === "order" && <ShoppingBag className={`h-5 w-5 text-[#FF3D00]`} />}
                              {notification.type === "inventory" && <Package className={`h-5 w-5 text-[#FF00E5]`} />}
                              {notification.type === "payment" && <DollarSign className={`h-5 w-5 text-[#00FFD1]`} />}
                              {notification.type === "review" && <Users className={`h-5 w-5 text-[#7000FF]`} />}
                              {notification.type === "shipping" && (
                                <ShoppingCart className={`h-5 w-5 text-[#FF3D00]`} />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{notification.title}</div>
                              <div className="text-sm text-[#A4B8D3]">{notification.description}</div>
                              <div className="text-xs text-[#A4B8D3] mt-1">{notification.time}</div>
                            </div>
                          </div>
                        ))}
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

