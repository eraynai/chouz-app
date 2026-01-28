"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "chouz_last_greeting_date";

type GreetingMode = "loading" | "first" | "boundary" | "boundaryBypassed" | "invitation";

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

  // Transition to invitation screen after animation completes
  useEffect(() => {
    if (mode === "first" || mode === "boundaryBypassed") {
      // Wait for greeting + first line animation (1000ms + 600ms + 900ms animation duration)
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
            We've already met today.
          </p>
          <p className="mb-8 text-lg md:text-xl font-display italic font-extralight opacity-70">
            I'll be here again tomorrow.
          </p>
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
    return (
      <div className="relative flex h-screen w-full flex-col overflow-x-hidden bg-[#fafbf8] text-[#141b0e] animate-fade-in-slow">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#edf3e8] px-10 py-3 mx-auto w-full max-w-[960px]">
          <div className="flex items-center gap-4 text-[#141b0e]">
            <div className="size-4 text-[#80df20]">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] font-display">Morning Companion</h2>
          </div>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#edf3e8] text-[#141b0e] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#80df20]/20 transition-colors">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-10 relative">
          {/* Headline Text */}
          <div className="layout-content-container flex flex-col max-w-[640px] w-full text-center z-10">
            <h2 className="text-[#141b0e] tracking-tight text-[28px] md:text-[32px] font-light leading-[1.6] px-4 pb-12 transition-opacity duration-1000">
              Notice the weight of your body where you are sitting. <br /> Take one breath that is just for you.
            </h2>
          </div>

          {/* Breathing Orb (The Practice) */}
          <div className="relative flex items-center justify-center w-full h-64 md:h-80 mb-12">
            {/* Inner Orb */}
            <div className="animate-pulse-slow absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#80df20]/40"></div>
            {/* Outer Glow */}
            <div className="animate-pulse-slow absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#80df20]/10 blur-[80px]" style={{ animationDelay: '-1s' }}></div>
          </div>

          {/* Footer / Interaction */}
          <div className="mt-auto pb-10 flex flex-col items-center">
            <button className="group flex flex-col items-center gap-2">
              <p className="text-[#739550] text-base font-normal leading-normal px-4 text-center underline underline-offset-8 decoration-1 hover:decoration-2 transition-all duration-300">
                I am here
              </p>
            </button>
          </div>
        </main>
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
            You're welcome to stay here quietly for a moment.
          </p>
        )}
      </div>

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
