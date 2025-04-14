import { categoryFormSchema, CategoryFormValues, defaultProductValues } from "@/lib/db/schemas/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useForm } from "react-hook-form";

export function useCategoryForm(initialData: Category | null) {
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: initialData ? {
            ...initialData,
        } : defaultProductValues,
    });
    return form;
}