import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    props: { params: Promise<{ storeId: string }> }
) {

    try {
        const params = await props.params;

        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 })
        }

        const body = await req.json();

        const {
            name,
            description,
            shortDescription,
            sku,
            barcode,
            material,
            width,
            height,
            depth,
            weight,
            tags,
            category,
            subcategory,
            brand,
            collections,
            status,
            publishDate,
            isFeatured,
            isRecommended,
            isNew,
            isBestseller,
            media,
            regularPrice,
            salePrice,
            costPrice,
            profitMargin,
            onSale,
            saleStartDate,
            saleEndDate,
            taxClass,
            taxStatus,
            bulkPricing,
            trackInventory,
            stockQuantity,
            lowStockThreshold,
            stockStatus,
            allowBackorders,
            backorderLimit,
            soldIndividually,
            warehouse,
            binLocation,
            minPurchaseQuantity,
            maxPurchaseQuantity,
            attributes,
            hasVariants,
            variantOptions,
            variants,
            variantDisplay,
            isPhysical,
            shippingWeight,
            shippingLength,
            shippingWidth,
            shippingHeight,
            shippingClass,
            shippingRestrictions,
            freeShipping,
            shippingMarkup,
            requiresShippingAddress,
            relatedProducts,
            upsellProducts,
            crossSellProducts,
            metaTitle,
            metaDescription,
            metaKeywords,
            canonicalUrl,
            ogTitle,
            ogDescription,
            ogImage,
            slug,
            purchaseNote,
            enableReviews,
            downloadable,
            downloadFiles,
            preOrderAvailable,
            preOrderReleaseDate,
            preOrderMessage,
            customizable,
            customizationOptions,
            customFields,
        } = body

        const product = await prismadb.product.create({
            data: {
                name,
                description,
                shortDescription,
                sku,
                barcode,
                material,
                width,
                height,
                depth,
                weight,
                tags: tags ? JSON.stringify(tags) : null,
                category,
                subcategory,
                brand:"cm8vscbmi0000lnlkiew0qjcy",
                collections: collections ? JSON.stringify(collections) : null,
                status,
                publishDate: publishDate ? new Date(publishDate) : null,
                isFeatured,
                isRecommended,
                isNew,
                isBestseller,
                regularPrice,
                salePrice,
                costPrice,
                profitMargin,
                onSale,
                saleStartDate: saleStartDate ? new Date(saleStartDate) : null,
                saleEndDate: saleEndDate ? new Date(saleEndDate) : null,
                taxClass,
                taxStatus,
                bulkPricing: bulkPricing ? JSON.stringify(bulkPricing) : null,
                trackInventory,
                stockQuantity,
                lowStockThreshold,
                stockStatus,
                allowBackorders,
                backorderLimit,
                soldIndividually,
                warehouse,
                binLocation,
                minPurchaseQuantity,
                maxPurchaseQuantity,
                hasVariants,
                variantOptions: variantOptions ? JSON.stringify(variantOptions) : null,
                variantDisplay,
                isPhysical,
                shippingWeight,
                shippingLength,
                shippingWidth,
                shippingHeight,
                shippingClass,
                shippingRestrictions,
                freeShipping,
                shippingMarkup,
                requiresShippingAddress,
                relatedProducts: relatedProducts ? JSON.stringify(relatedProducts) : null,
                upsellProducts: upsellProducts ? JSON.stringify(upsellProducts) : null,
                crossSellProducts: crossSellProducts ? JSON.stringify(crossSellProducts) : null,
                metaTitle,
                metaDescription,
                metaKeywords,
                canonicalUrl,
                ogTitle,
                ogDescription,
                ogImage,
                slug,
                purchaseNote,
                enableReviews,
                downloadable,
                downloadFiles: downloadFiles ? JSON.stringify(downloadFiles) : null,
                preOrderAvailable,
                preOrderReleaseDate: preOrderReleaseDate ? new Date(preOrderReleaseDate) : null,
                preOrderMessage,
                customizable,
                customizationOptions: customizationOptions ? JSON.stringify(customizationOptions) : null,
                storeId: params.storeId,
            },
        })

        if (media && media.length > 0) {
            const imagePromises = media.map((item: any, index: number) => {
                return prismadb.image.create({
                    data: {
                        url: item.url,
                        alt: item.alt || `${name} image ${index + 1}`,
                        type: item.type || "image",
                        position: item.position || index,
                        variantIds: item.variantIds ? JSON.stringify(item.variantIds) : null,
                        productId: product.id,
                    },
                })
            })

            await Promise.all(imagePromises)
        }

        if (attributes && attributes.length > 0) {
            const attributePromises = attributes.map((attr: any) => {
                return prismadb.attribute.create({
                    data: {
                        name: attr.name,
                        values: JSON.stringify(attr.values),
                        visible: attr.visible,
                        variation: attr.variation,
                        productId: product.id,
                    },
                })
            })

            await Promise.all(attributePromises)
        }

        if (variants && variants.length > 0) {
            const variantPromises = variants.map((variant: any) => {
                return prismadb.variant.create({
                    data: {
                        options: JSON.stringify(variant.options),
                        sku: variant.sku,
                        barcode: variant.barcode,
                        price: variant.price,
                        compareAtPrice: variant.compareAtPrice,
                        costPrice: variant.costPrice,
                        stockQuantity: variant.stockQuantity || 0,
                        weight: variant.weight,
                        dimensions: variant.dimensions ? JSON.stringify(variant.dimensions) : null,
                        images: variant.images ? JSON.stringify(variant.images) : null,
                        isEnabled: variant.isEnabled,
                        lowStockThreshold: variant.lowStockThreshold,
                        backorderLimit: variant.backorderLimit,
                        allowBackorders: variant.allowBackorders,
                        productId: product.id,
                    },
                })
            })

            await Promise.all(variantPromises)
        }

        if (customFields && customFields.length > 0) {
            const customFieldPromises = customFields.map((field: any) => {
                return prismadb.customField.create({
                    data: {
                        name: field.name,
                        value: field.value,
                        visible: field.visible,
                        productId: product.id,
                    },
                })
            })

            await Promise.all(customFieldPromises)
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error("[PRODUCTS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }

}