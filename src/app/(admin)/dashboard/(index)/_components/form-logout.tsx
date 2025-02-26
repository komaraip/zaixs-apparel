"use client"

import React, { useActionState } from "react";
import {
  LogOut,
} from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ActionResult } from "@/types";
import { Logout } from "../lib/actions";

const initialState: ActionResult = {
    error: ''
};

export default function FormLogout() {
    const [state, formAction] = useActionState(Logout, initialState);

    return (
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
    );
}
