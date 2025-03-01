"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResult } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Category } from "@prisma/client";
import { postCategory, updateCategory } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormCategoryProps {
  type?: "ADD" | "EDIT";
  data?: Category | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Loading..." : "Save Category"}
    </Button>
  );
}

export default function FormCategory({
  data = null,
  type = "ADD",
}: FormCategoryProps) {
  const updateCategoryWithId = (_: unknown, formData: FormData) =>
    updateCategory(_, formData, data?.id);

  const [state, formAction] = useActionState(
    type === "ADD" ? postCategory : updateCategoryWithId,
    initialState
  );

  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
      <Card x-chunk="dashboard-07-chunk-0">
        
        <CardContent>
          {state.error !== "" && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 mt-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                className="w-full"
                defaultValue={data?.name}
              />
            </div>

            <Button type="submit" size="sm" disabled={pending}>
              {pending ? "Loading..." : "Save Category"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
