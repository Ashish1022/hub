import { ProductFormValues } from '@/lib/db/schemas/products'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

interface AdvancedTabProps {
    form: UseFormReturn<ProductFormValues>
}

const AdvancedTab = ({ form }: AdvancedTabProps) => {
    return (
        <div>AdvancedTab</div>
    )
}

export default AdvancedTab