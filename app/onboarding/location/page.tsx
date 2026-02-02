import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LocationOnboarding from "@/components/location-onboarding";

interface SearchParamsProps {
  searchParams: Promise<{
    returnTo?: string;
    mode?: string;
  }>;
}

export default async function LocationOnboardingPage({ searchParams }: SearchParamsProps) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/sign-in?returnTo=/onboarding/location");
  }

  const [userData] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  const hasLocation = !!(
    userData?.wakingLocationLabel &&
    userData.wakingLatitude != null &&
    userData.wakingLongitude != null
  );

  const params = await searchParams;
  // By default, after setting location for the first time we guide the user
  // into the gentle morning onboarding flow before they reach the main greet
  // screen. Callers can override this with a custom `returnTo` param.
  const finalReturnTo = params.returnTo || "/onboarding/morning";
  const isEdit = params.mode === "edit";

  if (hasLocation && !isEdit) {
    redirect(finalReturnTo);
  }

  return (
    <LocationOnboarding
      initialLabel={userData?.wakingLocationLabel ?? ""}
      initialLatitude={userData?.wakingLatitude ?? null}
      initialLongitude={userData?.wakingLongitude ?? null}
      returnTo={finalReturnTo}
    />
  );
}
