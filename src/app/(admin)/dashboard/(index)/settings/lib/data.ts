// src/app/(admin)/dashboard/(index)/settings/lib/data.ts
import prisma from "../../../../../../../lib/prisma"; // Adjust this import path to your prisma client

// Function to get the admin user
export async function getAdminUser() {
  try {
    // Get the first user with ADMIN role
    // You might want to adjust this logic if you have multiple admins
    const adminUser = await prisma.user.findFirst({
      where: {
        role: "superadmin",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        create_at: true,
        updated_at: true,
      },
    });

    return adminUser;
  } catch (error) {
    console.error("Error fetching admin user:", error);
    return null;
  }
}