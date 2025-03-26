import { BarChart3, CreditCard, LineChart, Package, ShoppingBag, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = async (props: { params: Promise<{ storeId: string }> }) => {

    const params = await props.params;

    return (
        <nav className="space-y-1 flex-1">
            <Link
                href={`/store/${params.storeId}`}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
            </Link>
            <Link
                href={`/store/${params.storeId}/analytics`}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#FF00E5]/10 text-[#FF00E5] font-medium"
            >
                <LineChart className="h-5 w-5" />
                <span>Analytics</span>
            </Link>
            <Link
                href={`/store/${params.storeId}/products`}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
                <Package className="h-5 w-5" />
                <span>Products</span>
            </Link>
            <Link
                href={`/store/${params.storeId}/orders`}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
                <ShoppingBag className="h-5 w-5" />
                <span>Orders</span>
            </Link>
            <Link
                href={`/store/${params.storeId}/customers`}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
                <Users className="h-5 w-5" />
                <span>Customers</span>
            </Link>
            <Link
                href={`/store/${params.storeId}/payments`}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-[#A4B8D3] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
                <CreditCard className="h-5 w-5" />
                <span>Payments</span>
            </Link>
        </nav>

    )
}

export default Navbar