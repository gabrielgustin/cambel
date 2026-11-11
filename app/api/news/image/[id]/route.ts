import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

// Serves an article image stored inline as a base64 data URL, as a real (cacheable) image file.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^\d+$/.test(id)) return new NextResponse(null, { status: 404 })

  try {
    const result = await sql`SELECT image_url FROM news_articles WHERE id = ${Number(id)} AND published = true`
    const imageUrl: string | null = result.rows[0]?.image_url ?? null
    if (!imageUrl) return new NextResponse(null, { status: 404 })

    const match = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i.exec(imageUrl)
    if (!match) return NextResponse.redirect(new URL(imageUrl, _request.url)) // already a normal URL

    return new NextResponse(Buffer.from(match[2], "base64"), {
      headers: {
        "Content-Type": match[1],
        // The list links here with ?v=<last edit>, so a changed image gets a new URL.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("[news image] error:", error)
    return new NextResponse(null, { status: 500 })
  }
}
