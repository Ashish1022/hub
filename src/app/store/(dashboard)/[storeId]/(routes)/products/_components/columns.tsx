"use client"

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ProductColumn = {
    id: string;
    name: string;
    image: string;
    category: string;
    status: string;
    inventory: number;
    price: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "image",
        header: "Image",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "inventory",
        header: "Inventory",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]