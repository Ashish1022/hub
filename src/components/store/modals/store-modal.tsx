"use client"

import * as z from 'zod';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/modal';
import { useStoreModal } from '@/app/hooks/use-store-modal';

const formSchema = z.object({
    name: z.string().min(1),
})

const StoreModal = () => {

    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            setLoading(true);

            const response = await axios.post('/api/stores', values);
            window.location.assign(`/store/${response.data.id}`);

        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title='Create store' description='Add a new store' isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name='name' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Store name' disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant='default'
                                    type='submit'
                                    disabled={loading}
                                >
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default StoreModal