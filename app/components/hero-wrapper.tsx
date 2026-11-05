"use client"

import dynamic from "next/dynamic"

// Importamos Hero dinámicamente y deshabilitamos SSR aquí, dentro de un Client Component
const Hero = dynamic(() => import("./hero"), { ssr: false })

export default function HeroWrapper() {
  return <Hero />
}
