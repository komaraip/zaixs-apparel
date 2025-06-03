"use server"

import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma";
import { ProductStock } from "@prisma/client";

export async function storeProduct(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    try {
        // Log form data for debugging
        // console.log("Form data received:", {
        //     name: formData.get('name'),
        //     price: formData.get('price'),
        //     description: formData.get('description'),
        //     brand_id: formData.get('brand_id'),
        //     category_id: formData.get('category_id'),
        //     location_id: formData.get('location_id'),
        //     stock: formData.get('stock'),
        //     images: formData.getAll('images').length,
        // });

        const parse = schemaProduct.safeParse({
            name: formData.get('name'),
            price: formData.get('price'),
            description: formData.get('description'),
            brand_id: formData.get('brand_id'),
            category_id: formData.get('category_id'),
            location_id: formData.get('location_id'),
            stock: formData.get('stock'),
            images: formData.getAll('images'),
        })

        if (!parse.success) {
            console.error("Validation error:", parse.error.errors);
            return {
                error: parse.error.errors[0].message
            }
        }

        const uploaded_images = parse.data.images as File[]
        if (!uploaded_images || uploaded_images.length < 3) {
            return {
                error: "Please upload exactly 3 images"
            }
        }

        const filenames = []

        for (const image of uploaded_images) {
            try {
                const filename = await uploadFile(image, 'products')
                filenames.push(filename)
            } catch (uploadError) {
                console.error("File upload error:", uploadError);
                return {
                    error: "Failed to upload image. Please try again."
                }
            }        } await prisma.product.create({
            data: {
                name: parse.data.name,
                description: parse.data.description,
                category_id: Number.parseInt(parse.data.category_id),
                location_id: Number.parseInt(parse.data.location_id),
                brand_id: Number.parseInt(parse.data.brand_id),
                price: Number.parseInt(parse.data.price),
                stock: parse.data.stock as ProductStock,
                images: filenames
            }
        });
        // console.log("Product created successfully:", newProduct.id);

        return { error: "" };
    } catch (error) {
        console.error("Product creation error:", error);
        return {
            error: "Failed to insert data product: " + (error instanceof Error ? error.message : 'Unknown error')
        }
    }
}

export async function updateProduct(
    _: unknown,
    formData: FormData,
    id: number
): Promise<ActionResult> {
    try {
        const parse = schemaProductEdit.safeParse({
            name: formData.get('name'),
            price: formData.get('price'),
            description: formData.get('description'),
            brand_id: formData.get('brand_id'),
            category_id: formData.get('category_id'),
            location_id: formData.get('location_id'),
            stock: formData.get('stock'),
            id: id
        })

        if (!parse.success) {
            return {
                error: parse.error.errors[0].message
            }
        }

        const product = await prisma.product.findFirst({
            where: {
                id: id
            },
        })

        if (!product) {
            return {
                error: 'Product not found'
            }
        }

        const uploaded_images = formData.getAll("images") as File[]

        let filenames = []

        if (uploaded_images.length === 3) {

            const parseImages = schemaProduct.pick({ images: true }).safeParse({
                images: uploaded_images
            })

            if (!parseImages.success) {
                return {
                    error: parseImages.error.errors[0].message
                }
            }

            for (const image of uploaded_images) {
                try {
                    const filename = await uploadFile(image, 'products')
                    filenames.push(filename)
                } catch (uploadError) {
                    console.error("File upload error:", uploadError);
                    return {
                        error: "Failed to upload image. Please try again."
                    }
                }
            }
        } else {
            filenames = product.images        } await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name: parse.data.name,
                description: parse.data.description,
                category_id: Number.parseInt(parse.data.category_id),
                location_id: Number.parseInt(parse.data.location_id),
                brand_id: Number.parseInt(parse.data.brand_id),
                price: Number.parseInt(parse.data.price),
                stock: parse.data.stock as ProductStock,
                images: filenames
            }
        });
        
        // console.log("Product updated successfully:", updatedProduct.id);

        return { error: "" };
    } catch (error) {
        console.error("Product update error:", error);
        return {
            error: 'Failed to update data: ' + (error instanceof Error ? error.message : 'Unknown error')
        }
    }
}

export async function deleteProduct(
    _: unknown,
    formData: FormData,
    id: number
): Promise<ActionResult> {
    try {
        const product = await prisma.product.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                images: true
            }
        })

        if (!product) {
            return {
                error: "Product not found"
            }
        }

        for (const image of product.images) {
            await deleteFile(image, 'products')
        } await prisma.product.delete({
            where: {
                id
            }
        })

        return { error: "" };
    } catch (error) {
        console.error("Product deletion error:", error);
        return {
            error: "Failed to delete data: " + (error instanceof Error ? error.message : 'Unknown error')
        }
    }
}
