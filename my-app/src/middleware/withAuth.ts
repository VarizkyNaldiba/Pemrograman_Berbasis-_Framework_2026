import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

type RoleRule = Record<string, string[]>;

function matchRoute(pathname: string, route: string) {
    return pathname === route || pathname.startsWith(`${route}/`);
}

export default function withAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = [],
    requireRole: RoleRule = {}
) {
    return async (req: NextRequest, event: NextFetchEvent) => {
        const { pathname, search } = req.nextUrl;

        const needsAuth =
            requireAuth.some((route) => matchRoute(pathname, route)) ||
            Object.keys(requireRole).some((route) => matchRoute(pathname, route));

        if (!needsAuth) {
            return middleware(req, event);
        }

        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token) {
            const loginUrl = new URL("/auth/login", req.url);
            loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
            return NextResponse.redirect(loginUrl);
        }

        const roleRule = Object.entries(requireRole).find(([route]) =>
            matchRoute(pathname, route)
        );

        if (roleRule) {
            const [, allowedRoles] = roleRule;
            const tokenRole = typeof token.role === "string" ? token.role : "";

            if (!allowedRoles.includes(tokenRole)) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        return middleware(req, event);
    };
}
