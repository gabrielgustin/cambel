"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useNews } from "@/app/context/news-context"

const SLIDE_MS = 900
const AUTO_MS = 6000
const SWIPE_PX = 50

// Coverflow layout by distance from the active card (x in card widths). Side cards tilt so their inner edge recedes.
const LAYOUT = [
  { x: 0, scale: 1, rotate: 0 },
  { x: 0.95, scale: 0.78, rotate: 12 },
  { x: 1.62, scale: 0.7, rotate: 18 },
]
const HIDDEN = { x: 2.4, scale: 0.6, rotate: 22 }

/** Signed circular distance from the active slide, e.g. -1 = just left of it. */
const distance = (index: number, current: number, total: number) => {
  let d = (((index - current) % total) + total) % total
  if (d > total / 2) d -= total
  return d
}

function DoubleArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 16" className={`h-4 w-6 ${direction === "left" ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="M0 0 L10 8 L0 16 Z M12 0 L22 8 L12 16 Z" fill="currentColor" />
    </svg>
  )
}

export default function News() {
  const router = useRouter()
  const { news: articles } = useNews()
  const total = articles.length
  const [current, setCurrent] = useState(0)
  const [width, setWidth] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const previousRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dragRef = useRef<{ x: number; moved: boolean } | null>(null)

  const go = useCallback((delta: number) => setCurrent((c) => (((c + delta) % total) + total) % total), [total])

  const stopAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
  }, [])
  const startAuto = useCallback(() => {
    stopAuto()
    if (total < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    timerRef.current = setInterval(() => go(1), AUTO_MS)
  }, [go, stopAuto, total])

  useEffect(() => {
    startAuto()
    return stopAuto
  }, [startAuto, stopAuto])

  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [total])

  useEffect(() => {
    previousRef.current = current
  }, [current])

  // News load after mount and can shrink (e.g. after a delete): keep the index in range.
  useEffect(() => {
    if (current >= total && total > 0) setCurrent(0)
  }, [current, total])

  if (total === 0) {
    return (
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-cambel-deep mb-3">Novedades Jurídicas</h2>
          <p className="text-lg text-gray-600">No hay artículos disponibles en este momento</p>
        </div>
      </section>
    )
  }

  const isMobile = width > 0 && width < 768
  const cardW = isMobile ? width * 0.78 : Math.min(width * 0.36, 560)
  const cardH = cardW * (isMobile ? 0.8 : 0.85)
  const active = articles[Math.min(current, total - 1)]

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, moved: false }
    stopAuto()
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const start = dragRef.current
    if (!start) return
    const dx = e.clientX - start.x
    if (Math.abs(dx) > SWIPE_PX) {
      start.moved = true
      go(dx < 0 ? 1 : -1)
    }
    startAuto()
  }

  const onCardClick = (index: number, d: number) => {
    if (dragRef.current?.moved) {
      dragRef.current = null // swallow only the click that ends a swipe
      return
    }
    if (d === 0) router.push(`/noticias/${articles[index].id}`)
    else go(d)
  }

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-10 lg:mb-14" data-reveal-stagger>
        <div data-reveal className="flex items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <h2 className="text-3xl lg:text-5xl font-bold text-cambel-deep">Novedades Jurídicas</h2>
            <span aria-hidden="true" className="hidden sm:block h-[2px] w-20 bg-cambel-deep" />
          </div>
          <Link
            href="/noticias"
            className="group flex shrink-0 items-center gap-3 font-mono text-sm uppercase tracking-wider text-cambel-deep hover:text-cambel-salmon transition-colors"
          >
            Ver todas
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
        <p data-reveal className="mt-3 text-lg text-gray-600 max-w-3xl">
          Mantente informado sobre nuestras últimas publicaciones, análisis y eventos.
        </p>
      </div>

      <div data-reveal>
        <div
          ref={stageRef}
          className="relative w-full select-none touch-pan-y cursor-grab active:cursor-grabbing [perspective:1600px]"
          style={{ height: cardH ? cardH + 24 : 420 }}
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (dragRef.current = null)}
        >
          {width > 0 &&
            articles.map((article, index) => {
              const d = distance(index, current, total)
              const prevD = distance(index, previousRef.current, total)
              const layout = LAYOUT[Math.abs(d)] ?? HIDDEN
              const side = Math.sign(d)
              // A card wrapping from one end to the other jumps instead of flying across the stage.
              const jumps = Math.abs(d - prevD) > 1
              return (
                <button
                  key={article.id}
                  type="button"
                  aria-label={d === 0 ? `Leer: ${article.title}` : `Ver novedad: ${article.title}`}
                  tabIndex={Math.abs(d) <= 1 ? 0 : -1}
                  onClick={() => onCardClick(index, d)}
                  className="absolute left-1/2 top-1/2 overflow-hidden rounded-xl bg-cambel-deep shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cambel-salmon"
                  style={{
                    width: cardW,
                    height: cardH,
                    zIndex: 10 - Math.abs(d),
                    opacity: Math.abs(d) <= 2 ? 1 : 0,
                    pointerEvents: Math.abs(d) <= 2 ? "auto" : "none",
                    transform: `translate(-50%, -50%) translateX(${side * layout.x * cardW}px) scale(${layout.scale}) rotateY(${-side * layout.rotate}deg)`,
                    transition: jumps
                      ? "none"
                      : `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${SLIDE_MS}ms ease`,
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt=""
                    fill
                    draggable={false}
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 600px"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-cambel-deep transition-opacity duration-700"
                    style={{ opacity: d === 0 ? 0 : 0.25 }}
                  />
                </button>
              )
            })}
        </div>

        <div className="container mx-auto px-4 mt-10">
          <div className="mx-auto grid max-w-3xl grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8">
            <button
              type="button"
              onClick={() => {
                go(-1)
                startAuto()
              }}
              aria-label="Novedad anterior"
              className="p-2 text-cambel-deep hover:text-cambel-salmon transition-colors"
            >
              <DoubleArrow direction="left" />
            </button>

            <div key={active.id} className="news-detail-in min-h-[9rem]" aria-live="polite">
              <p className="font-mono text-xs sm:text-sm uppercase tracking-wider">
                <span className="text-cambel-mist">{active.type}</span>
                {active.category && <span className="text-cambel-deep"> | {active.category}</span>}
              </p>
              <Link
                href={`/noticias/${active.id}`}
                className="mt-2 block text-2xl lg:text-3xl font-bold leading-tight text-cambel-deep hover:text-cambel-salmon transition-colors"
              >
                {active.title}
              </Link>
              {active.description && <p className="mt-3 text-gray-600 line-clamp-3">{active.description}</p>}
              {active.date && (
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-gray-500">{active.date}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                go(1)
                startAuto()
              }}
              aria-label="Novedad siguiente"
              className="p-2 text-cambel-deep hover:text-cambel-salmon transition-colors"
            >
              <DoubleArrow direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
