import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

export default function UploadImages() {
	const ref = useRef<HTMLInputElement>(null)
	const thumbnailRef = useRef<HTMLImageElement>(null)
	const imageFirstRef = useRef<HTMLImageElement>(null)
	const imageSecondRef = useRef<HTMLImageElement>(null)
	const [hasImages, setHasImages] = useState(false)


	const openFolder = () => {
		if (ref.current) {
			ref.current.click()
		}
	}

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!thumbnailRef.current || !imageFirstRef.current || !imageSecondRef.current) {
			return;
		}

		if (e.target.files && e.target.files.length >= 3) {
			thumbnailRef.current.src = URL.createObjectURL(e.target.files[0])
			imageFirstRef.current.src = URL.createObjectURL(e.target.files[1])
			imageSecondRef.current.src = URL.createObjectURL(e.target.files[2])
			setHasImages(true)
		} else {
			setHasImages(false)
			alert("Please select at least 3 images")
		}
	}
	return (
		<div className="grid gap-3 mt-6">            
			<Label htmlFor="product-images">Images</Label>
			<Input
				ref={ref}
				onChange={onChange}
				type="file"
				id="product-images"
				name="images"
				className="w-full"
				accept="image/jpeg,image/png,image/jpg"
				multiple
				required
				aria-label="Upload product images"
			/>

			{hasImages && (
				<div className="space-y-3">
					<Image
						alt="Product image"
						className="aspect-video w-full rounded-md object-cover"
						height="160"
						src="/placeholder.svg"
						width="280"
						ref={thumbnailRef}
					/>
					<div className="grid grid-cols-3 gap-2">
						<div>
							<Image
								alt="Product image 1"
								className="aspect-square w-full rounded-md object-cover"
								height="60"
								src="/placeholder.svg"
								width="60"
								ref={imageFirstRef}
							/>
						</div>
						<div>
							<Image
								alt="Product image 2"
								className="aspect-square w-full rounded-md object-cover"
								height="60"
								src="/placeholder.svg"
								width="60"
								ref={imageSecondRef}
							/>
						</div>
						<div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed bg-muted">
							<Upload className="h-4 w-4 text-muted-foreground" />
						</div>
					</div>
				</div>
			)}

			{!hasImages && (
				<p className="text-sm text-red-500">
					* Upload exactly 3 images (required)
				</p>
			)}
			{hasImages && (
				<p className="text-sm text-green-500">
					✓ Images selected successfully
				</p>
			)}
		</div>
	);
}
