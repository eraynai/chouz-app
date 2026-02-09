"use client";

import type posthogJs from "posthog-js";
import { clearCookiesByPrefix } from "@/lib/consent/storage";

let posthogRef: typeof posthogJs | null = null;
let initialized = false;
let initPromise: Promise<typeof posthogJs | null> | null = null;

export function analyticsEnabled() {
  return (
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true" ||
    process.env.NODE_ENV === "production"
  );
}

export function getPosthog() {
  return posthogRef;
}

export async function initPosthog() {
  if (initialized && posthogRef) return posthogRef;
  if (initPromise) return initPromise;
  if (typeof window === "undefined") return null;
  if (!analyticsEnabled()) return null;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;

  initPromise = import("posthog-js")
    .then(({ default: posthog }) => {
      posthogRef = posthog;
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        // Use PostHog's recommended defaults so pageviews, web analytics & web vitals work out of the box
        defaults: "2025-11-30",
        // Capture all core web vitals (FCP, LCP, INP, CLS) with sensible defaults
        capture_performance: {
          web_vitals_allowed_metrics: ["LCP", "CLS", "FCP", "INP"],
        },
      });

      try {
        posthog.opt_in_capturing();
      } catch {
        // ignore opt-in failures
      }

      // 👇 expose for DevTools debugging
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).posthog = posthog;

      initialized = true;
      return posthog;
    })
    .catch(() => null);

  return initPromise;
}

export function trackPosthog(event: string, properties?: Record<string, unknown>) {
  if (!posthogRef) return;
  try {
    posthogRef.capture(event, properties);
  } catch {
    // analytics failures should never affect the experience
  }
}

export function resetPosthog() {
  if (posthogRef) {
    try {
      posthogRef.opt_out_capturing();
      posthogRef.reset();
    } catch {
      // ignore reset failures
    }
  }

  clearPosthogCookies();
  posthogRef = null;
  initialized = false;
  initPromise = null;
}

export function clearPosthogCookies() {
  clearCookiesByPrefix("ph_");
  clearCookiesByPrefix("posthog");
}

export { posthogRef as posthog };
