import { NextResponse } from "next/server";

// Simple mapping from Open-Meteo weather codes to a high-level condition
function getWeatherKind(code: number | undefined): "clear" | "cloudy" | "rain" | "snow" | "wind" | "other" {
  if (code == null) return "other";

  if (code === 0) return "clear"; // Clear sky
  if ([1, 2, 3].includes(code)) return "cloudy"; // Mainly clear, partly cloudy, overcast
  if (
    (code >= 51 && code <= 67) || // Drizzle / rain
    (code >= 80 && code <= 82) || // Rain showers
    (code >= 95 && code <= 99) // Thunderstorms
  ) {
    return "rain";
  }
  if (
    (code >= 71 && code <= 77) || // Snow
    (code >= 85 && code <= 86)
  ) {
    return "snow";
  }

  return "other";
}

function buildSuggestion(kind: ReturnType<typeof getWeatherKind>) {
  switch (kind) {
    case "clear":
      return "It's clear out. If you can, open a window or step outside for a breath before your day begins.";
    case "cloudy":
      return "It's a soft, cloudy kind of morning. Let the light be however it is and give yourself a slower first breath.";
    case "rain":
      return "It's wet out today. Imagine the sound of rain as you breathe and give yourself permission to arrive gently.";
    case "snow":
      return "It's a cold, wintry morning. Wrap yourself in something warm and feel the weight of your body as you breathe.";
    default:
      return "However the weather is, this first breath is only for you. Let your shoulders drop a little as you arrive.";
  }
}

export async function GET(request: Request) {
  try {
    const ipHeader =
      request.headers.get("x-real-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      null;

    // --- 1. Geolocate approximate position from IP ---
    // If we have an IP, ask ipapi for that address; otherwise let it infer from the request.
    const ipApiUrl = ipHeader
      ? `https://ipapi.co/${encodeURIComponent(ipHeader)}/json/`
      : "https://ipapi.co/json/";

    const ipRes = await fetch(ipApiUrl, { next: { revalidate: 1800 } }); // cache for 30 minutes

    if (!ipRes.ok) {
      return NextResponse.json(
        {
          location: null,
          weather: null,
          suggestion:
            "Whatever the weather is like where you are today, take a slow breath and notice how your body feels where you are sitting.",
        },
        { status: 200 }
      );
    }

    const ipData = (await ipRes.json()) as {
      city?: string;
      region?: string;
      country_name?: string;
      latitude?: number;
      longitude?: number;
    };

    const { city, region, country_name: country, latitude, longitude } = ipData;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json(
        {
          location: { city, region, country: country },
          weather: null,
          suggestion:
            "Take a slow breath and notice how your body feels where you are sitting.",
        },
        { status: 200 }
      );
    }

    // --- 2. Fetch current weather from Open-Meteo ---
    const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
    weatherUrl.searchParams.set("latitude", String(latitude));
    weatherUrl.searchParams.set("longitude", String(longitude));
    weatherUrl.searchParams.set("current_weather", "true");

    const weatherRes = await fetch(weatherUrl.toString(), { next: { revalidate: 600 } }); // cache for 10 minutes

    if (!weatherRes.ok) {
      return NextResponse.json(
        {
          location: { city, region, country: country },
          weather: null,
          suggestion:
            "Take one slow breath and let your shoulders soften a little before you begin.",
        },
        { status: 200 }
      );
    }

    const weatherData = (await weatherRes.json()) as {
      current_weather?: {
        temperature?: number;
        weathercode?: number;
      };
    };

    const tempC = weatherData.current_weather?.temperature;
    const code = weatherData.current_weather?.weathercode;
    const kind = getWeatherKind(code);

    const suggestion = buildSuggestion(kind);

    return NextResponse.json(
      {
        location: { city, region, country: country },
        weather: {
          temperatureC: typeof tempC === "number" ? tempC : null,
          kind,
          code: code ?? null,
        },
        suggestion,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/morning-context", error);
    return NextResponse.json(
      {
        location: null,
        weather: null,
        suggestion:
          "Take one breath that is just for you. Nothing else needs to happen right now.",
      },
      { status: 200 }
    );
  }
}
