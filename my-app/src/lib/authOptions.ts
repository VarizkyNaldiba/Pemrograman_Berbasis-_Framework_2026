import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                fullname: { label: "Full Name", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user: any = {
                    id: "1",
                    email: credentials.email,
                    fullname: credentials.fullname || "User",
                };

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.email = user.email;
                token.fullname = user.fullname;
                token.sub = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token?.email) {
                session.user = {
                    email: token.email,
                    fullname: token.fullname,
                };
            } else {
                session.user = null;
            }
            return session;
        },
    },
};