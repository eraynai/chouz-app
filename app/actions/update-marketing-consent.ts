"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateMarketingConsent(
  email: string,
  consent: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await db
      .update(user)
      .set({
        marketingConsent: consent,
        marketingConsentDate: consent ? new Date() : null,
      })
      .where(eq(user.email, email));

    return { success: true };
  } catch (error) {
    console.error("Failed to update marketing consent:", error);
    return { success: false, error: "Failed to update consent" };
  }
}
