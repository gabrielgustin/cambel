"use client"

import Image from "next/image"
import Link from "next/link"
import { useNews, type NewsItem } from "@/app/context/news-context"
import NewsAdmin from "@/app/components/news-admin"

function Kicker({ item }: { item: NewsItem }) {
  return (
    <p className="font-mono text-xs sm:text-sm uppercase tracking-wider">
      <span className="text-cambel-mist">{item.type}</span>
      {item.category && <span className="text-cambel-deep"> | {item.category}</span>}
    </p>
  )
}

export default function NoticiasPage() {
  const { news, isAdmin } = useNews()
  const [featured, ...rest] = news

  return (
    <main className="min-h-screen bg-[#F3F0E9] py-16 pt-32 lg:pt-40 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <header className="mb-12 lg:mb-16" data-reveal-stagger>
          <div data-reveal className="flex items-center gap-5">
            <h1 className="text-4xl lg:text-6xl font-bold text-cambel-deep">Novedades Jurídicas</h1>
            <span aria-hidden="true" className="hidden sm:block h-[2px] w-20 bg-cambel-deep" />
          </div>
          <p data-reveal className="mt-4 text-lg text-gray-600 max-w-3xl">
            Mantente informado sobre nuestras últimas publicaciones, análisis y eventos.
          </p>
        </header>

        {/* Admin Panel - Only visible when logged in */}
        {isAdmin && <NewsAdmin />}

        {!isAdmin && news.length === 0 && (
          <p className="text-lg text-gray-600">No hay artículos disponibles en este momento</p>
        )}

        {!isAdmin && featured && (
          <>
            {/* Latest news, featured large */}
            <Link
              href={`/noticias/${featured.id}`}
              data-reveal
              className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12 mb-16 lg:mb-24"
            >
              <div data-reveal="photo" className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={featured.image || "/placeholder.svg"}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="lg:col-span-5">
                <Kicker item={featured} />
                <h2 className="mt-3 text-3xl lg:text-4xl font-bold leading-tight text-cambel-deep transition-colors group-hover:text-cambel-salmon">
                  {featured.title}
                </h2>
                <span
                  aria-hidden="true"
                  className="mt-5 block h-[2px] w-14 bg-cambel-salmon origin-left transition-transform duration-500 group-hover:scale-x-150"
                />
                {featured.description && (
                  <p className="mt-5 text-gray-700 leading-relaxed lg:text-lg line-clamp-4">{featured.description}</p>
                )}
                {featured.date && (
                  <p className="mt-5 font-mono text-xs uppercase tracking-wider text-gray-500">{featured.date}</p>
                )}
              </div>
            </Link>

            {rest.length > 0 && (
              <div
                data-reveal-stagger
                className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 border-t border-cambel-deep/10 pt-14 lg:pt-16"
              >
                {rest.map((item) => (
                  <Link key={item.id} href={`/noticias/${item.id}`} data-reveal className="group block">
                    <div data-reveal="photo" className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="mt-5">
                      <Kicker item={item} />
                      <h2 className="mt-2 text-xl lg:text-2xl font-bold leading-snug text-cambel-deep line-clamp-3 transition-colors group-hover:text-cambel-salmon">
                        {item.title}
                      </h2>
                      <span
                        aria-hidden="true"
                        className="mt-4 block h-[2px] w-10 bg-cambel-salmon origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      />
                      {item.date && (
                        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-gray-500">{item.date}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
