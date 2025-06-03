"use server";

import { schemaCategory } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function deleteCustomer(
	_: unknown,
	formData: FormData,
	id: number
): Promise<ActionResult> {
	try {
		await prisma.user.delete({
			where: {
				id,
			},
		});
	} catch (error) {
		console.log(error);
		return {
			error: "Failed to delete data",
		};
	}

	return redirect("/dashboard/customers");
}
