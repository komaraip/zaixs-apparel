import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { columns } from './columns';
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getCustomers } from "./lib/data";


export default async function DashboardPage() {
  const data = await getCustomers();

  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Customers Detail</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={data} formType="customers"/>
        </CardContent>
      </Card>
    </div>
  );
}
