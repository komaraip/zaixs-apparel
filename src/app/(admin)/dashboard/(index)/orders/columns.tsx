"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { rupiahFormat } from "@/lib/utils"
import { StatusOrder } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"

type TProduct = {
  name: string
  image: string
}

export type TColumn = {
  id: number
  products: TProduct[]
  customer_name: string
  price: number
  status: StatusOrder
}

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: 'products',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Products
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({row}) => {
      const order = row.original

      return (
        <div className="flex flex-col gap-4 justify-start">
          {order.products.map((item, i) => (
            <div key={`${item.name + i}`} className="inline-flex items-center gap-5">
              <Image
						src={item.image}
						alt="Product"
						width={80}
						height={80}
					/>
					<span>{item.name}</span>
            </div>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: 'customer_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({row}) => rupiahFormat(row.original.price)
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status Order
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({row}) => {
      return (
        <Badge variant={row.original.status === "failed" ? "destructive" : "default"}>
          {row.original.status}
        </Badge>
      )
    }
  }
]