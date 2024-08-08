// export { auth as middleware } from "./auth"


import { NextResponse } from 'next/server'
import { auth } from "@/auth"

export default auth((req) => {
    if (!req.auth && req.nextUrl.pathname !== "/login") {
        const newUrl = new URL("/login", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
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
