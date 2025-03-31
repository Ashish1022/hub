"use client"

import type { UseFormReturn } from "react-hook-form"
import { ChevronDown, FileText, ImageIcon, Layers, Trash2, Upload } from "lucide-react"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { mediaItemSchema, ProductFormValues, variantSchema } from "../../schema"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { z } from "zod"
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ImagesSectionProps {
  form: UseFormReturn<ProductFormValues>
}

type Variant = z.infer<typeof variantSchema>
type MediaItem = z.infer<typeof mediaItemSchema>;

const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export function ImagesSection({ form }: ImagesSectionProps) {
  const images = form.watch("images") || [];
  const hasVariants = form.watch("hasVariants");
  const variants = form.watch("variants");

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [mediaSearchQuery, setMediaSearchQuery] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const handleMediaUpload = (type: "image" | "video" | "3d" = "image") => {
    const newMediaItem: MediaItem = {
      id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      url: `/placeholder.svg?height=200&width=200&text=Product+Image+${images.length + 1}`,
      type,
      position: images.length,
      alt: `Product image ${images.length + 1}`,
    }

    form.setValue("images", [...images, newMediaItem])
  }

  const formatVariantName = (variant: Variant) => {
    if (!variant.options) return "Variant"

    return Object.entries(variant.options)
      .map(([key, value]) => `${value}`)
      .join(" / ")
  }

  const associateMediaWithVariant = (mediaId: string, variantId: string) => {
    const updatedMedia = media.map((item) => {
      if (item.id === mediaId) {
        const variantIds = item.variantIds || []
        if (variantIds.includes(variantId)) {
          return {
            ...item,
            variantIds: variantIds.filter((id) => id !== variantId),
          }
        } else {
          return {
            ...item,
            variantIds: [...variantIds, variantId],
          }
        }
      }
      return item
    })

    setMedia(updatedMedia)
    form.setValue("images", updatedMedia)
  }

  const handleImageUpload = (type: "image" | "video" | "3d" = "image") => {
    const newImage = {
      id: `img-${Date.now()}`,
      url: `/placeholder.svg?height=200&width=200&text=Product+Image+${images.length + 1}`,
      alt: `Product image ${images.length + 1}`,
      position: images.length,
      type,
    }
    form.setValue("images", [...images, newImage])
  }

  const removeImage = (id: string) => {
    form.setValue(
      "images",
      images.filter((img) => img.id !== id).map((img, index) => ({ ...img, position: index })),
    )
  }

  const updateImageAlt = (id: string, alt: string) => {
    form.setValue(
      "images",
      images.map((img) => (img.id === id ? { ...img, alt } : img)),
    )
  }

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
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
              onClick={() => setShowMediaLibrary(true)}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Media Library
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Add Media
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0A1228] border-[#1E293B] text-white">
                <DropdownMenuItem
                  onClick={() => handleMediaUpload("image")}
                  className="cursor-pointer hover:bg-[#1E293B]"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Image
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleMediaUpload("video")}
                  className="cursor-pointer hover:bg-[#1E293B]"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Video
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleMediaUpload("3d")}
                  className="cursor-pointer hover:bg-[#1E293B]"
                >
                  <Layers className="h-4 w-4 mr-2" />
                  Upload 3D Model
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-[#1E293B] rounded-lg p-6 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#FF00E5]/10 flex items-center justify-center mb-4">
            <ImageIcon className="h-8 w-8 text-[#FF00E5]" />
          </div>
          <h3 className="text-lg font-medium mb-2">Drag and drop your media files here</h3>
          <p className="text-sm text-[#A4B8D3] mb-4">
            Supports JPG, PNG, GIF, MP4, WEBP, and GLB. Maximum file size 10MB.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              onClick={() => handleMediaUpload("image")}
              className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleMediaUpload("video")}
              className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleMediaUpload("3d")}
              className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload 3D Model
            </Button>
          </div>
        </div>
      </CardContent>
    </Card >
  )
}

