import { NextResponse } from "next/server";
import withAuth from "./middleware/withAuth";

const protectedRoutes = ["/produk", "/about", "/profile", "/setting", "/admin"];
const roleRules = {
    "/admin": ["admin"],
};

export const proxy = withAuth(() => {
    return NextResponse.next();
}, protectedRoutes, roleRules);

export const config = {
    matcher: ["/produk/:path*", "/about/:path*", "/profile/:path*", "/setting/:path*", "/admin/:path*"],
};