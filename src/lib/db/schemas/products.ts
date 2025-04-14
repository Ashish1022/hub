import { z } from "zod";

export const productFormSchema = z.object({
    // Basic Information
    name: z.string().min(1, { message: "Product name is required" }),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    material: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    depth: z.number().optional(),
    weight: z.number().optional(),
    tags: z.array(z.string()).optional(),

    // Organization
    category: z.string().optional(),
    subcategory: z.string().optional(),
    brand: z.string().optional(),
    collections: z.array(z.string()).optional(),
    status: z.string().default("active"),
    publishDate: z.date().optional(),
    isFeatured: z.boolean().default(false),
    isRecommended: z.boolean().default(false),
    isNew: z.boolean().default(false),
    isBestseller: z.boolean().default(false),

    // Pricing
    regularPrice: z.number().optional(),
    salePrice: z.number().optional(),
    costPrice: z.number().optional(),
    profitMargin: z.number().optional(),
    onSale: z.boolean().default(false),
    saleStartDate: z.date().optional(),
    saleEndDate: z.date().optional(),
    taxClass: z.string().default("standard"),
    taxStatus: z.string().default("taxable"),
    bulkPricing: z
        .array(
            z.object({
                minQuantity: z.number(),
                maxQuantity: z.number().optional(),
                price: z.number(),
                discountType: z.enum(["percentage", "fixed"]).default("percentage"),
            }),
        )
        .optional(),

    // Inventory
    trackInventory: z.boolean().default(true),
    stockQuantity: z.number().default(0),
    lowStockThreshold: z.number().default(5),
    stockStatus: z.string().default("in-stock"),
    allowBackorders: z.boolean().default(false),
    backorderLimit: z.number().optional(),
    soldIndividually: z.boolean().default(false),
    warehouse: z.string().optional(),
    binLocation: z.string().optional(),
    minPurchaseQuantity: z.number().default(1),
    maxPurchaseQuantity: z.number().optional(),

    // Variants
    hasVariants: z.boolean().default(false),
    variantOptions: z
        .array(
            z.object({
                name: z.string(),
                values: z.array(z.string()),
                visible: z.boolean().default(true),
                variation: z.boolean().default(true),
            }),
        )
        .optional(),
    variantDisplay: z.string().default("dropdown"),
    variants: z
        .array(
            z.object({
                id: z.string().optional(),
                options: z.record(z.string(), z.string()),
                sku: z.string().optional(),
                barcode: z.string().optional(),
                price: z.number().optional(),
                compareAtPrice: z.number().optional(),
                costPrice: z.number().optional(),
                stockQuantity: z.number().default(0),
                weight: z.number().optional(),
                dimensions: z
                    .object({
                        length: z.number().optional(),
                        width: z.number().optional(),
                        height: z.number().optional(),
                    })
                    .optional(),
                images: z.array(z.string()).optional(),
                isEnabled: z.boolean().default(true),
                lowStockThreshold: z.number().optional(),
                backorderLimit: z.number().optional(),
                allowBackorders: z.boolean().default(false),
            }),
        )
        .optional(),

    // Shipping
    isPhysical: z.boolean().default(true),
    shippingWeight: z.number().optional(),
    shippingLength: z.number().optional(),
    shippingWidth: z.number().optional(),
    shippingHeight: z.number().optional(),
    shippingClass: z.string().optional(),
    shippingRestrictions: z.array(z.string()).optional(),
    freeShipping: z.boolean().default(false),
    shippingMarkup: z.number().optional(),
    requiresShippingAddress: z.boolean().default(true),

    // Related Products
    relatedProducts: z.array(z.string()).optional(),
    upsellProducts: z.array(z.string()).optional(),
    crossSellProducts: z.array(z.string()).optional(),

    // SEO
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
    canonicalUrl: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    slug: z.string().optional(),

    // Advanced
    purchaseNote: z.string().optional(),
    enableReviews: z.boolean().default(true),
    downloadable: z.boolean().default(false),
    downloadFiles: z
        .array(
            z.object({
                name: z.string(),
                url: z.string(),
                size: z.number().optional(),
            }),
        )
        .optional(),
    preOrderAvailable: z.boolean().default(false),
    preOrderReleaseDate: z.date().optional(),
    preOrderMessage: z.string().optional(),
    customizable: z.boolean().default(false),
    customizationOptions: z
        .array(
            z.object({
                name: z.string(),
                type: z.enum(["text", "select", "checkbox", "radio", "file"]),
                required: z.boolean().default(false),
                options: z.array(z.string()).optional(),
                price: z.number().optional(),
                priceType: z.enum(["fixed", "percentage"]).default("fixed"),
            }),
        )
        .optional(),

    // Store
    storeId: z.string(),

    // Images
    images: z
        .string()
        .optional(),

    // Custom Fields
    customFields: z
        .array(
            z.object({
                id: z.string().optional(),
                name: z.string(),
                value: z.string().optional(),
                visible: z.boolean().default(true),
            }),
        )
        .optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const defaultProductValues: Partial<ProductFormValues> = {
    name: "",
    description: "",
    shortDescription: "",
    sku: "",
    barcode: "",
    material: "",
    tags: [],
    category: "",
    subcategory: "",
    brand: "",
    collections: [],
    status: "active",
    publishDate: new Date(),
    isFeatured: false,
    isRecommended: false,
    isNew: false,
    isBestseller: false,
    regularPrice: undefined,
    salePrice: undefined,
    costPrice: undefined,
    profitMargin: undefined,
    onSale: false,
    taxClass: "standard",
    taxStatus: "taxable",
    bulkPricing: [],
    trackInventory: true,
    stockQuantity: 0,
    lowStockThreshold: 5,
    stockStatus: "in-stock",
    allowBackorders: false,
    soldIndividually: false,
    warehouse: "",
    binLocation: "",
    minPurchaseQuantity: 1,
    hasVariants: false,
    variantOptions: [],
    variantDisplay: "dropdown",
    variants: [],
    isPhysical: true,
    freeShipping: false,
    requiresShippingAddress: true,
    relatedProducts: [],
    upsellProducts: [],
    crossSellProducts: [],
    enableReviews: true,
    downloadable: false,
    downloadFiles: [],
    preOrderAvailable: false,
    customizable: false,
    customizationOptions: [],
    images: '',
    customFields: [],
};

export const mediaItemSchema = z.object({
    id: z.string(),
    url: z.string(),
    type: z.enum(["image", "video", "3d"]),
    alt: z.string().optional(),
    position: z.number(),
    variantIds: z.array(z.string()).optional(),
})

export const variantSchema = z.object({
    id: z.string().optional(),
    options: z.record(z.string()).optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    price: z.coerce.number().min(0).optional(),
    compareAtPrice: z.coerce.number().min(0).optional(),
    costPrice: z.coerce.number().min(0).optional(),
    stockQuantity: z.coerce.number().min(0).optional(),
    weight: z.coerce.number().min(0).optional(),
    dimensions: z
        .object({
            length: z.coerce.number().min(0).optional(),
            width: z.coerce.number().min(0).optional(),
            height: z.coerce.number().min(0).optional(),
        })
        .optional(),
    images: z.array(z.string()).default([]),
    isEnabled: z.boolean().default(true),
    lowStockThreshold: z.coerce.number().min(0).optional(),
    backorderLimit: z.coerce.number().min(0).optional(),
    allowBackorders: z.boolean().default(false),
})