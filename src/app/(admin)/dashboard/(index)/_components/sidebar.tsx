"use client";

import React, { useEffect, useState } from "react";
import FormLogout from "./form-logout";
import "../../../../globals.css";
import {
  Archive,
  BookUser,
  Building,
  MapPin,
  Package,
  PieChart,
  Settings,
  ShoppingCart,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserDetails } from "@/app/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: string;
  } | null>(null);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUserDetails();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    }
    
    fetchUser();
  }, []);
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png"/>
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user ? user.name : "Loading..."}
                    </span>
                    <span className="text-xs text-muted-foreground">
                    {user ? user.email : ""}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]">
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard">
                  <Archive />
                  <span>Home</span>
                </a>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <a href="/dashboard/categories">
                  <PieChart />
                  <span>Categories</span>
                </a>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <a href="/dashboard/locations">
                  <MapPin />
                  <span>Locations</span>
                </a>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <a href="/dashboard/brands">
                  <Building />
                  <span>Brands</span>
                </a>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <a href="/dashboard/products">
                  <Package />
                  <span>Products</span>
                </a>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <a href="/dashboard/orders">
                  <ShoppingCart />
                  <span>Orders</span>
                </a>
              </SidebarMenuButton>

              <SidebarMenuButton asChild>
                <a href="/dashboard/customers">
                  <BookUser />
                  <span>Customers</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/settings">
                  <Settings />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          
          <FormLogout />
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}