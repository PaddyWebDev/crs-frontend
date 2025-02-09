import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";

import AuthConfig from "@/auth.config";
const { auth } = NextAuth(AuthConfig);

export default auth((request: any) => {
  const { nextUrl, auth } = request;
  const loggedIn = !!auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isGuestRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }
  if (!loggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/guest/Login", nextUrl));
  }
  if (loggedIn && isGuestRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  //   Used to Invoke the Middleware
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
