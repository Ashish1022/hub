import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormValues } from "@/app/store/(dashboard)/[storeId]/(routes)/products/[productId]/_components/schema";
import { Product } from "@prisma/client";

export function useProductForm(initialData: Product) {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialData ? {
            ...initialData,
        } : {
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
            images: [],
            customFields: [],
        },
    });

    return form

}