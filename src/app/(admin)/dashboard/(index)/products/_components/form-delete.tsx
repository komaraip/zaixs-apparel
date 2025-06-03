"use client";

import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import React, { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { deleteProduct } from "../lib/action";
import { toast } from "sonner";

const initialState: ActionResult = {
	error: "",
};

interface FormDeleteProps {
	id: number;
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			variant="destructive"
			size="sm"
			disabled={pending}
		>
			<Trash className="w-4 h-4 mr-2" />{" "}
			{pending ? "Loading..." : "Delete"}
		</Button>
	);
}

export default function FormDelete({ id }: FormDeleteProps) {
	const router = useRouter();
	const [, setIsDeleting] = useState(false);
	
	const deleteCategoryWithId = async (_: unknown, formData: FormData) => {
		setIsDeleting(true);
		try {
			// Call the server action
			const result = await deleteProduct(_, formData, id);
			
			// If successful, force a refresh of the page
			if (!result.error) {
				toast.success("Product deleted successfully");
				
				// Use both approaches for more reliable navigation
				// First refresh the current route data
				router.refresh();
				
				// Then navigate back to the products page
				// Use a small timeout to ensure the router.refresh() has time to process
				setTimeout(() => {
					window.location.href = '/dashboard/products';
				}, 300);
			} else {
				toast.error(result.error || "Failed to delete product");
				setIsDeleting(false);
			}
			
			return result;
		} catch (error) {
			console.error("Error during delete operation:", error);
			setIsDeleting(false);
			return { error: "An unexpected error occurred" };
		}
	};

	const [state, formAction] = useActionState(
		deleteCategoryWithId,
		initialState
	);

	return (
		<form action={formAction}>
			<SubmitButton />
			{state?.error && <p className="text-sm text-red-500 mt-2">{state.error}</p>}
		</form>
	);
}
