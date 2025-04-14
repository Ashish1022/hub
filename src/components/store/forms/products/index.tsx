"use client"

import { Form } from "@/components/ui/form";
import { useProductForm } from "@/hooks/use-product-form";
import { ProductFormValues } from "@/lib/db/schemas/products";
import { Category, Product, Subcategory } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import GeneralTab from "../../tabs/products/add/general-tab";
import PricingTab from "../../tabs/products/add/pricing-tab";
import ImagesTab from "../../tabs/products/add/images-tab";
import InventoryTab from "../../tabs/products/add/inventory-tab";
import VariantsTab from "../../tabs/products/add/variants-tab";
import ShippingTab from "../../tabs/products/add/shipping-tab";
import SeoTab from "../../tabs/products/add/seo-tab";
import AdvancedTab from "../../tabs/products/add/advanced-tab";
import RelatedProductsTab from "../../tabs/products/add/related-products-tab";
import ProductFormHeader from "./products-form-header";

interface ProductFormPorps {
    initialData: Product | null;
    categories: Category[];
    subcategories: Subcategory[];
}

const ProductForm = ({ initialData, categories, subcategories }: ProductFormPorps) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("general");
    const tabs = ["general", "images", "pricing", "inventory", "shipping", "variants", "seo", "advanced"];

    const { storeId } = useParams();
    const router = useRouter();

    const form = useProductForm(initialData);

    const onSubmit = async (data: ProductFormValues) => {
        try {
            await axios.post(`/api/${storeId}/products`, data);
            router.push(`/store/${storeId}/products`);
        } catch (error) {
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
                                {tabs.map((tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value="general">
                                <GeneralTab form={form} categories={categories} subcategories={subcategories} />
                            </TabsContent>
                            <TabsContent value="images">
                                <ImagesTab form={form} />
                            </TabsContent>
                            <TabsContent value="pricing">
                                <PricingTab form={form} />
                            </TabsContent>
                            <TabsContent value="inventory">
                                <InventoryTab form={form} />
                            </TabsContent>
                            <TabsContent value="variants">
                                <VariantsTab form={form} />
                            </TabsContent>
                            <TabsContent value="shipping">
                                <ShippingTab form={form} />
                            </TabsContent>
                            <TabsContent value="seo">
                                <SeoTab form={form} />
                            </TabsContent>
                            <TabsContent value="advanced">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <AdvancedTab form={form} />
                                    <RelatedProductsTab form={form} />
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