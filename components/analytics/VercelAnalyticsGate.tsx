"use client";

import { Analytics } from "@vercel/analytics/next";
import { useConsent } from "@/components/consent/ConsentProvider";
import { analyticsEnabled } from "@/lib/posthog";

export default function VercelAnalyticsGate() {
  const { analyticsConsent, ready } = useConsent();

  if (!ready || analyticsConsent !== "granted" || !analyticsEnabled()) {
    return null;
  }

  return <Analytics />;
}
