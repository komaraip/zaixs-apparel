import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { ProductStock } from "@prisma/client";

// Define route context with Promise-based params as required by Next.js 15.1.7
interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    // Resolve params from the Promise
    const params = await context.params;
    const id = Number(params.id);
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        location: true
      }
    });
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    // Convert BigInt to string for JSON serialization
    return NextResponse.json({
      ...product,
      price: product.price.toString()
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    // Resolve params from the Promise
    const params = await context.params;
    const id = Number(params.id);
    const body = await request.json();
    
    const {
      name,
      description,
      price,
      brand_id,
      category_id,
      location_id,
      stock,
      images
    } = body;
    
    if (!name || !description || !price || !brand_id || !category_id || !location_id || !stock || !images || images.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: BigInt(price),
        brand_id: Number(brand_id),
        category_id: Number(category_id),
        location_id: Number(location_id),
        stock: stock as ProductStock,
        images
      },
    });
    
    // Convert BigInt to string for JSON serialization
    return NextResponse.json({
      ...product,
      price: product.price.toString()
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    // Resolve params from the Promise
    const params = await context.params;
    const id = Number(params.id);

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
