"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import ImageUpload from '@/components/store/image-upload'
import { SubcategoryFormValues } from '@/lib/db/schemas/subcategories'

interface ImageTabProps {
    form: UseFormReturn<SubcategoryFormValues>
}

const ImageTab = ({ form }: ImageTabProps) => {

    const [loading, setLoading] = useState(false);

    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mb-6">
            <CardHeader>
                <CardTitle>Subcategory Image</CardTitle>
                <CardDescription className="text-[#A4B8D3]">Upload an image for this subcategory</CardDescription>
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