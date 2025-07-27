import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Admin-only routes
    if (pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // Admin API routes
    if (pathname.startsWith("/api/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // User profile routes - users can only access their own profile
    if (pathname.startsWith("/profile")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // Dashboard routes - require authentication
    if (pathname.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to all routes if user is authenticated
        // Specific role checks are handled in the middleware function above
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/profile",
    "/profile/:path*",
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};