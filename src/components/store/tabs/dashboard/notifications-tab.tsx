import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Package, ShoppingBag, ShoppingCart, Users } from 'lucide-react'
import React from 'react'

const NotificationsTab = () => {
    return (
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
                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.type === "order"
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
    )
}

export default NotificationsTab