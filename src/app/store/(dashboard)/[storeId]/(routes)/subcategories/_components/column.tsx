"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubCategoryColumn = {
    id: string;
    name: string;
    categoryName: string;
    createdAt: string;
}

export const columns: ColumnDef<SubCategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "categoryName",
        header: "Category",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]
