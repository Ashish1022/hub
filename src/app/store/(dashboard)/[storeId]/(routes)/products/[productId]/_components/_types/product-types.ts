import { Image, Product } from "@prisma/client"
import { z } from "zod"
import { attributeSchema, customFieldSchema, mediaItemSchema, productFormSchema, variantOptionSchema, variantSchema } from "../_schemas/product-schema"

export type ProductFormValues = z.infer<typeof productFormSchema>
export type VariantOption = z.infer<typeof variantOptionSchema>
export type Variant = z.infer<typeof variantSchema>
export type MediaItem = z.infer<typeof mediaItemSchema>
export type Attribute = z.infer<typeof attributeSchema>
export type CustomField = z.infer<typeof customFieldSchema>

export interface ProductFormProps {
    initialData: Product | null
    images: Image[]
}