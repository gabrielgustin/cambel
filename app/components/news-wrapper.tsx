"use client"

import dynamic from "next/dynamic"

const News = dynamic(() => import("./news"), { ssr: false })

export default function NewsWrapper() {
  return <News />
}
