"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { useNews } from "@/app/context/news-context"

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>()
  const { news } = useNews()

  // Buscar el artículo por ID en lugar de por índice
  const insight = news.find((item) => String(item.id) === params.id)

  if (!insight) {
    notFound()
  }

  return (
    <div className="bg-white py-12 pt-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <article>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center">{insight.title}</h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            <span className="font-semibold text-blue-600 uppercase">
              {insight.type} | {insight.category}
            </span>
            {" - "}
            <span className="text-gray-500">{insight.date}</span>
          </p>

          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-md">
            <Image src={insight.image || "/placeholder.svg"} alt={insight.title} fill className="object-cover" />
          </div>

          <div className="mb-8 p-6 bg-cambel-warm rounded-lg border-l-4 border-cambel-salmon">
            <p className="text-lg text-gray-800 leading-relaxed italic">{insight.description}</p>
          </div>

          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: insight.content || "" }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/noticias" className="text-blue-600 hover:underline text-lg font-medium">
              ← Volver a Novedades
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
