"use client";

import Image from "next/image";

export default function IntroVideoSection() {
  return (
    <section className="reveal">
      <div className="relative mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-serif md:text-3xl">Hi, I&apos;m Elli</h2>
          <p className="mt-2 text-sm font-light text-gray-500 dark:text-gray-400">
            Please click on the video to learn why adopting a morning routine transformed my relationship to
            stress and changed my life.
          </p>
        </div>

        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-secondary shadow-xl ring-1 ring-gray-900/5 dark:bg-surface-dark dark:ring-white/10">
          <Image
            src="/images/place-holder-morning-routine.png"
            alt="Elli speaking about chouz and the 7-morning path"
            fill
            className="object-cover"
            priority
          />

          <button
            type="button"
            className="absolute inset-0 flex cursor-pointer items-center justify-center transition-colors duration-500 hover:bg-gray-50/60 dark:hover:bg-black/60"
            aria-label="Play introduction video"
            onClick={() => {
              // Step 2: wire YouTube player here (kept simple for now)
              // For now, do nothing to avoid shipping a half-working player.
            }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-transparent shadow-lg transition-transform duration-300 hover:scale-110 dark:border-white/60">
              <span className="material-symbols-outlined ml-1 text-3xl text-white">play_arrow</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
