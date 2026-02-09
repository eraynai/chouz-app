"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AnalyticsConsent, AnalyticsConsentState } from "@/lib/consent/storage";
import { readConsent, writeConsent } from "@/lib/consent/storage";

type ConsentContextValue = {
  analyticsConsent: AnalyticsConsentState;
  ready: boolean;
  setAnalyticsConsent: (value: AnalyticsConsent) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export default function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [analyticsConsent, setAnalyticsConsentState] = useState<AnalyticsConsentState>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setAnalyticsConsentState(stored);
    setReady(true);
  }, []);

  const setAnalyticsConsent = useCallback((value: AnalyticsConsent) => {
    writeConsent(value);
    setAnalyticsConsentState(value);
  }, []);

  const contextValue = useMemo(
    () => ({
      analyticsConsent,
      ready,
      setAnalyticsConsent,
    }),
    [analyticsConsent, ready, setAnalyticsConsent]
  );

  return <ConsentContext.Provider value={contextValue}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return context;
}
