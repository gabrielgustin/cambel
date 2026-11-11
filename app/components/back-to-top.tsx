"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ArrowUp } from "lucide-react"

// "#top" is scrolled smoothly by Lenis (anchors option) or by CSS scroll-behavior when Lenis is off.
export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (pathname.startsWith("/admin")) return null

  return (
    <a
      href="#top"
      aria-label="Volver arriba"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-[9997] flex h-12 w-12 items-center justify-center rounded-full bg-cambel-salmon text-white shadow-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-cambel-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cambel-salmon ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </a>
  )
}
