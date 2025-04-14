import { Heading } from "./heading"

interface SubcategoryFormHeaderProps {
  isEditing: boolean
}

export function SubcategoryFormHeader({ isEditing }: SubcategoryFormHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <Heading
          title={isEditing ? "Edit Subcategory" : "Add New Subcategory"}
          description={isEditing ? "Update an existing subcategory" : "Create a new product subcategory"}
          className="text-2xl font-bold bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] text-transparent bg-clip-text"
          descriptionClassName="text-[#A4B8D3]"
        />
      </div>
    </div>
  )
}

