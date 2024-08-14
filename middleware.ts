// export { auth as middleware } from "./auth"


import { NextResponse } from 'next/server'
import { auth } from "@/auth"

export default auth(async (req) => {
    const is_login = req.nextUrl.pathname === '/api/auth/callback/github'
    if (!is_login && !req.auth && req.nextUrl.pathname !== "/auth/login") {
        const newUrl = new URL("/auth/login", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
    // if (req.nextUrl.pathname.includes('/book')) { 
    // }
    if (req.auth) {
        const headers = new Headers(req.headers);
        headers.set('email', String(req.auth?.user?.email))
        const resp = NextResponse.next({
            request: {
                headers
            }
        });

        return resp;
    }
})

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/api/(.*)'],
};
