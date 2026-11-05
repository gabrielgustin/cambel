"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useNews } from "@/app/context/news-context"
import NewsAdmin from "@/app/components/news-admin"

export default function NoticiasPage() {
  const { news, isAdmin } = useNews()

  return (
    <>
      <main className="min-h-screen bg-white py-12 pt-32 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">Novedades Jurídicas</h1>

          {/* Admin Panel - Only visible when logged in */}
          {isAdmin && <NewsAdmin />}

          {/* Only show the public news grid if NOT in admin mode */}
          {!isAdmin && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {news.map((insight, index) => (
                <Card
                  key={insight.id}
                  className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Link href={`/noticias/${insight.id || index}`} className="block">
                    <div className="relative w-full h-48">
                      <Image
                        src={insight.image || "/placeholder.svg"}
                        alt={insight.title}
                        fill
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm font-semibold text-blue-600 uppercase mb-2">
                        {insight.type} | {insight.category}
                      </p>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-3">{insight.title}</h2>
                      <p className="text-sm text-gray-500">{insight.date || "Fecha no disponible"}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
