import { defaultProductValues, subcategoryFormSchema, SubcategoryFormValues } from "@/lib/db/schemas/subcategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Subcategory } from "@prisma/client";
import { useForm } from "react-hook-form";

export function useSubcategoryForm(initialData: Subcategory | null) {
    const form = useForm<SubcategoryFormValues>({
        resolver: zodResolver(subcategoryFormSchema),
        defaultValues: initialData ? {
            ...initialData,
        } : defaultProductValues,
    });
    return form;
}