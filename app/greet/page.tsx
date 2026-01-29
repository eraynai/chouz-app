import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTrialStatus, initializeTrialIfNeeded, incrementDayUsedIfNeeded } from "@/lib/trial";
import GreetingExperience from "@/components/greeting-experience";
import TrialExpired from "@/components/trial-expired";

export default async function GreetingPage() {
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

  // Initialize trial if this is their first visit
  await initializeTrialIfNeeded(userId);

  // Check and update trial status
  await incrementDayUsedIfNeeded(userId);

  // Get current trial status
  const trialStatus = await getTrialStatus(userId);

  // If trial has expired, show paywall
  if (trialStatus.hasExpired) {
    return <TrialExpired />;
  }

  // Otherwise, show the greeting experience
  return <GreetingExperience trialStatus={trialStatus} />;
}
