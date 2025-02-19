"use client";

import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import React, { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteLocation } from "../lib/actions";

const initialState: ActionResult = {
	error: "",
};

interface FormDeleteProps {
	id: number;
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" variant='destructive' size="sm" disabled={pending}>
			<Trash className="w-4 h-4 mr-0" />
			{" "}{pending ? "Loading..." : " "}
		</Button>
	);
}

export default function FormDelete({ id }: FormDeleteProps) {
	const deleteLocationWithId = (_: unknown, formData: FormData) =>
		deleteLocation(_, formData, id);

	const [state, formAction] = useActionState(
		deleteLocationWithId,
		initialState
	);

	return (
		<form action={formAction}>
			<SubmitButton />
		</form>
	);
}
