// src/app/(admin)/dashboard/(index)/settings/_components/form-demo.tsx
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { updateAdminUser } from "../lib/actions";

// Define the form schema with truly optional password
const formSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name should have min 4 characters" }),
  email: z
    .string()
    .email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(5, { message: "Password should have min 5 characters" })
    .optional()
    .or(z.literal('')), // This allows empty string as valid
  role: z
    .string()
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface FormUserProps {
  type?: "ADD" | "EDIT";
  data?: {
    id: number;
    name: string;
    email: string;
    role: string;
    create_at: Date;
    updated_at: Date;
  } | null;
}

export default function FormUser({ data = null }: FormUserProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Initialize form with default values from admin data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      role: data?.role || "",
      password: "", // Empty for security reasons
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
        // Always include password field in FormData, even if empty
      // The server will handle whether to update it or not
      formData.append("password", values.password || "");

      if (!data?.id) {
        setError("User ID is required");
        return;
      }

      const result = await updateAdminUser(formData, data.id);

      if (result.error) {
        setError(result.error);
        toast.error(result.error);
      } else {
        toast.success("Admin settings updated successfully");
        // Clear password field after successful update
        form.setValue("password", "");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
      toast.error("Failed to update admin settings");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-sm gap-6">
        {error && <div className="text-red-500">{error}</div>}    
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Submit"}
        </Button>

        <FormDescription className="text-center">After Save, Refresh!!</FormDescription>
      </form>
    </Form>
  );
}