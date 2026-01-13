"use client";

export default function ForYouSection() {
  return (
    <section className="reveal">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-surface-dark animate-float" style={{ animationDelay: "0.2s" }}>
          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
            <span className="material-symbols-outlined">favorite_border</span>
          </div>
          <h3 className="mb-4 text-xl font-serif">This is for you if:</h3>
          <ul className="space-y-3 text-sm leading-relaxed text-muted-light dark:text-muted-dark">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              You make your own schedule
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Your mornings feel rushed or emotionally noisy
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              You want calm without discipline or pressure
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-inner transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-black/20 dark:hover:bg-black/30">
          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            <span className="material-symbols-outlined">block</span>
          </div>
          <h3 className="mb-4 text-xl font-serif text-gray-600 dark:text-gray-300">This is not:</h3>
          <ul className="space-y-3 text-sm leading-relaxed text-muted-light dark:text-muted-dark">
            <li className="flex items-center gap-2 opacity-75">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              A productivity system
            </li>
            <li className="flex items-center gap-2 opacity-75">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              A habit-streak challenge
            </li>
            <li className="flex items-center gap-2 opacity-75">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              A meditation app replacement
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
