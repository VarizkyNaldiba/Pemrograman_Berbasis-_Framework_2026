import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/utils/db/servicefirebase";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        signOut: "/",
        error: "/auth/login",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user: any = await signIn(credentials.email);

                if (!user?.password) {
                    return null;
                }

                try {
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (isPasswordValid) {
                        return {
                            id: String(user.id),
                            email: String(user.email || ""),
                            fullname: String(user.fullname || user.name || ""),
                            role: String(user.role || "member").toLowerCase(),
                        };
                    }
                } catch {
                    // Fallback when password is not stored as bcrypt hash.
                    if (credentials.password === user.password) {
                        return {
                            id: String(user.id),
                            email: String(user.email || ""),
                            fullname: String(user.fullname || user.name || ""),
                            role: String(user.role || "member").toLowerCase(),
                        };
                    }
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.email = user.email;
                token.fullname = user.fullname;
                token.name = user.fullname || user.email;
                token.role = user.role;
                token.sub = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = {
                ...(session.user || {}),
                email: token?.email || session.user?.email,
                name: token?.fullname || token?.name || session.user?.name,
                fullname: token?.fullname || session.user?.fullname,
                role: token?.role || session.user?.role,
            };

            return session;
        },
    },
};