"use client"

import React, { useActionState } from "react";
import {
  LogOut,
  User,
} from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ActionResult } from "@/types";
import { Logout } from "../lib/actions";

const initialState: ActionResult = {
    error: ''
};

export default function FormLogout() {
    const [state, formAction] = useActionState(Logout, initialState);

    return (
        <SidebarGroup className="group-data-[collapsible=icon]">
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/settings">
                  <User />
                  <span>Account</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <form action={formAction}>
                <SidebarMenuButton>
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
              </form>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </SidebarGroup>
    );
}
