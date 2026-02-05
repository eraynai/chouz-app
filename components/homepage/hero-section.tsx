"use client";
import Link from "next/link";
import { useEffect } from "react";
import { initPosthog, posthog } from "@/lib/posthog";

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

      // Initialize PostHog gently on the client and track a single landing view
      initPosthog();
      try {
        posthog.capture("landing_viewed", {
          page: "landing",
          path: "/",
        });
      } catch {
        // analytics failures should never affect the experience
      }

      const updateTheme = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = viewportHeight * 0.6;

        // top = dark, scrolled = light
        if (scrollY > threshold) {
          html.classList.remove("dark");
        } else {
          html.classList.add("dark");
        }
      };

      // Initial theme setup
      updateTheme();

      // Add transition classes after a brief delay to avoid flash
      const transitionTimer = setTimeout(() => {
        document.body.classList.add(
          "transition-colors",
          "duration-[2500ms]",
          "ease-in-out"
        );
        document
          .querySelector("nav")
          ?.classList.add("transition-all", "duration-[2500ms]");
        document
          .querySelector("header")
          ?.classList.add("transition-colors", "duration-[2500ms]");
        document
          .querySelector("footer")
          ?.classList.add("transition-colors", "duration-[2500ms]");
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
      };
    }, []);

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
            <h1 className="mb-8 space-y-3 md:space-y-4 text-balance text-center text-3xl font-serif font-medium leading-tight md:text-5xl">
              <span className="block">
                I never believed in morning routines. 
              </span>
              <span className="block text-balance text-3xl leading-tight md:text-5xl">
                Then a different way of beginning changed how I start my day.
              </span>
              <span className="block text-balance text-3xl leading-tight md:text-5xl">
                <span className="italic text-[var(--color-primary)]">Five quiet minutes</span> is enough.
              </span>
            </h1>
            <div className="space-y-6 text-lg font-light leading-relaxed text-muted-light dark:text-gray-400 md:text-xl">
              <div className="mt-10 flex flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
                  <a
                    className="group relative inline-flex items-center justify-center
                              rounded-full bg-primary
                              px-4 py-2.5 text-xs
                              max-w-[260px] whitespace-normal text-center
                              md:px-6 md:py-3 md:text-sm md:max-w-none
                              font-medium text-primary-foreground
                              transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                              focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 dark:focus:ring-offset-black"
                    href="#signup"
                    onClick={() => {
                      try {
                        posthog.capture("landing_primary_cta_clicked", { location: "hero" });
                      } catch {}
                    }}
                  >
                    <span>Build your daily calm in 5 minutes</span>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h12M13 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <p className="text-xs text-muted-light dark:text-gray-500 md:ml-3">
                    Delivered by email. No credit card required.
                  </p>
                </div>
                {/* <p>
                    <span className="scroll-hint-pill">
                      <span>Scroll down to learn more</span>
                      <svg
                        className="ml-1 h-3 w-3"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path
                          d="M3.5 6.5 8 11l4.5-4.5M8 1v12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
