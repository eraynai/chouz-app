"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { analyticsEnabled, initPosthog, resetPosthog, trackPosthog } from "@/lib/posthog";
import type { AnalyticsConsentState } from "@/lib/consent/storage";

export default function PostHogGate() {
  const { analyticsConsent, ready } = useConsent();
  const previousConsent = useRef<AnalyticsConsentState | undefined>(undefined);

  useEffect(() => {
    if (!ready) return;
    const enabled = analyticsEnabled();

    if (previousConsent.current === undefined) {
      previousConsent.current = analyticsConsent;
      if (analyticsConsent === "granted" && enabled) {
        void initPosthog();
      } else if (analyticsConsent === "denied") {
        resetPosthog();
      }
      return;
    }

    if (analyticsConsent === "granted") {
      if (!enabled) {
        previousConsent.current = analyticsConsent;
        return;
      }
      void initPosthog().then(() => {
        if (previousConsent.current === "denied") {
          trackPosthog("consent_changed");
        } else if (previousConsent.current === null) {
          trackPosthog("consent_granted");
        }
      });
    } else if (analyticsConsent === "denied") {
      resetPosthog();
    }

    previousConsent.current = analyticsConsent;
  }, [analyticsConsent, ready]);

  return null;
}
