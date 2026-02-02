"use client";

import type { FC } from "react";
import { cn } from "@/lib/utils";

export type InlineLoadingVariant = "spinner";
export type InlineLoadingSize = "sm" | "md" | "lg";

interface InlineLoadingProps {
  variant?: InlineLoadingVariant;
  size?: InlineLoadingSize;
  className?: string;
}

const sizeClasses: Record<InlineLoadingSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const InlineLoading: FC<InlineLoadingProps> = ({
  variant = "spinner",
  size = "md",
  className,
}) => {
  const base = sizeClasses[size] ?? sizeClasses.md;

  if (variant === "spinner") {
    return (
      <span
        className={cn("inline-flex items-center justify-center", className)}
        aria-hidden="true"
      >
        <span
          className={cn(
            "border-2 border-white/20 border-t-[#f59e0b]/60 rounded-full animate-spin",
            base,
          )}
        />
      </span>
    );
  }

  return <span className={cn(base, className)} />;
};

export default InlineLoading;
