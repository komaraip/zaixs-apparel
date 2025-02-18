"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
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
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "create_at",
    header: "Created",
    cell: ({ row }) => formatDate(row.original.create_at),
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
    cell: ({ row }) => formatDate(row.original.updated_at),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="space-x-4 inline-flex">
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
