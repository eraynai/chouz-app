import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const TRIAL_DAYS = 3;

// Developer emails that bypass trial restrictions
const DEVELOPER_EMAILS = process.env.DEVELOPER_EMAILS?.split(',').map(e => e.trim()) || [];

export type TrialStatus = {
  isActive: boolean;
  daysUsed: number;
  daysRemaining: number;
  hasExpired: boolean;
  isDeveloper: boolean;
  wakingLocationLabel?: string | null;
};

export async function getTrialStatus(userId: string): Promise<TrialStatus> {
  const [userData] = await db.select().from(user).where(eq(user.id, userId)).limit(1);

  if (!userData) {
    throw new Error("User not found");
  }

  // Check if user is a developer (bypass trial)
  const isDeveloper = DEVELOPER_EMAILS.includes(userData.email);

  const daysUsed = userData.greetingDaysUsed || 0;
  const daysRemaining = Math.max(0, TRIAL_DAYS - daysUsed);
  const hasExpired = isDeveloper ? false : daysUsed >= TRIAL_DAYS;
  const isActive = !hasExpired;

  return {
    isActive,
    daysUsed,
    daysRemaining,
    hasExpired,
    isDeveloper,
    wakingLocationLabel: (userData as { wakingLocationLabel?: string | null }).wakingLocationLabel ?? null,
  };
}

export async function initializeTrialIfNeeded(userId: string): Promise<void> {
  const [userData] = await db.select().from(user).where(eq(user.id, userId)).limit(1);

  if (!userData) {
    throw new Error("User not found");
  }

  // If this is their first time accessing greet, initialize trial
  if (!userData.firstGreetingAccessDate) {
    await db
      .update(user)
      .set({
        firstGreetingAccessDate: new Date(),
        greetingDaysUsed: 0,
      })
      .where(eq(user.id, userId));
  }
}

export async function incrementDayUsedIfNeeded(userId: string): Promise<boolean> {
  const [userData] = await db.select().from(user).where(eq(user.id, userId)).limit(1);

  if (!userData || !userData.firstGreetingAccessDate) {
    return false;
  }

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const lastAccess = userData.firstGreetingAccessDate.toISOString().slice(0, 10);

  // Check if this is a new day since first access
  const daysSinceStart = Math.floor(
    (new Date(today).getTime() - new Date(lastAccess).getTime()) / (1000 * 60 * 60 * 24)
  );

  const currentDaysUsed = userData.greetingDaysUsed || 0;

  // If we haven't recorded today's usage yet
  if (daysSinceStart > currentDaysUsed) {
    await db
      .update(user)
      .set({
        greetingDaysUsed: daysSinceStart,
      })
      .where(eq(user.id, userId));
    return true;
  }

  return false;
}
