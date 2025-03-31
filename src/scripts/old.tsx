"use client"

import AlertModal from "@/components/store/modals/alert-modal"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
    AlertCircle,
    Copy,
    DollarSign,
    ImageIcon,
    Plus,
    Save,
    Tag,
    Trash2,
    Upload,
    ChevronDown,
    Eye,
    EyeOff,
    FileText,
    LinkIcon,
    Palette,
    Layers,
    Loader2,
} from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Image, Product } from "@prisma/client"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { CSS } from "@dnd-kit/utilities"

// Define the attribute schema
const attributeSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Attribute name is required"),
    values: z.array(z.string()).min(1, "At least one attribute value is required"),
    visible: z.boolean().default(true),
    variation: z.boolean().default(false),
})

// Define the variant option schema
const variantOptionSchema = z.object({
    name: z.string().min(1, "Option name is required"),
    values: z.array(z.string()).min(1, "At least one option value is required"),
    visible: z.boolean().default(true),
})

// Define the variant schema with more detailed fields
const variantSchema = z.object({
    id: z.string().optional(),
    options: z.record(z.string()).optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    price: z.coerce.number().min(0).optional(),
    compareAtPrice: z.coerce.number().min(0).optional(),
    costPrice: z.coerce.number().min(0).optional(),
    stockQuantity: z.coerce.number().min(0).optional(),
    weight: z.coerce.number().min(0).optional(),
    dimensions: z
        .object({
            length: z.coerce.number().min(0).optional(),
            width: z.coerce.number().min(0).optional(),
            height: z.coerce.number().min(0).optional(),
        })
        .optional(),
    images: z.array(z.string()).default([]),
    isEnabled: z.boolean().default(true),
    lowStockThreshold: z.coerce.number().min(0).optional(),
    backorderLimit: z.coerce.number().min(0).optional(),
    allowBackorders: z.boolean().default(false),
})

// Define the media item schema
const mediaItemSchema = z.object({
    id: z.string(),
    url: z.string(),
    type: z.enum(["image", "video", "3d"]),
    alt: z.string().optional(),
    position: z.number().optional(),
    variantIds: z.array(z.string()).optional(),
})

// Define the custom field schema
const customFieldSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Field name is required"),
    value: z.string().optional(),
    visible: z.boolean().default(true),
})

// Define the form schema with zod
const productFormSchema = z.object({
    // General Tab
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    material: z.string().optional(),
    width: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    depth: z.coerce.number().optional(),
    weight: z.coerce.number().optional(),
    tags: z.array(z.string()).default([]),
    customFields: z.array(customFieldSchema).default([]),

    // Organization
    category: z.string().optional(),
    subcategory: z.string().optional(),
    brand: z.string().optional(),
    collections: z.array(z.string()).default([]),
    status: z.enum(["active", "draft", "archived", "scheduled"]).default("active"),
    publishDate: z.string().optional(),
    isFeatured: z.boolean().default(false),
    isRecommended: z.boolean().default(false),
    isNew: z.boolean().default(false),
    isBestseller: z.boolean().default(false),

    // Media
    media: z.array(mediaItemSchema).default([]),

    // Pricing
    regularPrice: z.coerce.number().min(0).optional(),
    salePrice: z.coerce.number().min(0).optional(),
    costPrice: z.coerce.number().min(0).optional(),
    profitMargin: z.coerce.number().min(0).optional(),
    onSale: z.boolean().default(false),
    saleStartDate: z.string().optional(),
    saleEndDate: z.string().optional(),
    taxClass: z.enum(["standard", "reduced", "zero"]).default("standard"),
    taxStatus: z.enum(["taxable", "shipping", "none"]).default("taxable"),
    bulkPricing: z
        .array(
            z.object({
                minQuantity: z.coerce.number().min(0).optional(),
                maxQuantity: z.coerce.number().min(0).optional(),
                discount: z.coerce.number().min(0).max(100).optional(),
                price: z.coerce.number().min(0).optional(),
            }),
        )
        .default([{}, {}, {}]),

    // Inventory
    trackInventory: z.boolean().default(true),
    stockQuantity: z.coerce.number().min(0).default(0),
    lowStockThreshold: z.coerce.number().min(0).default(5),
    stockStatus: z.enum(["in-stock", "out-of-stock", "backorder"]).default("in-stock"),
    allowBackorders: z.boolean().default(false),
    backorderLimit: z.coerce.number().min(0).optional(),
    soldIndividually: z.boolean().default(false),
    warehouse: z.string().optional(),
    binLocation: z.string().optional(),
    minPurchaseQuantity: z.coerce.number().min(1).default(1),
    maxPurchaseQuantity: z.coerce.number().min(1).optional(),

    // Attributes & Variants
    attributes: z.array(attributeSchema).default([]),
    hasVariants: z.boolean().default(false),
    variantOptions: z.array(variantOptionSchema).default([]),
    variants: z.array(variantSchema).default([]),
    variantDisplay: z.enum(["dropdown", "buttons", "swatches", "grid"]).default("dropdown"),

    // Shipping
    isPhysical: z.boolean().default(true),
    shippingWeight: z.coerce.number().min(0).optional(),
    shippingLength: z.coerce.number().min(0).optional(),
    shippingWidth: z.coerce.number().min(0).optional(),
    shippingHeight: z.coerce.number().min(0).optional(),
    shippingClass: z.string().optional(),
    shippingRestrictions: z.string().optional(),
    freeShipping: z.boolean().default(false),
    shippingMarkup: z.coerce.number().min(0).optional(),
    requiresShippingAddress: z.boolean().default(true),

    // Cross-sells and Upsells
    relatedProducts: z.array(z.string()).default([]),
    upsellProducts: z.array(z.string()).default([]),
    crossSellProducts: z.array(z.string()).default([]),

    // SEO
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
    canonicalUrl: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    slug: z.string().optional(),

    // Advanced
    purchaseNote: z.string().optional(),
    enableReviews: z.boolean().default(true),
    downloadable: z.boolean().default(false),
    downloadFiles: z
        .array(
            z.object({
                name: z.string(),
                url: z.string(),
                downloadLimit: z.coerce.number().optional(),
            }),
        )
        .default([]),
    preOrderAvailable: z.boolean().default(false),
    preOrderReleaseDate: z.string().optional(),
    preOrderMessage: z.string().optional(),
    customizable: z.boolean().default(false),
    customizationOptions: z
        .array(
            z.object({
                name: z.string(),
                type: z.enum(["text", "select", "checkbox", "file"]),
                required: z.boolean().default(false),
                options: z.array(z.string()).optional(),
                priceModifier: z.coerce.number().optional(),
            }),
        )
        .default([]),
})

type ProductFormValues = z.infer<typeof productFormSchema>
type VariantOption = z.infer<typeof variantOptionSchema>
type Variant = z.infer<typeof variantSchema>
type MediaItem = z.infer<typeof mediaItemSchema>
type Attribute = z.infer<typeof attributeSchema>
type CustomField = z.infer<typeof customFieldSchema>

interface ProductFormProps {
    initialData: Product | null
    images: Image[]
    // categories: Category[];
    // subcategories: Subcategory[];
    // collections: Collection[];
    // brands: Brand[];
}

// Sortable Item Component for drag and drop
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

// Color Swatch Component
const ColorSwatch = ({ color, selected, onClick }: { color: string; selected: boolean; onClick: () => void }) => {
    return (
        <div
            className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selected ? "border-[#FF00E5]" : "border-transparent"}`}
            style={{ backgroundColor: color }}
            onClick={onClick}
        />
    )
}

const ProductForm = ({ initialData, images: initialImages }: ProductFormProps) => {
    console.log(initialData);
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("general")
    const [media, setMedia] = useState<MediaItem[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [newTag, setNewTag] = useState("")
    const [newOptionValue, setNewOptionValue] = useState("")
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
    const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null)
    const [isGeneratingVariants, setIsGeneratingVariants] = useState(false)
    const [isAdvancedMode, setIsAdvancedMode] = useState(false)
    const [colorPalette, setColorPalette] = useState<string[]>([
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
        "#FFA500",
        "#800080",
    ])
    const [showVariantBulkEditor, setShowVariantBulkEditor] = useState(false)
    const [bulkEditField, setBulkEditField] = useState<string>("price")
    const [bulkEditValue, setBulkEditValue] = useState<string | number>("")
    const [previewMode, setPreviewMode] = useState(false)
    const [showMediaLibrary, setShowMediaLibrary] = useState(false)
    const [mediaSearchQuery, setMediaSearchQuery] = useState("")
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [newColor, setNewColor] = useState("#000000")
    const [showCustomFieldDialog, setShowCustomFieldDialog] = useState(false)
    const [newCustomField, setNewCustomField] = useState<CustomField>({ name: "", value: "", visible: true })

    const params = useParams()
    const router = useRouter()

    // DnD sensors for drag and drop functionality
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    // Initialize the form with default values
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            description: "",
            shortDescription: "",
            sku: "",
            barcode: "",
            material: "",
            category: "",
            subcategory: "",
            brand: "",
            collections: [],
            status: "active",
            isFeatured: false,
            isRecommended: false,
            isNew: false,
            isBestseller: false,
            media: [],
            tags: [],
            customFields: [],
            regularPrice: 0,
            salePrice: 0,
            costPrice: 0,
            profitMargin: 0,
            onSale: false,
            taxClass: "standard",
            taxStatus: "taxable",
            bulkPricing: [{}, {}, {}],
            trackInventory: true,
            stockQuantity: 0,
            lowStockThreshold: 5,
            stockStatus: "in-stock",
            allowBackorders: false,
            soldIndividually: false,
            warehouse: "",
            binLocation: "",
            attributes: [],
            hasVariants: false,
            variantOptions: [],
            variants: [],
            variantDisplay: "dropdown",
            isPhysical: true,
            shippingWeight: 0,
            shippingLength: 0,
            shippingWidth: 0,
            shippingHeight: 0,
            shippingClass: "",
            shippingRestrictions: "",
            freeShipping: false,
            relatedProducts: [],
            upsellProducts: [],
            crossSellProducts: [],
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
            canonicalUrl: "",
            ogTitle: "",
            ogDescription: "",
            slug: "",
            enableReviews: true,
            downloadable: false,
            downloadFiles: [],
            preOrderAvailable: false,
            customizable: false,
            customizationOptions: [],
        },
    })

    // Use field arrays for variant options, variants, attributes, and custom fields
    const variantOptionsFieldArray = useFieldArray({
        control: form.control,
        name: "variantOptions",
    })

    const variantsFieldArray = useFieldArray({
        control: form.control,
        name: "variants",
    })

    const attributesFieldArray = useFieldArray({
        control: form.control,
        name: "attributes",
    })

    const customFieldsFieldArray = useFieldArray({
        control: form.control,
        name: "customFields",
    })

    const bulkPricingFieldArray = useFieldArray({
        control: form.control,
        name: "bulkPricing",
    })

    const downloadFilesFieldArray = useFieldArray({
        control: form.control,
        name: "downloadFiles",
    })

    const customizationOptionsFieldArray = useFieldArray({
        control: form.control,
        name: "customizationOptions",
    })

    // Watch form values
    const hasVariants = form.watch("hasVariants")
    const variantOptions = form.watch("variantOptions")
    const variants = form.watch("variants")
    const attributes = form.watch("attributes")
    const isPhysical = form.watch("isPhysical")
    const downloadable = form.watch("downloadable")
    const customizable = form.watch("customizable")
    const preOrderAvailable = form.watch("preOrderAvailable")
    const onSale = form.watch("onSale")
    const trackInventory = form.watch("trackInventory")
    const allowBackorders = form.watch("allowBackorders")
    const status = form.watch("status")

    // Initialize media from initialImages if available
    useEffect(() => {
        if (initialImages && initialImages.length > 0) {
            const initialMedia = initialImages.map((img, index) => ({
                id: `img-${index}`,
                url: img.url,
                type: "image" as const,
                position: index,
                alt: img.alt || "",
            }))
            setMedia(initialMedia)
            form.setValue("media", initialMedia)
        }
    }, [initialImages, form])

    // Generate all possible combinations of variant options
    const generateVariantCombinations = useCallback(() => {
        const options = form.getValues("variantOptions")
        if (!options || options.length === 0) return []

        // Get all option values
        const optionValues = options.map((option) => option.values)

        // Helper function to generate combinations recursively
        const generateCombinations = (arrays: string[][], current: string[] = [], index = 0): Record<string, string>[] => {
            if (index === arrays.length) {
                // Create an object with option names as keys and selected values
                const result: Record<string, string> = {}
                options.forEach((option, i) => {
                    result[option.name] = current[i]
                })
                return [result]
            }

            return arrays[index].reduce((acc: Record<string, string>[], value: string) => {
                return [...acc, ...generateCombinations(arrays, [...current, value], index + 1)]
            }, [])
        }

        return generateCombinations(optionValues)
    }, [form])

    // Generate variants based on option combinations
    const generateVariants = useCallback(() => {
        setIsGeneratingVariants(true)

        try {
            const combinations = generateVariantCombinations()
            const existingVariants = form.getValues("variants") || []

            // Create new variants while preserving existing data
            const newVariants = combinations.map((combination) => {
                // Check if this combination already exists
                const existingVariant = existingVariants.find((variant) => {
                    if (!variant.options) return false

                    // Check if all options match
                    return Object.keys(combination).every((key) => variant.options && variant.options[key] === combination[key])
                })

                if (existingVariant) {
                    return existingVariant
                }

                // Create a new variant with default values
                return {
                    id: `variant-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                    options: combination,
                    sku: `${form.getValues("sku") || "SKU"}-${Object.values(combination).join("-")}`.replace(/\s+/g, "-"),
                    barcode: "",
                    price: form.getValues("regularPrice") || 0,
                    compareAtPrice: form.getValues("salePrice") || 0,
                    costPrice: form.getValues("costPrice") || 0,
                    stockQuantity: form.getValues("stockQuantity") || 0,
                    weight: form.getValues("weight") || 0,
                    dimensions: {
                        length: form.getValues("shippingLength") || 0,
                        width: form.getValues("shippingWidth") || 0,
                        height: form.getValues("shippingHeight") || 0,
                    },
                    images: [],
                    isEnabled: true,
                    lowStockThreshold: form.getValues("lowStockThreshold") || 5,
                    backorderLimit: 0,
                    allowBackorders: form.getValues("allowBackorders") || false,
                }
            })

            // Update the form
            form.setValue("variants", newVariants)
            toast.success(`Generated ${newVariants.length} variants`)
        } catch (error) {
            console.error("Error generating variants:", error)
            toast.error("Failed to generate variants")
        } finally {
            setIsGeneratingVariants(false)
        }
    }, [form, generateVariantCombinations])

    // Add a new variant option
    const addVariantOption = () => {
        variantOptionsFieldArray.append({
            name: "",
            values: [],
            visible: true,
        })
    }

    // Add a new attribute
    const addAttribute = () => {
        attributesFieldArray.append({
            name: "",
            values: [],
            visible: true,
            variation: false,
        })
    }

    // Add a value to a variant option
    const addOptionValue = (optionIndex: number) => {
        if (!newOptionValue) return

        const currentValues = form.getValues(`variantOptions.${optionIndex}.values`) || []

        // Check if value already exists
        if (currentValues.includes(newOptionValue)) {
            toast.error("This value already exists")
            return
        }

        form.setValue(`variantOptions.${optionIndex}.values`, [...currentValues, newOptionValue])
        setNewOptionValue("")
        setSelectedOptionIndex(null)
    }

    // Remove a value from a variant option
    const removeOptionValue = (optionIndex: number, valueIndex: number) => {
        const currentValues = form.getValues(`variantOptions.${optionIndex}.values`) || []
        const newValues = currentValues.filter((_, index) => index !== valueIndex)
        form.setValue(`variantOptions.${optionIndex}.values`, newValues)
    }

    // Add a value to an attribute
    const addAttributeValue = (attributeIndex: number, value: string) => {
        if (!value) return

        const currentValues = form.getValues(`attributes.${attributeIndex}.values`) || []

        // Check if value already exists
        if (currentValues.includes(value)) {
            toast.error("This value already exists")
            return
        }

        form.setValue(`attributes.${attributeIndex}.values`, [...currentValues, value])
    }

    // Remove a value from an attribute
    const removeAttributeValue = (attributeIndex: number, valueIndex: number) => {
        const currentValues = form.getValues(`attributes.${attributeIndex}.values`) || []
        const newValues = currentValues.filter((_, index) => index !== valueIndex)
        form.setValue(`attributes.${attributeIndex}.values`, newValues)
    }

    // Handle media upload
    const handleMediaUpload = (type: "image" | "video" | "3d" = "image") => {
        // In a real implementation, this would open a file picker
        // For now, we'll just add a placeholder
        const newMediaItem: MediaItem = {
            id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            url: `/placeholder.svg?height=200&width=200&text=${type.charAt(0).toUpperCase() + type.slice(1)}+${media.length + 1}`,
            type,
            position: media.length,
            alt: `${type} ${media.length + 1}`,
        }

        const updatedMedia = [...media, newMediaItem]
        setMedia(updatedMedia)
        form.setValue("media", updatedMedia)
    }

    // Remove a media item
    const removeMediaItem = (id: string) => {
        const updatedMedia = media.filter((item) => item.id !== id)
        setMedia(updatedMedia)
        form.setValue("media", updatedMedia)
    }

    // Handle media reordering
    const handleMediaReorder = (event: { active: { id: string }; over: { id: string } }) => {
        const { active, over } = event

        if (active.id !== over.id) {
            const oldIndex = media.findIndex((item) => item.id === active.id)
            const newIndex = media.findIndex((item) => item.id === over.id)

            const updatedMedia = [...media]
            const [movedItem] = updatedMedia.splice(oldIndex, 1)
            updatedMedia.splice(newIndex, 0, movedItem)

            // Update positions
            const reorderedMedia = updatedMedia.map((item, index) => ({
                ...item,
                position: index,
            }))

            setMedia(reorderedMedia)
            form.setValue("media", reorderedMedia)
        }
    }

    // Associate media with variant
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
        form.setValue("media", updatedMedia)
    }

    // Add a tag
    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            const updatedTags = [...tags, newTag]
            setTags(updatedTags)
            form.setValue("tags", updatedTags)
            setNewTag("")
        }
    }

    // Remove a tag
    const removeTag = (tagToRemove: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove)
        setTags(updatedTags)
        form.setValue("tags", updatedTags)
    }

    // Add a custom field
    const addCustomField = () => {
        if (!newCustomField.name) {
            toast.error("Field name is required")
            return
        }

        customFieldsFieldArray.append({
            id: `field-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            name: newCustomField.name,
            value: newCustomField.value || "",
            visible: newCustomField.visible,
        })

        setNewCustomField({ name: "", value: "", visible: true })
        setShowCustomFieldDialog(false)
    }

    // Add a color to the palette
    const addColorToPalette = () => {
        if (!colorPalette.includes(newColor)) {
            setColorPalette([...colorPalette, newColor])
        }
        setShowColorPicker(false)
    }

    // Delete product
    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.refresh()
            router.push(`/${params.storeId}/products`)
            toast.success("Product deleted.")
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    // Calculate profit and margin
    const costPrice = form.watch("costPrice") || 0
    const regularPrice = form.watch("regularPrice") || 0
    const profit = regularPrice - costPrice
    const margin = costPrice > 0 ? (profit / regularPrice) * 100 : 0

    // Get variant option name
    const getVariantOptionName = (index: number) => {
        const option = form.getValues(`variantOptions.${index}`)
        return option?.name || `Option ${index + 1}`
    }

    // Format variant name for display
    const formatVariantName = (variant: Variant) => {
        if (!variant.options) return "Variant"

        return Object.entries(variant.options)
            .map(([key, value]) => `${value}`)
            .join(" / ")
    }

    // Bulk edit variants
    const bulkEditVariants = (field: keyof Variant | string, value: any) => {
        const variants = form.getValues("variants")

        // Handle nested properties like dimensions.length
        if (field.includes(".")) {
            const [parent, child] = field.split(".") as [keyof Variant, string]
            const updatedVariants = variants.map((variant) => ({
                ...variant,
                [parent]: {
                    ...((variant[parent] as Record<string, unknown>) || {}),
                    [child]: value,
                },
            }))
            form.setValue("variants", updatedVariants)
        } else {
            const updatedVariants = variants.map((variant) => ({
                ...variant,
                [field]: value,
            }))
            form.setValue("variants", updatedVariants)
        }

        toast.success(`Updated ${variants.length} variants`)
        setShowVariantBulkEditor(false)
        setBulkEditValue("")
    }

    // Duplicate a variant
    const duplicateVariant = (index: number) => {
        const variant = form.getValues(`variants.${index}`)
        const newVariant = {
            ...variant,
            id: `variant-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            sku: `${variant.sku || ""}-copy`,
        }
        variantsFieldArray.insert(index + 1, newVariant)
        toast.success("Variant duplicated")
    }

    // Convert color name to hex
    const colorNameToHex = (colorName: string): string => {
        // Basic color mapping
        const colorMap: { [key: string]: string } = {
            black: "#000000",
            white: "#FFFFFF",
            red: "#FF0000",
            green: "#00FF00",
            blue: "#0000FF",
            yellow: "#FFFF00",
            purple: "#800080",
            orange: "#FFA500",
            pink: "#FFC0CB",
            gray: "#808080",
            brown: "#A52A2A",
            navy: "#000080",
            teal: "#008080",
            maroon: "#800000",
            olive: "#808000",
        }

        return colorMap[colorName.toLowerCase()] || colorName
    }

    // Generate SKU for product or variant
    const generateSKU = (baseName: string, suffix = "") => {
        const baseSlug = baseName
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-")
            .toUpperCase()
            .substring(0, 8)

        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()

        return `${baseSlug}-${randomPart}${suffix ? `-${suffix}` : ""}`
    }

    // Auto-generate slug from product name
    const generateSlug = () => {
        const productName = form.getValues("name")
        if (!productName) return

        const slug = productName
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")

        form.setValue("slug", slug)
        toast.success("Slug generated")
    }

    // Auto-generate SEO fields
    const generateSEOFields = () => {
        const productName = form.getValues("name")
        const shortDescription = form.getValues("shortDescription")

        if (!productName) return

        form.setValue("metaTitle", productName)
        form.setValue("ogTitle", productName)

        if (shortDescription) {
            form.setValue("metaDescription", shortDescription)
            form.setValue("ogDescription", shortDescription)
        }

        generateSlug()
        toast.success("SEO fields generated")
    }

    // Submit form
    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true)

            // Prepare data for submission
            const formData = {
                ...data,
                // Convert any data types as needed for API
            }

            if (initialData) {
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, formData)
                toast.success("Product updated successfully")
            } else {
                await axios.post(`/api/${params.storeId}/products`, formData)
                toast.success("Product created successfully")
            }

            router.refresh()
            router.push(`/${params.storeId}/products`)
        } catch (error) {
            console.error("Error submitting form:", error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text">
                                        {initialData ? "Edit Product" : "Add New Product"}
                                    </h1>
                                    <p className="text-[#A4B8D3]">
                                        {initialData ? "Update product details" : "Create a new product in your inventory"}
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
                                        onClick={() => {
                                            form.setValue("status", "draft")
                                            form.handleSubmit(onSubmit)()
                                        }}
                                    >
                                        Save as Draft
                                    </Button>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                type="button"
                                                className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]"
                                            >
                                                <Save className="h-4 w-4 mr-2" />
                                                Publish
                                                <ChevronDown className="h-4 w-4 ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    form.setValue("status", "active")
                                                    form.handleSubmit(onSubmit)()
                                                }}
                                                className="cursor-pointer hover:bg-[#1E293B]"
                                            >
                                                Publish Now
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    form.setValue("status", "scheduled")
                                                    setActiveTab("advanced")
                                                    toast.success("Set a publish date in the Advanced tab")
                                                }}
                                                className="cursor-pointer hover:bg-[#1E293B]"
                                            >
                                                Schedule Publication
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            {/* Tabs */}
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 w-full">
                                <TabsList className="bg-[#0A1228] border border-[#1E293B] mb-6 overflow-x-auto flex-nowrap">
                                    <TabsTrigger
                                        value="general"
                                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                    >
                                        General
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="media"
                                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                    >
                                        Media
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="pricing"
                                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                    >
                                        Pricing
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="inventory"
                                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                    >
                                        Inventory
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="attributes"
                                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                    >
                                        Attributes
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="variants"
                                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                    >
                                        Variants
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="shipping"
                                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                    >
                                        Shipping
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="seo"
                                        className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                    >
                                        SEO
                                    </TabsTrigger>
                                    {isAdvancedMode && (
                                        <TabsTrigger
                                            value="advanced"
                                            className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                        >
                                            Advanced
                                        </TabsTrigger>
                                    )}
                                </TabsList>

                                {/* General Tab */}
                                <TabsContent value="general" className="w-full">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2">
                                            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                                                <CardHeader>
                                                    <CardTitle>Product Information</CardTitle>
                                                    <CardDescription className="text-[#A4B8D3]">
                                                        Basic information about your product
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                    <div className="space-y-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="name"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Product Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Enter product name"
                                                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
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
                                                                    <FormLabel>Product Description</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            {...field}
                                                                            placeholder="Enter product description"
                                                                            className="min-h-[150px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="shortDescription"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Short Description</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            {...field}
                                                                            placeholder="Enter a short description for product listings"
                                                                            className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mt-6">
                                                <CardHeader>
                                                    <CardTitle>Product Details</CardTitle>
                                                    <CardDescription className="text-[#A4B8D3]">
                                                        Additional details and specifications
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="sku"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                                                                    <div className="flex gap-2">
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                placeholder="Enter SKU"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            size="icon"
                                                                            className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                            onClick={() => {
                                                                                const name = form.getValues("name")
                                                                                if (name) {
                                                                                    form.setValue("sku", generateSKU(name))
                                                                                    toast.success("SKU generated")
                                                                                } else {
                                                                                    toast.error("Product name is required to generate SKU")
                                                                                }
                                                                            }}
                                                                        >
                                                                            <FileText className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="barcode"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Barcode (ISBN, UPC, GTIN, etc.)</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Enter barcode"
                                                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <FormField
                                                            control={form.control}
                                                            name="tags"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Product Tags</FormLabel>
                                                                    <FormControl>
                                                                        <div>
                                                                            <div className="flex flex-wrap gap-2 mb-2">
                                                                                {field.value.map((tag, index) => (
                                                                                    <div
                                                                                        key={index}
                                                                                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF00E5]/10 text-[#FF00E5] text-sm"
                                                                                    >
                                                                                        <span>{tag}</span>
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => field.onChange(field.value.filter((t) => t !== tag))}
                                                                                            className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#FF00E5]/20"
                                                                                        >
                                                                                            ×
                                                                                        </button>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            <div className="flex gap-2">
                                                                                <Input
                                                                                    placeholder="Add a tag"
                                                                                    value={newTag}
                                                                                    onChange={(e) => setNewTag(e.target.value)}
                                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                    onKeyDown={(e) => {
                                                                                        if (e.key === "Enter") {
                                                                                            e.preventDefault()
                                                                                            field.onChange([...field.value, newTag])
                                                                                            setNewTag("")
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        field.onChange([...field.value, newTag])
                                                                                        setNewTag("")
                                                                                    }}
                                                                                    className="bg-[#1E293B] hover:bg-[#1E293B]/80"
                                                                                >
                                                                                    <Tag className="h-4 w-4 mr-2" />
                                                                                    Add
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name="material"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Material</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Enter material"
                                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="width"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Width (cm)</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            type="number"
                                                                            placeholder="Width"
                                                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="height"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Height (cm)</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            type="number"
                                                                            placeholder="Height"
                                                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="depth"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Depth (cm)</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            type="number"
                                                                            placeholder="Depth"
                                                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name="weight"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Weight (kg)</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        type="number"
                                                                        placeholder="Enter weight"
                                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {/* Custom Fields Section */}
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="font-medium">Custom Fields</h3>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                onClick={() => setShowCustomFieldDialog(true)}
                                                            >
                                                                <Plus className="h-4 w-4 mr-2" />
                                                                Add Field
                                                            </Button>
                                                        </div>

                                                        {customFieldsFieldArray.fields.length > 0 ? (
                                                            <div className="space-y-4">
                                                                {customFieldsFieldArray.fields.map((field, index) => (
                                                                    <div
                                                                        key={field.id}
                                                                        className="flex items-center gap-4 p-3 border border-[#1E293B] rounded-lg bg-[#050A18]"
                                                                    >
                                                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`customFields.${index}.name`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>Field Name</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                {...field}
                                                                                                placeholder="Field name"
                                                                                                className="bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                            />
                                                                                        </FormControl>
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`customFields.${index}.value`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>Field Value</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                {...field}
                                                                                                placeholder="Field value"
                                                                                                className="bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                            />
                                                                                        </FormControl>
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <FormField
                                                                            control={form.control}
                                                                            name={`customFields.${index}.visible`}
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormControl>
                                                                                        <div className="flex items-center h-full pt-6">
                                                                                            <Switch
                                                                                                checked={field.value}
                                                                                                onCheckedChange={field.onChange}
                                                                                                className="data-[state=checked]:bg-[#FF00E5]"
                                                                                            />
                                                                                            <span className="ml-2 text-sm">Visible</span>
                                                                                        </div>
                                                                                    </FormControl>
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-8 w-8 text-[#A4B8D3] hover:text-white hover:bg-transparent"
                                                                            onClick={() => customFieldsFieldArray.remove(index)}
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="p-4 border border-dashed border-[#1E293B] rounded-lg text-center">
                                                                <p className="text-sm text-[#A4B8D3]">No custom fields added yet</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div>
                                            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                                                <CardHeader>
                                                    <CardTitle>Organization</CardTitle>
                                                    <CardDescription className="text-[#A4B8D3]">
                                                        Categorize and organize your product
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="category"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Category</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                            <SelectValue placeholder="Select category" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                        <SelectItem value="apparel">Apparel</SelectItem>
                                                                        <SelectItem value="electronics">Electronics</SelectItem>
                                                                        <SelectItem value="accessories">Accessories</SelectItem>
                                                                        <SelectItem value="home">Home & Kitchen</SelectItem>
                                                                        <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                                                                        <SelectItem value="sports">Sports & Outdoors</SelectItem>
                                                                        <SelectItem value="toys">Toys & Games</SelectItem>
                                                                        <SelectItem value="books">Books & Media</SelectItem>
                                                                        <SelectItem value="food">Food & Beverages</SelectItem>
                                                                        <SelectItem value="health">Health & Wellness</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="subcategory"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Subcategory</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                            <SelectValue placeholder="Select subcategory" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                        <SelectItem value="tshirts">T-Shirts</SelectItem>
                                                                        <SelectItem value="hoodies">Hoodies</SelectItem>
                                                                        <SelectItem value="jeans">Jeans</SelectItem>
                                                                        <SelectItem value="dresses">Dresses</SelectItem>
                                                                        <SelectItem value="jackets">Jackets</SelectItem>
                                                                        <SelectItem value="shoes">Shoes</SelectItem>
                                                                        <SelectItem value="accessories">Accessories</SelectItem>
                                                                        <SelectItem value="activewear">Activewear</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="brand"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Brand</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                            <SelectValue placeholder="Select brand" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                        <SelectItem value="zero">ZERO</SelectItem>
                                                                        <SelectItem value="nike">Nike</SelectItem>
                                                                        <SelectItem value="adidas">Adidas</SelectItem>
                                                                        <SelectItem value="puma">Puma</SelectItem>
                                                                        <SelectItem value="reebok">Reebok</SelectItem>
                                                                        <SelectItem value="apple">Apple</SelectItem>
                                                                        <SelectItem value="samsung">Samsung</SelectItem>
                                                                        <SelectItem value="sony">Sony</SelectItem>
                                                                        <SelectItem value="custom">Custom Brand...</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="collections"
                                                        render={() => (
                                                            <FormItem>
                                                                <div className="mb-4">
                                                                    <FormLabel>Collections</FormLabel>
                                                                </div>
                                                                {[
                                                                    "Summer Collection",
                                                                    "New Arrivals",
                                                                    "Best Sellers",
                                                                    "Limited Edition",
                                                                    "Sale",
                                                                    "Seasonal",
                                                                    "Featured",
                                                                    "Exclusive",
                                                                ].map((collection, i) => (
                                                                    <FormField
                                                                        key={collection}
                                                                        control={form.control}
                                                                        name="collections"
                                                                        render={({ field }) => {
                                                                            return (
                                                                                <FormItem
                                                                                    key={collection}
                                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                                >
                                                                                    <FormControl>
                                                                                        <Checkbox
                                                                                            checked={field.value?.includes(collection)}
                                                                                            onCheckedChange={(checked) => {
                                                                                                return checked
                                                                                                    ? field.onChange([...field.value, collection])
                                                                                                    : field.onChange(field.value?.filter((value) => value !== collection))
                                                                                            }}
                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormLabel className="font-normal">{collection}</FormLabel>
                                                                                </FormItem>
                                                                            )
                                                                        }}
                                                                    />
                                                                ))}
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="status"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Product Status</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                            <SelectValue placeholder="Select status" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                        <SelectItem value="active">Active</SelectItem>
                                                                        <SelectItem value="draft">Draft</SelectItem>
                                                                        <SelectItem value="archived">Archived</SelectItem>
                                                                        <SelectItem value="scheduled">Scheduled</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {status === "scheduled" && (
                                                        <FormField
                                                            control={form.control}
                                                            name="publishDate"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Publish Date</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            type="datetime-local"
                                                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                </CardContent>
                                            </Card>

                                            <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm mt-6">
                                                <CardHeader>
                                                    <CardTitle>Product Badges</CardTitle>
                                                    <CardDescription className="text-[#A4B8D3]">
                                                        Highlight this product in your store
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="isFeatured"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center justify-between rounded-lg">
                                                                <div className="space-y-0.5">
                                                                    <FormLabel className="text-base">Featured Product</FormLabel>
                                                                    <FormDescription className="text-sm text-[#A4B8D3]">
                                                                        Show this product on the homepage
                                                                    </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                        className="data-[state=checked]:bg-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="isNew"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center justify-between rounded-lg">
                                                                <div className="space-y-0.5">
                                                                    <FormLabel className="text-base">New Arrival</FormLabel>
                                                                    <FormDescription className="text-sm text-[#A4B8D3]">
                                                                        Mark this product as newly added
                                                                    </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                        className="data-[state=checked]:bg-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="isBestseller"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center justify-between rounded-lg">
                                                                <div className="space-y-0.5">
                                                                    <FormLabel className="text-base">Bestseller</FormLabel>
                                                                    <FormDescription className="text-sm text-[#A4B8D3]">
                                                                        Mark this product as a bestseller
                                                                    </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                        className="data-[state=checked]:bg-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="isRecommended"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center justify-between rounded-lg">
                                                                <div className="space-y-0.5">
                                                                    <FormLabel className="text-base">Recommended</FormLabel>
                                                                    <FormDescription className="text-sm text-[#A4B8D3]">
                                                                        Show in recommended products section
                                                                    </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                        className="data-[state=checked]:bg-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Media Tab */}
                                <TabsContent value="media" className="w-full">
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

                                            {media.length > 0 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-medium">Media Gallery</h3>
                                                        <p className="text-sm text-[#A4B8D3]">
                                                            Drag to reorder. First image will be the main product image.
                                                        </p>
                                                    </div>

                                                    <DndContext
                                                        sensors={sensors}
                                                        collisionDetection={closestCenter}
                                                        onDragEnd={(event) => {
                                                            const { active, over } = event;
                                                            if (over && active.id !== over.id) {
                                                                const oldIndex = media.findIndex((item) => item.id === active.id);
                                                                const newIndex = media.findIndex((item) => item.id === over.id);
                                                                const newMedia = [...media];
                                                                [newMedia[oldIndex], newMedia[newIndex]] = [newMedia[newIndex], newMedia[oldIndex]];
                                                                setMedia(newMedia);
                                                            }
                                                        }}
                                                        modifiers={[restrictToVerticalAxis]}
                                                    >
                                                        <SortableContext
                                                            items={media.map((item) => item.id)}
                                                            strategy={verticalListSortingStrategy}
                                                        >
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                {media.map((item, index) => (
                                                                    <SortableItem key={item.id} id={item.id}>
                                                                        <div className="relative group border border-[#1E293B] rounded-lg overflow-hidden">
                                                                            {item.type === "image" && (
                                                                                <img
                                                                                    src={item.url || "/placeholder.svg"}
                                                                                    alt={item.alt || `Product media ${index + 1}`}
                                                                                    className="w-full h-40 object-cover"
                                                                                />
                                                                            )}
                                                                            {item.type === "video" && (
                                                                                <div className="w-full h-40 bg-[#050A18] flex items-center justify-center">
                                                                                    <FileText className="h-12 w-12 text-[#A4B8D3]" />
                                                                                </div>
                                                                            )}
                                                                            {item.type === "3d" && (
                                                                                <div className="w-full h-40 bg-[#050A18] flex items-center justify-center">
                                                                                    <Layers className="h-12 w-12 text-[#A4B8D3]" />
                                                                                </div>
                                                                            )}

                                                                            <div className="absolute inset-0 bg-[#050A18]/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="outline"
                                                                                    size="sm"
                                                                                    className="bg-[#1E293B]/50 border-[#1E293B] text-white hover:bg-[#1E293B]"
                                                                                    onClick={() => {
                                                                                        // Open edit dialog for this media item
                                                                                        // In a real implementation, this would open a dialog to edit alt text, etc.
                                                                                        toast.success("Edit media functionality would open here")
                                                                                    }}
                                                                                >
                                                                                    Edit
                                                                                </Button>
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="destructive"
                                                                                    size="sm"
                                                                                    className="bg-[#FF3D00] hover:bg-[#FF3D00]/90"
                                                                                    onClick={() => removeMediaItem(item.id)}
                                                                                >
                                                                                    <Trash2 className="h-4 w-4" />
                                                                                </Button>
                                                                            </div>

                                                                            {index === 0 && (
                                                                                <div className="absolute top-2 left-2 bg-[#FF00E5] text-white text-xs px-2 py-1 rounded">
                                                                                    Main
                                                                                </div>
                                                                            )}

                                                                            {item.type !== "image" && (
                                                                                <div className="absolute top-2 right-2 bg-[#1E293B] text-white text-xs px-2 py-1 rounded capitalize">
                                                                                    {item.type}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </SortableItem>
                                                                ))}
                                                            </div>
                                                        </SortableContext>
                                                    </DndContext>
                                                </div>
                                            )}

                                            {hasVariants && media.length > 0 && (
                                                <div className="space-y-4 mt-6">
                                                    <h3 className="font-medium">Variant Media Mapping</h3>
                                                    <p className="text-sm text-[#A4B8D3]">Associate media with specific variants</p>

                                                    <div className="border border-[#1E293B] rounded-lg overflow-hidden">
                                                        <Table>
                                                            <TableHeader className="bg-[#0A1228]">
                                                                <TableRow className="hover:bg-[#0A1228]/80 border-b-[#1E293B]">
                                                                    <TableHead className="text-[#A4B8D3] font-medium">Media</TableHead>
                                                                    <TableHead className="text-[#A4B8D3] font-medium">Type</TableHead>
                                                                    <TableHead className="text-[#A4B8D3] font-medium">Associated Variants</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {media.map((item, index) => (
                                                                    <TableRow key={item.id} className="hover:bg-[#0A1228]/80 border-b-[#1E293B]">
                                                                        <TableCell>
                                                                            <div className="flex items-center gap-2">
                                                                                {item.type === "image" ? (
                                                                                    <img
                                                                                        src={item.url || "/placeholder.svg"}
                                                                                        alt={item.alt || `Media ${index + 1}`}
                                                                                        className="w-10 h-10 object-cover rounded"
                                                                                    />
                                                                                ) : item.type === "video" ? (
                                                                                    <div className="w-10 h-10 bg-[#050A18] flex items-center justify-center rounded">
                                                                                        <FileText className="h-5 w-5 text-[#A4B8D3]" />
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="w-10 h-10 bg-[#050A18] flex items-center justify-center rounded">
                                                                                        <Layers className="h-5 w-5 text-[#A4B8D3]" />
                                                                                    </div>
                                                                                )}
                                                                                <span className="text-sm">
                                                                                    {item.alt || `Media ${index + 1}`}
                                                                                    {index === 0 && <span className="ml-2 text-xs text-[#FF00E5]">(Main)</span>}
                                                                                </span>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Badge className="bg-[#1E293B] text-white hover:bg-[#1E293B] capitalize">
                                                                                {item.type}
                                                                            </Badge>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {variants.length > 0 ? (
                                                                                    <Popover>
                                                                                        <PopoverTrigger asChild>
                                                                                            <Button
                                                                                                type="button"
                                                                                                variant="outline"
                                                                                                size="sm"
                                                                                                className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                                            >
                                                                                                Associate Variants
                                                                                            </Button>
                                                                                        </PopoverTrigger>
                                                                                        <PopoverContent className="w-80 bg-[#0A1228] border-[#1E293B] p-4">
                                                                                            <div className="space-y-4">
                                                                                                <h4 className="font-medium">Select Variants</h4>
                                                                                                <ScrollArea className="h-60">
                                                                                                    <div className="space-y-2">
                                                                                                        {variants.map((variant, variantIndex) => (
                                                                                                            <div key={variant.id} className="flex items-center space-x-2">
                                                                                                                <Checkbox
                                                                                                                    id={`variant-${variant.id}`}
                                                                                                                    checked={item.variantIds?.includes(variant.id || '')}
                                                                                                                    onCheckedChange={() =>
                                                                                                                        associateMediaWithVariant(item.id, variant.id || '') 
                                                                                                                    }
                                                                                                                />
                                                                                                                <label
                                                                                                                    htmlFor={`variant-${variant.id}`}
                                                                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                                                                >
                                                                                                                    {formatVariantName(variant)}
                                                                                                                </label>
                                                                                                            </div>
                                                                                                        ))}
                                                                                                    </div>
                                                                                                </ScrollArea>
                                                                                            </div>
                                                                                        </PopoverContent>
                                                                                    </Popover>
                                                                                ) : (
                                                                                    <span className="text-sm text-[#A4B8D3]">No variants available</span>
                                                                                )}

                                                                                {item.variantIds && item.variantIds.length > 0 && (
                                                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                                                        {item.variantIds.map((variantId) => {
                                                                                            const variant = variants.find((v) => v.id === variantId)
                                                                                            return variant ? (
                                                                                                <Badge
                                                                                                    key={variantId}
                                                                                                    className="bg-[#FF00E5]/10 text-[#FF00E5] hover:bg-[#FF00E5]/20"
                                                                                                >
                                                                                                    {formatVariantName(variant)}
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="ml-1 hover:bg-[#FF00E5]/30 rounded-full w-4 h-4 inline-flex items-center justify-center"
                                                                                                        onClick={() => associateMediaWithVariant(item.id, variantId)}
                                                                                                    >
                                                                                                        ×
                                                                                                    </button>
                                                                                                </Badge>
                                                                                            ) : null
                                                                                        })}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Media Library Dialog */}
                                    <Dialog open={showMediaLibrary} onOpenChange={setShowMediaLibrary}>
                                        <DialogContent className="bg-[#0A1228] border-[#1E293B] text-white max-w-4xl">
                                            <DialogHeader>
                                                <DialogTitle>Media Library</DialogTitle>
                                                <DialogDescription className="text-[#A4B8D3]">
                                                    Browse and select media from your library
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="Search media..."
                                                        value={mediaSearchQuery}
                                                        onChange={(e) => setMediaSearchQuery(e.target.value)}
                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                    />
                                                    <Select defaultValue="all">
                                                        <SelectTrigger className="w-[180px] bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                            <SelectValue placeholder="Filter by type" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                            <SelectItem value="all">All Media</SelectItem>
                                                            <SelectItem value="image">Images</SelectItem>
                                                            <SelectItem value="video">Videos</SelectItem>
                                                            <SelectItem value="3d">3D Models</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-1">
                                                    {/* This would be populated with actual media from the library */}
                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                                        <div
                                                            key={item}
                                                            className="relative group cursor-pointer border border-[#1E293B] rounded-lg overflow-hidden"
                                                        >
                                                            <img
                                                                src={`/placeholder.svg?height=200&width=200&text=Library+Image+${item}`}
                                                                alt={`Library image ${item}`}
                                                                className="w-full h-24 object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-[#050A18]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <Button
                                                                    type="button"
                                                                    size="sm"
                                                                    className="bg-[#FF00E5] hover:bg-[#FF00E5]/90"
                                                                    onClick={() => {
                                                                        // Add this media to the product
                                                                        handleMediaUpload("image")
                                                                        setShowMediaLibrary(false)
                                                                    }}
                                                                >
                                                                    Select
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                        onClick={() => setShowMediaLibrary(false)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleMediaUpload("image")}
                                                        className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0"
                                                    >
                                                        <Upload className="h-4 w-4 mr-2" />
                                                        Upload New
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TabsContent>

                                {/* Pricing Tab */}
                                <TabsContent value="pricing" className="w-full">
                                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle>Product Pricing</CardTitle>
                                            <CardDescription className="text-[#A4B8D3]">Set the pricing for your product</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="regularPrice"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Regular Price ($)</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                                                                        <Input
                                                                            {...field}
                                                                            type="number"
                                                                            step="0.01"
                                                                            placeholder="0.00"
                                                                            className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="salePrice"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Sale Price ($)</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                                                                        <Input
                                                                            {...field}
                                                                            type="number"
                                                                            step="0.01"
                                                                            placeholder="0.00"
                                                                            className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="onSale"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} id="on-sale" />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>Product is on sale</FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {onSale && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="saleStartDate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Sale Start Date</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="datetime-local"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="saleEndDate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Sale End Date</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="datetime-local"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="costPrice"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Cost Price ($)</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                                                                        <Input
                                                                            {...field}
                                                                            type="number"
                                                                            step="0.01"
                                                                            placeholder="0.00"
                                                                            className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="profitMargin"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Profit Margin (%)</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        type="number"
                                                                        placeholder="0"
                                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="p-4 border border-[#1E293B] rounded-lg bg-[#050A18]">
                                                        <h4 className="font-medium mb-2">Profit Calculation</h4>
                                                        <div className="space-y-1 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-[#A4B8D3]">Cost Price:</span>
                                                                <span>${costPrice.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-[#A4B8D3]">Selling Price:</span>
                                                                <span>${regularPrice.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-[#A4B8D3]">Profit:</span>
                                                                <span>${profit.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-[#A4B8D3]">Margin:</span>
                                                                <span>{margin.toFixed(2)}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator className="bg-[#1E293B]" />

                                            <div className="space-y-4">
                                                <h3 className="font-medium">Tax Settings</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="taxClass"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Tax Class</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                            <SelectValue placeholder="Select tax class" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                        <SelectItem value="standard">Standard Rate</SelectItem>
                                                                        <SelectItem value="reduced">Reduced Rate</SelectItem>
                                                                        <SelectItem value="zero">Zero Rate</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="taxStatus"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Tax Status</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                            <SelectValue placeholder="Select tax status" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                        <SelectItem value="taxable">Taxable</SelectItem>
                                                                        <SelectItem value="shipping">Shipping Only</SelectItem>
                                                                        <SelectItem value="none">None</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <Separator className="bg-[#1E293B]" />

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-medium">Bulk Pricing</h3>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                        onClick={() => {
                                                            bulkPricingFieldArray.append({})
                                                        }}
                                                    >
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Add Tier
                                                    </Button>
                                                </div>
                                                <p className="text-sm text-[#A4B8D3]">Set discounted prices for bulk purchases</p>

                                                <div className="space-y-2">
                                                    <div className="grid grid-cols-4 gap-4 mb-2">
                                                        <div>
                                                            <Label htmlFor="quantity-min">Min Quantity</Label>
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="quantity-max">Max Quantity</Label>
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="discount">Discount (%)</Label>
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="price">Price ($)</Label>
                                                        </div>
                                                    </div>

                                                    {bulkPricingFieldArray.fields.map((field, index) => (
                                                        <div key={field.id} className="grid grid-cols-4 gap-4 items-center">
                                                            <FormField
                                                                control={form.control}
                                                                name={`bulkPricing.${index}.minQuantity`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="number"
                                                                                placeholder="Min"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name={`bulkPricing.${index}.maxQuantity`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="number"
                                                                                placeholder="Max"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name={`bulkPricing.${index}.discount`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="number"
                                                                                placeholder="0"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                onChange={(e) => {
                                                                                    field.onChange(e)
                                                                                    // Calculate price based on discount
                                                                                    const discount = Number.parseFloat(e.target.value) || 0
                                                                                    const price = regularPrice * (1 - discount / 100)
                                                                                    form.setValue(`bulkPricing.${index}.price`, price)
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <div className="flex items-center gap-2">
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`bulkPricing.${index}.price`}
                                                                    render={({ field }) => (
                                                                        <FormItem className="flex-1">
                                                                            <FormControl>
                                                                                <Input
                                                                                    {...field}
                                                                                    type="number"
                                                                                    step="0.01"
                                                                                    placeholder="0.00"
                                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-[#A4B8D3] hover:text-white hover:bg-transparent"
                                                                    onClick={() => bulkPricingFieldArray.remove(index)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Inventory Tab */}
                                <TabsContent value="inventory" className="w-full">
                                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle>Inventory Management</CardTitle>
                                            <CardDescription className="text-[#A4B8D3]">Manage your product inventory</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="trackInventory"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} id="track-inventory" />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel>Track inventory for this product</FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                {trackInventory && (
                                                    <>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="stockQuantity"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Stock Quantity</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="number"
                                                                                placeholder="0"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="lowStockThreshold"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Low Stock Threshold</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="number"
                                                                                placeholder="5"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>

                                                        <FormField
                                                            control={form.control}
                                                            name="stockStatus"
                                                            render={({ field }) => (
                                                                <FormItem className="space-y-3">
                                                                    <FormLabel>Stock Status</FormLabel>
                                                                    <FormControl>
                                                                        <RadioGroup
                                                                            onValueChange={field.onChange}
                                                                            defaultValue={field.value}
                                                                            className="flex flex-col space-y-1"
                                                                        >
                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="in-stock" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">In stock</FormLabel>
                                                                            </FormItem>
                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="out-of-stock" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">Out of stock</FormLabel>
                                                                            </FormItem>
                                                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                                                <FormControl>
                                                                                    <RadioGroupItem value="backorder" />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">On backorder</FormLabel>
                                                                            </FormItem>
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="allowBackorders"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value}
                                                                            onCheckedChange={field.onChange}
                                                                            id="allow-backorders"
                                                                        />
                                                                    </FormControl>
                                                                    <div className="space-y-1 leading-none">
                                                                        <FormLabel>Allow backorders</FormLabel>
                                                                    </div>
                                                                </FormItem>
                                                            )}
                                                        />

                                                        {allowBackorders && (
                                                            <FormField
                                                                control={form.control}
                                                                name="backorderLimit"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Backorder Limit (0 for unlimited)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="number"
                                                                                placeholder="0"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        )}
                                                    </>
                                                )}

                                                <FormField
                                                    control={form.control}
                                                    name="soldIndividually"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    id="sold-individually"
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel>Limit purchases to 1 item per order</FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="minPurchaseQuantity"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Minimum Purchase Quantity</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        type="number"
                                                                        min="1"
                                                                        placeholder="1"
                                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="maxPurchaseQuantity"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Maximum Purchase Quantity (0 for unlimited)</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="0"
                                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <Separator className="bg-[#1E293B]" />

                                            <div className="space-y-4">
                                                <h3 className="font-medium">Inventory Location</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="warehouse"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Warehouse</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                            <SelectValue placeholder="Select warehouse" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                        <SelectItem value="main">Main Warehouse</SelectItem>
                                                                        <SelectItem value="east">East Coast Warehouse</SelectItem>
                                                                        <SelectItem value="west">West Coast Warehouse</SelectItem>
                                                                        <SelectItem value="central">Central Warehouse</SelectItem>
                                                                        <SelectItem value="international">International Warehouse</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="binLocation"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Bin Location</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="e.g., A12-B34"
                                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            {preOrderAvailable && (
                                                <>
                                                    <Separator className="bg-[#1E293B]" />
                                                    <div className="space-y-4">
                                                        <h3 className="font-medium">Pre-Order Settings</h3>
                                                        <Alert className="bg-[#FF00E5]/10 border-[#FF00E5]/30 text-[#FF00E5]">
                                                            <AlertTriangle className="h-4 w-4" />
                                                            <AlertDescription>
                                                                Pre-order is enabled. Customers can order this product before it's in stock.
                                                            </AlertDescription>
                                                        </Alert>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="preOrderReleaseDate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Release Date</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="datetime-local"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <FormField
                                                            control={form.control}
                                                            name="preOrderMessage"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Pre-Order Message</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            {...field}
                                                                            placeholder="This item is available for pre-order and will ship on the release date."
                                                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Attributes Tab */}
                                <TabsContent value="attributes" className="w-full">
                                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Product Attributes</CardTitle>
                                                    <CardDescription className="text-[#A4B8D3]">
                                                        Define attributes like size, color, material, etc.
                                                    </CardDescription>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                    onClick={addAttribute}
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add Attribute
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {attributesFieldArray.fields.length > 0 ? (
                                                <div className="space-y-6">
                                                    {attributesFieldArray.fields.map((field, index) => (
                                                        <div key={field.id} className="p-4 border border-[#1E293B] rounded-lg bg-[#050A18]">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`attributes.${index}.name`}
                                                                    render={({ field }) => (
                                                                        <FormItem className="flex-1 mr-4">
                                                                            <FormControl>
                                                                                <Input
                                                                                    {...field}
                                                                                    placeholder="Attribute name (e.g., Size, Color)"
                                                                                    className="bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <div className="flex items-center gap-2">
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`attributes.${index}.visible`}
                                                                        render={({ field }) => (
                                                                            <FormItem className="flex items-center space-x-2">
                                                                                <FormControl>
                                                                                    <Switch
                                                                                        checked={field.value}
                                                                                        onCheckedChange={field.onChange}
                                                                                        className="data-[state=checked]:bg-[#FF00E5]"
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="text-sm">Visible</FormLabel>
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                    <FormField
                                                                        control={form.control}
                                                                        name={`attributes.${index}.variation`}
                                                                        render={({ field }) => (
                                                                            <FormItem className="flex items-center space-x-2">
                                                                                <FormControl>
                                                                                    <Switch
                                                                                        checked={field.value}
                                                                                        onCheckedChange={(checked) => {
                                                                                            field.onChange(checked)
                                                                                            if (checked) {
                                                                                                // If this is a variation attribute, add it to variant options
                                                                                                const attrName = form.getValues(`attributes.${index}.name`)
                                                                                                const attrValues = form.getValues(`attributes.${index}.values`)
                                                                                                if (attrName && attrValues.length > 0) {
                                                                                                    const existingOption = variantOptions.find(
                                                                                                        (opt) => opt.name === attrName,
                                                                                                    )
                                                                                                    if (!existingOption) {
                                                                                                        variantOptionsFieldArray.append({
                                                                                                            name: attrName,
                                                                                                            values: attrValues,
                                                                                                            visible: true,
                                                                                                        })
                                                                                                        form.setValue("hasVariants", true)
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                        className="data-[state=checked]:bg-[#FF00E5]"
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="text-sm">Used for Variations</FormLabel>
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="text-[#A4B8D3] hover:text-white hover:bg-transparent"
                                                                        onClick={() => attributesFieldArray.remove(index)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label>Attribute Values</Label>
                                                                <div className="flex flex-wrap gap-2 mb-2">
                                                                    {form.getValues(`attributes.${index}.values`)?.map((value, valueIndex) => (
                                                                        <div
                                                                            key={valueIndex}
                                                                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF00E5]/10 text-[#FF00E5] text-sm"
                                                                        >
                                                                            <span>{value}</span>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => removeAttributeValue(index, valueIndex)}
                                                                                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#FF00E5]/20"
                                                                            >
                                                                                ×
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <Popover>
                                                                        <PopoverTrigger asChild>
                                                                            <Button
                                                                                type="button"
                                                                                variant="outline"
                                                                                className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                            >
                                                                                <Plus className="h-4 w-4 mr-2" />
                                                                                Add Value
                                                                            </Button>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent className="w-80 bg-[#0A1228] border-[#1E293B] p-4">
                                                                            <div className="space-y-2">
                                                                                <h4 className="font-medium text-white">Add Attribute Value</h4>
                                                                                <div className="flex gap-2">
                                                                                    <Input
                                                                                        placeholder="Enter value"
                                                                                        value={newOptionValue}
                                                                                        onChange={(e) => setNewOptionValue(e.target.value)}
                                                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                        onKeyDown={(e) => {
                                                                                            if (e.key === "Enter") {
                                                                                                e.preventDefault()
                                                                                                addAttributeValue(index, newOptionValue)
                                                                                                setNewOptionValue("")
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                    <Button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            addAttributeValue(index, newOptionValue)
                                                                                            setNewOptionValue("")
                                                                                        }}
                                                                                        className="bg-[#FF00E5] hover:bg-[#FF00E5]/90"
                                                                                    >
                                                                                        Add
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </PopoverContent>
                                                                    </Popover>

                                                                    {form.getValues(`attributes.${index}.name`)?.toLowerCase() === "color" && (
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="outline"
                                                                                    className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                                >
                                                                                    <Palette className="h-4 w-4 mr-2" />
                                                                                    Add Color
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="w-80 bg-[#0A1228] border-[#1E293B] p-4">
                                                                                <div className="space-y-4">
                                                                                    <h4 className="font-medium text-white">Select Color</h4>
                                                                                    <div className="grid grid-cols-5 gap-2">
                                                                                        {colorPalette.map((color) => (
                                                                                            <ColorSwatch
                                                                                                key={color}
                                                                                                color={color}
                                                                                                selected={false}
                                                                                                onClick={() => {
                                                                                                    // Extract color name from hex
                                                                                                    const colorName =
                                                                                                        Object.entries({
                                                                                                            black: "#000000",
                                                                                                            white: "#FFFFFF",
                                                                                                            red: "#FF0000",
                                                                                                            green: "#00FF00",
                                                                                                            blue: "#0000FF",
                                                                                                            yellow: "#FFFF00",
                                                                                                            purple: "#800080",
                                                                                                            orange: "#FFA500",
                                                                                                            pink: "#FFC0CB",
                                                                                                            gray: "#808080",
                                                                                                        }).find(([_, hex]) => hex === color)?.[0] || color

                                                                                                    addAttributeValue(index, colorName)
                                                                                                }}
                                                                                            />
                                                                                        ))}
                                                                                    </div>
                                                                                    <div className="flex items-center gap-2">
                                                                                        <Input
                                                                                            type="color"
                                                                                            value={newColor}
                                                                                            onChange={(e) => setNewColor(e.target.value)}
                                                                                            className="w-10 h-10 p-1 bg-[#050A18] border-[#1E293B]"
                                                                                        />
                                                                                        <Input
                                                                                            value={newColor}
                                                                                            onChange={(e) => setNewColor(e.target.value)}
                                                                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                        />
                                                                                        <Button
                                                                                            type="button"
                                                                                            onClick={addColorToPalette}
                                                                                            className="bg-[#FF00E5] hover:bg-[#FF00E5]/90"
                                                                                        >
                                                                                            Add
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-8 border border-dashed border-[#1E293B] rounded-lg text-center">
                                                    <div className="mx-auto w-16 h-16 rounded-full bg-[#FF00E5]/10 flex items-center justify-center mb-4">
                                                        <Tag className="h-8 w-8 text-[#FF00E5]" />
                                                    </div>
                                                    <h3 className="text-lg font-medium mb-2">No Attributes Added Yet</h3>
                                                    <p className="text-sm text-[#A4B8D3] mb-4">
                                                        Add attributes like size, color, material, etc. to provide more information about your
                                                        product.
                                                    </p>
                                                    <Button
                                                        type="button"
                                                        onClick={addAttribute}
                                                        className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]"
                                                    >
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Add First Attribute
                                                    </Button>
                                                </div>
                                            )}

                                            {attributesFieldArray.fields.length > 0 && (
                                                <div className="flex justify-end">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                        onClick={() => {
                                                            // Convert attributes to variant options
                                                            const variationAttributes = form.getValues("attributes").filter((attr) => attr.variation)
                                                            if (variationAttributes.length > 0) {
                                                                form.setValue("hasVariants", true)

                                                                // Clear existing variant options
                                                                while (variantOptionsFieldArray.fields.length > 0) {
                                                                    variantOptionsFieldArray.remove(0)
                                                                }

                                                                // Add variation attributes as variant options
                                                                variationAttributes.forEach((attr) => {
                                                                    variantOptionsFieldArray.append({
                                                                        name: attr.name,
                                                                        values: attr.values,
                                                                        visible: attr.visible,
                                                                    })
                                                                })

                                                                setActiveTab("variants")
                                                                toast.success("Attributes converted to variant options")
                                                            } else {
                                                                toast.error("No attributes marked for variation")
                                                            }
                                                        }}
                                                    >
                                                        Convert to Variants
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Variants Tab */}
                                <TabsContent value="variants" className="w-full">
                                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle>Product Variants</CardTitle>
                                            <CardDescription className="text-[#A4B8D3]">
                                                Create variations of your product with different attributes
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="hasVariants"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} id="has-variants" />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>This product has multiple variants</FormLabel>
                                                            <FormDescription className="text-sm text-[#A4B8D3]">
                                                                Enable this to create variations like different sizes, colors, etc.
                                                            </FormDescription>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            {hasVariants && (
                                                <div className="space-y-6">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="font-medium">Variant Options</h3>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                onClick={addVariantOption}
                                                            >
                                                                <Plus className="h-4 w-4 mr-2" />
                                                                Add Option
                                                            </Button>
                                                        </div>

                                                        <div className="space-y-4">
                                                            {variantOptionsFieldArray.fields.map((field, index) => (
                                                                <div key={field.id} className="p-4 border border-[#1E293B] rounded-lg bg-[#050A18]">
                                                                    <div className="flex items-center justify-between mb-4">
                                                                        <FormField
                                                                            control={form.control}
                                                                            name={`variantOptions.${index}.name`}
                                                                            render={({ field }) => (
                                                                                <FormItem className="flex-1 mr-4">
                                                                                    <FormControl>
                                                                                        <Input
                                                                                            {...field}
                                                                                            placeholder="Option name (e.g., Size, Color)"
                                                                                            className="bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                        />
                                                                                    </FormControl>
                                                                                    <FormMessage />
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                        <div className="flex items-center gap-2">
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`variantOptions.${index}.visible`}
                                                                                render={({ field }) => (
                                                                                    <FormItem className="flex items-center space-x-2">
                                                                                        <FormControl>
                                                                                            <Switch
                                                                                                checked={field.value}
                                                                                                onCheckedChange={field.onChange}
                                                                                                className="data-[state=checked]:bg-[#FF00E5]"
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormLabel className="text-sm">Visible</FormLabel>
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="text-[#A4B8D3] hover:text-white hover:bg-transparent"
                                                                                onClick={() => variantOptionsFieldArray.remove(index)}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-2">
                                                                        <Label>Option Values</Label>
                                                                        <div className="flex flex-wrap gap-2 mb-2">
                                                                            {form.getValues(`variantOptions.${index}.values`)?.map((value, valueIndex) => (
                                                                                <div
                                                                                    key={valueIndex}
                                                                                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF00E5]/10 text-[#FF00E5] text-sm"
                                                                                >
                                                                                    <span>{value}</span>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => removeOptionValue(index, valueIndex)}
                                                                                        className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#FF00E5]/20"
                                                                                    >
                                                                                        ×
                                                                                    </button>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            <Popover
                                                                                open={selectedOptionIndex === index}
                                                                                onOpenChange={(open) => {
                                                                                    if (open) {
                                                                                        setSelectedOptionIndex(index)
                                                                                    } else {
                                                                                        setSelectedOptionIndex(null)
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <PopoverTrigger asChild>
                                                                                    <Button
                                                                                        type="button"
                                                                                        variant="outline"
                                                                                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                                    >
                                                                                        <Plus className="h-4 w-4 mr-2" />
                                                                                        Add Value
                                                                                    </Button>
                                                                                </PopoverTrigger>
                                                                                <PopoverContent className="w-80 bg-[#0A1228] border-[#1E293B] p-4">
                                                                                    <div className="space-y-2">
                                                                                        <h4 className="font-medium text-white">Add Option Value</h4>
                                                                                        <div className="flex gap-2">
                                                                                            <Input
                                                                                                placeholder="Enter value"
                                                                                                value={newOptionValue}
                                                                                                onChange={(e) => setNewOptionValue(e.target.value)}
                                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                onKeyDown={(e) => {
                                                                                                    if (e.key === "Enter") {
                                                                                                        e.preventDefault()
                                                                                                        addOptionValue(index)
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <Button
                                                                                                type="button"
                                                                                                onClick={() => addOptionValue(index)}
                                                                                                className="bg-[#FF00E5] hover:bg-[#FF00E5]/90"
                                                                                            >
                                                                                                Add
                                                                                            </Button>
                                                                                        </div>
                                                                                    </div>
                                                                                </PopoverContent>
                                                                            </Popover>

                                                                            {field.name?.toLowerCase() === "color" && (
                                                                                <Popover>
                                                                                    <PopoverTrigger asChild>
                                                                                        <Button
                                                                                            type="button"
                                                                                            variant="outline"
                                                                                            className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                                        >
                                                                                            <Palette className="h-4 w-4 mr-2" />
                                                                                            Add Color
                                                                                        </Button>
                                                                                    </PopoverTrigger>
                                                                                    <PopoverContent className="w-80 bg-[#0A1228] border-[#1E293B] p-4">
                                                                                        <div className="space-y-4">
                                                                                            <h4 className="font-medium text-white">Select Color</h4>
                                                                                            <div className="grid grid-cols-5 gap-2">
                                                                                                {colorPalette.map((color) => (
                                                                                                    <ColorSwatch
                                                                                                        key={color}
                                                                                                        color={color}
                                                                                                        selected={false}
                                                                                                        onClick={() => {
                                                                                                            // Extract color name from hex
                                                                                                            const colorName =
                                                                                                                Object.entries({
                                                                                                                    black: "#000000",
                                                                                                                    white: "#FFFFFF",
                                                                                                                    red: "#FF0000",
                                                                                                                    green: "#00FF00",
                                                                                                                    blue: "#0000FF",
                                                                                                                    yellow: "#FFFF00",
                                                                                                                    purple: "#800080",
                                                                                                                    orange: "#FFA500",
                                                                                                                    pink: "#FFC0CB",
                                                                                                                    gray: "#808080",
                                                                                                                }).find(([_, hex]) => hex === color)?.[0] || color

                                                                                                            const currentValues =
                                                                                                                form.getValues(`variantOptions.${index}.values`) || []
                                                                                                            if (!currentValues.includes(colorName)) {
                                                                                                                form.setValue(`variantOptions.${index}.values`, [
                                                                                                                    ...currentValues,
                                                                                                                    colorName,
                                                                                                                ])
                                                                                                            }
                                                                                                        }}
                                                                                                    />
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    </PopoverContent>
                                                                                </Popover>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {variantOptionsFieldArray.fields.length > 0 && (
                                                            <div className="flex justify-end">
                                                                <Button
                                                                    type="button"
                                                                    onClick={generateVariants}
                                                                    disabled={isGeneratingVariants}
                                                                    className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]"
                                                                >
                                                                    {isGeneratingVariants && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                                                    Generate Variants
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {variants.length > 0 && (
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="font-medium">Variant List</h3>
                                                                <div className="flex items-center gap-2">
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                        onClick={() => setShowVariantBulkEditor(true)}
                                                                    >
                                                                        Bulk Edit
                                                                    </Button>
                                                                    <FormField
                                                                        control={form.control}
                                                                        name="variantDisplay"
                                                                        render={({ field }) => (
                                                                            <FormItem>
                                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                                    <FormControl>
                                                                                        <SelectTrigger className="w-[180px] bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                                            <SelectValue placeholder="Display as" />
                                                                                        </SelectTrigger>
                                                                                    </FormControl>
                                                                                    <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                                        <SelectItem value="dropdown">Dropdown</SelectItem>
                                                                                        <SelectItem value="buttons">Buttons</SelectItem>
                                                                                        <SelectItem value="swatches">Color Swatches</SelectItem>
                                                                                        <SelectItem value="grid">Grid</SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                                <FormMessage />
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="border border-[#1E293B] rounded-lg overflow-hidden">
                                                                <ScrollArea className="h-[500px]">
                                                                    <Table>
                                                                        <TableHeader className="bg-[#0A1228]">
                                                                            <TableRow className="hover:bg-[#0A1228]/80 border-b-[#1E293B]">
                                                                                <TableHead className="text-[#A4B8D3] font-medium">Variant</TableHead>
                                                                                <TableHead className="text-[#A4B8D3] font-medium">SKU</TableHead>
                                                                                <TableHead className="text-[#A4B8D3] font-medium">Price</TableHead>
                                                                                <TableHead className="text-[#A4B8D3] font-medium">Stock</TableHead>
                                                                                <TableHead className="text-[#A4B8D3] font-medium">Status</TableHead>
                                                                                <TableHead className="text-[#A4B8D3] font-medium text-right">Actions</TableHead>
                                                                            </TableRow>
                                                                        </TableHeader>
                                                                        <TableBody>
                                                                            {variantsFieldArray.fields.map((field, index) => (
                                                                                <TableRow key={field.id} className="hover:bg-[#0A1228]/80 border-b-[#1E293B]">
                                                                                    <TableCell>
                                                                                        <div className="font-medium">
                                                                                            {formatVariantName(form.getValues(`variants.${index}`))}
                                                                                        </div>
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        <FormField
                                                                                            control={form.control}
                                                                                            name={`variants.${index}.sku`}
                                                                                            render={({ field }) => (
                                                                                                <FormItem>
                                                                                                    <FormControl>
                                                                                                        <Input
                                                                                                            {...field}
                                                                                                            placeholder="SKU"
                                                                                                            className="h-8 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                        />
                                                                                                    </FormControl>
                                                                                                </FormItem>
                                                                                            )}
                                                                                        />
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        <FormField
                                                                                            control={form.control}
                                                                                            name={`variants.${index}.price`}
                                                                                            render={({ field }) => (
                                                                                                <FormItem>
                                                                                                    <FormControl>
                                                                                                        <div className="relative">
                                                                                                            <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[#A4B8D3]" />
                                                                                                            <Input
                                                                                                                {...field}
                                                                                                                type="number"
                                                                                                                step="0.01"
                                                                                                                placeholder="0.00"
                                                                                                                className="h-8 pl-7 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                            />
                                                                                                        </div>
                                                                                                    </FormControl>
                                                                                                </FormItem>
                                                                                            )}
                                                                                        />
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        <FormField
                                                                                            control={form.control}
                                                                                            name={`variants.${index}.stockQuantity`}
                                                                                            render={({ field }) => (
                                                                                                <FormItem>
                                                                                                    <FormControl>
                                                                                                        <Input
                                                                                                            {...field}
                                                                                                            type="number"
                                                                                                            placeholder="0"
                                                                                                            className="h-8 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                        />
                                                                                                    </FormControl>
                                                                                                </FormItem>
                                                                                            )}
                                                                                        />
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        <FormField
                                                                                            control={form.control}
                                                                                            name={`variants.${index}.isEnabled`}
                                                                                            render={({ field }) => (
                                                                                                <FormItem>
                                                                                                    <FormControl>
                                                                                                        <div className="flex items-center">
                                                                                                            <Switch
                                                                                                                checked={field.value}
                                                                                                                onCheckedChange={field.onChange}
                                                                                                                className="data-[state=checked]:bg-[#FF00E5] border border-white"
                                                                                                            />
                                                                                                            <span className="ml-2 text-sm">
                                                                                                                {field.value ? (
                                                                                                                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20">
                                                                                                                        Active
                                                                                                                    </Badge>
                                                                                                                ) : (
                                                                                                                    <Badge
                                                                                                                        variant="outline"
                                                                                                                        className="text-[#A4B8D3] border-[#1E293B]"
                                                                                                                    >
                                                                                                                        Disabled
                                                                                                                    </Badge>
                                                                                                                )}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </FormControl>
                                                                                                </FormItem>
                                                                                            )}
                                                                                        />
                                                                                    </TableCell>
                                                                                    <TableCell className="text-right">
                                                                                        <div className="flex justify-end gap-2">
                                                                                            <Button
                                                                                                type="button"
                                                                                                variant="ghost"
                                                                                                size="icon"
                                                                                                className="h-8 w-8 text-[#A4B8D3] hover:text-white hover:bg-transparent"
                                                                                                onClick={() => {
                                                                                                    setSelectedVariantIndex(index)
                                                                                                }}
                                                                                            >
                                                                                                <Eye className="h-4 w-4" />
                                                                                            </Button>
                                                                                            <Button
                                                                                                type="button"
                                                                                                variant="ghost"
                                                                                                size="icon"
                                                                                                className="h-8 w-8 text-[#A4B8D3] hover:text-white hover:bg-transparent"
                                                                                                onClick={() => duplicateVariant(index)}
                                                                                            >
                                                                                                <Copy className="h-4 w-4" />
                                                                                            </Button>
                                                                                            <Button
                                                                                                type="button"
                                                                                                variant="ghost"
                                                                                                size="icon"
                                                                                                className="h-8 w-8 text-[#A4B8D3] hover:text-white hover:bg-transparent"
                                                                                                onClick={() => variantsFieldArray.remove(index)}
                                                                                            >
                                                                                                <Trash2 className="h-4 w-4" />
                                                                                            </Button>
                                                                                        </div>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </ScrollArea>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {variantOptionsFieldArray.fields.length > 0 && variants.length === 0 && (
                                                        <div className="p-8 border border-dashed border-[#1E293B] rounded-lg text-center">
                                                            <AlertCircle className="h-12 w-12 text-[#FF00E5] mx-auto mb-4" />
                                                            <h3 className="text-lg font-medium mb-2">No Variants Generated Yet</h3>
                                                            <p className="text-sm text-[#A4B8D3] mb-4">
                                                                Add values to your options and click "Generate Variants" to create all possible
                                                                combinations.
                                                            </p>
                                                            <Button
                                                                type="button"
                                                                onClick={generateVariants}
                                                                className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_10px_rgba(255,61,0,0.3)]"
                                                                disabled={variantOptionsFieldArray.fields.some(
                                                                    (_, i) => !form.getValues(`variantOptions.${i}.values`)?.length,
                                                                )}
                                                            >
                                                                Generate Variants
                                                            </Button>
                                                        </div>
                                                    )}

                                                    {/* Variant Bulk Editor Dialog */}
                                                    <Dialog open={showVariantBulkEditor} onOpenChange={setShowVariantBulkEditor}>
                                                        <DialogContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                            <DialogHeader>
                                                                <DialogTitle>Bulk Edit Variants</DialogTitle>
                                                                <DialogDescription className="text-[#A4B8D3]">
                                                                    Apply changes to all variants at once
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-4">
                                                                <div className="space-y-2">
                                                                    <Label>Select Field to Edit</Label>
                                                                    <Select value={bulkEditField} onValueChange={setBulkEditField}>
                                                                        <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                            <SelectValue placeholder="Select field" />
                                                                        </SelectTrigger>
                                                                        <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                            <SelectItem value="price">Price</SelectItem>
                                                                            <SelectItem value="compareAtPrice">Compare At Price</SelectItem>
                                                                            <SelectItem value="costPrice">Cost Price</SelectItem>
                                                                            <SelectItem value="stockQuantity">Stock Quantity</SelectItem>
                                                                            <SelectItem value="weight">Weight</SelectItem>
                                                                            <SelectItem value="dimensions.length">Length</SelectItem>
                                                                            <SelectItem value="dimensions.width">Width</SelectItem>
                                                                            <SelectItem value="dimensions.height">Height</SelectItem>
                                                                            <SelectItem value="lowStockThreshold">Low Stock Threshold</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <Label>New Value</Label>
                                                                    <Input
                                                                        type="number"
                                                                        value={bulkEditValue}
                                                                        onChange={(e) => setBulkEditValue(e.target.value)}
                                                                        step={
                                                                            bulkEditField === "price" ||
                                                                                bulkEditField === "compareAtPrice" ||
                                                                                bulkEditField === "costPrice"
                                                                                ? "0.01"
                                                                                : "1"
                                                                        }
                                                                        placeholder="Enter value"
                                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                    />
                                                                </div>

                                                                <div className="flex justify-end gap-2">
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                        onClick={() => setShowVariantBulkEditor(false)}
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        className="bg-[#FF00E5] hover:bg-[#FF00E5]/90"
                                                                        onClick={() => bulkEditVariants(bulkEditField, Number(bulkEditValue))}
                                                                    >
                                                                        Apply to All Variants
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    {/* Variant Detail Dialog */}
                                                    <Dialog
                                                        open={selectedVariantIndex !== null}
                                                        onOpenChange={(open) => !open && setSelectedVariantIndex(null)}
                                                    >
                                                        {selectedVariantIndex !== null && (
                                                            <DialogContent className="bg-[#0A1228] border-[#1E293B] text-white max-w-4xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        {formatVariantName(form.getValues(`variants.${selectedVariantIndex}`))}
                                                                    </DialogTitle>
                                                                    <DialogDescription className="text-[#A4B8D3]">
                                                                        Edit detailed variant information
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-4">
                                                                    <Tabs defaultValue="details">
                                                                        <TabsList className="bg-[#050A18] border border-[#1E293B]">
                                                                            <TabsTrigger
                                                                                value="details"
                                                                                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                                                            >
                                                                                Details
                                                                            </TabsTrigger>
                                                                            <TabsTrigger
                                                                                value="pricing"
                                                                                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                                                            >
                                                                                Pricing
                                                                            </TabsTrigger>
                                                                            <TabsTrigger
                                                                                value="inventory"
                                                                                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                                                            >
                                                                                Inventory
                                                                            </TabsTrigger>
                                                                            <TabsTrigger
                                                                                value="dimensions"
                                                                                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                                                            >
                                                                                Dimensions
                                                                            </TabsTrigger>
                                                                            <TabsTrigger
                                                                                value="images"
                                                                                className="data-[state=active]:bg-[#FF00E5]/10 data-[state=active]:text-[#FF00E5]"
                                                                            >
                                                                                Images
                                                                            </TabsTrigger>
                                                                        </TabsList>
                                                                        <TabsContent value="details" className="space-y-4 pt-4">
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variants.${selectedVariantIndex}.sku`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>SKU</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    placeholder="SKU"
                                                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variants.${selectedVariantIndex}.barcode`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Barcode</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    placeholder="Barcode"
                                                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`variants.${selectedVariantIndex}.isEnabled`}
                                                                                render={({ field }) => (
                                                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 border border-[#1E293B] bg-[#050A18]">
                                                                                        <div className="space-y-0.5">
                                                                                            <FormLabel className="text-base">Variant Status</FormLabel>
                                                                                            <FormDescription className="text-sm text-[#A4B8D3]">
                                                                                                Enable or disable this variant
                                                                                            </FormDescription>
                                                                                        </div>
                                                                                        <FormControl>
                                                                                            <Switch
                                                                                                checked={field.value}
                                                                                                onCheckedChange={field.onChange}
                                                                                                className="data-[state=checked]:bg-[#FF00E5]"
                                                                                            />
                                                                                        </FormControl>
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </TabsContent>
                                                                        <TabsContent value="pricing" className="space-y-4 pt-4">
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variants.${selectedVariantIndex}.price`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Price ($)</FormLabel>
                                                                                            <FormControl>
                                                                                                <div className="relative">
                                                                                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                                                                                                    <Input
                                                                                                        {...field}
                                                                                                        type="number"
                                                                                                        step="0.01"
                                                                                                        placeholder="0.00"
                                                                                                        className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                    />
                                                                                                </div>
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variants.${selectedVariantIndex}.compareAtPrice`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Compare At Price ($)</FormLabel>
                                                                                            <FormControl>
                                                                                                <div className="relative">
                                                                                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                                                                                                    <Input
                                                                                                        {...field}
                                                                                                        type="number"
                                                                                                        step="0.01"
                                                                                                        placeholder="0.00"
                                                                                                        className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                    />
                                                                                                </div>
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`variants.${selectedVariantIndex}.costPrice`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>Cost Price ($)</FormLabel>
                                                                                        <FormControl>
                                                                                            <div className="relative">
                                                                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    type="number"
                                                                                                    step="0.01"
                                                                                                    placeholder="0.00"
                                                                                                    className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </div>
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </TabsContent>
                                                                        <TabsContent value="inventory" className="space-y-4 pt-4">
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variants.${selectedVariantIndex}.stockQuantity`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Stock Quantity</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    type="number"
                                                                                                    placeholder="0"
                                                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variants.${selectedVariantIndex}.lowStockThreshold`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Low Stock Threshold</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    type="number"
                                                                                                    placeholder="5"
                                                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`variants.${selectedVariantIndex}.allowBackorders`}
                                                                                render={({ field }) => (
                                                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                                        <FormControl>
                                                                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                                        </FormControl>
                                                                                        <div className="space-y-1 leading-none">
                                                                                            <FormLabel>Allow backorders for this variant</FormLabel>
                                                                                        </div>
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                            {form.getValues(`variants.${selectedVariantIndex}.allowBackorders`) && (
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variants.${selectedVariantIndex}.backorderLimit`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Backorder Limit (0 for unlimited)</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    type="number"
                                                                                                    placeholder="0"
                                                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                            )}
                                                                        </TabsContent>
                                                                        <TabsContent value="dimensions" className="space-y-4 pt-4">
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`variants.${selectedVariantIndex}.weight`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>Weight (kg)</FormLabel>
                                                                                        <FormControl>
                                                                                            <Input
                                                                                                {...field}
                                                                                                type="number"
                                                                                                step="0.01"
                                                                                                placeholder="0.00"
                                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variants.${selectedVariantIndex}.dimensions.length`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Length (cm)</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    type="number"
                                                                                                    step="0.01"
                                                                                                    placeholder="0.00"
                                                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variants.${selectedVariantIndex}.dimensions.width`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Width (cm)</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    type="number"
                                                                                                    step="0.01"
                                                                                                    placeholder="0.00"
                                                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variants.${selectedVariantIndex}.dimensions.height`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Height (cm)</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    type="number"
                                                                                                    step="0.01"
                                                                                                    placeholder="0.00"
                                                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                        </TabsContent>
                                                                        <TabsContent value="images" className="space-y-4 pt-4">
                                                                            <div className="space-y-4">
                                                                                <h4 className="font-medium">Variant Images</h4>
                                                                                <p className="text-sm text-[#A4B8D3]">
                                                                                    Select images from your media library to associate with this variant
                                                                                </p>

                                                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                                    {media.map(
                                                                                        (item, index) =>
                                                                                            item.type === "image" && (
                                                                                                <div
                                                                                                    key={item.id}
                                                                                                    className="relative group border border-[#1E293B] rounded-lg overflow-hidden"
                                                                                                >
                                                                                                    <img
                                                                                                        src={item.url || "/placeholder.svg"}
                                                                                                        alt={item.alt || `Product media ${index + 1}`}
                                                                                                        className="w-full h-24 object-cover"
                                                                                                    />
                                                                                                    <div className="absolute inset-0 bg-[#050A18]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                                                        <Checkbox
                                                                                                            checked={item.variantIds?.includes(
                                                                                                                form.getValues(`variants.${selectedVariantIndex}.id`) || "",
                                                                                                            )}
                                                                                                            onCheckedChange={() => {
                                                                                                                associateMediaWithVariant(
                                                                                                                    item.id,
                                                                                                                    form.getValues(`variants.${selectedVariantIndex}.id`) || "",
                                                                                                                )
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                    {item.variantIds?.includes(
                                                                                                        form.getValues(`variants.${selectedVariantIndex}.id`) || "",
                                                                                                    ) && (
                                                                                                            <div className="absolute top-2 right-2 bg-[#FF00E5] text-white text-xs px-2 py-1 rounded">
                                                                                                                Selected
                                                                                                            </div>
                                                                                                        )}
                                                                                                </div>
                                                                                            ),
                                                                                    )}
                                                                                </div>

                                                                                <Button
                                                                                    type="button"
                                                                                    variant="outline"
                                                                                    className="w-full border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                                    onClick={() => {
                                                                                        setShowMediaLibrary(true)
                                                                                    }}
                                                                                >
                                                                                    <ImageIcon className="h-4 w-4 mr-2" />
                                                                                    Browse Media Library
                                                                                </Button>
                                                                            </div>
                                                                        </TabsContent>
                                                                    </Tabs>
                                                                </div>
                                                                <div className="flex justify-end gap-2">
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                        onClick={() => setSelectedVariantIndex(null)}
                                                                    >
                                                                        Close
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        className="bg-[#FF00E5] hover:bg-[#FF00E5]/90"
                                                                        onClick={() => {
                                                                            toast.success("Variant updated")
                                                                            setSelectedVariantIndex(null)
                                                                        }}
                                                                    >
                                                                        Save Changes
                                                                    </Button>
                                                                </div>
                                                            </DialogContent>
                                                        )}
                                                    </Dialog>
                                                </div>
                                            )}

                                            {!hasVariants && (
                                                <div className="p-8 border border-dashed border-[#1E293B] rounded-lg text-center">
                                                    <h3 className="text-lg font-medium mb-2">No Variants</h3>
                                                    <p className="text-sm text-[#A4B8D3] mb-4">
                                                        Enable variants to create different versions of this product with unique attributes like
                                                        size, color, etc.
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Shipping Tab */}
                                <TabsContent value="shipping" className="w-full">
                                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                                        <CardHeader>
                                            <CardTitle>Shipping Information</CardTitle>
                                            <CardDescription className="text-[#A4B8D3]">
                                                Configure shipping options for this product
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="isPhysical"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                    id="physical-product"
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel>This is a physical product that requires shipping</FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                {isPhysical && (
                                                    <>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="shippingWeight"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Weight (kg)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="number"
                                                                                step="0.01"
                                                                                placeholder="0.00"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="shippingLength"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Length (cm)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="number"
                                                                                step="0.01"
                                                                                placeholder="0.00"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="shippingWidth"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Width (cm)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="number"
                                                                                step="0.01"
                                                                                placeholder="0.00"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name="shippingHeight"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Height (cm)</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="number"
                                                                                step="0.01"
                                                                                placeholder="0.00"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="shippingClass"
                                                                render={({ field }) => (
                                                                    <FormItem className="md:col-span-2">
                                                                        <FormLabel>Shipping Class</FormLabel>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <FormControl>
                                                                                <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                                    <SelectValue placeholder="Select shipping class" />
                                                                                </SelectTrigger>
                                                                            </FormControl>
                                                                            <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                                <SelectItem value="standard">Standard</SelectItem>
                                                                                <SelectItem value="express">Express</SelectItem>
                                                                                <SelectItem value="bulky">Bulky Items</SelectItem>
                                                                                <SelectItem value="fragile">Fragile</SelectItem>
                                                                                <SelectItem value="hazardous">Hazardous Materials</SelectItem>
                                                                                <SelectItem value="perishable">Perishable</SelectItem>
                                                                                <SelectItem value="international">International</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    </>
                                                )}

                                                {!isPhysical && (
                                                    <Alert className="bg-[#FF00E5]/10 border-[#FF00E5]/30 text-[#FF00E5]">
                                                        <AlertTriangle className="h-4 w-4" />
                                                        <AlertDescription>
                                                            This product is marked as non-physical (digital or service) and does not require shipping.
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>

                                            <Separator className="bg-[#1E293B]" />

                                            <div className="space-y-4">
                                                <h3 className="font-medium">Shipping Restrictions</h3>

                                                <FormField
                                                    control={form.control}
                                                    name="shippingRestrictions"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Countries Not Allowed for Shipping</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="bg-[#050A18] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                        <SelectValue placeholder="Select countries" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                    <SelectItem value="none">No Restrictions</SelectItem>
                                                                    <SelectItem value="custom">Custom Selection</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="freeShipping"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} id="free-shipping" />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel>This product qualifies for free shipping</FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="requiresShippingAddress"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel>Require shipping address at checkout</FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="shippingMarkup"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Additional Shipping Fee ($)</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A4B8D3]" />
                                                                    <Input
                                                                        {...field}
                                                                        type="number"
                                                                        step="0.01"
                                                                        placeholder="0.00"
                                                                        className="pl-10 bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormDescription className="text-xs text-[#A4B8D3]">
                                                                Additional fee to add to standard shipping rates for this product
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* SEO Tab */}
                                <TabsContent value="seo" className="w-full">
                                    <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Search Engine Optimization</CardTitle>
                                                    <CardDescription className="text-[#A4B8D3]">
                                                        Optimize your product for search engines
                                                    </CardDescription>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                    onClick={generateSEOFields}
                                                >
                                                    Auto-Generate
                                                </Button>
                                            </div>
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
                                                                The title that appears in search engine results (Recommended: 50-60 characters)
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
                                                                    className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-xs text-[#A4B8D3]">
                                                                The description that appears in search engine results (Recommended: 150-160 characters)
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
                                                                    placeholder="keyword1, keyword2, keyword3"
                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-xs text-[#A4B8D3]">
                                                                Comma-separated keywords related to your product
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <Separator className="bg-[#1E293B]" />

                                            <div className="space-y-4">
                                                <h3 className="font-medium">URL Settings</h3>

                                                <FormField
                                                    control={form.control}
                                                    name="slug"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>URL Slug</FormLabel>
                                                            <div className="flex gap-2">
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="product-url-slug"
                                                                        className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                    onClick={generateSlug}
                                                                >
                                                                    <LinkIcon className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                            <FormDescription className="text-xs text-[#A4B8D3]">
                                                                The URL-friendly name that appears in the product URL
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="canonicalUrl"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Canonical URL</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    placeholder="https://example.com/products/product-name"
                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-xs text-[#A4B8D3]">
                                                                The preferred URL for this product (leave empty to use the default URL)
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <Separator className="bg-[#1E293B]" />

                                            <div className="space-y-4">
                                                <h3 className="font-medium">Social Media</h3>

                                                <FormField
                                                    control={form.control}
                                                    name="ogTitle"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Open Graph Title</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    placeholder="Enter title for social media"
                                                                    className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-xs text-[#A4B8D3]">
                                                                The title that appears when shared on social media
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="ogDescription"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Open Graph Description</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    {...field}
                                                                    placeholder="Enter description for social media"
                                                                    className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                />
                                                            </FormControl>
                                                            <FormDescription className="text-xs text-[#A4B8D3]">
                                                                The description that appears when shared on social media
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="ogImage"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Open Graph Image</FormLabel>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                <div className="md:col-span-2">
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Enter image URL or select from media"
                                                                            className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                        />
                                                                    </FormControl>
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                    onClick={() => setShowMediaLibrary(true)}
                                                                >
                                                                    <ImageIcon className="h-4 w-4 mr-2" />
                                                                    Select Image
                                                                </Button>
                                                            </div>
                                                            <FormDescription className="text-xs text-[#A4B8D3]">
                                                                The image that appears when shared on social media (Recommended: 1200 x 630 pixels)
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="p-4 border border-[#1E293B] rounded-lg bg-[#050A18]">
                                                <h4 className="font-medium mb-2">SEO Preview</h4>
                                                <div className="space-y-2">
                                                    <div className="text-blue-500 text-lg font-medium">
                                                        {form.watch("metaTitle") || "Product Title"}
                                                    </div>
                                                    <div className="text-green-500 text-sm">
                                                        {`https://example.com/products/${form.watch("slug") || "product-slug"}`}
                                                    </div>
                                                    <div className="text-[#A4B8D3] text-sm">
                                                        {form.watch("metaDescription") ||
                                                            "Product description will appear here. Make sure to provide a compelling description that encourages clicks."}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Advanced Tab */}
                                {isAdvancedMode && (
                                    <TabsContent value="advanced" className="w-full">
                                        <Card className="bg-[#0A1228]/80 border-[#1E293B] backdrop-blur-sm">
                                            <CardHeader>
                                                <CardTitle>Advanced Settings</CardTitle>
                                                <CardDescription className="text-[#A4B8D3]">
                                                    Configure additional product settings
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="space-y-4">
                                                    <h3 className="font-medium">Purchase Notes</h3>
                                                    <FormField
                                                        control={form.control}
                                                        name="purchaseNote"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Purchase Note</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        {...field}
                                                                        placeholder="Enter a note that will be sent to customers after purchase"
                                                                        className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <Separator className="bg-[#1E293B]" />

                                                <div className="space-y-4">
                                                    <h3 className="font-medium">Reviews</h3>
                                                    <FormField
                                                        control={form.control}
                                                        name="enableReviews"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>Enable customer reviews for this product</FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <Separator className="bg-[#1E293B]" />

                                                <div className="space-y-4">
                                                    <h3 className="font-medium">Downloadable Product</h3>
                                                    <FormField
                                                        control={form.control}
                                                        name="downloadable"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>This product has downloadable files</FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {downloadable && (
                                                        <div className="space-y-4 pl-7">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="text-sm font-medium">Downloadable Files</h4>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                    onClick={() => {
                                                                        downloadFilesFieldArray.append({
                                                                            name: "",
                                                                            url: "",
                                                                            downloadLimit: 0,
                                                                        })
                                                                    }}
                                                                >
                                                                    <Plus className="h-4 w-4 mr-2" />
                                                                    Add File
                                                                </Button>
                                                            </div>

                                                            {downloadFilesFieldArray.fields.length > 0 ? (
                                                                <div className="space-y-4">
                                                                    {downloadFilesFieldArray.fields.map((field, index) => (
                                                                        <div key={field.id} className="p-4 border border-[#1E293B] rounded-lg bg-[#050A18]">
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`downloadFiles.${index}.name`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>File Name</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    placeholder="Enter file name"
                                                                                                    className="bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`downloadFiles.${index}.url`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>File URL</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    placeholder="Enter file URL"
                                                                                                    className="bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            <div className="flex items-center justify-between mt-4">
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`downloadFiles.${index}.downloadLimit`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem className="flex-1">
                                                                                            <FormLabel>Download Limit (0 for unlimited)</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    type="number"
                                                                                                    placeholder="0"
                                                                                                    className="bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-8 w-8 mt-6 text-[#A4B8D3] hover:text-white hover:bg-transparent"
                                                                                    onClick={() => downloadFilesFieldArray.remove(index)}
                                                                                >
                                                                                    <Trash2 className="h-4 w-4" />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="p-4 border border-dashed border-[#1E293B] rounded-lg text-center">
                                                                    <p className="text-sm text-[#A4B8D3]">No downloadable files added yet</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <Separator className="bg-[#1E293B]" />

                                                <div className="space-y-4">
                                                    <h3 className="font-medium">Pre-Order</h3>
                                                    <FormField
                                                        control={form.control}
                                                        name="preOrderAvailable"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>This product is available for pre-order</FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {preOrderAvailable && (
                                                        <div className="space-y-4 pl-7">
                                                            <FormField
                                                                control={form.control}
                                                                name="preOrderReleaseDate"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Release Date</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                {...field}
                                                                                type="datetime-local"
                                                                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name="preOrderMessage"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Pre-Order Message</FormLabel>
                                                                        <FormControl>
                                                                            <Textarea
                                                                                {...field}
                                                                                placeholder="This item is available for pre-order and will ship on the release date."
                                                                                className="min-h-[80px] bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <Separator className="bg-[#1E293B]" />

                                                <div className="space-y-4">
                                                    <h3 className="font-medium">Customizable Product</h3>
                                                    <FormField
                                                        control={form.control}
                                                        name="customizable"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>This product can be customized by customers</FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {customizable && (
                                                        <div className="space-y-4 pl-7">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="text-sm font-medium">Customization Options</h4>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                                                    onClick={() => {
                                                                        customizationOptionsFieldArray.append({
                                                                            name: "",
                                                                            type: "text",
                                                                            required: false,
                                                                            options: [],
                                                                            priceModifier: 0,
                                                                        })
                                                                    }}
                                                                >
                                                                    <Plus className="h-4 w-4 mr-2" />
                                                                    Add Option
                                                                </Button>
                                                            </div>

                                                            {customizationOptionsFieldArray.fields.length > 0 ? (
                                                                <div className="space-y-4">
                                                                    {customizationOptionsFieldArray.fields.map((field, index) => (
                                                                        <div key={field.id} className="p-4 border border-[#1E293B] rounded-lg bg-[#050A18]">
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`customizationOptions.${index}.name`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Option Name</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    placeholder="Enter option name"
                                                                                                    className="bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`customizationOptions.${index}.type`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Option Type</FormLabel>
                                                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                                                <FormControl>
                                                                                                    <SelectTrigger className="bg-[#0A1228] border-[#1E293B] text-white focus:ring-[#FF00E5]">
                                                                                                        <SelectValue placeholder="Select option type" />
                                                                                                    </SelectTrigger>
                                                                                                </FormControl>
                                                                                                <SelectContent className="bg-[#0A1228] border-[#1E293B] text-white">
                                                                                                    <SelectItem value="text">Text</SelectItem>
                                                                                                    <SelectItem value="select">Dropdown</SelectItem>
                                                                                                    <SelectItem value="checkbox">Checkbox</SelectItem>
                                                                                                    <SelectItem value="file">File Upload</SelectItem>
                                                                                                </SelectContent>
                                                                                            </Select>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                            <div className="flex items-center justify-between mt-4">
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`customizationOptions.${index}.required`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem className="flex items-center space-x-2">
                                                                                            <FormControl>
                                                                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                                            </FormControl>
                                                                                            <FormLabel>Required</FormLabel>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`customizationOptions.${index}.priceModifier`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Price Modifier ($)</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input
                                                                                                    {...field}
                                                                                                    type="number"
                                                                                                    step="0.01"
                                                                                                    placeholder="0.00"
                                                                                                    className="w-32 bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                                                                                                />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <Button
                                                                                    type="button"
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-8 w-8 mt-6 text-[#A4B8D3] hover:text-white hover:bg-transparent"
                                                                                    onClick={() => customizationOptionsFieldArray.remove(index)}
                                                                                >
                                                                                    <Trash2 className="h-4 w-4" />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="p-4 border border-dashed border-[#1E293B] rounded-lg text-center">
                                                                    <p className="text-sm text-[#A4B8D3]">No customization options added yet</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                )}
                            </Tabs>
                        </div>
                    </main>
                </form>
            </Form>

            {/* Custom Field Dialog */}
            <Dialog open={showCustomFieldDialog} onOpenChange={setShowCustomFieldDialog}>
                <DialogContent className="bg-[#0A1228] border-[#1E293B] text-white">
                    <DialogHeader>
                        <DialogTitle>Add Custom Field</DialogTitle>
                        <DialogDescription className="text-[#A4B8D3]">
                            Add a custom field to provide additional product information
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="custom-field-name">Field Name</Label>
                            <Input
                                id="custom-field-name"
                                value={newCustomField.name}
                                onChange={(e) => setNewCustomField({ ...newCustomField, name: e.target.value })}
                                placeholder="Enter field name"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="custom-field-value">Field Value</Label>
                            <Input
                                id="custom-field-value"
                                value={newCustomField.value || ""}
                                onChange={(e) => setNewCustomField({ ...newCustomField, value: e.target.value })}
                                placeholder="Enter field value"
                                className="bg-[#050A18] border-[#1E293B] text-white focus-visible:ring-[#FF00E5]"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="custom-field-visible"
                                checked={newCustomField.visible}
                                onCheckedChange={(checked) => setNewCustomField({ ...newCustomField, visible: !!checked })}
                            />
                            <Label htmlFor="custom-field-visible">Visible on product page</Label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-[#1E293B] text-[#A4B8D3] hover:bg-[#1E293B]/50"
                                onClick={() => setShowCustomFieldDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="button" className="bg-[#FF00E5] hover:bg-[#FF00E5]/90" onClick={addCustomField}>
                                Add Field
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProductForm