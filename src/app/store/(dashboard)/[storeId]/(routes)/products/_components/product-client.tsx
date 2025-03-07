"use client"


import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/modules/store/ui/components/heading'
import ApiList from '@/modules/store/ui/components/api-list'
import { columns, ProductColumn } from './columns'


const ProductClient = ({ data }: { data: ProductColumn[] }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={`Products (${data.length})`} description='Manage products for your store' />
        <Button onClick={() => router.push(`/store/${params.storeId}/products/new`)}>
          <Plus className='w-4 h-4 md:mr-2 mr-1' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={['name', 'subcategory']} />
      <Heading title='API' description='API calls for products.' />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  )
}

export default ProductClient