import { Heading } from "./heading"

interface CategoryFormHeaderProps {
  isEditing: boolean
}

export function CategoryFormHeader({ isEditing }: CategoryFormHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <Heading
          title={isEditing ? "Edit Category" : "Add New Category"}
          description={isEditing ? "Update an existing category" : "Create a new product category"}
          className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text"
          descriptionClassName="text-[#A4B8D3]"
        />
      </div>
    </div>
  )
}

