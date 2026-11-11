"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

// Inertial scrolling for the public site. Skipped in /admin (inner scroll areas) and for reduced motion.
export default function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith("/admin")) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ lerp: 0.09, anchors: true })
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [pathname])

  return null
}
