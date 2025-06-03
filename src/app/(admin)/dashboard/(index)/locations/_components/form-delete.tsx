"use client";

import { ActionResult } from "@/types";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { deleteLocation } from "../lib/actions";

const initialState: ActionResult = {
	error: "",
};

interface FormDeleteProps {
	id: number;
}

export default function FormDelete({ id }: FormDeleteProps) {
	const deleteLocationWithId = (_: unknown, formData: FormData) =>
		deleteLocation(_, formData, id);

	const [, formAction] = useActionState(
		deleteLocationWithId,
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
