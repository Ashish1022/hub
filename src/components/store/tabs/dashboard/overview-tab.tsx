import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const OverviewTab = () => {
    return (
        <>
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
        </>
    )
}

export default OverviewTab