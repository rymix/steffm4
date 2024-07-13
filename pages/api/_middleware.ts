import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;

export function middleware(req: NextRequest): NextResponse {
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
      if (secret) {
        jwt.verify(token, secret);
        return NextResponse.next();
      }
      throw new Error("JWT secret is not defined");
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 },
      );
    }
  }

  return NextResponse.next();
}
