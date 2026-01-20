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
  
    // <section className="py-20">
    //   <div className="relative z-10 mx-auto w-full max-w-2xl px-6 lg:px-0">
    //     <div className="relative text-center">
    //       <p className="text-3xl">🔥</p>
    //       <h1 className="mx-auto mt-12 max-w-xl text-balance text-5xl font-medium">
    //         Nextjs Starter Elli Homepage
    //       </h1>
    //       <p className="text-muted-foreground mx-auto mb-6 mt-4 text-balance text-xl">
    //         This powerful starter kit is designed to help you launch your SAAS
    //         application quickly and efficiently.
    //       </p>
    //       <div className="flex flex-col items-center gap-2 *:w-full sm:flex-row sm:justify-center sm:*:w-auto">
    //         <Button asChild variant="default" size="sm">
    //           <Link href="/dashboard" prefetch={true}>
    //             <span className="text-nowrap">Get Started</span>
    //           </Link>
    //         </Button>
    //         <Button asChild variant="outline" size="sm">
    //           <Link
    //             href="https://github.com/michaelshimeles/nextjs-starter-kit"
    //             target="_blank"
    //             rel="noreferrer"
    //           >
    //             <span className="text-nowrap">Github</span>
    //           </Link>
    //         </Button>
    //       </div>
    //     </div>

    //     <div className="relative mt-8 overflow-hidden rounded-3xl bg-black/10">
    //       <Image
    //         src="https://images.unsplash.com/photo-1547623641-d2c56c03e2a7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //         alt=""
    //         className="absolute inset-0 size-full object-cover"
    //         width={1920}
    //         height={1080}
    //       />

    //       <div className="bg-background rounded-(--radius) relative m-4 overflow-hidden border border-transparent shadow-xl shadow-black/15 ring-1 ring-black/10 sm:m-8 md:m-12">
    //         <Image
    //           src="https://jdj14ctwppwprnqu.public.blob.vercel-storage.com/GsZRNq5WsAAMbrG-H9YrPK4HJnXSQV692jECFST4zyYpva.jpg"
    //           alt="app screen"
    //           width="2880"
    //           height="1842"
    //           className="object-top-left size-full object-cover"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </section>
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
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center md:text-left">
          <div className="animate-fade-in-up">
            <span className="mb-6 inline-block rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-light backdrop-blur-sm dark:border-white/10 dark:bg-white/10 dark:text-gray-300">
              7-Day Journey
            </span>

            <h1 className="mb-8 text-balance text-4xl font-serif font-medium leading-tight md:text-6xl">
              A calmer way to begin — {" "}
              <span className="italic text-gray-400 dark:text-gray-500">before</span> the world needs you.
            </h1>

            <div className="space-y-6 text-lg font-light leading-relaxed text-muted-light dark:text-gray-400 md:text-xl">
              <p>
                Chouz is a gentle morning ritual for wellness practitioners who want to feel emotionally prepared and grounded before they serve others.
              </p>
              <p className="text-base opacity-90 md:text-lg">
                Each morning for 7 days, you’ll receive a short, guided ritual designed to help you regulate your nervous system before your day begins.
              </p>
              <p className="text-base opacity-90 md:text-lg">
                No tracking. No pressure. Just presence.
              </p>
              <p className="text-base opacity-90 md:text-lg italic">
                  Why “
                  <span className="text-black dark:text-white">Chouz</span>
                  ”?
              </p>
              <p className="text-base opacity-90 md:text-lg">
                A Greek word for staying with the morning — awake, warm, unhurried, before the day begins.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 md:flex-row">
              <a
                className="group relative inline-flex items-center justify-center rounded-pill bg-primary px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:bg-white dark:text-black dark:focus:ring-offset-black"
                href="#signup"
              >
                <span>Begin the 7-day Morning Path</span>
                <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </a>

              <p className="mt-4 text-xs text-muted-light dark:text-gray-500 md:mt-0">
                Delivered by email. No app required.
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
