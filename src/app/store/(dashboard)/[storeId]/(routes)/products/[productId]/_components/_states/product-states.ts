import { useState } from "react"
import { CustomField, MediaItem } from "../_types/product-types"

export const [open, setOpen] = useState(false)
export const [loading, setLoading] = useState(false)
export const [activeTab, setActiveTab] = useState("general")
export const [media, setMedia] = useState<MediaItem[]>([])
export const [tags, setTags] = useState<string[]>([])
export const [newTag, setNewTag] = useState("")
export const [newOptionValue, setNewOptionValue] = useState("")
export const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
export const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null)
export const [isGeneratingVariants, setIsGeneratingVariants] = useState(false)
export const [isAdvancedMode, setIsAdvancedMode] = useState(false)
export const [colorPalette, setColorPalette] = useState<string[]>([
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
export const [showVariantBulkEditor, setShowVariantBulkEditor] = useState(false)
export const [bulkEditField, setBulkEditField] = useState<string>("price")
export const [bulkEditValue, setBulkEditValue] = useState<string | number>("")
export const [previewMode, setPreviewMode] = useState(false)
export const [showMediaLibrary, setShowMediaLibrary] = useState(false)
export const [mediaSearchQuery, setMediaSearchQuery] = useState("")
export const [showColorPicker, setShowColorPicker] = useState(false)
export const [newColor, setNewColor] = useState("#000000")
export const [showCustomFieldDialog, setShowCustomFieldDialog] = useState(false)
export const [newCustomField, setNewCustomField] = useState<CustomField>({ name: "", value: "", visible: true })