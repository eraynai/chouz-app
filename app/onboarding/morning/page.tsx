import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MorningFlow from "@/components/morning-flow";

export default async function MorningOnboardingPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    // Protect this route: if somehow reached without a session, send to sign-in
    // and return here afterwards.
    redirect("/sign-in?returnTo=/onboarding/morning");
  }

  // In the future we could check a persisted flag here to skip this flow once
  // the user has completed it at least once.

  return <MorningFlow />;
}