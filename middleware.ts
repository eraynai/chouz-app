import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // /api/payments/webhooks is a webhook endpoint that should be accessible without authentication
  if (pathname.startsWith("/api/payments/webhooks")) {
    return NextResponse.next();
  }

  if (sessionCookie && ["/sign-in", "/sign-up"].includes(pathname)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!sessionCookie && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Protect /greet route - require authentication
  if (!sessionCookie && pathname.startsWith("/greet")) {
    return NextResponse.redirect(new URL("/sign-in?returnTo=/greet", request.url));
  }

  // Protect onboarding routes - require authentication
  if (!sessionCookie && pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/sign-in?returnTo=/onboarding/location", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/sign-in", "/sign-up", "/greet", "/onboarding/:path*"],
};
