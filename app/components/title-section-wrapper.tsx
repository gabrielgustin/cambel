"use client"

import dynamic from "next/dynamic"

const TitleSection = dynamic(() => import("./title-section"), { ssr: false })

export default function TitleSectionWrapper() {
  return <TitleSection />
}
