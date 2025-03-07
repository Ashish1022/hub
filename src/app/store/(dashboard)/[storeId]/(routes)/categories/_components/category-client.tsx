"use client"

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { CategoryColumn, columns } from './columns'
import Heading from '@/modules/store/ui/components/heading'
import ApiList from '@/modules/store/ui/components/api-list'

const CategoryClient = ({ data }: { data: CategoryColumn[] }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={`Categories (${data.length})`} description='Manage categories for your store.' />
        <Button onClick={() => router.push(`/store/${params.storeId}/categories/new`)}>
          <Plus className='w-4 h-4 md:mr-2 mr-1' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={['name','collectionLabel']} />
      <Heading title='API' description='API calls for categories.' />
      <Separator />
      <ApiList entityName='categories' entityIdName='categoryId' />
    </>
  )
}

export default CategoryClient