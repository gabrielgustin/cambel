import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export const revalidate = 300

export async function GET() {
  try {
    const result = await sql`
      SELECT
        id,
        title,
        content,
        description,
        image_url,
        type,
        category,
        created_at
      FROM news_articles
      WHERE published = true
      ORDER BY created_at DESC
    `

    return NextResponse.json(result.rows, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (error) {
    console.error("[v0] Get news error:", error)
    return NextResponse.json({ error: "Error al obtener noticias" }, { status: 500 })
  }
}
