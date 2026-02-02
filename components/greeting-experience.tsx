"use client";

import { useEffect, useMemo, useState } from "react";
import type { TrialStatus } from "@/lib/trial";

const STORAGE_KEY = "chouz_last_greeting_date";

type GreetingMode = "loading" | "first" | "boundary" | "boundaryBypassed" | "invitation";

interface MorningContext {
  location: {
    city?: string | null;
    region?: string | null;
    country?: string | null;
  } | null;
  weather: {
    temperatureC: number | null;
    kind: string | null;
    code: number | null;
  } | null;
  suggestion: string | null;
}

function getTodayKey() {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

const FIRST_GREETING_VARIATIONS = [
  {
    primary: "Good morning",
    lines: [
      "I'm here with you.",
      "Take one slow breath.",
      "Notice how you're arriving.",
    ],
  },
  {
    primary: "Good morning",
    lines: [
      "Nothing to fix right now.",
      "Let your shoulders soften a little.",
      "Notice where you're already held.",
    ],
  },
  {
    primary: "Good morning",
    lines: [
      "You don't have to be ready yet.",
      "Let your breath arrive before your day does.",
      "Stay with the part of you that is still waking.",
    ],
  },
  {
    primary: "Good morning",
    lines: [
      "You give a lot of yourself.",
      "Take one breath that is only for you.",
      "Notice what shifts, even slightly.",
    ],
  },
];

interface GreetingExperienceProps {
  trialStatus: TrialStatus;
}

export default function GreetingExperience({ trialStatus }: GreetingExperienceProps) {
  const [mode, setMode] = useState<GreetingMode>("loading");
  const [morningContext, setMorningContext] = useState<MorningContext | null>(null);
  const [contextLoading, setContextLoading] = useState<boolean>(true);
  const [sunPhase, setSunPhase] = useState<{
    phase: string;
    altitudeDeg: number | null;
    colors: { base: string; glow: string } | null;
  } | null>(null);

  const variation = useMemo(() => {
    const index = Math.floor(Math.random() * FIRST_GREETING_VARIATIONS.length);
    return FIRST_GREETING_VARIATIONS[index];
  }, []);

  const sunIntensity = useMemo(() => {
    const alt = sunPhase?.altitudeDeg;
    if (typeof alt !== "number") return 0.5; // neutral baseline
    const clamped = Math.max(-5, Math.min(60, alt));
    return (clamped + 5) / 65; // map [-5,60] -> [0,1]
  }, [sunPhase?.altitudeDeg]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // As a developer, always see the full "first" greeting experience and
    // ignore the once-per-day boundary based on localStorage.
    if (trialStatus.isDeveloper) {
      window.localStorage.removeItem(STORAGE_KEY);
      setMode("first");
      return;
    }

    const today = getTodayKey();
    const last = window.localStorage.getItem(STORAGE_KEY);

    if (last === today) {
      setMode("boundary");
    } else {
      window.localStorage.setItem(STORAGE_KEY, today);
      setMode("first");
    }
  }, [trialStatus.isDeveloper]);

  // Fetch morning context (location + weather-based suggestion)
  useEffect(() => {
    let cancelled = false;

    async function fetchContext() {
      try {
        const res = await fetch("/api/morning-context");
        if (!res.ok) return;
        const data = (await res.json()) as MorningContext;
        if (!cancelled) {
          setMorningContext(data);
        }
      } catch {
        // fail silently – we can always fall back to copy baked into the UI
      } finally {
        if (!cancelled) {
          setContextLoading(false);
        }
      }
    }

    async function fetchSunPhase() {
      try {
        const res = await fetch(`/api/sun-phase?ts=${Date.now()}`);
        if (!res.ok) return;
        const data = (await res.json()) as {
          phase: string;
          altitudeDeg: number | null;
          colors: { base: string; glow: string } | null;
        };
        if (!cancelled) {
          setSunPhase({
            phase: data.phase,
            altitudeDeg: data.altitudeDeg ?? null,
            colors: data.colors,
          });
        }
      } catch {
        // ignore, we can fall back to default orb colors
      }
    }

    fetchContext();
    fetchSunPhase();

    const interval = setInterval(fetchSunPhase, 60_000); // update roughly every minute

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Transition to invitation screen after animation completes
  useEffect(() => {
    if (mode === "first" || mode === "boundaryBypassed") {
      const timer = setTimeout(() => {
        setMode("invitation");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  if (mode === "loading") {
    return (
      <main className="relative flex h-screen w-full flex-col items-center justify-center p-8 bg-charcoal text-white vignette">
        <div className="opacity-60 text-sm font-light font-display">Arriving…</div>
      </main>
    );
  }

  if (mode === "boundary") {
    return (
      <main className="relative flex h-screen w-full flex-col items-center justify-center p-8 bg-charcoal text-white vignette">
        <section className="mx-auto max-w-xl px-6 text-center">
          <p className="mb-4 text-2xl md:text-3xl font-display font-light">
            We&apos;ve already met today.
          </p>
          <p className="mb-8 text-lg md:text-xl font-display italic font-extralight opacity-70">
            I&apos;ll be here again tomorrow.
          </p>
          {trialStatus.isActive && !trialStatus.isDeveloper && (
            <p className="mb-4 text-sm opacity-60">
              {trialStatus.daysRemaining} {trialStatus.daysRemaining === 1 ? 'day' : 'days'} remaining in your trial
            </p>
          )}
          <button
            type="button"
            onClick={() => setMode("boundaryBypassed")}
            className="group min-w-[120px] md:min-w-[160px] rounded-full h-12 px-8 bg-white/5 border border-white/10 hover:border-white/40 hover:bg-white/10 text-white text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-all duration-500"
          >
            Stay anyway
          </button>
        </section>
      </main>
    );
  }

  const isBypassed = mode === "boundaryBypassed";

  // Invitation screen - breathing practice
  if (mode === "invitation") {
    const coreColor = sunPhase?.colors?.base ?? "#fef9c3";
    const innerColor = sunPhase?.colors?.base ?? "#facc15";
    const haloColor = sunPhase?.colors?.glow ?? "#fde68a";

    const coreScale = 0.98 + 0.22 * sunIntensity;
    const coreOpacity = 0.9 + 0.1 * sunIntensity;      // 0.9–1.0
    const innerOpacity = 0.8 + 0.2 * sunIntensity;     // 0.8–1.0
    const haloOpacity = 0.7 + 0.25 * sunIntensity;     // 0.7–0.95

    const pulseDuration = 3.5 - 1.5 * sunIntensity; // seconds, 2.0–3.5 roughly

    return (
      <div className="min-h-screen flex flex-col p-8 max-w-md mx-auto bg-charcoal text-white animate-fade-in-slow">
        {/* Header */}
        <div className="flex justify-between items-center py-6">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/onboarding/location?mode=edit&returnTo=/greet";
            }}
            className="text-sm text-zinc-200 hover:text-white text-left max-w-[60%] truncate"
          >
            {trialStatus.wakingLocationLabel || "chouz"}
          </button>
          {trialStatus.isActive && !trialStatus.isDeveloper && (
            <div className="text-xs text-zinc-500">
              Day {trialStatus.daysUsed + 1} of 3
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center space-y-16">
          <h1 className="text-2xl leading-relaxed font-light font-display">
            Notice the weight of your body where you are sitting.
            <br />
            <br />
            Take one breath that is just for you.
          </h1>

          {/* Optional context suggestion */}
          {morningContext?.suggestion && !contextLoading && (
            <p className="text-sm text-zinc-400 leading-relaxed">
              {(() => {
                const parts: string[] = [];
                const loc = morningContext.location;

                if (loc?.city) parts.push(loc.city);
                if (!loc?.city && loc?.region) parts.push(loc.region);
                if (loc?.country) parts.push(loc.country);

                const place = parts.length ? parts.join(", ") : null;
                const temp =
                  typeof morningContext.weather?.temperatureC === "number"
                    ? `${Math.round(morningContext.weather.temperatureC)}°C`
                    : null;

                if (place && temp) {
                  return `${morningContext.suggestion} Right now it's about ${temp} in ${place}.`;
                }

                if (place) {
                  return `${morningContext.suggestion} You are somewhere around ${place} this morning.`;
                }

                if (temp) {
                  return `${morningContext.suggestion} It's about ${temp} where you are.`;
                }

                return morningContext.suggestion;
              })()}
            </p>
          )}

          {/* Breathing Orb */}
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Outer glow */}
              <div
                className="animate-pulse-slow absolute w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle, ${haloColor}20, transparent 70%)`,
                  opacity: haloOpacity,
                  animationDuration: `${pulseDuration + 1.5}s`,
                }}
              />

              {/* Inner glow */}
              <div
                className="animate-pulse-slow absolute w-40 h-40 rounded-full blur-[40px]"
                style={{
                  animationDelay: "-0.6s",
                  backgroundColor: innerColor,
                  opacity: innerOpacity,
                  animationDuration: `${pulseDuration + 1}s`,
                }}
              />

              {/* Core orb */}
              <div
                className="animate-pulse-slow absolute w-32 h-32 rounded-full shadow-[0_0_45px_rgba(0,0,0,0.4)]"
                style={{
                  background: `radial-gradient(circle, ${coreColor}, ${haloColor})`,
                  transform: `scale(${coreScale})`,
                  opacity: coreOpacity,
                  animationDuration: `${pulseDuration}s`,
                }}
              />
            </div>

            {/* Sun phase label */}
            {sunPhase && (
              <div className="mt-12 text-center">
                <p className="text-sm text-zinc-500 capitalize">
                  {sunPhase.phase?.replace(/-/g, " ") ?? "unknown"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <button className="text-zinc-500 text-sm py-4 hover:text-zinc-300">
            I am here
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center p-8 bg-charcoal text-white overflow-hidden selection:bg-primary/30 vignette">
      {/* Content Area */}
      <div className="flex flex-col items-center justify-center max-w-[960px] text-center">
        <div className="animate-fade-in duration-1000">
          <h1 className="font-display text-white tracking-tight text-6xl md:text-8xl font-light leading-tight mb-4 select-none">
            {variation.primary}
          </h1>
        </div>

        {!isBypassed && (
          <>
            <p className="font-display italic text-xl md:text-2xl font-extralight leading-relaxed select-none opacity-70 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              {variation.lines[0]}
            </p>
          </>
        )}

        {isBypassed && (
          <p className="font-display italic text-xl md:text-2xl font-extralight leading-relaxed select-none opacity-70">
            You&apos;re welcome to stay here quietly for a moment.
          </p>
        )}
      </div>

      {/* Trial status indicator */}
      {trialStatus.isActive && !trialStatus.isDeveloper && (
        <div className="absolute top-8 right-8 text-xs opacity-50">
          Day {trialStatus.daysUsed + 1} of 3
        </div>
      )}

      {/* Begin Button positioned at bottom */}
      <div className="absolute bottom-16 md:bottom-24 w-full flex justify-center px-4">
        <div className="flex flex-col w-full max-w-[480px]">
          <div className="flex px-4 py-3 justify-center">
            <button
              type="button"
              onClick={() => setMode("invitation")}
              className="group flex min-w-[120px] md:min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-white/5 border border-white/10 hover:border-white/40 hover:bg-white/10 text-white text-base font-medium leading-normal tracking-widest transition-all duration-500"
            >
              <span className="truncate uppercase text-xs tracking-[0.2em] opacity-80 group-hover:opacity-100">
                Begin
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Atmospheric Detail */}
      <div className="absolute top-12 left-12 opacity-20 hidden md:block">
        <span className="material-symbols-outlined text-4xl font-extralight">
          partly_cloudy_day
        </span>
      </div>

      {/* Background Layer (Abstract Gradient Pattern) */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(32,112,223,0.15),transparent)]" />
      </div>
    </main>
  );
}
