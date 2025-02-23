"use client"

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import Heading from '@/modules/store/ui/components/heading';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { CollectionColumn, columns } from './columns';
import ApiList from '@/modules/store/ui/components/api-list';

const CollectionClient = ({ data }: { data: CollectionColumn[] }) => {

  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={`Collections (${data.length})`} description='Manage collections for your store' />
        <Button onClick={() => router.push(`/store/${params.storeId}/collections/new`)}>
          <Plus className='w-4 h-4 mr-2' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={['label', 'seoTitle']} />
      <Heading title='API' description='API calls for collections.' />
      <Separator />
      <ApiList entityName='collections' entityIdName='collectionId' />
    </>
  )
}

export default CollectionClient