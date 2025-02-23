"use client"

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Category, Collection, Image, Product, Subcategory } from '@prisma/client'
import AlertModal from '@/modules/store/ui/components/alert-modal'
import Heading from '@/modules/store/ui/components/heading'
import ImageUpload from '@/modules/store/ui/components/image-upload'

interface ProductFormProps {
    initialData: Product | null;
    images: Image[];
    categories: Category[];
    subcategories: Subcategory[];
    collections: Collection[];
}

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    handle: z.string().min(1),
    seoTitle: z.string().min(1),
    seoDescription: z.string().min(1),
    featuredImage: z.string().min(1),
    image: z.string().min(1),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    subcategoryId: z.string().min(1),
    collectionId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
    tags: z.array(z.string()).min(1),

})

type ProductFormValues = z.infer<typeof formSchema>;

const ProductForm = ({ initialData, categories, subcategories, images, collections }: ProductFormProps) => {
    const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(
        initialData?.collectionId || null
    );

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        initialData?.categoryId || null
    );

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product" : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes." : "Create";

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            subcategoryId: initialData.subcategoryId || undefined,
            collectionId: initialData.collectionId || undefined,
            price: parseFloat(String(initialData?.price)),
            featuredImage: images[0].type === "featured" ? images[0].url : images[1].url,
            image: images[0].type === "gallery" ? images[0].url : images[1].url,
        } : {
            name: '',
            description: '',
            handle: '',
            seoTitle: '',
            seoDescription: '',
            featuredImage: '',
            image: '',
            price: 0,
            categoryId: '',
            subcategoryId: '',
            collectionId: '',
            isFeatured: false,
            isArchived: false,
            tags: []
        }
    });

    useEffect(() => {

        setSelectedCollectionId(form.getValues('collectionId'));
    }, [form.watch('collectionId')]);
    const filteredCategories = categories.filter(
        (category) => category.collectionId === selectedCollectionId
    );

    useEffect(() => {

        setSelectedCategoryId(form.getValues('categoryId'));
    }, [form.watch('categoryId')]);
    const filteredSubcategories = subcategories.filter(
        (subcategory) => subcategory.categoryId === selectedCategoryId
    );

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/products`, data);
            }
            router.refresh();
            router.push(`/store/${params.storeId}/products`)
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.refresh();
            router.push(`/store/${params.storeId}/products`);
            toast.success("Product deleted.");
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='flex items-center justify-between'>
                <Heading title={title} description={description} />
                {initialData && (
                    <Button variant='destructive' onClick={() => setOpen(true)} size='sm' disabled={loading}>
                        <Trash className='h-4 w-4' />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Product name' disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="seoTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>SEO Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Product SEO Title' disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="handle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Handle</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Product handle' disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder='Product price' disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="collectionId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Collection</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder="Select a collection"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {collections.map((collection) => (
                                                    <SelectItem
                                                        key={collection.id}
                                                        value={collection.id}
                                                    >
                                                        {collection.label}
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
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={!selectedCollectionId || loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder={
                                                            selectedCollectionId
                                                                ? 'Select a category'
                                                                : 'Select a collection first'
                                                        }
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {filteredCategories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
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
                            name="subcategoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sub Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={!selectedCategoryId || loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder={
                                                            selectedCategoryId
                                                                ? 'Select a subcategory'
                                                                : 'Select a category first'
                                                        }
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {filteredSubcategories.map((subcategory) => (
                                                    <SelectItem
                                                        key={subcategory.id}
                                                        value={subcategory.id}
                                                    >
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
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            Featured
                                        </FormLabel>
                                        <FormDescription>
                                            This product will appear on home page.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            Archived
                                        </FormLabel>
                                        <FormDescription>
                                            This product will not appear on the store.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => {
                                const [inputValue, setInputValue] = useState("");

                                return (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter tags and press Enter"
                                                disabled={loading}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)} // Update input field
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === ",") {
                                                        e.preventDefault(); // Prevent form submission

                                                        const newTag = inputValue.trim();

                                                        if (newTag && !field.value?.includes(newTag)) {
                                                            field.onChange([...(field.value || []), newTag]);
                                                        }

                                                        setInputValue(""); // Clear input field
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {field.value?.map((tag, index) => (
                                                <div key={index} className="flex items-center gap-1 px-2 py-1 border border-white rounded-md">
                                                    <span>{tag}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            field.onChange(field.value.filter((t) => t !== tag));
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </FormItem>
                                );
                            }}
                        />

                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Product Description' disabled={loading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="seoDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>SEO Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Product SEO Description' disabled={loading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-2 gap-8'>

                        <FormField
                            control={form.control}
                            name="featuredImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Featured Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value}
                                            disabled={loading}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gallery Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value}
                                            disabled={loading}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}

export default ProductForm