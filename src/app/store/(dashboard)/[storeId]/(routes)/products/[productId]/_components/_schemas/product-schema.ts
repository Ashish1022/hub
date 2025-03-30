import { z } from "zod";

export const attributeSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Attribute name is required"),
    values: z.array(z.string()).min(1, "At least one attribute value is required"),
    visible: z.boolean().default(true),
    variation: z.boolean().default(false),
});

export const variantOptionSchema = z.object({
    name: z.string().min(1, "Option name is required"),
    values: z.array(z.string()).min(1, "At least one option value is required"),
    visible: z.boolean().default(true),
});

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
});

export const mediaItemSchema = z.object({
    id: z.string(),
    url: z.string(),
    type: z.enum(["image", "video", "3d"]),
    alt: z.string().optional(),
    position: z.number().optional(),
    variantIds: z.array(z.string()).optional(),
});

export const customFieldSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Field name is required"),
    value: z.string().optional(),
    visible: z.boolean().default(true),
});

export const productFormSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    material: z.string().optional(),
    width: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    depth: z.coerce.number().optional(),
    weight: z.coerce.number().optional(),
    tags: z.array(z.string()).default([]),
    customFields: z.array(customFieldSchema).default([]),

    category: z.string().optional(),
    subcategory: z.string().optional(),
    brand: z.string().optional(),
    collections: z.array(z.string()).default([]),
    status: z.enum(["active", "draft", "archived", "scheduled"]).default("active"),
    publishDate: z.string().optional(),
    isFeatured: z.boolean().default(false),
    isRecommended: z.boolean().default(false),
    isNew: z.boolean().default(false),
    isBestseller: z.boolean().default(false),

    media: z.array(mediaItemSchema).default([]),

    regularPrice: z.coerce.number().min(0).optional(),
    salePrice: z.coerce.number().min(0).optional(),
    costPrice: z.coerce.number().min(0).optional(),
    profitMargin: z.coerce.number().min(0).optional(),
    onSale: z.boolean().default(false),
    saleStartDate: z.string().optional(),
    saleEndDate: z.string().optional(),
    taxClass: z.enum(["standard", "reduced", "zero"]).default("standard"),
    taxStatus: z.enum(["taxable", "shipping", "none"]).default("taxable"),
    bulkPricing: z
        .array(
            z.object({
                minQuantity: z.coerce.number().min(0).optional(),
                maxQuantity: z.coerce.number().min(0).optional(),
                discount: z.coerce.number().min(0).max(100).optional(),
                price: z.coerce.number().min(0).optional(),
            }),
        )
        .default([{}, {}, {}]),

    trackInventory: z.boolean().default(true),
    stockQuantity: z.coerce.number().min(0).default(0),
    lowStockThreshold: z.coerce.number().min(0).default(5),
    stockStatus: z.enum(["in-stock", "out-of-stock", "backorder"]).default("in-stock"),
    allowBackorders: z.boolean().default(false),
    backorderLimit: z.coerce.number().min(0).optional(),
    soldIndividually: z.boolean().default(false),
    warehouse: z.string().optional(),
    binLocation: z.string().optional(),
    minPurchaseQuantity: z.coerce.number().min(1).default(1),
    maxPurchaseQuantity: z.coerce.number().min(1).optional(),

    attributes: z.array(attributeSchema).default([]),
    hasVariants: z.boolean().default(false),
    variantOptions: z.array(variantOptionSchema).default([]),
    variants: z.array(variantSchema).default([]),
    variantDisplay: z.enum(["dropdown", "buttons", "swatches", "grid"]).default("dropdown"),

    isPhysical: z.boolean().default(true),
    shippingWeight: z.coerce.number().min(0).optional(),
    shippingLength: z.coerce.number().min(0).optional(),
    shippingWidth: z.coerce.number().min(0).optional(),
    shippingHeight: z.coerce.number().min(0).optional(),
    shippingClass: z.string().optional(),
    shippingRestrictions: z.string().optional(),
    freeShipping: z.boolean().default(false),
    shippingMarkup: z.coerce.number().min(0).optional(),
    requiresShippingAddress: z.boolean().default(true),

    relatedProducts: z.array(z.string()).default([]),
    upsellProducts: z.array(z.string()).default([]),
    crossSellProducts: z.array(z.string()).default([]),

    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
    canonicalUrl: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    slug: z.string().optional(),

    purchaseNote: z.string().optional(),
    enableReviews: z.boolean().default(true),
    downloadable: z.boolean().default(false),
    downloadFiles: z
        .array(
            z.object({
                name: z.string(),
                url: z.string(),
                downloadLimit: z.coerce.number().optional(),
            }),
        )
        .default([]),
    preOrderAvailable: z.boolean().default(false),
    preOrderReleaseDate: z.string().optional(),
    preOrderMessage: z.string().optional(),
    customizable: z.boolean().default(false),
    customizationOptions: z
        .array(
            z.object({
                name: z.string(),
                type: z.enum(["text", "select", "checkbox", "file"]),
                required: z.boolean().default(false),
                options: z.array(z.string()).optional(),
                priceModifier: z.coerce.number().optional(),
            }),
        )
        .default([]),
});