import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // @ts-ignore - accessing internal property for debugging
    const routes = Object.keys(auth.api || {});
    
    return NextResponse.json({
      message: "Auth instance loaded",
      availableRoutes: routes,
      hasMagicLink: routes.some(r => r.includes('magicLink') || r.includes('magic-link')),
    });
  } catch (error) {
    return NextResponse.json({
      error: String(error),
      message: "Failed to load auth instance"
    }, { status: 500 });
  }
}
