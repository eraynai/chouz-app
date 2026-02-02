import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getTrialStatus, initializeTrialIfNeeded, incrementDayUsedIfNeeded } from "@/lib/trial";
import GreetingExperience from "@/components/greeting-experience";
import TrialExpired from "@/components/trial-expired";

interface SearchParamsProps {
  searchParams: Promise<{
    fromMorning?: string;
  }>;
}

export default async function GreetingPage({ searchParams }: SearchParamsProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    // This shouldn't happen due to middleware, but just in case
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Please sign in to continue</p>
      </div>
    );
  }

  const userId = session.user.id;

  const params = await searchParams;

  // Initialize trial if this is their first visit
  await initializeTrialIfNeeded(userId);

  // Check and update trial status
  await incrementDayUsedIfNeeded(userId);

  // Get current trial status
  const trialStatus = await getTrialStatus(userId);

  // For developer accounts, always go through the morning flow before greeting
  // unless we've just arrived here from that flow (indicated by fromMorning=1).
  if (trialStatus.isDeveloper && params.fromMorning !== "1") {
    redirect("/onboarding/morning");
  }

  // If trial has expired, show paywall
  if (trialStatus.hasExpired) {
    return <TrialExpired />;
  }

  // Otherwise, show the greeting experience
  return <GreetingExperience trialStatus={trialStatus} />;
}
