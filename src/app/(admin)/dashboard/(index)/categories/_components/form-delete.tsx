"use client";

import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import React, { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteCategory } from "../lib/actions";

const initialState: ActionResult = {
	error: "",
};

interface FormDeleteProps {
	id: number;
}

// function SubmitButton() {
// 	const { pending } = useFormStatus();

// 	return (
// 		<Button type="submit" variant='destructive' size="sm" disabled={pending}>
// 			<Trash className="w-4 h-4 mr-0" />
// 			{" "}{pending ? "Loading..." : " "}
// 		</Button>

// 	);
// }



export default function FormDelete({ id }: FormDeleteProps) {
	const deleteCategoryWithId = (_: unknown, formData: FormData) =>
		deleteCategory(_, formData, id);

	const [state, formAction] = useActionState(
		deleteCategoryWithId,
		initialState
	);

	const { pending } = useFormStatus();

	return (
		<form action={formAction}>
			Delete
			{" "}{pending ? "Loading..." : " "}
		</form>
	);
}
