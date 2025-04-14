"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { CategoryFormValues } from '@/lib/db/schemas/categories'
import Image from 'next/image'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import ImageUpload from '@/components/store/image-upload'

interface ImageTabProps {
    form: UseFormReturn<CategoryFormValues>
}

const ImageTab = ({ form }: ImageTabProps) => {

    const [loading, setLoading] = useState(false);

    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
            <CardHeader>
                <CardTitle>Category Image</CardTitle>
                <CardDescription className="text-[#A4B8D3]">Upload an image for this category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ImageUpload
                                    value={field.value!}
                                    disabled={loading}
                                    onChange={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}

export default ImageTab