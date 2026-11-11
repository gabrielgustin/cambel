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
        -- Images stored inline as base64 are served by /api/news/image/[id] so this list stays a few KB.
        -- ?v= changes when the article is edited, so the image URL can be cached forever.
        CASE
          WHEN image_url LIKE 'data:%'
            THEN '/api/news/image/' || id || '?v=' || FLOOR(EXTRACT(EPOCH FROM COALESCE(updated_at, created_at)))::bigint
          ELSE image_url
        END AS image_url,
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
