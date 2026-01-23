"use client";
import Link from "next/link";
import { useEffect } from "react";

function MoonSunIcon() {
  return (
    <svg
      className="moon-sun-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {/* Main circle (sun/moon body) */}
      <circle
        className="moon-sun-body"
        cx="12"
        cy="12"
        r="7"
      />
      {/* Rays */}
      <g className="moon-sun-rays">
        <line x1="12" y1="1.5" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22.5" />
        <line x1="1.5" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22.5" y2="12" />
        <line x1="4.5" y1="4.5" x2="6.25" y2="6.25" />
        <line x1="17.75" y1="17.75" x2="19.5" y2="19.5" />
        <line x1="4.5" y1="19.5" x2="6.25" y2="17.75" />
        <line x1="17.75" y1="6.25" x2="19.5" y2="4.5" />
      </g>
      {/* Cut-out circle that animates to create the crescent */}
      <g className="moon-sun-mask">
        <circle
          cx="12"
          cy="12"
          r="7"
        />
      </g>
    </svg>
  );
}

export default function HeroSection() {
    useEffect(() => {
      const html = document.documentElement;
      let ticking = false;

      const updateTheme = () => {
        const scrollY = window.scrollY;
        const threshold = window.innerHeight * 0.15;

        // top = dark, scrolled = light
        if(scrollY > threshold) {
          html.classList.remove("dark");
        } else {
          html.classList.add("dark");
        }
      }

      // Initial theme setup
      updateTheme();

      // Add transition classes after a brief delay to avoid flash
      const transitionTimer = setTimeout(() => {
        document.body.classList.add(
          "transition-colors",
          "duration-[2500ms]",
          "ease-in-out"
        );
        document.querySelector("nav")?.classList.add("transition-all", "duration-[2500ms]");
        document.querySelector("header")?.classList.add("transition-colors", "duration-[2500ms]");
        document.querySelector("footer")?.classList.add("transition-colors", "duration-[2500ms]");
      }, 100);

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateTheme();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll);
        clearTimeout(transitionTimer);
      }
    }, [])
    
    
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-transparent bg-background-light/80 backdrop-blur-md dark:bg-background-dark/80">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Reload homepage"
              className="inline-flex items-center justify-center"
            >
              <MoonSunIcon />
            </Link>
            <Link
              className="font-display text-4xl font-medium tracking-tight leading-none transition-opacity hover:opacity-70"
              href="/"
            >
              chouz
            </Link>
          </div>
        </div>
      </nav>

      <header className="hero-bg relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="hero-overlay" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:text-left">
          <div className="animate-fade-in-up">
            <h1 className="mb-8 text-balance text-center text-3xl font-serif font-medium leading-tight md:text-5xl">
              <span className="block">
                A calmer way to begin — {" "}
                <span className="italic text-[var(--color-primary)]">before</span> the world needs you.
              </span>
              <span className="mt-2 text-balance block text-3xl leading-tight md:text-5xl">
                So <span className="italic text-[var(--color-primary)]">you</span> can show up grounded for the people you support.
              </span>
            </h1>
            <div className="space-y-6 text-lg font-light leading-relaxed text-muted-light dark:text-gray-400 md:text-xl">
            <p>
              Chouz is a gentle morning ritual for wellness practitioners who want to feel emotionally prepared and grounded before they serve others.
            </p>
    <section className="animate-fade-in">
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-colors duration-[2500ms] ease-in-out hover:shadow-lg dark:border-gray-700 dark:bg-[#06070a] animate-float md:p-10"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-500 ring-1 ring-amber-200/80 dark:bg-amber-900/40 dark:text-amber-200 dark:ring-amber-500/60">
            <span className="material-symbols-outlined text-xl">favorite_border</span>
          </div>
          <h3 className="mb-4 text-xl font-serif text-zinc-900 dark:text-zinc-50">This is for you if:</h3>
          <ul className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
            <li className="flex items-start gap-3">
              {/* <span className="mt-2 h-1 w-1 rounded-full bg-amber-400" /> */}
              <span>You make your own schedule — and carry responsibility for others</span>
            </li>
            <li className="flex items-start gap-3">
              {/* <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400" /> */}
              <span>Your mornings feel rushed or emotionally noisy before the day begins</span>
            </li>
            <li className="flex items-start gap-3">
              {/* <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400" /> */}
              <span>You want calm without discipline, pressure, or performance</span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-colors duration-[2500ms] ease-in-out hover:shadow-lg dark:border-gray-700 dark:bg-[#06070a] md:p-10">
          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
            <span className="material-symbols-outlined">block</span>
          </div>
          <h3 className="mb-4 text-xl font-serif text-zinc-900 dark:text-zinc-50">This is not:</h3>
          <ul className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200 text-center md:text-left">
            <li className="flex items-start gap-3 justify-center md:justify-start">
              {/* <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" /> */}
              <span>A productivity system</span>
            </li>
            <li className="flex items-start gap-3 justify-center md:justify-start">
              {/* <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" /> */}
              <span>A habit-streak or discipline challenge</span>
            </li>
            <li className="flex items-start gap-3 justify-center md:justify-start">
              {/* <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" /> */}
              <span>A replacement for your existing practices</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
            <p>
              After years of navigating client pressure, uncertainty, and self-directed work, I built Chouz as a way to begin my mornings with more steadiness — a gentle practice rooted in nervous system regulation and embodied awareness.
            </p>
            <p className="text-base opacity-90 text-lg md:text-xl">
              Each morning for 7 days, you’ll receive a short, guided ritual designed to help you regulate your nervous system before your day begins.
            </p>
            {/* <p className="text-base opacity-90 md:text-lg">
              No tracking. No pressure. Just presence.
            </p>
            <p className="text-base opacity-90 md:text-lg italic">
                Why “
                <span className="text-black dark:text-white">Chouz</span>
                ”?
            </p>
            <p className="text-base opacity-90 md:text-lg">
              The Greek word resonates as it captures the feeling of staying with the morning — awake, warm, unhurried, before the day begins.
            </p> */}
            </div>

            {/* Sample of what a day’s email feels like */}
            <div className="mt-10 space-y-3">
              <span className="inline-flex items-center rounded-full border border-gray-200/70 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-black shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                Day 1 — A glimpse
              </span>

              <div className="sample-card">
                <div className="flex items-center justify-between gap-6">
                  <div className="space-y-3 text-left text-sm leading-relaxed text-zinc-800 dark:text-white">
                    <p className="sample-line sample-line-1 text-xs font-medium uppercase tracking-[0.18em] opacity-90">
                      Good morning
                    </p>
                    <p className="sample-line sample-line-2">
                      Before you reach for your phone today, pause for just a moment.
                    </p>
                    <p className="sample-line sample-line-3 text-sm opacity-90">
                      Take a slow breath in… and a longer breath out.
                    </p>
                    <p className="sample-line sample-line-4 text-sm opacity-90">
                      This isn’t a task — it’s a moment.
                    </p>
                  </div>
                  <div className="breath-orb-wrapper" aria-hidden="true">
                    <div className="breath-orb">
                      <div className="breath-orb-ring breath-orb-ring--inner" />
                      <div className="breath-orb-ring breath-orb-ring--outer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 md:flex-row">
              <a
                className="group relative inline-flex items-center justify-center rounded-pill bg-primary px-8 py-4 font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 dark:focus:ring-offset-black"
                href="#signup"
              >
                <span>Begin the 7-day Morning Path</span>
                <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>

              <p className="mt-4 text-xs text-muted-light dark:text-gray-500 md:mt-0">
                Delivered by email. No credit card required.
              </p>
            </div>
          </div>

          <div
            className="mt-16 grid grid-cols-1 gap-6 border-t border-gray-200 pt-8 text-sm text-muted-light dark:border-white/10 dark:text-gray-500 md:grid-cols-3 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-400">spa</span>
              <span>No gamification.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-400">insights</span>
              <span>No performance tracking.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-400">self_improvement</span>
              <span>Just a calm way to begin.</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
