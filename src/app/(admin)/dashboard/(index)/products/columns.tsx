"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase";
import { rupiahFormat } from "@/lib/utils";
import { ProductStock } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import FormDelete from "./_components/form-delete";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormProduct from "./_components/form-product";

export type TColumn = {
  id: number;
  name: string;
  image_url: string;
  category_name: string;
  brand_name: string;
  price: number;
  total_sales: number;
  stock: ProductStock;
  createdAt: Date;
  updatedAt: Date;
};

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString(undefined, options);
};

// ProductEditContent component for editing products
const ProductEditContent = ({ productId }: { productId: number }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data and supporting resources
        const [productRes, categoriesRes, brandsRes, locationsRes] =
          await Promise.all([
            fetch(`/api/products/${productId}`),
            fetch("/api/categories"),
            fetch("/api/brands"),
            fetch("/api/locations"),
          ]);

        if (
          productRes.ok &&
          categoriesRes.ok &&
          brandsRes.ok &&
          locationsRes.ok
        ) {
          const [productData, categoriesData, brandsData, locationsData] =
            await Promise.all([
              productRes.json(),
              categoriesRes.json(),
              brandsRes.json(),
              locationsRes.json(),
            ]);

          setProduct(productData);
          setCategories(categoriesData);
          setBrands(brandsData);
          setLocations(locationsData);
        }
      } catch (error) {
        console.error("Error loading product form data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogDescription>
          Modify the details below to edit the product.
        </DialogDescription>
      </DialogHeader>

      {isLoading ? (
        <div className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading product data...</span>
        </div>
      ) : (
        <FormProduct
          type="EDIT"
          data={product}
          categories={categories}
          brands={brands}
          locations={locations}
        />
      )}
    </>
  );
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={getImageUrl(product.image_url, "products")}
            alt="Product"
            width={80}
            height={80}
          />
          <span>{product.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="sm:flex"
        >
          Price
          <ArrowUpDown className="ml-0 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;

      return rupiahFormat(product.price);
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="sm:flex"
        >
          Status
          <ArrowUpDown className="ml-0 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Badge variant={"outline"}>{product.stock}</Badge>
      );
    },
  },
  {
    accessorKey: "total_sales",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="sm:flex"
        >
          Total Sales
          <ArrowUpDown className="ml-0 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;

      return (
        <span className="text-muted-foreground">
          {product.total_sales ?? 0}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
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
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="sm:flex"
        >
          Updated
          <ArrowUpDown className="ml-0 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatDate(row.original.updatedAt),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-center">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />{" "}
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full">
                    <Edit />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <ProductEditContent productId={product.id} />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FormDelete id={product.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
