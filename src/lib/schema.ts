import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

export const schemaSignIn = z.object({
	email: z.string({ required_error: "Email is required" }).email({ message: "Email is not valid" }),
	password: z.string({ required_error: "Password is required" }).min(5, { message: "Password should have min 5 characters" }),
});

export const schemaCategory = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(4, { message: "Name should have min 4 characters" }),
});

export const schemaLocation = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(4, { message: "Name should have min 4 characters" }),
});

export const schemaBrand = schemaCategory.extend({
	image: z
		.any()
		.refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
			message: "File is not valid",
		})
		.refine((file: File) => file?.name, { message: "Image is required" }),
});

export const schemaSignUp = schemaSignIn.extend({
	name: z
		.string({ required_error: "Name is required" })
		.min(4, { message: "Name should have min 4 characters" }),
})