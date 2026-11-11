import { sql } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = verifySession(cookieStore.get("user_id")?.value)

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "ID de artículo requerido" }, { status: 400 })
    }

    const title = body.title ?? null
    const content = body.content ?? null
    const description = body.description ?? null
    // The list hands out /api/news/image/... URLs; sending one back means "unchanged", never store it over the real image.
    const imageUrl = typeof body.imageUrl === "string" && !body.imageUrl.startsWith("/api/news/image/") ? body.imageUrl : null
    const type = body.type ?? null
    const category = body.category ?? null

    const result = await sql`
      UPDATE news_articles
      SET
        title = COALESCE(${title}, title),
        content = COALESCE(${content}, content),
        description = COALESCE(${description}, description),
        image_url = COALESCE(${imageUrl}, image_url),
        type = COALESCE(${type}, type),
        category = COALESCE(${category}, category),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(id)} AND author_id = ${userId}
      RETURNING id, title, content, description, image_url, type, category, author_id, created_at, updated_at
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Artículo no encontrado o sin permisos" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0], { status: 200 })
  } catch (error) {
    console.error("[v0] Update article error:", error)
    return NextResponse.json({ error: "Error al actualizar artículo" }, { status: 500 })
  }
}
