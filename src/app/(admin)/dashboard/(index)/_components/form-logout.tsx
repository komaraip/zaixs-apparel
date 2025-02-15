"use client"

import React, { useActionState } from "react";
import {
    LogOut,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ActionResult } from "@/types";
import { useFormState } from "react-dom";
import { Logout } from "../lib/actions";

const initialState: ActionResult = {
    error: ''
};

export default function FormLogout() {
    const [state, formAction] = useActionState(Logout, initialState);

    return (
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
                <TooltipTrigger asChild>
                    <form action={formAction}>
                        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                            <LogOut className="h-5 w-5" />
                            <span className="sr-only">Logout</span>
                        </button>
                    </form>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
        </nav>
    );
}
