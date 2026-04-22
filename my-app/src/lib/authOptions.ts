import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { signIn, signInWithOAuth } from "@/utils/db/servicefirebase";
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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === "credentials" && user) {
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role;
            }

            if (account?.provider === "google" || account?.provider === "github") {
                const data = {
                    fullname: user.name,
                    email: user.email,
                    image: user.image,
                    type: account.provider,
                };

                await signInWithOAuth(data, (result: any) => {
                    if (result.status) {
                        token.fullname = result.data.fullname;
                        token.email = result.data.email;
                        token.image = result.data.image;
                        token.role = result.data.role;
                        token.type = result.data.type;
                    }
                });
            }

            return token;
        },


        async session({ session, token }: any) {
            if (token.email) {
                session.user.email = token.email;
            }
            if (token.fullname) {
                session.user.fullname = token.fullname;
            }
            if (token.image) {
                session.user.image = token.image;
            }
            if (token.role) {
                session.user.role = token.role;
            }
            if (token.type) {
                session.user.type = token.type;
            }

            console.log("Session Callback:", { session, token });
            return session;
        },
    },
};