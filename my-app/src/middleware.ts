import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which routes require authentication
const protectedRoutes = ["/produk", "/about", "/profile", "/setting"];

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if current path requires authentication
    if (protectedRoutes.includes(pathname)) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // If no token, redirect to home
        if (!token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // Allow request to continue
    return NextResponse.next();
}

export const config = {
    matcher: ["/produk", "/about", "/profile", "/setting"],
};