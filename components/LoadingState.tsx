"use client";

import type { FC } from "react";

export type LoadingStateVariant = "heartbeat";

interface LoadingStateProps {
  variant?: LoadingStateVariant;
  message?: string;
}

const LoadingState: FC<LoadingStateProps> = ({ variant = "heartbeat", message }) => {
  // Heartbeat-style full-screen loader for transitions and data fetching.
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0f0f0f] text-white">
      <div className="flex flex-col items-center space-y-6">
        {variant === "heartbeat" && (
          <div className="relative flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#f59e0b]/60 animate-pulse" />
            <div className="absolute -inset-4 rounded-full border border-[#f59e0b]/20 animate-ping" />
          </div>
        )}
        {message && (
          <p className="text-sm text-zinc-400 lowercase tracking-[0.16em]">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingState;
