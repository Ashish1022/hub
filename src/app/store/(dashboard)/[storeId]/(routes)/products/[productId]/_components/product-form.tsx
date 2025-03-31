"use client"

import { Form } from '@/components/ui/form'
import React, { useState } from 'react'
import { ProductFormValues } from './schema'
import { useProductForm } from '@/hooks/use-product-form'
import ProductFormHeader from './_components/product-form-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GeneralSection } from './_components/_sections/general-section'
import { ImagesSection } from './_components/_sections/images-section'
import { PricingSection } from './_components/_sections/pricing-section'
import { InventorySection } from './_components/_sections/inventory-section'
import { VariantsSection } from './_components/_sections/variants-section'
import { SeoSection } from './_components/_sections/seo-section'
import { ShippingSection } from './_components/_sections/shipping-section'
import { AdvancedSection } from './_components/_sections/advanced-section'
import { RelatedProductsSection } from './_components/_sections/related-products-section'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { Product } from '@prisma/client'

interface ProductFormPorps {
    initialData: Product | null;
}

const ProductForm = ({ initialData }: ProductFormPorps) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("general");

    const form = useProductForm(initialData);
    const router = useRouter();
    const params = useParams();

    const onSubmit = async (data: ProductFormValues) => {
        console.log(data);
        try{
            await axios.post(`/api/${params.storeId}/products`, data);
            router.push(`/store/${params.storeId}/products`);
        }catch(error){
            console.log(error);
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <ProductFormHeader isEditing={!!initialData?.id} isSubmitting={isSubmitting} />
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                            <TabsList className="bg-[#0A1228] border border-[#1E293B] mb-6 overflow-x-auto flex-nowrap">
                                <TabsTrigger
                                    value="general"
                                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                >
                                    General
                                </TabsTrigger>
                                <TabsTrigger
                                    value="images"
                                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                >
                                    Images
                                </TabsTrigger>
                                <TabsTrigger
                                    value="pricing"
                                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                >
                                    Pricing
                                </TabsTrigger>
                                <TabsTrigger
                                    value="inventory"
                                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                >
                                    Inventory
                                </TabsTrigger>
                                <TabsTrigger
                                    value="variants"
                                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                >
                                    Variants
                                </TabsTrigger>
                                <TabsTrigger
                                    value="shipping"
                                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                >
                                    Shipping
                                </TabsTrigger>
                                <TabsTrigger value="seo"className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]">
                                    SEO
                                </TabsTrigger>
                                <TabsTrigger
                                    value="advanced"
                                    className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                >
                                    Advanced
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="general">
                                <GeneralSection form={form} />
                            </TabsContent>
                            <TabsContent value="images">
                                <ImagesSection form={form} />
                            </TabsContent>

                            <TabsContent value="pricing">
                                <PricingSection form={form} />
                            </TabsContent>

                            <TabsContent value="inventory">
                                <InventorySection form={form} />
                            </TabsContent>

                            <TabsContent value="variants">
                                <VariantsSection form={form} />
                            </TabsContent>

                            <TabsContent value="shipping">
                                <ShippingSection form={form} />
                            </TabsContent>

                            <TabsContent value="seo">
                                <SeoSection form={form} />
                            </TabsContent>

                            <TabsContent value="advanced">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <AdvancedSection form={form} />
                                    <RelatedProductsSection form={form} />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </main>
                </form>
            </Form>
        </>
    )
}

export default ProductForm