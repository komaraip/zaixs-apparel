import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { getCategories } from "./lib/data";

export default async function DashboardPage() {
  const data = await getCategories();

  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories Detail</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={data} formType="categories"/>
        </CardContent>
      </Card>
    </div>
  );
}
