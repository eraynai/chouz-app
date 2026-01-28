"use client";

import posthog from "posthog-js";

let initialized = false;

export function initPosthog() {
  if (initialized) return;
  if (typeof window === "undefined") return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    // Use PostHog's recommended defaults so pageviews & basic web analytics work out of the box
    defaults: "2025-11-30",
  });

  initialized = true;
}

export { posthog };
