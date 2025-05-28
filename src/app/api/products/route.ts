import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { ProductStock } from "@prisma/client";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        brand: true,
        category: true,
        location: true
      }
    });

    // Convert BigInt to string for JSON serialization
    const serializedProducts = products.map(product => ({
      ...product,
      price: product.price.toString()
    }));

    return NextResponse.json(serializedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const product = await prisma.product.create({
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
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
