import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { getOrbColorsForPhase, getSunPhase } from "@/lib/solar";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json(
        { phase: "unknown", altitudeDeg: null, colors: null },
        { status: 200 },
      );
    }

    const [userData] = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (userData?.wakingLatitude == null || userData.wakingLongitude == null) {
      console.log("[sun-phase] missing coords", {
        userId: session.user.id,
        wakingLocationLabel: userData?.wakingLocationLabel,
        wakingLatitude: userData?.wakingLatitude,
        wakingLongitude: userData?.wakingLongitude,
      });
      return NextResponse.json(
        { phase: "unknown", altitudeDeg: null, colors: null },
        { status: 200 },
      );
    }

    const { altitudeDeg, phase } = getSunPhase(
      userData.wakingLatitude,
      userData.wakingLongitude,
      new Date(),
    );

    console.log("[sun-phase] computed", {
      userId: session.user.id,
      wakingLocationLabel: userData.wakingLocationLabel,
      wakingLatitude: userData.wakingLatitude,
      wakingLongitude: userData.wakingLongitude,
      altitudeDeg,
      phase,
    });

    const colors = getOrbColorsForPhase(phase);

    return NextResponse.json(
      {
        phase,
        altitudeDeg,
        colors,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in GET /api/sun-phase", error);
    return NextResponse.json(
      { phase: "unknown", altitudeDeg: null, colors: null },
      { status: 200 },
    );
  }
}
