"use client"

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { Collection } from '@prisma/client'
import AlertModal from '@/modules/store/ui/components/alert-modal'
import Heading from '@/modules/store/ui/components/heading'
import { Textarea } from '@/components/ui/textarea'

interface CollectionFormProps{
    initialData: Collection | null;
}

const formSchema = z.object({
    label: z.string().min(1),
    seoTitle: z.string().min(1),
    handle: z.string().min(1),
    seoDescription: z.string().min(1),
})

type CollectionFormValues = z.infer<typeof formSchema>;

const CollectionForm = ({ initialData }: CollectionFormProps) => {

    const title = initialData ? "Edit collection" : "Create collection";
    const description = initialData ? "Edit a collection" : "Add a new collection";
    const toastMessage = initialData ? "collection updated." : "Collection created.";
    const action = initialData ? "Save changes." : "Create";

    const form = useForm<CollectionFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            seoTitle: '',
            seoDescription: '',
            handle: '',
        }
    });

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const onSubmit = async (data: CollectionFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/collections/${params.billboardId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/collections`, data);
            }
            router.refresh();
            router.push(`/store/${params.storeId}/collections`)
            toast.success(toastMessage);
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/collections/${params.billboardId}`);
            router.refresh();
            router.push(`/store/${params.storeId}/collections`);
            toast.success("Collection deleted.");
        } catch (error) {
            console.log(error)
            toast.error("Make sure you remove all categories first.")
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
                    <div className='grid grid-cols-2 gap-8'>
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Collection label' disabled={loading} {...field} />
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
                                        <Input placeholder='Collection handle' disabled={loading} {...field} />
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
                                        <Input placeholder='Collection SEO title' disabled={loading} {...field} />
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
                                        <Textarea placeholder='Collection SEO description' disabled={loading} {...field} />
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

export default CollectionForm