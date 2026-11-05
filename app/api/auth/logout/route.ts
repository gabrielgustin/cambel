import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true }, { status: 200 })

  // Clear the session cookie
  response.cookies.set("user_id", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // This expires the cookie immediately
  })

  return response
}
