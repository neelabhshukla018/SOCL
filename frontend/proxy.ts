import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

/* ==========================================================================
   ROUTE CLASSIFICATION
   ========================================================================== */

// Public routes that never require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/contact(.*)",
  "/help(.*)",
  "/api/socl(.*)",
]);

// Protected routes that require an authenticated user
const isProtectedRoute = createRouteMatcher([
  "/analytics(.*)",
  "/audience(.*)",
  "/create-profile(.*)",
  "/data-sources(.*)",
  "/influence(.*)",
  "/posts-analysis(.*)",
  "/reports(.*)",
  "/settings(.*)",
  "/socl(.*)",
  "/trends(.*)",
]);

/* ==========================================================================
   HELPERS & SECURITY HEADERS
   ========================================================================== */

/**
 * Checks whether valid Clerk credentials are configured in the environment.
 */
function isClerkConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return Boolean(
    key &&
    key.startsWith("pk_") &&
    !key.includes("placeholder")
  );
}

/**
 * Applies security headers to protect against common web vulnerabilities.
 */
function applySecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return res;
}

/* ==========================================================================
   PROXY / MIDDLEWARE HANDLER
   ========================================================================== */

export default async function proxy(req: NextRequest) {
  // If Clerk is not yet configured, bypass auth checks gracefully in local dev
  if (!isClerkConfigured()) {
    const res = NextResponse.next();
    return applySecurityHeaders(res);
  }

  // Active Clerk authentication & route protection
  const handler = clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request) && !isPublicRoute(request)) {
      const host = request.headers.get("host") || "";
      // On localhost, allow direct route testing without forcing login walls
      if (host.includes("localhost") || host.includes("127.0.0.1")) {
        return;
      }
      await auth.protect();
    }
  });

  const response = await handler(req, {} as any);
  if (response instanceof NextResponse) {
    return applySecurityHeaders(response);
  }
  return response;
}

/* ==========================================================================
   MATCHER CONFIGURATION
   ========================================================================== */

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
