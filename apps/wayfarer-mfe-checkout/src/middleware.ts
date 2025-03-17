import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");

  // Redirect to login if not authenticated
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL(`/login?redirect=${req.nextUrl.pathname}`, req.url));
  }

  // Redirect authenticated users away from login page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to protect specific routes
export const config = {
  matcher: ["/checkout", "/login"],
};
