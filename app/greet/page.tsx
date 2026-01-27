"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "chouz_last_greeting_date";

type GreetingMode = "loading" | "first" | "boundary" | "boundaryBypassed";

function getTodayKey() {
  const now = new Date();
  // Use local date only; no time, no timezone math
  return now.toISOString().slice(0, 10);
}

const FIRST_GREETING_VARIATIONS = [
  {
    primary: "Good morning",
    lines: [
      "I’m here with you.",
      "Take one slow breath.",
      "Notice how you’re arriving.",
    ],
  },
  {
    primary: "Good morning",
    lines: [
      "Nothing to fix right now.",
      "Let your shoulders soften a little.",
      "Notice where you’re already held.",
    ],
  },
  {
    primary: "Good morning",
    lines: [
      "You don’t have to be ready yet.",
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

export default function GreetingPage() {
  const [mode, setMode] = useState<GreetingMode>("loading");

  const variation = useMemo(() => {
    const index = Math.floor(Math.random() * FIRST_GREETING_VARIATIONS.length);
    return FIRST_GREETING_VARIATIONS[index];
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const today = getTodayKey();
    const last = window.localStorage.getItem(STORAGE_KEY);

    if (last === today) {
      setMode("boundary");
    } else {
      window.localStorage.setItem(STORAGE_KEY, today);
      setMode("first");
    }
  }, []);

  if (mode === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="opacity-60 text-sm font-light">Arriving…</div>
      </main>
    );
  }

  if (mode === "boundary") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <section className="mx-auto max-w-xl px-6 text-center">
          <p className="mb-4 text-lg font-serif">
            We’ve already met today.
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
            I’ll be here again tomorrow.
          </p>
          <button
            type="button"
            onClick={() => setMode("boundaryBypassed")}
            className="text-xs underline-offset-4 text-muted-foreground hover:text-foreground hover:underline"
          >
            Stay anyway
          </button>
        </section>
      </main>
    );
  }

  const isBypassed = mode === "boundaryBypassed";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <section className="mx-auto flex max-w-xl flex-col items-center px-6 text-center">
        <div className="animate-fade-in-up">
          <p className="mb-4 text-2xl md:text-3xl font-serif">
            {variation.primary}
          </p>

          {!isBypassed && (
            <>
              <p className="mb-2 text-sm md:text-base text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                {variation.lines[0]}
              </p>
              <p className="mb-2 text-sm md:text-base text-muted-foreground animate-fade-in-up" style={{ animationDelay: "1.4s" }}>
                {variation.lines[1]}
              </p>
              <p className="mb-2 text-sm md:text-base text-muted-foreground animate-fade-in-up" style={{ animationDelay: "2.2s" }}>
                {variation.lines[2]}
              </p>
            </>
          )}

          {isBypassed && (
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              You’re welcome to stay here quietly for a moment.
            </p>
          )}
        </div>

        <div className="mt-12 flex items-center justify-center" aria-hidden="true">
          <div className="breath-orb">
            <div className="breath-orb-ring breath-orb-ring--inner" />
            <div className="breath-orb-ring breath-orb-ring--outer" />
          </div>
        </div>
      </section>
    </main>
  );
}
