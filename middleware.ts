import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";
    const isLoggedIn = !!req.auth;

    if (isAdminRoute && !isLoginPage && !isLoggedIn) {
        const loginUrl = new URL("/admin/login", req.nextUrl);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isLoginPage && isLoggedIn) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
});

export const config = {
    matcher: ["/admin/:path*"],
};
