import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const isAuthPage = req.nextUrl.pathname.includes("/login");
  const isLogoutPage = req.nextUrl.pathname.includes("/logout");

  if (isLogoutPage) {
    const response = NextResponse.redirect(new URL("/", req.url));

    response.cookies.set("auth_token", "", { expires: new Date(0), httpOnly: true, path: "/" });
    return response;
  }

  // Redirect to login if not authenticated
  if (!token && !isAuthPage) {
    const redirectPath = isLogoutPage ? '' : req.nextUrl.pathname;
    return NextResponse.redirect(new URL(`/user/login?redirect=${redirectPath}`, req.url));
  }

  // Redirect authenticated users away from login page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to protect specific routes
export const config = {
  matcher: ["/user/profile", "/user/login", "/user/logout"],
};
