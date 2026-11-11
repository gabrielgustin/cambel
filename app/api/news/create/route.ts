import { sql } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = verifySession(cookieStore.get("user_id")?.value)

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { title, content, description, imageUrl, type, category } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Título y contenido requeridos" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO news_articles (title, content, description, image_url, type, category, author_id)
      VALUES (${title}, ${content}, ${description || null}, ${imageUrl || null}, ${type || "ARTÍCULO"}, ${category || ""}, ${userId})
      RETURNING id, title, content, description, image_url, type, category, author_id, created_at
    `

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error("[v0] Create article error:", error)
    return NextResponse.json({ error: "Error al crear artículo" }, { status: 500 })
  }
}
