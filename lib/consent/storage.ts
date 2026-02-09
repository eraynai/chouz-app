"use client";

export type AnalyticsConsent = "granted" | "denied";
export type AnalyticsConsentState = AnalyticsConsent | null;

const CONSENT_COOKIE = "analytics_consent";
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

function canUseDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function readCookie(name: string): string | null {
  if (!canUseDOM()) return null;
  const prefix = `${name}=`;
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (const cookie of cookies) {
    if (cookie.startsWith(prefix)) {
      return decodeURIComponent(cookie.slice(prefix.length));
    }
  }
  return null;
}

function writeCookie(name: string, value: string, maxAgeSeconds: number) {
  if (!canUseDOM()) return false;
  const secure =
    typeof window !== "undefined" &&
    window.location?.protocol === "https:" &&
    process.env.NODE_ENV === "production"
      ? "; Secure"
      : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secure}`;
  return readCookie(name) === value;
}

function writeLocalStorage(value: string) {
  if (!canUseDOM()) return;
  try {
    window.localStorage.setItem(CONSENT_COOKIE, value);
  } catch {
    // Ignore storage errors
  }
}

export function readConsent(): AnalyticsConsentState {
  if (!canUseDOM()) return null;
  const cookieValue = readCookie(CONSENT_COOKIE);
  if (cookieValue === "granted" || cookieValue === "denied") {
    return cookieValue;
  }

  try {
    const stored = window.localStorage.getItem(CONSENT_COOKIE);
    if (stored === "granted" || stored === "denied") {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }

  return null;
}

export function writeConsent(value: AnalyticsConsent) {
  if (!canUseDOM()) return;
  const cookieWritten = writeCookie(CONSENT_COOKIE, value, CONSENT_MAX_AGE_SECONDS);
  if (!cookieWritten) {
    writeLocalStorage(value);
  } else {
    writeLocalStorage(value);
  }
}

export function clearConsent() {
  if (!canUseDOM()) return;
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  try {
    window.localStorage.removeItem(CONSENT_COOKIE);
  } catch {
    // Ignore storage errors
  }
}

export function clearCookiesByPrefix(prefix: string) {
  if (!canUseDOM()) return;
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  cookies.forEach((cookie) => {
    const [name] = cookie.split("=");
    if (name && name.startsWith(prefix)) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    }
  });
}
