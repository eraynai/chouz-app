"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SignupSection() {


  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  return (
    <section
      id="signup"
      className="reveal relative overflow-hidden rounded-3xl border border-gray-200 bg-surface-light p-8 text-center dark:border-gray-800 dark:bg-surface-dark md:p-16"
    >
      <div className="relative z-10 mx-auto max-w-md">
        <h2 className="mb-4 text-3xl font-serif">Sign up for chouz</h2>
        <p className="mb-8 text-muted-light dark:text-muted-dark">
          Begin a free 5-minute breathing practice.
        </p>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();

            // prevent double submits
            if (status === "loading") return;

            setStatus("loading");
            setErrorMsg("");

            const form = e.currentTarget;
            const formData = new FormData(form);
            const email = String(formData.get("email") || "").trim();

            try {
              const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });

              const data = await res.json().catch(() => ({}));

              if (!res.ok) {
                setStatus("error");
                setErrorMsg(
                  data?.error || "Something went wrong. Please try again."
                );
                return;
              }

              setStatus("success");
              form.reset();
            } catch {
              setStatus("error");
              setErrorMsg("Network error. Please try again.");
            }
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
              autoComplete="email"
              disabled={status === "loading"}
            />
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black"
            type="submit"
            disabled={status === "loading"}
          >
            <span>
              {status === "loading"
                ? "Joining…"
                : "Get My 5-Minute Calm"}
            </span>
          </button>

          {status === "success" && (
            <p className="text-sm opacity-80">You’re in. Check your inbox.</p>
          )}

          {status === "error" && (
            <p className="text-sm text-red-500">{errorMsg}</p>
          )}
        </form>

        <p className="mt-6 text-xs opacity-60 text-muted-light dark:text-muted-dark">
          No spam. Just calm.
        </p>
      </div>
    </section>
  );
}
