import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Export users who have consented to marketing communications
 * 
 * Usage:
 *   npx tsx scripts/export-marketing-list.ts
 */
async function exportMarketingList() {
  console.log("📧 Fetching users with marketing consent...\n");

  const usersWithConsent = await db
    .select({
      email: user.email,
      name: user.name,
      consentDate: user.marketingConsentDate,
      firstGreetingAccess: user.firstGreetingAccessDate,
      greetingDaysUsed: user.greetingDaysUsed,
    })
    .from(user)
    .where(eq(user.marketingConsent, true));

  console.log(`Found ${usersWithConsent.length} users with marketing consent:\n`);

  // Output as CSV
  console.log("email,name,consentDate,firstGreetingAccess,greetingDaysUsed");
  usersWithConsent.forEach((u) => {
    console.log(
      `${u.email},${u.name || ""},${u.consentDate?.toISOString() || ""},${u.firstGreetingAccess?.toISOString() || ""},${u.greetingDaysUsed || 0}`
    );
  });

  console.log(`\n✅ Done! Total: ${usersWithConsent.length} users`);
  process.exit(0);
}

exportMarketingList().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
