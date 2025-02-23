import React from 'react'
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';
import prismadb from '@/lib/db/prismadb';
import { OrderColumn } from './_components/Columns';
import OrderClient from './_components/OrderClient';

const Orders = async (props: { params: Promise<{ storeId: string }> }) => {

    const params = await props.params

    const orders = await prismadb.orders.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((order) => ({
        id: order.id,
        phone: order.phone,
        address: order.address,
        products: order.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        createdAt: format(order.createdAt, "MMMM do, yyyy"),
        totalPrice: formatter.format(order.orderItems.reduce((total, item) => {
            return (
                total + Number(item.product.price)
            )
        }, 0)),
        isPaid: order.isPaid,
    }))

    return (
        <div className='flex flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    )
}

export default Orders