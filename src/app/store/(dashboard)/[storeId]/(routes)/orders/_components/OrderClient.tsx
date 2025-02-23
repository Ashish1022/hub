"use client"

import { Separator } from '@/components/ui/separator'
import React from 'react'
import { columns, OrderColumn } from './Columns'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/modules/store/ui/components/heading'

const OrderClient = ({ data }: { data: OrderColumn[] }) => {

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={`Orders (${data.length})`} description='Manage orders for your store' />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={['products','phone']} />
    </>
  )
}

export default OrderClient