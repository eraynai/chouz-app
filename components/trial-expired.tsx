"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TrialExpired() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center p-8 bg-[#fafbf8] text-[#141b0e]">
      <div className="max-w-md text-center space-y-6">
        <div className="mb-6 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-amber-50 text-amber-500 ring-1 ring-amber-200/80">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8"
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

        <div className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-light tracking-tight">
            Your 3-day journey is complete
          </h1>
          <p className="text-lg text-muted-light opacity-80">
            Thank you for spending these mornings with Chouz.
          </p>
        </div>

        <div className="pt-4 space-y-4">
          <p className="text-sm opacity-70">
            We&apos;re preparing something calm and intentional for those who want to continue.
          </p>
          
          <div className="space-y-3">
            <Button
              className="w-full rounded-full bg-amber-500 hover:bg-amber-600 text-white"
              asChild
            >
              <Link href="/#signup">
                Join the Waitlist
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full rounded-full"
              asChild
            >
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </div>
        </div>

        <p className="text-xs opacity-50 pt-4">
          Subscriptions coming soon: $6.99/month or $56/year
        </p>
      </div>
    </div>
  );
}
