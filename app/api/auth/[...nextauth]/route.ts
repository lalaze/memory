import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const authConfig = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
            // @ts-ignore
            scope: "read:user",
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token, user }: any) {
            session.user = user;
            session.accessToken = token.accessToken;
            return session;
        },
    },
}

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }