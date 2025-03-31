"use client"

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Eye, EyeOff, Layers, Loader2, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface ProductFormHeaderProps {
    isEditing: boolean
    isSubmitting: boolean
}

const ProductFormHeader = ({ isEditing, isSubmitting }: ProductFormHeaderProps) => {

    const router = useRouter();
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                        {isEditing ? "Edit Product" : "Add New Product"}
                    </h1>
                    <p className="text-[#A4B8D3]">
                        {isEditing ? "Update your product information" : "Create a new product in your inventory"}
                    </p>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                    onClick={() => setPreviewMode(!previewMode)}
                                >
                                    {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{previewMode ? "Exit Preview" : "Preview Product"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                    onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                                >
                                    {isAdvancedMode ? <Layers className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isAdvancedMode ? "Simple Mode" : "Advanced Mode"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Button
                        type="button"
                        variant="outline"
                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                    >
                        Save as Draft
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {isEditing ? "Update Product" : "Publish Product"}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductFormHeader