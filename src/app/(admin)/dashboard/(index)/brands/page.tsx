import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./columns";
import { getBrands } from "./lib/data";
import { DataTable } from "@/components/ui/data-table";

export default async function DashboardPage() {
  const brands = await getBrands();

  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Brands Detail</CardTitle>
        </CardHeader>
        
        <CardContent>
          <DataTable columns={columns} data={brands} formType="brands"/>
        </CardContent>
      </Card>
    </div>
  );
}
