import { sql } from "@vercel/postgres"
import { hash, compare } from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import { signSession } from "@/lib/session"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 })
    }

    const result = await sql`
      SELECT id, email, password_hash, name FROM users WHERE email = ${email}
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Email o contraseña incorrectos" }, { status: 401 })
    }

    const user = result.rows[0]
    const passwordMatch = await compare(password, user.password_hash)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Email o contraseña incorrectos" }, { status: 401 })
    }

    // Create session (you might want to use JWT or similar)
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    )

    // Set session cookie (adjust based on your auth strategy)
    response.cookies.set("user_id", signSession(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}
