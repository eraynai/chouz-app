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
    // Use PostHog's recommended defaults so pageviews, web analytics & web vitals work out of the box
    defaults: "2025-11-30",
    // Capture all core web vitals (FCP, LCP, INP, CLS) with sensible defaults
    capture_performance: {
      // keep PostHog's default of all 4 metrics
      web_vitals_allowed_metrics: ["LCP", "CLS", "FCP", "INP"],
      // rely on SDK defaults for max value and flush delay unless we see issues
      // __web_vitals_max_value: 15 * 60 * 1000,
      // web_vitals_delayed_flush_ms: 5000,
    },
  });

  initialized = true;
}

export { posthog };
