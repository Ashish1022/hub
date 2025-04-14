"use client"

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { ProductFormValues } from '@/lib/db/schemas/products'
import { CalendarIcon, FileText, Tag, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMockData } from '@/constants'
import { Category, Subcategory } from '@prisma/client'

interface GeneralTabProps {
    form: UseFormReturn<ProductFormValues>;
    categories: Category[];
    subcategories: Subcategory[];
}

const GeneralTab = ({ form, categories, subcategories }: GeneralTabProps) => {

    const { brands, collections } = useMockData();

    const tags = form.watch("tags") || [];
    const categoryId = form.watch("category")
    const [newTag, setNewTag] = React.useState("");
    const [loading, setLoading] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        categoryId || null
    );

    useEffect(() => {

        setSelectedCategoryId(form.getValues('category'));
    }, [form.watch('category')]);

    const filteredSubcategories = subcategories.filter(
        (subcategory) => subcategory.categoryId === selectedCategoryId
    )

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            const updatedTags = [...tags, newTag]
            form.setValue("tags", updatedTags)
            setNewTag("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove)
        form.setValue("tags", updatedTags)
    }

    const generateSKU = (baseName: string, suffix = "") => {
        const baseSlug = baseName
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
            .toUpperCase()
            .substring(0, 8)

        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()

        return `${baseSlug}-${randomPart}${suffix ? `-${suffix}` : ""}`
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                        <CardDescription>Basic information about your product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter product name" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Enter product description" className="min-h-[150px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="shortDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Enter a short description for product listings"
                                                className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                            />
                                        </FormControl>
                                        <FormDescription>A brief summary that appears in product listings</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mt-6">
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>Additional details and specifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="sku"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                                        <div className="flex gap-2">
                                            <FormControl>
                                                <Input {...field} placeholder="Enter SKU" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                onClick={() => {
                                                    const name = form.getValues("name")
                                                    if (name) {
                                                        form.setValue("sku", generateSKU(name))
                                                        toast.success("SKU generated")
                                                    } else {
                                                        toast.error("Product name is required to generate SKU")
                                                    }
                                                }}
                                            >
                                                <FileText className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="barcode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Barcode (ISBN, UPC, GTIN, etc.)</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter barcode" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Tags</FormLabel>
                                        <FormControl>
                                            <div>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {tags.map((tag, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF00E5]/10 text-[#FF00E5] text-sm"
                                                        >
                                                            <span>{tag}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeTag(tag)}
                                                                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#FF00E5]/20"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="Add a tag"
                                                        value={newTag}
                                                        onChange={(e) => setNewTag(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault()
                                                                addTag()
                                                            }
                                                        }}
                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"

                                                    />
                                                    <Button type="button" onClick={addTag} variant="secondary" className="bg-[#1E293B] hover:bg-[#1E293B]/80">
                                                        <Tag className="h-4 w-4 mr-2" />
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="material"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Material</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter material" className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="width"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Width (cm)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Width"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                                                value={field.value ?? ""}
                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="height"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Height (cm)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Height"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                                                value={field.value ?? ""}
                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="depth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Depth (cm)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Depth"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                                                value={field.value ?? ""}
                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weight (kg)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter weight"
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)}
                                            value={field.value ?? ""}
                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Organization</CardTitle>
                        <CardDescription>Categorize and organize your product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5] cursor-pointer">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id} className='cursor-pointer'>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subcategory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subcategory</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedCategoryId || loading}>
                                            <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                <SelectValue placeholder={
                                                    selectedCategoryId
                                                    ? 'Select a subcategory'
                                                    : 'Select a category first'
                                                } />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                {filteredSubcategories
                                                    .map((subcategory) => (
                                                        <SelectItem key={subcategory.id} value={subcategory.id}>
                                                            {subcategory.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                <SelectValue placeholder="Select brand" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                            {brands.map((brand) => (
                                                <SelectItem key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="collections"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel>Collections</FormLabel>
                                    </div>
                                    {collections.map((collection) => (
                                        <FormField
                                            key={collection.id}
                                            control={form.control}
                                            name="collections"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={collection.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                id={`collection-${collection.id}`}
                                                                checked={(field.value || []).includes(collection.id)}
                                                                onCheckedChange={(checked) => {
                                                                    const currentValues = field.value || []
                                                                    if (checked) {
                                                                        field.onChange([...currentValues, collection.id])
                                                                    } else {
                                                                        field.onChange(currentValues.filter((value) => value !== collection.id))
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">{collection.name}</FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="publishDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Publish Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mt-6">
                    <CardHeader>
                        <CardTitle>Product Flags</CardTitle>
                        <CardDescription className="text-sm text-[#A4B8D3]">Special flags for your product</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="isFeatured"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg">
                                        <div className="space-y-0.5">
                                            <FormLabel>Featured Product</FormLabel>
                                            <FormDescription className="text-sm text-[#A4B8D3]">Show this product on the homepage</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isNew"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg">
                                        <div className="space-y-0.5">
                                            <FormLabel>New Product</FormLabel>
                                            <FormDescription className="text-sm text-[#A4B8D3]">Mark this product as new</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isBestseller"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Bestseller</FormLabel>
                                            <FormDescription className="text-sm text-[#A4B8D3]">
                                                Mark this product as a bestseller
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isRecommended"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Recommended</FormLabel>
                                            <FormDescription className="text-sm text-[#A4B8D3]">
                                                Show in recommended products section
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}

export default GeneralTab