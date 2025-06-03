import { NextResponse } from "next/server";
import { getLocations } from "@/app/(admin)/dashboard/(index)/locations/lib/data";

export async function GET() {
  try {
    const locations = await getLocations();
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}
