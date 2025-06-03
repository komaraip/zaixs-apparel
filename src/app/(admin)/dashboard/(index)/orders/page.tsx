import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from './columns';
import { getOrders } from './lib/data';

export default async function DashboardPage() {
  const orders = await getOrders() 

  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Orders Detail</CardTitle>
        </CardHeader>
        
        <CardContent>
          <DataTable columns={columns} data={orders} formType="orders"/>
        </CardContent>
      </Card>
    </div>
  );
}

