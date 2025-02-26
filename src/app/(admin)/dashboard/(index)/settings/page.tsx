// src/app/(admin)/dashboard/(index)/settings/page.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import FormUser from "./_components/form-demo";
import { getAdminUser } from "./lib/data";

export default async function AdminSettingsPage() {
  // Get the admin user data
  const adminData = await getAdminUser();

  if (!adminData) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Admin account data not found. Please contact support.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (     
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <FormUser type="EDIT" data={adminData} />
        </CardContent>
      </Card>
    </div>
  );
}