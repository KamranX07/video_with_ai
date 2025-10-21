import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
    function middleware(){
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({ req, token }) {
                const {pathname} = req.nextUrl
                if(
                    pathname.startsWith('/api/auth') ||
                    pathname === "/login" ||
                    pathname === "/register"
                )
                return true

                if(pathname === "/" || pathname.startsWith("api/videos")) {
                    return true
                }

                return !!token      //if(token) return true
            },
        },
    }
);

export const config = {
    matcher: [
        // match all requests paths except these:
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ]
}