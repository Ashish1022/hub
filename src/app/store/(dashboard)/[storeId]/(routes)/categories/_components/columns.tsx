"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
    id: string;
    name: string;
    collectionLabel: string
    createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "collectionLabel",
        header: "Collection",
        cell: ({ row }) => row.original.collectionLabel
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
