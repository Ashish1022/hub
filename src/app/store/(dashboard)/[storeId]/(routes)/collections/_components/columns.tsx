"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CollectionColumn = {
    id: string
    label: string
    seoTitle: string
    seoDescription: string
    createdAt: string
}

export const columns: ColumnDef<CollectionColumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "seoTitle",
        header: "seoTitle",
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
