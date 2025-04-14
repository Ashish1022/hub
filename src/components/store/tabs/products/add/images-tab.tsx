"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { mediaItemSchema, ProductFormValues, variantSchema } from '@/lib/db/schemas/products'
import { ChevronDown, FileText, ImageIcon, Layers, Upload } from 'lucide-react'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { z } from 'zod'
import ImageUpload from '@/components/store/image-upload'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

interface ImagesTabProps {
    form: UseFormReturn<ProductFormValues>
}

const ImagesTab = ({ form }: ImagesTabProps) => {

    const images = form.watch("images") || [];
    const [loading, setLoading] = useState(false);

    return (
        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Product Media</CardTitle>
                        <CardDescription className="text-[#A4B8D3]">
                            Upload images, videos, and 3D models for your product
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="images"
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
        </Card >
    )
}

export default ImagesTab