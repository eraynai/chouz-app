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
    autocapture: false,
    capture_pageview: false,
    disable_session_recording: false,
  });

  initialized = true;
}

export { posthog };
