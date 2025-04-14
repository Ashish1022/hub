import { ProductFormValues } from '@/lib/db/schemas/products'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

interface RelatedProductsTabProps {
    form: UseFormReturn<ProductFormValues>
}

const RelatedProductsTab = ({ form }: RelatedProductsTabProps) => {
    return (
        <div>RelatedProductsTab</div>
    )
}

export default RelatedProductsTab