"use client"

import { Category } from '@prisma/client'
import { ArrowLeft, ImageIcon, Save, Upload } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { CategoryFormHeader } from './category-form-header';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCategoryForm } from '@/hooks/use-category-form';
import { CategoryFormValues } from '@/lib/db/schemas/categories';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageTab from '../../tabs/categories/add/image-tab';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

interface CategoryFormProps {
    initialData: Category | null;
    isEditing?: boolean
}

const CategoryForm = ({ initialData, isEditing = false }: CategoryFormProps) => {

    const form = useCategoryForm(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { storeId } = useParams();

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            await axios.post(`/api/${storeId}/categories`, data);
            router.push(`/store/${storeId}/categories`);
        } catch (error) {
            toast.error("Something went wrong.")
        }
    }


    return (
        <div className="p-4 md:p-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/dashboard/categories" className="flex items-center text-[#A4B8D3] hover:text-white">
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        <span>Back to Categories</span>
                    </Link>
                </div>
                <CategoryFormHeader isEditing={isEditing} />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
                            <CardHeader>
                                <CardTitle>Category Information</CardTitle>
                                <CardDescription className="text-[#A4B8D3]">Basic information about the category</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        id="name"
                                                        placeholder="Enter category name"
                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category Slug</FormLabel>
                                                <FormControl>
                                                    <div className='space-y-2'>
                                                        <Input
                                                            {...field}
                                                            id="slug"
                                                            placeholder="Enter category slug"
                                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                        />
                                                        <p className="text-xs text-[#A4B8D3]">
                                                            The "slug" is the URL-friendly version of the name. It is usually all lowercase and contains only
                                                            letters, numbers, and hyphens.
                                                        </p>
                                                    </div>
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
                                                <FormLabel>Category Description</FormLabel>
                                                <FormControl>
                                                    <div className='space-y-2'>
                                                        <Textarea
                                                            id="description"
                                                            placeholder="Enter category description"
                                                            className="min-h-[100px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <ImageTab form={form} />
                        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
                            <CardHeader>
                                <CardTitle>SEO Settings</CardTitle>
                                <CardDescription className="text-[#A4B8D3]">Optimize this category for search engines</CardDescription>
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
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter meta title"
                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs text-[#A4B8D3]">
                                                    The meta title will be shown in search engine results. If left blank, the category name will be used.
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
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Enter meta description"
                                                        className="min-h-[100px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs text-[#A4B8D3]">
                                                    The meta description summarizes the content of the category page. It is often used by search engines.
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
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter keywords separated by commas"
                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                    />
                                                </FormControl>
                                                <FormDescription className="text-xs text-[#A4B8D3]">
                                                    Keywords related to this category, separated by commas.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex justify-end mt-6 space-x-4">
                            <Button type="button" variant="outline" className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50 cursor-pointer">
                                Save as Draft
                            </Button>
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)] cursor-pointer"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                {isEditing ? "Update Category" : "Create Category"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CategoryForm