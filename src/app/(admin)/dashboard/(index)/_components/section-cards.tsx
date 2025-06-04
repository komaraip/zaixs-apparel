import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDashboardStats } from "../lib/dashboard-data";
import { rupiahFormat } from "@/lib/utils";

export async function SectionCards() {
  const stats = await getDashboardStats();
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-5 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {" "}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {rupiahFormat(stats.totalRevenue)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.revenueGrowth >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {stats.revenueGrowth >= 0 ? "+" : ""}
              {stats.revenueGrowth.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.revenueGrowth >= 0 ? "Trending up" : "Trending down"} this
            month{" "}
            {stats.revenueGrowth >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Revenue for the last 30 days
          </div>
        </CardFooter>
      </Card>{" "}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalOrders.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.ordersGrowth >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {stats.ordersGrowth >= 0 ? "+" : ""}
              {stats.ordersGrowth.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.ordersGrowth >= 0 ? "Orders increasing" : "Orders declining"}{" "}
            {stats.ordersGrowth >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {stats.ordersGrowth >= 0
              ? "Strong sales performance"
              : "Sales need attention"}
          </div>
        </CardFooter>
      </Card>{" "}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalCustomers.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.customersGrowth >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {stats.customersGrowth >= 0 ? "+" : ""}
              {stats.customersGrowth.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.customersGrowth >= 0
              ? "Customer base growing"
              : "Customer retention needed"}{" "}
            {stats.customersGrowth >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {stats.customersGrowth >= 0
              ? "Strong user acquisition"
              : "Focus on retention"}
          </div>
        </CardFooter>{" "}
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Products</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalProducts.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.productsGrowth >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {stats.productsGrowth >= 0 ? "+" : ""}
              {stats.productsGrowth.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.productsGrowth >= 0
              ? "Inventory expanding"
              : "Product catalog stable"}{" "}
            {stats.productsGrowth >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {stats.productsGrowth >= 0
              ? "New products added"
              : "Catalog management"}
          </div>        </CardFooter>
      </Card>{" "}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Brands</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalBrands.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.brandsGrowth >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {stats.brandsGrowth >= 0 ? "+" : ""}
              {stats.brandsGrowth.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.brandsGrowth >= 0
              ? "Brand portfolio growing"
              : "Brand catalog stable"}{" "}
            {stats.brandsGrowth >= 0 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {stats.brandsGrowth >= 0
              ? "New brands added"
              : "Brand management"}
          </div>
        </CardFooter>
      </Card>{" "}
    </div>
  );
}
