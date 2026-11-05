import { sql } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")?.value

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get("id")

    if (!articleId) {
      return NextResponse.json({ error: "ID de artículo requerido" }, { status: 400 })
    }

    const result = await sql`
      DELETE FROM news_articles
      WHERE id = ${parseInt(articleId)} AND author_id = ${parseInt(userId)}
      RETURNING id
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Artículo no encontrado o sin permisos" }, { status: 404 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] Delete article error:", error)
    return NextResponse.json({ error: "Error al eliminar artículo" }, { status: 500 })
  }
}
