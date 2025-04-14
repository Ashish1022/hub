"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  Map,
  PieChart,
  TrendingUp,
  Activity,
  Smartphone,
  Laptop,
  Tablet,
  Users,
} from "lucide-react"
import DashboardNav from "@/components/store/layout/dashboard-nav"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("performance")

  return (
    <DashboardNav searchPlaceholder="Search analytics...">
      <main className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                Analytics Dashboard
              </h1>
              <p className="text-[#A4B8D3]">Detailed insights and performance metrics for your store</p>
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 days
              </Button>
              <Button className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Total Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">24,892</div>
                    <div className="flex items-center text-xs text-[#00FFD1]">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>18% from last month</span>
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
                    <div className="text-2xl font-bold">3.8%</div>
                    <div className="flex items-center text-xs text-[#00FFD1]">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>0.6% from last month</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#FF00E5]/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-[#FF00E5]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Avg. Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">4m 32s</div>
                    <div className="flex items-center text-xs text-[#00FFD1]">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>12% from last month</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#FF3D00]/10 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-[#FF3D00]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#A4B8D3]">Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">28.4%</div>
                    <div className="flex items-center text-xs text-[#00FFD1]">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      <span>3.2% from last month</span>
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
                value="performance"
                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
              >
                Performance
              </TabsTrigger>
              <TabsTrigger
                value="audience"
                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
              >
                Audience
              </TabsTrigger>
              <TabsTrigger
                value="behavior"
                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
              >
                Behavior
              </TabsTrigger>
              <TabsTrigger
                value="acquisition"
                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
              >
                Acquisition
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Chart */}
                <Card className="lg:col-span-2 bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Traffic Overview</CardTitle>
                      <Badge className="bg-[#FF00E5]/10 text-[#FF00E5] hover:bg-[#FF00E5]/20 border-[#FF00E5]/30">
                        +18.5%
                      </Badge>
                    </div>
                    <CardDescription className="text-[#A4B8D3]">Monthly traffic trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] relative">
                      {/* Simulated line chart */}
                      <div className="absolute inset-0 flex items-end">
                        <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
                          {/* Grid lines */}
                          <line x1="0" y1="0" x2="600" y2="0" stroke="#1E293B" strokeWidth="1" />
                          <line x1="0" y1="75" x2="600" y2="75" stroke="#1E293B" strokeWidth="1" />
                          <line x1="0" y1="150" x2="600" y2="150" stroke="#1E293B" strokeWidth="1" />
                          <line x1="0" y1="225" x2="600" y2="225" stroke="#1E293B" strokeWidth="1" />
                          <line x1="0" y1="300" x2="600" y2="300" stroke="#1E293B" strokeWidth="1" />

                          {/* Line chart */}
                          <path
                            d="M0,200 C50,180 100,190 150,150 C200,110 250,120 300,100 C350,80 400,60 450,70 C500,80 550,50 600,30"
                            fill="none"
                            stroke="#FF00E5"
                            strokeWidth="3"
                          />

                          {/* Area under the line */}
                          <path
                            d="M0,200 C50,180 100,190 150,150 C200,110 250,120 300,100 C350,80 400,60 450,70 C500,80 550,50 600,30 L600,300 L0,300 Z"
                            fill="url(#gradient)"
                            opacity="0.2"
                          />

                          {/* Gradient definition */}
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#FF00E5" />
                              <stop offset="100%" stopColor="#FF00E5" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      {/* X-axis labels */}
                      <div className="absolute bottom-0 inset-x-0 flex justify-between text-xs text-[#A4B8D3] px-4">
                        <div>Jan</div>
                        <div>Feb</div>
                        <div>Mar</div>
                        <div>Apr</div>
                        <div>May</div>
                        <div>Jun</div>
                        <div>Jul</div>
                      </div>

                      {/* Y-axis labels */}
                      <div className="absolute left-2 inset-y-0 flex flex-col justify-between text-xs text-[#A4B8D3] py-2">
                        <div>25k</div>
                        <div>20k</div>
                        <div>15k</div>
                        <div>10k</div>
                        <div>5k</div>
                        <div>0</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Pages */}
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Top Pages</CardTitle>
                    <CardDescription className="text-[#A4B8D3]">Most visited pages this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "/products/premium-tshirt", views: 4328, time: "2m 12s" },
                        { name: "/products/designer-hoodie", views: 3542, time: "1m 56s" },
                        { name: "/category/summer-collection", views: 2871, time: "3m 04s" },
                        { name: "/checkout", views: 2453, time: "4m 18s" },
                        { name: "/products/vintage-jeans", views: 1982, time: "2m 37s" },
                      ].map((page, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between pb-3 border-b border-[#1E293B] last:border-0 last:pb-0"
                        >
                          <div className="truncate pr-4 max-w-[180px]">
                            <div className="font-medium truncate">{page.name}</div>
                            <div className="text-sm text-[#A4B8D3]">{page.views.toLocaleString()} views</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{page.time}</div>
                            <div className="text-xs text-[#A4B8D3]">avg. time</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Conversion Funnel */}
              <Card className="mt-6 bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription className="text-[#A4B8D3]">User journey through your store</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] relative">
                    {/* Funnel visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full max-w-3xl flex">
                        {[
                          { label: "Visitors", value: 24892, percent: 100, color: "#7000FF" },
                          { label: "Product Views", value: 18670, percent: 75, color: "#FF00E5" },
                          { label: "Add to Cart", value: 9946, percent: 40, color: "#FF3D00" },
                          { label: "Checkout", value: 5476, percent: 22, color: "#FF3D00" },
                          { label: "Purchase", value: 3486, percent: 14, color: "#00FFD1" },
                        ].map((stage, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full h-24 flex items-center justify-center text-white font-medium"
                              style={{
                                background: stage.color,
                                clipPath:
                                  i === 0
                                    ? "polygon(0 0, 100% 0, 90% 100%, 10% 100%)"
                                    : i === 4
                                      ? "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)"
                                      : "polygon(10% 0, 90% 0, 90% 100%, 10% 100%)",
                                opacity: 0.8,
                              }}
                            >
                              {stage.percent}%
                            </div>
                            <div className="mt-2 text-center">
                              <div className="text-sm font-medium">{stage.label}</div>
                              <div className="text-xs text-[#A4B8D3]">{stage.value.toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Geographic Distribution */}
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                    <CardDescription className="text-[#A4B8D3]">Where your visitors are located</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] relative flex items-center justify-center">
                      {/* World map placeholder */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Map className="w-64 h-64 text-[#1E293B]" />

                        {/* Hotspots */}
                        <div className="absolute top-[30%] left-[25%] w-3 h-3 rounded-full bg-[#FF3D00] animate-pulse"></div>
                        <div className="absolute top-[40%] left-[80%] w-4 h-4 rounded-full bg-[#FF00E5] animate-pulse"></div>
                        <div className="absolute top-[35%] left-[45%] w-5 h-5 rounded-full bg-[#7000FF] animate-pulse"></div>
                        <div className="absolute top-[60%] left-[30%] w-2 h-2 rounded-full bg-[#00FFD1] animate-pulse"></div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {[
                        { country: "United States", visitors: 8945, percent: 36 },
                        { country: "United Kingdom", visitors: 3672, percent: 15 },
                        { country: "Germany", visitors: 2984, percent: 12 },
                        { country: "Japan", visitors: 2453, percent: 10 },
                      ].map((country, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{country.country}</div>
                            <div className="text-xs text-[#A4B8D3]">{country.visitors.toLocaleString()} visitors</div>
                          </div>
                          <Badge className="bg-[#0A1228] border border-[#1E293B]">{country.percent}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Device Distribution */}
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Device Distribution</CardTitle>
                    <CardDescription className="text-[#A4B8D3]">What devices your visitors use</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] relative">
                      {/* Donut chart */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-48 h-48">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Desktop segment - 45% */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke="#7000FF"
                              strokeWidth="20"
                              strokeDasharray="251.2 502.4"
                              strokeDashoffset="0"
                              transform="rotate(-90 50 50)"
                            />

                            {/* Mobile segment - 40% */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke="#FF00E5"
                              strokeWidth="20"
                              strokeDasharray="125.6 502.4"
                              strokeDashoffset="-125.6"
                              transform="rotate(-90 50 50)"
                            />

                            {/* Tablet segment - 15% */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke="#FF3D00"
                              strokeWidth="20"
                              strokeDasharray="75.4 502.4"
                              strokeDashoffset="-251.2"
                              transform="rotate(-90 50 50)"
                            />

                            {/* Inner circle */}
                            <circle cx="50" cy="50" r="20" fill="#0A1228" />
                          </svg>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold">24.8k</div>
                              <div className="text-xs text-[#A4B8D3]">Total Users</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="absolute bottom-0 inset-x-0 flex justify-center space-x-6">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-[#7000FF] rounded-full mr-2"></div>
                          <span className="text-xs">Desktop (45%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-[#FF00E5] rounded-full mr-2"></div>
                          <span className="text-xs">Mobile (40%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-[#FF3D00] rounded-full mr-2"></div>
                          <span className="text-xs">Tablet (15%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center p-3 border border-[#1E293B] rounded-lg">
                        <Laptop className="h-8 w-8 text-[#7000FF] mb-2" />
                        <div className="text-sm font-medium">Desktop</div>
                        <div className="text-xs text-[#A4B8D3]">11,201 users</div>
                      </div>
                      <div className="flex flex-col items-center p-3 border border-[#1E293B] rounded-lg">
                        <Smartphone className="h-8 w-8 text-[#FF00E5] mb-2" />
                        <div className="text-sm font-medium">Mobile</div>
                        <div className="text-xs text-[#A4B8D3]">9,957 users</div>
                      </div>
                      <div className="flex flex-col items-center p-3 border border-[#1E293B] rounded-lg">
                        <Tablet className="h-8 w-8 text-[#FF3D00] mb-2" />
                        <div className="text-sm font-medium">Tablet</div>
                        <div className="text-xs text-[#A4B8D3]">3,734 users</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="mt-4">
              <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>User Behavior Flow</CardTitle>
                  <CardDescription className="text-[#A4B8D3]">How users navigate through your store</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] relative overflow-x-auto">
                    <div className="min-w-[800px] h-full flex items-center">
                      {/* Flow diagram */}
                      <div className="w-full flex justify-between items-center">
                        {/* Entry points */}
                        <div className="flex flex-col space-y-4">
                          {[
                            { name: "Homepage", value: 12450, color: "#7000FF" },
                            { name: "Search", value: 6240, color: "#FF00E5" },
                            { name: "Social Media", value: 4120, color: "#FF3D00" },
                            { name: "Email", value: 2082, color: "#00FFD1" },
                          ].map((entry, i) => (
                            <div
                              key={i}
                              className="w-40 p-2 rounded-md text-center text-white text-sm"
                              style={{ backgroundColor: entry.color }}
                            >
                              <div>{entry.name}</div>
                              <div className="text-xs opacity-80">{entry.value.toLocaleString()}</div>
                            </div>
                          ))}
                        </div>

                        {/* Connecting lines */}
                        <div className="flex-1 mx-4 relative">
                          <svg className="w-full h-[300px]" viewBox="0 0 200 300">
                            {/* Lines from entry to first step */}
                            <path d="M0,30 C40,30 60,75 100,75" stroke="#7000FF" fill="none" strokeWidth="2" />
                            <path d="M0,100 C40,100 60,125 100,125" stroke="#FF00E5" fill="none" strokeWidth="2" />
                            <path d="M0,170 C40,170 60,175 100,175" stroke="#FF3D00" fill="none" strokeWidth="2" />
                            <path d="M0,240 C40,240 60,225 100,225" stroke="#00FFD1" fill="none" strokeWidth="2" />

                            {/* Lines from first to second step */}
                            <path
                              d="M140,75 C160,75 180,50 200,50"
                              stroke="#7000FF"
                              fill="none"
                              strokeWidth="2"
                              opacity="0.7"
                            />
                            <path
                              d="M140,75 C160,75 180,100 200,100"
                              stroke="#7000FF"
                              fill="none"
                              strokeWidth="2"
                              opacity="0.5"
                            />
                            <path
                              d="M140,125 C160,125 180,100 200,100"
                              stroke="#FF00E5"
                              fill="none"
                              strokeWidth="2"
                              opacity="0.7"
                            />
                            <path
                              d="M140,125 C160,125 180,150 200,150"
                              stroke="#FF00E5"
                              fill="none"
                              strokeWidth="2"
                              opacity="0.5"
                            />
                            <path
                              d="M140,175 C160,175 180,150 200,150"
                              stroke="#FF3D00"
                              fill="none"
                              strokeWidth="2"
                              opacity="0.7"
                            />
                            <path
                              d="M140,175 C160,175 180,200 200,200"
                              stroke="#FF3D00"
                              fill="none"
                              strokeWidth="2"
                              opacity="0.5"
                            />
                            <path
                              d="M140,225 C160,225 180,200 200,200"
                              stroke="#00FFD1"
                              fill="none"
                              strokeWidth="2"
                              opacity="0.7"
                            />
                            <path
                              d="M140,225 C160,225 180,250 200,250"
                              stroke="#00FFD1"
                              fill="none"
                              strokeWidth="2"
                              opacity="0.5"
                            />
                          </svg>
                        </div>

                        {/* First step */}
                        <div className="flex flex-col space-y-4">
                          {[
                            { name: "Product Listings", value: 9860, color: "bg-[#1E293B]" },
                            { name: "Category Pages", value: 7420, color: "bg-[#1E293B]" },
                            { name: "Featured Items", value: 4950, color: "bg-[#1E293B]" },
                            { name: "Blog Articles", value: 2662, color: "bg-[#1E293B]" },
                          ].map((step, i) => (
                            <div
                              key={i}
                              className={`w-40 p-2 rounded-md text-center border border-[#1E293B] ${step.color}`}
                            >
                              <div className="text-sm">{step.name}</div>
                              <div className="text-xs text-[#A4B8D3]">{step.value.toLocaleString()}</div>
                            </div>
                          ))}
                        </div>

                        {/* Second step */}
                        <div className="flex flex-col space-y-4">
                          {[
                            { name: "Product Details", value: 7240, color: "bg-[#1E293B]" },
                            { name: "Add to Cart", value: 5180, color: "bg-[#1E293B]" },
                            { name: "Checkout", value: 3420, color: "bg-[#1E293B]" },
                            { name: "Account", value: 1052, color: "bg-[#1E293B]" },
                          ].map((step, i) => (
                            <div
                              key={i}
                              className={`w-40 p-2 rounded-md text-center border border-[#1E293B] ${step.color}`}
                            >
                              <div className="text-sm">{step.name}</div>
                              <div className="text-xs text-[#A4B8D3]">{step.value.toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="acquisition" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription className="text-[#A4B8D3]">Where your visitors are coming from</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Direct", value: 9960, percent: 40, color: "#7000FF" },
                        { name: "Social Media", value: 6223, percent: 25, color: "#FF00E5" },
                        { name: "Organic Search", value: 4978, percent: 20, color: "#FF3D00" },
                        { name: "Referral", value: 3731, percent: 15, color: "#00FFD1" },
                      ].map((source, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: source.color }}
                              ></div>
                              <span>{source.name}</span>
                            </div>
                            <div className="text-sm">{source.percent}%</div>
                          </div>
                          <div className="w-full bg-[#1E293B] rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${source.percent}%`,
                                backgroundColor: source.color,
                              }}
                            ></div>
                          </div>
                          <div className="text-xs text-[#A4B8D3]">{source.value.toLocaleString()} visitors</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Campaign Performance */}
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                    <CardDescription className="text-[#A4B8D3]">Results from your marketing campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Summer Sale",
                          visitors: 4250,
                          conversion: 5.8,
                          revenue: "$12,750",
                          status: "Active",
                          trend: "up",
                        },
                        {
                          name: "New Collection",
                          visitors: 3180,
                          conversion: 4.2,
                          revenue: "$8,430",
                          status: "Active",
                          trend: "up",
                        },
                        {
                          name: "Holiday Special",
                          visitors: 2840,
                          conversion: 3.9,
                          revenue: "$6,980",
                          status: "Scheduled",
                          trend: "neutral",
                        },
                        {
                          name: "Flash Sale",
                          visitors: 1950,
                          conversion: 6.7,
                          revenue: "$5,240",
                          status: "Ended",
                          trend: "down",
                        },
                      ].map((campaign, i) => (
                        <div
                          key={i}
                          className="p-3 border border-[#1E293B] rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-xs text-[#A4B8D3]">
                              {campaign.visitors.toLocaleString()} visitors • {campaign.conversion}% conv.
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{campaign.revenue}</div>
                            <div className="flex items-center justify-end text-xs">
                              <Badge
                                className={
                                  campaign.status === "Active"
                                    ? "bg-[#00FFD1]/10 text-[#00FFD1] border-[#00FFD1]/30"
                                    : campaign.status === "Scheduled"
                                      ? "bg-[#FF00E5]/10 text-[#FF00E5] border-[#FF00E5]/30"
                                      : "bg-[#1E293B] text-[#A4B8D3]"
                                }
                              >
                                {campaign.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </DashboardNav>
  )
}

