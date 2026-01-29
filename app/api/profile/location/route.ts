import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

async function geocodeLabel(label: string): Promise<{ latitude: number | null; longitude: number | null }> {
  try {
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name", label);
    url.searchParams.set("count", "1");
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");

    const res = await fetch(url.toString());
    if (!res.ok) return { latitude: null, longitude: null };

    const data = (await res.json()) as {
      results?: { latitude: number; longitude: number }[];
    };

    const first = data.results?.[0];
    if (!first) return { latitude: null, longitude: null };

    return { latitude: first.latitude, longitude: first.longitude };
  } catch {
    return { latitude: null, longitude: null };
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json().catch(() => null) as {
      label?: string;
      latitude?: number | null;
      longitude?: number | null;
    } | null;

    if (!body || !body.label) {
      return NextResponse.json(
        { error: "Label is required" },
        { status: 400 },
      );
    }

    let { label, latitude, longitude } = body;

    // If coordinates weren't provided, try to geocode the label
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      const geo = await geocodeLabel(label);
      if (typeof latitude !== "number") latitude = geo.latitude;
      if (typeof longitude !== "number") longitude = geo.longitude;
    }

    const latToStore = typeof latitude === "number" ? latitude : null;
    const lonToStore = typeof longitude === "number" ? longitude : null;

    console.log("[location] saving", {
      label,
      latitude: latToStore,
      longitude: lonToStore,
      userId: session.user.id,
    });

    await db
      .update(user)
      .set({
        wakingLocationLabel: label,
        wakingLatitude: latToStore,
        wakingLongitude: lonToStore,
      })
      .where(eq(user.id, session.user.id));

    return NextResponse.json({
      success: true,
      location: {
        label,
        latitude: latToStore,
        longitude: lonToStore,
      },
    });
  } catch (error) {
    console.error("Error in POST /api/profile/location", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
