"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResult } from "@/types";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Location } from "@prisma/client";
import { postLocation, updateLocation } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormCategoryProps {
  type?: "ADD" | "EDIT";
  data?: Location | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Loading..." : "Save Location"}
    </Button>
  );
}

export default function FormLocation({
  data = null,
  type = "ADD",
}: FormCategoryProps) {
  const updateLocationWithId = (_: unknown, formData: FormData) =>
    updateLocation(_, formData, data?.id);

  const [state, formAction] = useActionState(
    type === "ADD" ? postLocation : updateLocationWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/locations">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Location Controller
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <SubmitButton />
            </div>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Location Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {state.error !== "" && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="id">ID</Label>
                      <Input
                        id="id"
                        type="number"
                        name="id"
                        className="w-full"
                        defaultValue={data?.id}
                        disabled
                      />
                    </div>

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
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Date Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {state.error !== "" && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="create_at">Created At</Label>
                      <Input
                        id="create_at"
                        type="datetime-local"
                        name="create_at"
                        className="w-full"
                        defaultValue={data?.create_at
                          ?.toISOString()
                          .slice(0, 16)}
                        disabled
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="updated_at">Updated At</Label>
                      <Input
                        id="updated_at"
                        type="datetime-local"
                        name="updated_at"
                        className="w-full"
                        defaultValue={data?.updated_at
                          ?.toISOString()
                          .slice(0, 16)}
                        disabled
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Location</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
