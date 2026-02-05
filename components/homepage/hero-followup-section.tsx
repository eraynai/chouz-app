export default function HeroFollowupSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-24 space-y-10">
      <div className="space-y-4 text-lg font-light leading-relaxed text-muted-light dark:text-gray-400 md:text-xl">
        <p>
          Chouz is a gentle morning ritual for freelancers who want to begin their day grounded instead of overwhelmed.
        </p>
        <p>
          After years of navigating client pressure, uncertainty, and self-directed work, I built Chouz as a way to begin my mornings with more steadiness — a gentle practice rooted in nervous system regulation and embodied awareness.
        </p>
        {/* <p className="text-base opacity-90 text-lg md:text-xl">
          Each morning for 7 days, you&apos;ll receive a short, guided ritual designed to help you regulate your nervous system before your day begins.
        </p> */}
      </div>

      <section className="animate-fade-in">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div
            className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-colors duration-[2500ms] ease-in-out hover:shadow-lg dark:border-gray-700 dark:bg-[#06070a] animate-float md:p-10"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-500 ring-1 ring-amber-200/80 dark:bg-amber-900/40 dark:text-amber-200 dark:ring-amber-500/60">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M16.5 4.5c-1.74 0-3.41.81-4.5 2.09C10.91 5.31 9.24 4.5 7.5 4.5 4.42 4.5 2 6.92 2 10c0 3.86 3.4 6.63 8.55 11.28L12 22.35l1.45-1.32C18.6 16.63 22 13.86 22 10c0-3.08-2.42-5.5-5.5-5.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-serif text-zinc-900 dark:text-zinc-50">This is for you if:</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
              <li className="flex items-start gap-3">
                <span>You make your own schedule — and carry responsibility for others</span>
              </li>
              <li className="flex items-start gap-3">
                <span>Your mornings feel rushed or emotionally noisy before the day begins</span>
              </li>
              <li className="flex items-start gap-3">
                <span>You want calm without discipline, pressure, or performance</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-colors duration-[2500ms] ease-in-out hover:shadow-lg dark:border-gray-700 dark:bg-[#06070a] md:p-10">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="7.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <line
                  x1="8.5"
                  y1="8.5"
                  x2="15.5"
                  y2="15.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-serif text-zinc-900 dark:text-zinc-50">This is not:</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200 md:text-left">
              <li className="flex items-start gap-3">
                <span>A productivity system</span>
              </li>
              <li className="flex items-start gap-3">
                <span>A habit-streak or discipline challenge</span>
              </li>
              <li className="flex items-start gap-3">
                <span>A replacement for your existing practices</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* <div className="mt-10 space-y-3">
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
                This isn&apos;t a task — it&apos;s a moment.
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
      </div> */}

      <div
  className="mt-16 grid grid-cols-1 gap-6 border-t border-gray-200 pt-8 text-sm text-muted-light dark:border-white/10 dark:text-gray-500 md:grid-cols-3 animate-fade-in"
  style={{ animationDelay: "0.4s" }}
>
  <div className="flex items-center gap-3">
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gray-400"
      aria-hidden="true"
    >
      <path
        d="M12 4c-1.5 2-2.5 4.5-2.5 7 0 2.2.9 3.9 2.5 5 1.6-1.1 2.5-2.8 2.5-5 0-2.5-1-5-2.5-7zM5 9c-.8 1.4-1.3 3-1.3 4.5 0 2.3 1 4 2.6 5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 9c.8 1.4 1.3 3 1.3 4.5 0 2.3-1 4-2.6 5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
    <span>No gamification.</span>
  </div>
  <div className="flex items-center gap-3">
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gray-400"
      aria-hidden="true"
    >
      <path
        d="M5 17l4-6 3 4 4-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="5" cy="17" r="1.2" fill="currentColor" />
      <circle cx="9" cy="11" r="1.2" fill="currentColor" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
      <circle cx="16" cy="7" r="1.2" fill="currentColor" />
    </svg>
    <span>No performance tracking.</span>
  </div>
  <div className="flex items-center gap-3">
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-gray-400"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="7"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 20c1-1.8 2.3-3 4-3s3 1.2 4 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7 14c1-.8 2.5-1.5 5-1.5s4 .7 5 1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
    <span>Just a calm way to begin.</span>
  </div>
</div>
    </section>
  );
}
