"use client";

import Link from "next/link";
import { useConsent } from "@/components/consent/ConsentProvider";

export default function ConsentBanner() {
  const { analyticsConsent, ready, setAnalyticsConsent } = useConsent();

  if (!ready || analyticsConsent !== null) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-background-light/95 backdrop-blur dark:border-gray-800 dark:bg-background-dark/95"
      role="region"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-5 text-sm text-muted-light dark:text-muted-dark md:flex-row md:items-center md:justify-between">
        <p className="leading-relaxed">
          We use analytics cookies to understand how Chouz is used and to improve the
          experience. You can accept or reject analytics. {" "}
          <Link href="/privacy" className="underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="button"
            className="w-full rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-muted-light transition-colors hover:border-primary hover:text-primary dark:border-gray-700 dark:text-muted-dark dark:hover:text-white sm:w-auto"
            onClick={() => setAnalyticsConsent("denied")}
          >
            Reject
          </button>
          <button
            type="button"
            className="w-full rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.01] sm:w-auto"
            onClick={() => setAnalyticsConsent("granted")}
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
