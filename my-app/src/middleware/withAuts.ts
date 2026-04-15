import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = []
) {
    return async (req: NextRequest, event: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;

        if (requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET,
            });

            if (!token) {
                const loginUrl = new URL("/auth/login", req.url);
                return NextResponse.redirect(loginUrl);
            }
        }

        return middleware(req, event);
    };
}