"use client";

import { useEffect, useRef } from "react";

export default function SevenMorningsSection() {
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const animateCounter = () => {
      const el = counterRef.current;
      if (!el) return;

      let count = 0;
      const target = 7;
      const duration = 1500;
      const interval = duration / 20;

      const timer = window.setInterval(() => {
        count += 0.5;
        if (count >= target) {
          count = target;
          window.clearInterval(timer);
        }
        el.textContent = String(Math.floor(count));
      }, interval);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("active");

          // Only animate counter for this section
          if ((entry.target as HTMLElement).querySelector("#counter")) animateCounter();

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="reveal grid items-center gap-12 md:grid-cols-2">
      <div className="rounded-2xl bg-secondary p-8 transition-all duration-500 hover:shadow-md dark:bg-background-dark md:order-2">
        <div className="mb-2 flex items-baseline">
          <span
            className="mr-2 text-5xl font-serif text-primary dark:text-white"
            id="counter"
            ref={counterRef}
          >
            0
          </span>
          <span className="text-xl text-muted-light dark:text-muted-dark">mornings</span>
        </div>

        <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full w-[100%] rounded-full bg-primary opacity-20 dark:bg-white" />
        </div>

        <p className="text-sm italic text-muted-light dark:text-muted-dark">
          &quot;A different relationship to mornings — one you&apos;ll actually want to return to.&quot;
        </p>
      </div>

      <div className="md:order-1">
        <h2 className="mb-6 text-2xl font-serif md:text-3xl">Over 7 mornings, you&apos;ll experience:</h2>
        <ul className="space-y-4">
          {[
            "Short, calming prompts you can read as you go",
            "Gentle structure, without obligation",
            "A quiet start before the world asks anything of you",
          ].map((text) => (
            <li key={text} className="group flex items-start gap-3">
              <div className="mt-1 rounded-full bg-gray-100 p-1 transition-colors group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
                <span className="material-symbols-outlined text-sm text-gray-600 dark:text-gray-300">
                  check
                </span>
              </div>
              <span className="text-muted-light transition-colors group-hover:text-text-light dark:text-muted-dark dark:group-hover:text-text-dark">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
