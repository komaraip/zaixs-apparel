"use client";

import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import UploadImages from "./upload-images";
import { ActionResult } from "@/types";
import { Brand, Category, Location, Product } from "@prisma/client";
import { storeProduct, updateProduct } from "../lib/action";

interface FormProductProps {
	type: "ADD" | "EDIT";
	data?: Product | null;
	categories?: Category[];
	brands?: Brand[];
	locations?: Location[];
}

const initialState: ActionResult = {
	error: "",
	success: false,
};

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" size="lg" disabled={pending} className="w-full mt-6">
			{pending ? "Loading..." : "Save Product"}
		</Button>
	);
}

export default function FormProduct({
	type = "ADD",
	data = null,
	categories = [],
	brands = [],
	locations = [],
}: FormProductProps) {
	const updateProductWithId = (_: unknown, formData: FormData) =>
		updateProduct(_, formData, data?.id ?? 0);

	const [state, formAction] = useActionState(
		type === "ADD" ? storeProduct : updateProductWithId,
		initialState
	);

	return (
		<form action={formAction}>
			{state.error !== "" && (
				<Alert variant="destructive" className="mb-4">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{state.error}</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-2 md:grid-cols-2 gap-6">
				<Card x-chunk="dashboard-07-chunk-2">
					<CardContent>
						<div className="grid gap-6 mt-6">
							<div className="grid gap-3">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									name="name"
									className="w-full"
									defaultValue={data?.name}
								/>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="price">Price</Label>
								<Input
									id="price"
									type="number"
									name="price"
									className="w-full"
									defaultValue={Number(data?.price ?? 0)}
								/>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="description">Description</Label>
								<Textarea
									name="description"
									id="description"
									className="min-h-32"
									defaultValue={data?.description}
								/>
							</div>
						</div>
					</CardContent>
				</Card>


				<Card x-chunk="dashboard-07-chunk-2">
					<CardContent>
						<div className="grid gap-6 mt-6">
							<div className="grid gap-3">
								<Label htmlFor="status">Status</Label>
								<Select name="stock" defaultValue={data?.stock}>
									<SelectTrigger id="status" aria-label="Select status">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ready">Ready</SelectItem>
										<SelectItem value="preorder">Pre-Order</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="category">Category</Label>{" "}
								<Select
									name="category_id"
									defaultValue={data?.category_id?.toString()}
								>
									<SelectTrigger id="category" aria-label="Select category">
										<SelectValue placeholder="Select category" />
									</SelectTrigger>
									<SelectContent>
										{categories.map((cat: Category) => (
											<SelectItem key={cat.id} value={`${cat.id}`}>
												{cat.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="brand">Brand</Label>{" "}
								<Select
									name="brand_id"
									defaultValue={data?.brand_id?.toString()}
								>
									<SelectTrigger id="brand" aria-label="Select Brand">
										<SelectValue placeholder="Select brand" />
									</SelectTrigger>
									<SelectContent>
										{brands.map((cat: Brand) => (
											<SelectItem key={cat.id} value={`${cat.id}`}>
												{cat.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="grid gap-3">
								<Label htmlFor="location_id">Location</Label>{" "}
								<Select
									name="location_id"
									defaultValue={data?.location_id?.toString()}
								>
									<SelectTrigger id="location" aria-label="Select location">
										<SelectValue placeholder="Select location" />
									</SelectTrigger>
									<SelectContent>
										{locations.map((cat: Location) => (
											<SelectItem key={cat.id} value={`${cat.id}`}>
												{cat.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-1 gap-6 mt-6">
				<Card x-chunk="dashboard-07-chunk-2">
					<CardContent>
						<UploadImages />
					</CardContent>
				</Card>
			</div>

			

			<SubmitButton />
		</form>
	);
}
