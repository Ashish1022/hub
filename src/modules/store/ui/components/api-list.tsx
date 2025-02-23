"use client"

import { useParams } from 'next/navigation'
import React from 'react'
import ApiAlert from './api-alert';
import { useOrigin } from '@/hooks/use-origin';

interface ApiListProps {
    entityIdName: string;
    entityName: string;
}

const ApiList = ({
    entityIdName,
    entityName
}: ApiListProps) => {

    const params = useParams();
    const origin = useOrigin();

    const base_url = `${origin}/api/${params.storeId}`;

    return (
        <>
            <ApiAlert
                title='GET'
                variant='public'
                description={`${base_url}/${entityName}`}
            />
            <ApiAlert
                title='GET'
                variant='public'
                description={`${base_url}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title='POST'
                variant='admin'
                description={`${base_url}/${entityName}`}
            />
            <ApiAlert
                title='PATCH'
                variant='admin'
                description={`${base_url}/${entityName}/{${entityIdName}}`}
            />
            <ApiAlert
                title='DELETE'
                variant='admin'
                description={`${base_url}/${entityName}/{${entityIdName}}`}
            />
        </>
    )
}

export default ApiList