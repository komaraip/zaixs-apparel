"use client";

import React, { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResult } from "@/types";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brand } from "@prisma/client";
import { postBrand, updateBrand } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormBrandProps {
  type?: "ADD" | "EDIT";
  data?: Brand | null;
}

export default function FormBrand({
  data = null,
  type = "ADD",
}: FormBrandProps) {
  const updateWithId = (_: unknown, formData: FormData) =>
    updateBrand(_, formData, data?.id ?? 0);

  const [state, formAction] = useActionState(
    type === "ADD" ? postBrand : updateWithId,
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
            </div>{" "}
            <div className="grid gap-3">
              <Label htmlFor="logo">Logo</Label>
              <Input
                id="logo"
                type="file"
                name="image"
                className="w-full"
                accept="image/jpeg, image/jpg, image/png"
                required={type === "ADD"}
              />
              {type === "EDIT" && data?.logo && (
                <p className="text-sm text-muted-foreground">
                  Current logo: {data.logo}
                </p>
              )}
            </div>
            <Button type="submit" size="sm" disabled={pending}>
              {pending ? "Loading..." : "Save Brand"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
