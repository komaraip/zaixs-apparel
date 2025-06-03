"use server";

import { schemaBrand } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function postBrand(
	_: unknown,
	formData: FormData
): Promise<ActionResult> {
	// Check if formData exists
	if (!formData) {
		return {
			error: "Form data is missing",
		};
	}

	// Get and check form values
	const name = formData.get("name");
	const imageFile = formData.get("image") as File;

	// Basic form validation
	if (!name) {
		return {
			error: "Name is required",
		};
	}

	if (!imageFile || imageFile.size === 0) {
		return {
			error: "Image is required",
		};
	}

	try {
		// Extra validation using zod schema
		const validate = schemaBrand.safeParse({
			name: name,
			image: imageFile,
		});

		if (!validate.success) {
			return {
				error: validate.error.errors[0].message,
			};
		}

		// Upload file to Supabase
		const filename = await uploadFile(validate.data.image, "brands");

		// Create brand record with current timestamps
		const now = new Date();
		
		await prisma.brand.create({
			data: {
				name: validate.data.name,
				logo: filename,
				create_at: now,
				updated_at: now,
			},
		});
	} catch (error) {
		// Better error handling with specific messages
		console.error("Brand creation error:", error);
		
		// Check for specific database errors
		if (error instanceof Error) {
			if (error.message.includes("Unique constraint failed")) {
				return {
					error: "A brand with this name already exists",
				};
			}
		}
		
		return {
			error: "Failed to insert data",
		};
	}

	return redirect("/dashboard/brands");
}

export async function updateBrand(
	_: unknown,
	formData: FormData,
	id: number
): Promise<ActionResult> {
	// Check if formData exists
	if (!formData) {
		return {
			error: "Form data is missing",
		};
	}

	// Get name from form
	const name = formData.get("name");
	if (!name) {
		return {
			error: "Name is required",
		};
	}

	// Validate the name
	const validate = schemaBrand.pick({ name: true }).safeParse({
		name: name,
	});

	if (!validate.success) {
		return {
			error: validate.error.errors[0].message,
		};
	}

	// Find the existing brand
	const brand = await prisma.brand.findFirst({
		where: {
			id: id,
		},
		select: {
			logo: true,
		},
	});

	if (!brand) {
		return {
			error: "Brand not found",
		};
	}

	// Keep existing logo by default
	let filename = brand?.logo;

	// Get file from form
	const fileUpload = formData.get("image") as File;
	
	// Process file upload if a new file was provided
	if (fileUpload && typeof fileUpload.size === 'number' && fileUpload.size > 0) {
		try {
			filename = await uploadFile(fileUpload, "brands");
		} catch (error) {
			console.error("File upload error:", error);
			return {
				error: "Failed to upload image",
			};
		}
	}
	try {
		// Update with timestamp
		const now = new Date();
		
		await prisma.brand.update({
			where: {
				id: id,
			},
			data: {
				name: validate.data.name,
				logo: filename,
				updated_at: now,
			},
		});
	} catch (error) {
		console.error("Brand update error:", error);
		
		// Check for specific errors
		if (error instanceof Error) {
			if (error.message.includes("Record to update not found")) {
				return {
					error: "Brand not found",
				};
			}
		}
		
		return {
			error: "Failed to update data",
		};
	}

	return redirect("/dashboard/brands");
}

export async function deleteBrand(
	_: unknown,
	formData: FormData,
	id: number
): Promise<ActionResult> {
	// console.log(id);

	const brand = await prisma.brand.findFirst({
		where: {
			id: id,
		},
		select: {
			logo: true,
		},
	});

	if (!brand) {
		return {
			error: "Brand not found",
		};
	}

	try {
		deleteFile(brand.logo, "brands");

		await prisma.brand.delete({
			where: {
				id: id,
			},
		});
	} catch {
		return {
			error: "Failed to delete Data",
		};
	}

	return redirect("/dashboard/brands");
}
