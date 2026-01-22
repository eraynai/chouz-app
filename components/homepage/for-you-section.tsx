"use client";

export default function ForYouSection() {
  return (
    <>
    <section className="reveal pt-24">
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-white animate-float md:p-10"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            <span className="material-symbols-outlined">favorite_border</span>
          </div>
          <h3 className="mb-4 text-xl font-serif text-zinc-900">This is for you if:</h3>
          <ul className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-700">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              You make your own schedule — and carry responsibility for others
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Your mornings feel rushed or emotionally noisy before the day begins
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              You want calm without discipline, pressure, or performance
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-white md:p-10">
          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-100 dark:text-gray-600">
            <span className="material-symbols-outlined">block</span>
          </div>
          <h3 className="mb-4 text-xl font-serif text-zinc-900">This is not:</h3>
          <ul className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-700">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              A productivity system
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              A habit-streak or discipline challenge
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              A replacement for your existing practices
            </li>
          </ul>
        </div>
         
      </div>
      
    </section>
    {/* <div className="text-center">
          <p>Chouz is meant to support your mornings — not control them.</p>
      </div> */}
    </>
  );
}
