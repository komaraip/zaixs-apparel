"use client";

import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteCategory } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: number;
}

export default function FormDelete({ id }: FormDeleteProps) {
  const { handleSubmit, formState: { isSubmitting } } = useForm();
  const [state, setState] = useState(initialState);

  const onSubmit = async () => {
    try {
      await deleteCategory(undefined, new FormData(), id);
      setState({ error: "" });
    } catch (error) {
      setState({ error: (error as any).message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button type="submit" variant="destructive" className="w-full" disabled={isSubmitting}>
        <Trash />
        Delete
        {isSubmitting ? " Loading..." : ""}
      </Button>
      {state.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
