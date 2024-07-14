import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Apply middleware to API routes under /api/admin
  if (pathname.startsWith("/api/admin")) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Authorization token missing" },
        { status: 401 },
      );
    }

    try {
      // Make the request to the API route for token verification
      const response = await fetch(new URL("/api/auth/verify", req.url).href, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 },
        );
      }

      return NextResponse.next();
    } catch {
      return NextResponse.json(
        { message: "Authorization failed" },
        { status: 401 },
      );
    }
  }

  return NextResponse.next();
}
