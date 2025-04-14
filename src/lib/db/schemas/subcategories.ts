import { z } from "zod";

export const subcategoryFormSchema = z.object({
    name: z.string().min(1, "Category name is required"),
    description: z.string().optional(),
    slug: z.string().optional(),
    categoryId: z.string(),
    isActive: z.boolean().default(true),
    imageUrl: z.string().optional(),
    displayOrder: z.number().int().default(0),
    showInMenu: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
})

export type SubcategoryFormValues = z.infer<typeof subcategoryFormSchema>

export const defaultProductValues: Partial<SubcategoryFormValues> = {
    name: "",
    description: "",
    slug: "",
    isActive: true,
    categoryId: "",
    imageUrl: "",
    displayOrder: 0,
    showInMenu: true,
    isFeatured: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: ""
}