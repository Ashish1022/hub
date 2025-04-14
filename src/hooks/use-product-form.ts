import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultProductValues, productFormSchema, type ProductFormValues } from "@/lib/db/schemas/products";
import { Product } from "@prisma/client";

export function useProductForm(initialData: Product | null) {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialData ? {
            ...initialData,
            tags: Array.isArray(initialData?.tags)
                ? initialData.tags
                : typeof initialData?.tags === "string"
                    ? JSON.parse(initialData.tags)
                    : [],
            collections: Array.isArray(initialData?.collections)
                ? initialData.collections
                : typeof initialData?.collections === "string"
                    ? JSON.parse(initialData.collections)
                    : [],
            bulkPricing: Array.isArray(initialData?.bulkPricing)
                ? initialData.bulkPricing
                : typeof initialData?.bulkPricing === "string"
                    ? JSON.parse(initialData.bulkPricing)
                    : [],
            variantOptions: Array.isArray(initialData?.variantOptions)
                ? initialData.variantOptions
                : typeof initialData?.variantOptions === "string"
                    ? JSON.parse(initialData.variantOptions)
                    : [],
            shippingRestrictions: Array.isArray(initialData?.shippingRestrictions)
                ? initialData.shippingRestrictions
                : typeof initialData?.shippingRestrictions === "string"
                    ? JSON.parse(initialData.shippingRestrictions)
                    : [],
            relatedProducts: Array.isArray(initialData?.relatedProducts)
                ? initialData.relatedProducts
                : typeof initialData?.relatedProducts === "string"
                    ? JSON.parse(initialData.relatedProducts)
                    : [],
            upsellProducts: Array.isArray(initialData?.upsellProducts)
                ? initialData.upsellProducts
                : typeof initialData?.upsellProducts === "string"
                    ? JSON.parse(initialData.upsellProducts)
                    : [],
            crossSellProducts: Array.isArray(initialData?.crossSellProducts)
                ? initialData.crossSellProducts
                : typeof initialData?.crossSellProducts === "string"
                    ? JSON.parse(initialData.crossSellProducts)
                    : [],
            downloadFiles: Array.isArray(initialData?.downloadFiles)
                ? initialData.downloadFiles
                : typeof initialData?.downloadFiles === "string"
                    ? JSON.parse(initialData.downloadFiles)
                    : [],
            customizationOptions: Array.isArray(initialData?.customizationOptions)
                ? initialData.customizationOptions
                : typeof initialData?.customizationOptions === "string"
                    ? JSON.parse(initialData.customizationOptions) // Convert JSON string to array of objects
                    : [],
        } : defaultProductValues,
    });

    return form

}