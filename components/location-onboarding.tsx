"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <div className="flex h-screen w-full items-center justify-center bg-charcoal text-white px-4">
      <Card className="w-full max-w-md bg-zinc-950 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg font-light font-display">
            Where are you waking up from today?
          </CardTitle>
          <CardDescription className="text-xs text-zinc-400">
            A simple label like &quot;Toronto, Canada&quot; or &quot;Lisbon&quot;. This lets your morning orb follow the sun where you are.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location-label" className="text-xs uppercase tracking-[0.16em] text-zinc-400">
              Location label
            </Label>
            <Input
              id="location-label"
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
              className="bg-zinc-900 border-zinc-700 text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs uppercase tracking-[0.16em] text-zinc-400">
                Make it more precise (optional)
              </Label>
              <button
                type="button"
                onClick={requestGeolocation}
                className="text-[11px] underline underline-offset-4 text-zinc-300 hover:text-white"
              >
                Use my current location
              </button>
            </div>
            {geoError && (
              <p className="text-[11px] text-zinc-400 mt-1">{geoError}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              className="w-full rounded-full text-xs tracking-[0.2em] uppercase"
              disabled={loading || !label.trim()}
              onClick={handleSave}
            >
              {loading ? "Saving…" : "Continue"}
            </Button>
            <button
              type="button"
              className="w-full text-xs text-zinc-400 underline underline-offset-4 hover:text-zinc-100"
              onClick={() => router.push(returnTo || "/greet")}
            >
              Skip for now
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
