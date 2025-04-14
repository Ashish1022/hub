"use client"

import type { UseFormReturn } from "react-hook-form";
import { ImageIcon, LinkIcon, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useState } from "react";
import { ProductFormValues } from "@/lib/db/schemas/products";

interface SeoTabProps {
    form: UseFormReturn<ProductFormValues>
}

const SeoTab = ({ form }: SeoTabProps) => {

    const [showMediaLibrary, setShowMediaLibrary] = useState(false);

    const generateSlug = () => {
        const productName = form.getValues("name")
        if (!productName) return

        const slug = productName
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")

        form.setValue("slug", slug)
        toast.success("Slug generated")
    }

    const generateSEOFields = () => {
        const productName = form.getValues("name")
        const shortDescription = form.getValues("shortDescription")

        if (!productName) return

        form.setValue("metaTitle", productName)
        form.setValue("ogTitle", productName)

        if (shortDescription) {
            form.setValue("metaDescription", shortDescription)
            form.setValue("ogDescription", shortDescription)
        }

        generateSlug()
        toast.success("SEO fields generated")
    }

    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Search Engine Optimization</CardTitle>
                        <CardDescription className="text-[#A4B8D3]">
                            Optimize your product for search engines
                        </CardDescription>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50 cursor-pointer"
                        onClick={generateSEOFields}
                    >
                        Auto-Generate
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="metaTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meta Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter meta title" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                </FormControl>
                                <FormDescription className="text-xs text-[#A4B8D3]">
                                    The title that appears in search engine results (Recommended: 50-60 characters)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="metaDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meta Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Enter meta description" className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                </FormControl>
                                <FormDescription className="text-xs text-[#A4B8D3]">
                                    The description that appears in search engine results (Recommended: 150-160 characters)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="metaKeywords"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meta Keywords</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter keywords separated by commas" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                </FormControl>
                                <FormDescription className="text-xs text-[#A4B8D3]">Keywords related to your product (separated by commas)</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator className="bg-[#1E293B]" />

                <div className="space-y-4">
                    <h3 className="font-medium">URL Settings</h3>

                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Slug</FormLabel>
                                <div className="flex gap-2">
                                    <FormControl>
                                        <Input {...field} placeholder="product-url-slug" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                        onClick={generateSlug}
                                    >
                                        <LinkIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                                <FormDescription className="text-xs text-[#A4B8D3]">The last part of the URL. Leave empty to generate from product name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="canonicalUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Canonical URL</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="https://" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                </FormControl>
                                <FormDescription className="text-xs text-[#A4B8D3]">The preferred URL for this product if duplicate content exists</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator className="bg-[#1E293B]" />

                <div className="space-y-4">
                    <h3 className="font-medium">Social Media Preview</h3>

                    <FormField
                        control={form.control}
                        name="ogTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Open Graph Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter title for social media" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ogDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Open Graph Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Enter description for social media" className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                </FormControl>
                                <FormDescription className="text-xs text-[#A4B8D3]">
                                    The description that appears when shared on social media
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ogImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Open Graph Image</FormLabel>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter image URL or select from media"
                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                            />
                                        </FormControl>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                        onClick={() => setShowMediaLibrary(true)}
                                    >
                                        <ImageIcon className="h-4 w-4 mr-2" />
                                        Select Image
                                    </Button>
                                </div>
                                <FormDescription className="text-xs text-[#A4B8D3]">
                                    The image that appears when shared on social media (Recommended: 1200 x 630 pixels)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="p-4 border border-[#1E293B] rounded-lg bg-[#050A18]">
                    <h4 className="font-medium mb-2">SEO Preview</h4>
                    <div className="space-y-2">
                        <div className="text-blue-500 text-lg font-medium">
                            {form.watch("metaTitle") || "Product Title"}
                        </div>
                        <div className="text-green-500 text-sm">
                            {`https://example.com/products/${form.watch("slug") || "product-slug"}`}
                        </div>
                        <div className="text-[#A4B8D3] text-sm">
                            {form.watch("metaDescription") ||
                                "Product description will appear here. Make sure to provide a compelling description that encourages clicks."}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}

export default SeoTab