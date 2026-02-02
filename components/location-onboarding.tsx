"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationOnboardingProps {
  initialLabel: string;
  initialLatitude: number | null;
  initialLongitude: number | null;
  returnTo: string;
}

export default function LocationOnboarding({
  initialLabel,
  initialLatitude,
  initialLongitude,
  returnTo,
}: LocationOnboardingProps) {
  const router = useRouter();
  const [label, setLabel] = useState(initialLabel ?? "");
  const [latitude, setLatitude] = useState<number | null>(initialLatitude);
  const [longitude, setLongitude] = useState<number | null>(initialLongitude);
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const hasPreciseCoords = typeof latitude === "number" && typeof longitude === "number";

  async function handleSave() {
    if (!label.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/profile/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: label.trim(),
          latitude,
          longitude,
        }),
      });

      if (!res.ok) {
        console.error("Failed to save location", await res.text());
      }

      router.push(returnTo || "/greet");
    } finally {
      setLoading(false);
    }
  }

  function requestGeolocation() {
    if (!navigator.geolocation) {
      setGeoError("Location is not available in this browser.");
      return;
    }

    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      (err) => {
        console.error("Geolocation error", err);
        setGeoError("Couldn't access your current location. You can still type a city instead.");
      },
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-8 max-w-md mx-auto bg-charcoal text-white">
      <div className="flex-1 flex flex-col justify-center space-y-12">
        <h1 className="text-2xl leading-relaxed font-light font-display">
          Where are you waking up from today?
        </h1>

        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="location-label"
            className="text-[11px] uppercase tracking-[0.16em] text-zinc-400"
          >
            Location label
          </Label>
          <Input
            id="location-label"
            type="text"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
              // Clear any previously stored coordinates so a new city name
              // triggers fresh geocoding on the backend instead of reusing
              // old lat/lon.
              setLatitude(null);
              setLongitude(null);
            }}
            placeholder="Toronto, Canada"
            className="bg-transparent border-b border-zinc-700 rounded-none px-0 py-4 text-lg placeholder-zinc-600 focus-visible:ring-0 focus-visible:border-zinc-500"
          />
        </div>

        <div className="space-y-1">
          <button
            type="button"
            onClick={requestGeolocation}
            className="text-zinc-500 text-left text-sm hover:text-zinc-300"
          >
            {hasPreciseCoords ? "✓ Using precise location" : "Use my current location"}
          </button>
          {geoError && (
            <p className="text-[11px] text-zinc-400 mt-1">{geoError}</p>
          )}
        </div>
      </div>

      <div className="space-y-4 pb-8">
        <Button
          type="button"
          onClick={handleSave}
          disabled={loading || !label.trim()}
          className="w-full bg-transparent text-white py-4 rounded-none border-t border-zinc-800 hover:bg-white/5 disabled:text-zinc-700 disabled:hover:bg-transparent"
        >
          {label.trim() ? (loading ? "Saving…" : "Continue") : "—"}
        </Button>
        <button
          type="button"
          onClick={() => router.push(returnTo || "/greet")}
          className="w-full text-zinc-600 py-4 text-sm hover:text-zinc-400"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
