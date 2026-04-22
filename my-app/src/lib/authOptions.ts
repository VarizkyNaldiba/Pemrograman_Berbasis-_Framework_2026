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
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            console.log("Session Callback:", { session, token });
            if (token) {
                session.user.email = token.email;
                session.user.fullname = token.fullname;
                session.user.role = token.role;
            }
            return session;
        },
    },
};