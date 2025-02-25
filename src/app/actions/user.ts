'use server'

import { getUser } from "@/lib/auth";

export async function getUserDetails() {
  const { user } = await getUser();
  return user;
}