"use client"

import dynamic from "next/dynamic"

// Importamos Header dinámicamente y deshabilitamos SSR aquí, dentro de un Client Component
const Header = dynamic(() => import("./header"), { ssr: false })

export default function HeaderWrapper() {
  return <Header />
}
