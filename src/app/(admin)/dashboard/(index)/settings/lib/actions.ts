// src/app/(admin)/dashboard/(index)/settings/lib/actions.ts
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma"; // Adjust this import path to your prisma client

// Update schema for admin - making password truly optional
const updateAdminSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name should have min 4 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(5, { message: "Password should have min 5 characters" })
    .optional()
    .or(z.literal('')), // This allows empty string as valid
});

export async function updateAdminUser(
  formData: FormData,
  id: number
) {
  if (!id) {
    return {
      error: "Admin ID is required",
    };
  }

  // Get form data
  const password = formData.get("password") as string;
  const formValues = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: password && password.trim() !== "" ? password : undefined, // Only include if not empty
  };

  // Validate the data
  const validate = updateAdminSchema.safeParse(formValues);

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  try {
    // Verify this is actually an admin account before updating
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        role: true,
      }
    });

    if (!existingUser || existingUser.role !== "superadmin") {
      return {
        error: "Not authorized to update this account",
      };
    }

    // Create update data object with only the required fields
    const updateData: any = {
      name: validate.data.name,
      email: validate.data.email,
    };

    // Only include password in update if provided and not empty
    if (validate.data.password && validate.data.password.trim() !== "") {
      updateData.password = validate.data.password;
      // Note: In a production app, you'd hash the password here
      // updateData.password = await bcrypt.hash(validate.data.password, 10);
    }

    await prisma.user.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update admin:", error);
    
    // Handle unique constraint errors (e.g., email already exists)
    if (error.code === 'P2002') {
      return {
        error: "This email is already in use",
      };
    }
    
    return {
      error: "Failed to update admin data",
    };
  }
}