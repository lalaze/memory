import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import next from "next";

const providers: Provider[] = [
    GitHub
];

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider();
        return { id: providerData.id, name: providerData.name };
    } else {
        return { id: provider.id, name: provider.name };
    }
});

export const authConfig = {
    debug: process.env.NODE_ENV !== "production" ? true : false,
    providers,
    pages: {
        signIn: "/auth/login",
    },
    session: { strategy: "jwt" },
    callbacks: {
        authorized: async ({ auth, request }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            const { nextUrl } = request
            // 重点是在于这个路径直接放行，他会去请求github token
            if (nextUrl.pathname === '/api/auth/callback/github') {
                return true
            }
            return !!auth
        }
    }
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
