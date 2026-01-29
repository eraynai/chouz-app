import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

/**
 * Get marketing consent statistics
 * Only accessible to admin users (check via DEVELOPER_EMAILS)
 */
export const GET = async () => {
  // Verify admin access
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is admin
  const developerEmails = process.env.DEVELOPER_EMAILS?.split(",") || [];
  if (!developerEmails.includes(session.user.email)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  // Get stats
  const allUsers = await db.select().from(user);
  const consentedUsers = await db
    .select()
    .from(user)
    .where(eq(user.marketingConsent, true));

  const stats = {
    totalUsers: allUsers.length,
    usersWithConsent: consentedUsers.length,
    usersWithoutConsent: allUsers.length - consentedUsers.length,
    consentRate:
      allUsers.length > 0
        ? ((consentedUsers.length / allUsers.length) * 100).toFixed(1) + "%"
        : "0%",
    consentedEmails: consentedUsers.map((u) => ({
      email: u.email,
      name: u.name,
      consentDate: u.marketingConsentDate,
    })),
  };

  return Response.json(stats);
};
