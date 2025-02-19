import React from "react";
import { DataTable } from "@/components/ui/data-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { columns } from "./columns";
// import { getLocations } from "./lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function DashboardPage() {
  // const data = await getLocations();

  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Products Detail</CardTitle>
          <div className="text-right">
            <Button size="sm" className="h-8 gap-1" asChild>
              <Link href="/dashboard/locations/create">
                <div className="flex items-center gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add New Product
                  </span>
                </div>
              </Link>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* <DataTable columns={columns} data={data} /> */}
        </CardContent>
      </Card>
    </div>
  );
}
