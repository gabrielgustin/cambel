"use client"

import { useEffect } from "react"

// Reveals [data-reveal] elements as they enter the viewport (styles in globals.css).
// Items inside [data-reveal-stagger] get an increasing delay so they enter one after another.
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains("reveal-ready")) return // reduced motion: everything stays visible

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("is-revealed")
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-bound])").forEach((el) => {
        el.setAttribute("data-reveal-bound", "")
        const group = el.closest("[data-reveal-stagger]")
        if (group) {
          const index = Array.from(group.querySelectorAll("[data-reveal]")).indexOf(el)
          el.style.setProperty("--reveal-delay", `${index * 110}ms`)
        }
        io.observe(el)
      })
    }

    scan()
    // News and other client sections render after this effect runs.
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
