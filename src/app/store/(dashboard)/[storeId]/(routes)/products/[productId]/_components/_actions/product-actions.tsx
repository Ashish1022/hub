import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { colorPalette, newCustomField, setColorPalette, setNewCustomField, setShowColorPicker, setShowCustomFieldDialog } from "../_states/product-states";
import { Variant } from "../_types/product-types";

export const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
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
};

export const ColorSwatch = ({ color, selected, onClick }: { color: string; selected: string; onClick: () => void }) => {
  return (
    <div
      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selected ? "border-[#FF00E5]" : "border-transparent"}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  )
};

// export const addVariantOption = () => {
//   variantOptionsFieldArray.append({
//     name: "",
//     values: [],
//     visible: true,
//   })
// };

// export const addAttribute = () => {
//   attributesFieldArray.append({
//     name: "",
//     values: [],
//     visible: true,
//     variation: false,
//   })
// };

// export const addCustomField = () => {
//   if (!newCustomField.name) {
//     toast.error("Field name is required")
//     return
//   }

//   customFieldsFieldArray.append({
//     id: `field-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
//     name: newCustomField.name,
//     value: newCustomField.value || "",
//     visible: newCustomField.visible,
//   });

//   setNewCustomField({ name: "", value: "", visible: true })
//   setShowCustomFieldDialog(false)
// };

// export const addColorToPalette = () => {
//   if (!colorPalette.includes(newColor)) {
//     setColorPalette([...colorPalette, newColor])
//   }
//   setShowColorPicker(false)
// };

// export const formatVariantName = (variant: Variant) => {
//   if (!variant.options) return "Variant"

//   return Object.entries(variant.options)
//     .map(([key, value]) => `${value}`)
//     .join(" / ")
// };

// export const colorNameToHex = (colorName: string): string => {
//   const colorMap = {
//     black: "#000000",
//     white: "#FFFFFF",
//     red: "#FF0000",
//     green: "#00FF00",
//     blue: "#0000FF",
//     yellow: "#FFFF00",
//     purple: "#800080",
//     orange: "#FFA500",
//     pink: "#FFC0CB",
//     gray: "#808080",
//     brown: "#A52A2A",
//     navy: "#000080",
//     teal: "#008080",
//     maroon: "#800000",
//     olive: "#808000",
//   }

//   return colorMap[colorName.toLowerCase()] || colorName
// };

// export const generateSKU = (baseName: string, suffix = "") => {
//   const baseSlug = baseName
//       .replace(/[^\w\s]/gi, "")
//       .replace(/\s+/g, "-")
//       .toUpperCase()
//       .substring(0, 8)

//   const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()

//   return `${baseSlug}-${randomPart}${suffix ? `-${suffix}` : ""}`
// }
