"use client"

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Category, Subcategory } from '@prisma/client'
import AlertModal from '@/modules/store/ui/components/alert-modal'
import Heading from '@/modules/store/ui/components/heading'

interface SubCategoryFormProps{
    initialData: Subcategory | null;
    categories: Category[];
}

const formSchema = z.object({
    name: z.string().min(1),
    seoTitle: z.string().min(1),
    seoDescription: z.string().min(1),
    categoryId: z.string().min(1),
})

type SubCategoryFormValues = z.infer<typeof formSchema>;

const SubCategoryForm = ({ initialData, categories }: SubCategoryFormProps) => {

    const title = initialData ? "Edit sub category" : "Create sub category";
    const description = initialData ? "Edit a sub category" : "Add a new sub category";
    const toastMessage = initialData ? "Sub category updated." : "Sub category created.";
    const action = initialData ? "Save changes." : "Create";

    const form = useForm<SubCategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            seoTitle: '',
            seoDescription: '',
            categoryId: ''
        }
    });

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const onSubmit = async (data: SubCategoryFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/subcategories/${params.subcategoryId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/subcategories`, data);
            }
            router.refresh();
            router.push(`/store/${params.storeId}/subcategories`)
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
            await axios.delete(`/api/${params.storeId}/subcategories/${params.subcategoryId}`);
            router.refresh();
            router.push(`/store/${params.storeId}/subcategories  `);
            toast.success("Subcategory deleted.");
        } catch (error) {
            toast.error("Make sure you remove all products using this subcategory first.")
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
                                        <Input placeholder='Subcategory name' disabled={loading} {...field} />
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
                                        <Input placeholder='Subcategory SEO Title' disabled={loading} {...field} />
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
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder="Select a category"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
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
                    </div>
                    <FormField
                        control={form.control}
                        name="seoDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>SEO Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Subcategory SEO Description' disabled={loading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}

export default SubCategoryForm