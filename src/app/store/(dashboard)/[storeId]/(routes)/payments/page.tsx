"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUp,
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  DollarSign,
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
  Users,
} from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"
import DashboardNav from "@/components/store/layout/dashboard-nav"

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { user } = useUser()

  return (
    <DashboardNav>
    <div className="min-h-screen bg-[#050A18] text-white">
      {/* Decorative elements */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#FF3D00]/10 via-[#FF00E5]/10 to-transparent blur-3xl opacity-30 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-full h-[500px] bg-gradient-to-tl from-[#00FFD1]/10 via-[#7000FF]/10 to-transparent blur-3xl opacity-30 pointer-events-none"></div>

      <div className="flex h-screen overflow-hidden">

        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Payments content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                    Payments
                  </h1>
                  <p className="text-[#A4B8D3]">Manage and track your payment transactions</p>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                    <Calendar className="h-4 w-4 mr-2" />
                    Last 30 days
                  </Button>
                  <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>

              {/* Payment stats */}
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
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Successful Payments</CardTitle>
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
                      <div className="w-10 h-10 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-[#00FFD1]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Failed Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">18</div>
                        <div className="flex items-center text-xs text-[#FF3D00]">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>3% from last month</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#FF00E5]/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-[#FF00E5]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#A4B8D3]">Avg. Transaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">$72.45</div>
                        <div className="flex items-center text-xs text-[#00FFD1]">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span>5% from last month</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#7000FF]/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-[#7000FF]" />
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
                    placeholder="Search payments by ID, customer, or amount..."
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
                    All Payments
                  </TabsTrigger>
                  <TabsTrigger
                    value="successful"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Successful
                  </TabsTrigger>
                  <TabsTrigger
                    value="failed"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Failed
                  </TabsTrigger>
                  <TabsTrigger
                    value="refunded"
                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                  >
                    Refunded
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#1E293B]">
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">TRANSACTION ID</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">CUSTOMER</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">DATE</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">AMOUNT</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">METHOD</th>
                              <th className="text-left py-3 px-4 text-xs font-medium text-[#A4B8D3]">STATUS</th>
                              <th className="text-right py-3 px-4 text-xs font-medium text-[#A4B8D3]">ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                id: "#TRX-7245",
                                customer: "Alex Johnson",
                                date: "Jul 21, 2023",
                                amount: "$59.99",
                                method: "Credit Card",
                                status: "Successful",
                              },
                              {
                                id: "#TRX-7244",
                                customer: "Sarah Williams",
                                date: "Jul 20, 2023",
                                amount: "$89.99",
                                method: "PayPal",
                                status: "Successful",
                              },
                              {
                                id: "#TRX-7243",
                                customer: "Michael Brown",
                                date: "Jul 19, 2023",
                                amount: "$69.99",
                                method: "Credit Card",
                                status: "Failed",
                              },
                              {
                                id: "#TRX-7242",
                                customer: "Emily Davis",
                                date: "Jul 18, 2023",
                                amount: "$39.99",
                                method: "Apple Pay",
                                status: "Successful",
                              },
                              {
                                id: "#TRX-7241",
                                customer: "David Wilson",
                                date: "Jul 17, 2023",
                                amount: "$29.99",
                                method: "Credit Card",
                                status: "Refunded",
                              },
                              {
                                id: "#TRX-7240",
                                customer: "Jennifer Taylor",
                                date: "Jul 16, 2023",
                                amount: "$149.99",
                                method: "Google Pay",
                                status: "Successful",
                              },
                              {
                                id: "#TRX-7239",
                                customer: "Robert Miller",
                                date: "Jul 15, 2023",
                                amount: "$79.99",
                                method: "Credit Card",
                                status: "Failed",
                              },
                              {
                                id: "#TRX-7238",
                                customer: "Lisa Anderson",
                                date: "Jul 14, 2023",
                                amount: "$119.99",
                                method: "PayPal",
                                status: "Successful",
                              },
                            ].map((payment, i) => (
                              <tr key={i} className="border-b border-[#1E293B] last:border-0">
                                <td className="py-3 px-4 text-sm font-medium">{payment.id}</td>
                                <td className="py-3 px-4 text-sm">{payment.customer}</td>
                                <td className="py-3 px-4 text-sm text-[#A4B8D3]">{payment.date}</td>
                                <td className="py-3 px-4 text-sm font-medium">{payment.amount}</td>
                                <td className="py-3 px-4 text-sm text-[#A4B8D3]">{payment.method}</td>
                                <td className="py-3 px-4">
                                  <Badge
                                    className={
                                      payment.status === "Successful"
                                        ? "bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30"
                                        : payment.status === "Failed"
                                          ? "bg-[#FF3D00]/10 text-[#FF3D00] border-[#FF3D00]/30"
                                          : "bg-[#7000FF]/10 text-[#7000FF] border-[#7000FF]/30"
                                    }
                                  >
                                    {payment.status}
                                  </Badge>
                                </td>
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

                <TabsContent value="successful" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center py-6">
                        <CreditCard className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Successful Payments</h3>
                        <p className="text-[#A4B8D3] mb-4">You have 342 successful payments.</p>
                        <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                          View Successful Payments
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="failed" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center py-6">
                        <CreditCard className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Failed Payments</h3>
                        <p className="text-[#A4B8D3] mb-4">You have 18 failed payments.</p>
                        <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                          View Failed Payments
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="refunded" className="mt-4">
                  <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center py-6">
                        <CreditCard className="h-12 w-12 text-[#A4B8D3] mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Refunded Payments</h3>
                        <p className="text-[#A4B8D3] mb-4">You have 8 refunded payments.</p>
                        <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                          View Refunded Payments
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
    </DashboardNav>
  )
}

