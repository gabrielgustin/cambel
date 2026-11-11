import { sql } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = verifySession(cookieStore.get("user_id")?.value)

    if (!userId) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Fetch user info from database
    const result = await sql`
      SELECT id, email, name FROM users WHERE id = ${userId}
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const user = result.rows[0]
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("[v0] Session check error:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
