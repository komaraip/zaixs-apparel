"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/form-delete";

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString(undefined, options);
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="sm:flex"
        >
          ID
          <ArrowUpDown className="ml-0 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-0 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "create_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="sm:flex"
        >
          Created
          <ArrowUpDown className="ml-0 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatDate(row.original.create_at),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="space-x-2 sm:inline-flex">
          <Button size="sm" asChild>
            <div>
              <Link href={`/dashboard/categories/edit/${category.id}`}>
                <Edit className="w-4 h-4 mr-0" />
              </Link>
            </div>
          </Button>
          
          <FormDelete id={category.id} />
        </div>
      );
    },
  },
];
