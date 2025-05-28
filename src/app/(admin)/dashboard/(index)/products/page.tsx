import React from "react";
import { DataTable } from "@/components/ui/data-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProducts } from "./lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { columns } from "./columns";

export default async function DashboardPage() {
  const data = await getProducts();

  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Products Detail</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={data} formType="products" />
        </CardContent>
      </Card>
    </div>
  );
}
