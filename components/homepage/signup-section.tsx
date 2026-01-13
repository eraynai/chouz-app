"use client";

import { useEffect, useState } from "react";

export default function SignupSection() {
  const [countdown, setCountdown] = useState({
    days: "02",
    hours: "14",
    minutes: "35",
    seconds: "12",
  });

  useEffect(() => {
    let endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + 250000);

    const tick = () => {
      const now = Date.now();
      let timeLeft = endTime.getTime() - now;

      if (timeLeft < 0) {
        endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + 250000);
        timeLeft = endTime.getTime() - now;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="signup"
      className="reveal relative overflow-hidden rounded-3xl border border-gray-200 bg-surface-light p-8 text-center dark:border-gray-800 dark:bg-surface-dark md:p-16"
    >
      <div className="relative z-10 mx-auto max-w-md">
        <h2 className="mb-4 text-3xl font-serif">Sign up for chouz</h2>
        <p className="mb-8 text-muted-light dark:text-muted-dark">Join the free 7-morning journey.</p>

        <div className="mb-8 rounded-2xl border border-gray-100 bg-secondary/50 px-4 py-6 backdrop-blur-sm dark:border-white/5 dark:bg-white/5">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-light opacity-80 dark:text-muted-dark">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span>Registration Closes In</span>
          </div>

          <div className="mx-auto grid max-w-sm grid-cols-4 gap-2 text-center md:gap-4">
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Mins", value: countdown.minutes },
              { label: "Secs", value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="tabular-nums text-2xl font-serif font-medium tracking-tight text-primary dark:text-white md:text-3xl">
                  {item.value}
                </span>
                <span className="mt-2 text-[10px] uppercase tracking-widest text-muted-light dark:text-gray-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Welcome to chouz. Check your inbox.");
          }}
        >
          <div className="text-left">
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none transition-all placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-black/30 dark:text-white dark:placeholder-gray-600 dark:focus:ring-gray-600"
              id="email"
              name="email"
              placeholder="name@example.com"
              required
              type="email"
            />
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-black"
            type="submit"
          >
            <span>Begin the chouz Morning Path</span>
          </button>
        </form>

        <p className="mt-6 text-xs opacity-60 text-muted-light dark:text-muted-dark">No spam. Just calm.</p>
      </div>
    </section>
  );
}
