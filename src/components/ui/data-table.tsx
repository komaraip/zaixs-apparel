"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormCategory from "@/app/(admin)/dashboard/(index)/categories/_components/form-category";
import FormLocation from "@/app/(admin)/dashboard/(index)/locations/_components/form-location";
import FormBrand from "@/app/(admin)/dashboard/(index)/brands/_components/form-brand";
import FormProduct from "@/app/(admin)/dashboard/(index)/products/_components/form-product";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  formType: "categories" | "locations" | "brands" | "products" | "orders" | "customers";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  formType,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({}); const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const fetchProductResources = async () => {
    if (formType === "products") {
      setIsLoading(true);
      try {
        // Fetch categories, brands, and locations
        const [categoriesRes, brandsRes, locationsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/brands'),
          fetch('/api/locations')
        ]);

        if (categoriesRes.ok && brandsRes.ok && locationsRes.ok) {
          const [categoriesData, brandsData, locationsData] = await Promise.all([
            categoriesRes.json(),
            brandsRes.json(),
            locationsRes.json()
          ]);

          setCategories(categoriesData);
          setBrands(brandsData);
          setLocations(locationsData);
          // console.log("Resources loaded:", {
          //   categories: categoriesData.length,
          //   brands: brandsData.length,
          //   locations: locationsData.length
          // });
        } else {
          console.error("Error fetching resources:", {
            categories: categoriesRes.status,
            brands: brandsRes.status,
            locations: locationsRes.status
          });
        }
      } catch (error) {
        console.error("Error loading product form data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  // Custom wrapper for product form with dialog closing capability
  const ProductFormWithDialog = () => {
    // This effect listens for form submission success messages from the FormProduct component
    React.useEffect(() => {
      const handleFormSuccess = (event: CustomEvent) => {
        if (event.detail && event.detail.success) {
          // console.log("Form submission detected, closing dialog");
          setTimeout(() => {
            setDialogOpen(false);
          }, 500);
        }
      };

      window.addEventListener('productFormSubmitted', handleFormSuccess as EventListener);

      return () => {
        window.removeEventListener('productFormSubmitted', handleFormSuccess as EventListener);
      };
    }, []);

    return (
      <FormProduct
        type="ADD"
        categories={categories}
        brands={brands}
        locations={locations}
      />
    );
  };

  const renderForm = () => {
    switch (formType) {
      case "categories":
        return <FormCategory type="ADD" />;
      case "locations":
        return <FormLocation type="ADD" />;
      case "brands":
        return <FormBrand type="ADD" />;
      case "products":
        return <ProductFormWithDialog />;
      case "orders":
        return <div>Orders form not implemented yet.</div>;
      default:
        return null;
    }
  };  
  
  // Helper function to get the filter column and placeholder based on form type
  const getFilterConfig = () => {
    switch (formType) {
      case "orders":
        return {
          columnId: "customer_name",
          placeholder: "Filter customer name..."
        };
      case "customers":
        return {
          columnId: "name",
          placeholder: "Filter customer name..."
        };
      default:
        return {
          columnId: "name",
          placeholder: "Filter name..."
        };
    }
  };

  const filterConfig = getFilterConfig();

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={filterConfig.placeholder}
          value={(table.getColumn(filterConfig.columnId)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterConfig.columnId)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
          suppressHydrationWarning={true}
        />
        {(formType === "categories" ||
          formType === "locations" ||
          formType === "brands" ||
          formType === "products") && (
            <Dialog
              open={dialogOpen}
              onOpenChange={(open) => {
                setDialogOpen(open);
                if (open && formType === "products") {
                  fetchProductResources();
                }
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="ml-4">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Add New</span>
                </Button>
              </DialogTrigger>{" "}
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Create New{" "}
                    {formType.charAt(0).toUpperCase() + formType.slice(1)}
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new {formType}.
                  </DialogDescription>
                </DialogHeader>
                {formType === "products" && isLoading ? (
                  <div className="flex items-center justify-center p-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-2">Loading data...</span>
                  </div>
                ) : (
                  renderForm()
                )}
              </DialogContent>
            </Dialog>
          )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto"
              suppressHydrationWarning={true}
            >
              Filter Columns
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} row(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}