"use client"

import type React from "react"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Linkedin, Phone } from "lucide-react"

interface Lawyer {
  id: number
  image: string
  name: string
  role: string
  linkedin?: string
  whatsapp: string
  description?: string
}

const lawyers: Lawyer[] = [
  {
    id: 1,
    image: "/images/lourdes-martin.jpg",
    name: "Lourdes Martin",
    role: "Socia",
    linkedin: "https://www.linkedin.com/in/lourdes-candelaria-martin-017bb43a0/",
    whatsapp: "+54 9 3516 30-2002",
  },
  {
    id: 2,
    image: "/images/nohelia-montoya.jpg",
    name: "Nohelí Montoya",
    role: "Socia",
    linkedin: "https://www.linkedin.com/in/nohel%C3%AD-b-montoya-53a2a7183/",
    whatsapp: "+54 9 3513 69-0410",
  },
  {
    id: 3,
    image: "/images/pilar-cobos.jpg",
    name: "Pilar Cobos",
    role: "Socia",
    linkedin: "https://www.linkedin.com/in/pilar-cobos-06ba23313/",
    whatsapp: "+54 9 3515 74-7240",
  },
  {
    id: 4,
    image: "/images/jose-eduardo-lovera.jpg",
    name: "Jose Eduardo Lovera",
    role: "Socio",
    linkedin: "https://www.linkedin.com/in/jos%C3%A9-eduardo-lovera-bb8b43b9/",
    whatsapp: "+54 9 3515 57-3027",
    description:
      "Abogado, maestrando en Derecho Empresarial (UBP) y cursante de la Especialización en Derecho del Trabajo (UNC/UCC), con más de 10 años de experiencia en litigios civiles, comerciales y laborales, así como en contratos y cumplimiento normativo. Su práctica se orienta al asesoramiento integral de empresas y particulares, con una mirada estratégica centrada en el funcionamiento y las necesidades de las organizaciones.",
  },
]

interface LawyersCarouselProps {
  scrollProgress: number
  onCenterCard?: (cardIndex: number) => void
}

export default function LawyersCarousel({ scrollProgress, onCenterCard }: LawyersCarouselProps) {
  const [windowWidth, setWindowWidth] = useState(768)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    motivo: "",
  })

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth)
      }
    }

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth)
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  const numCards = lawyers.length
  const activeCardFloat = scrollProgress * (numCards - 1)
  const currentCardIndex = Math.floor(activeCardFloat)
  const cardTransitionProgress = activeCardFloat - currentCardIndex

  const handleConsultationClick = (lawyer: Lawyer, index: number) => {
    setSelectedLawyer(lawyer)
    setIsDialogOpen(true)
    if (onCenterCard) {
      onCenterCard(index)
    }

    // Store lawyer name in sessionStorage for the contact form
    sessionStorage.setItem("selectedProfessional", lawyer.name)

    // Scroll to contact section
    const contactSection = document.getElementById("contacto")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { ...formData, lawyer: selectedLawyer?.name })
    setFormData({ nombre: "", apellido: "", telefono: "", email: "", motivo: "" })
    setIsDialogOpen(false)
  }

  const getCardStyle = (index: number) => {
    const isMobile = windowWidth < 768
    let translateX = 0
    let translateZ = 0
    let scale = 1
    let opacity = 0
    let zIndex = 1
    let rotateY = 0

    const cardWidthPx = isMobile ? windowWidth * 0.9 : 700

    const centerState = isMobile
      ? { x: 0, z: 0, scale: 1, opacity: 1, z: 10, rotateY: 0 }
      : { x: 0, z: 0, scale: 1, opacity: 1, z: 10, rotateY: 0 }

    const cardSpacing = isMobile ? cardWidthPx * 1.05 : cardWidthPx * 1.1

    const rightPartialState = isMobile
      ? { x: cardSpacing, z: 0, scale: 0.9, opacity: 0.5, z: 9, rotateY: 0 }
      : { x: cardSpacing, z: -200, scale: 0.85, opacity: 0.7, z: 9, rotateY: -25 }

    const leftPartialState = isMobile
      ? { x: -cardSpacing, z: 0, scale: 0.9, opacity: 0.5, z: 9, rotateY: 0 }
      : { x: -cardSpacing, z: -200, scale: 0.85, opacity: 0.7, z: 9, rotateY: 25 }

    const hiddenFarLeft = isMobile
      ? { x: -cardSpacing * 1.5, z: 0, scale: 0.8, opacity: 0, z: 1, rotateY: 0 }
      : { x: -cardSpacing * 1.5, z: -400, scale: 0.6, opacity: 0, z: 1, rotateY: 35 }

    const hiddenFarRight = isMobile
      ? { x: cardSpacing * 1.5, z: 0, scale: 0.8, opacity: 0, z: 1, rotateY: 0 }
      : { x: cardSpacing * 1.5, z: -400, scale: 0.6, opacity: 0, z: 1, rotateY: -35 }

    const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress

    if (index === currentCardIndex) {
      translateX = lerp(centerState.x, leftPartialState.x, cardTransitionProgress)
      translateZ = lerp(centerState.z, leftPartialState.z, cardTransitionProgress)
      scale = lerp(centerState.scale, leftPartialState.scale, cardTransitionProgress)
      opacity = lerp(centerState.opacity, leftPartialState.opacity, cardTransitionProgress)
      rotateY = lerp(centerState.rotateY, leftPartialState.rotateY, cardTransitionProgress)
      zIndex = centerState.z
    } else if (index === currentCardIndex + 1) {
      translateX = lerp(rightPartialState.x, centerState.x, cardTransitionProgress)
      translateZ = lerp(rightPartialState.z, centerState.z, cardTransitionProgress)
      scale = lerp(rightPartialState.scale, centerState.scale, cardTransitionProgress)
      opacity = lerp(rightPartialState.opacity, centerState.opacity, cardTransitionProgress)
      rotateY = lerp(rightPartialState.rotateY, centerState.rotateY, cardTransitionProgress)
      zIndex = rightPartialState.z
    } else if (index === currentCardIndex - 1) {
      translateX = lerp(leftPartialState.x, hiddenFarLeft.x, cardTransitionProgress)
      translateZ = lerp(leftPartialState.z, hiddenFarLeft.z, cardTransitionProgress)
      scale = lerp(leftPartialState.scale, hiddenFarLeft.scale, cardTransitionProgress)
      opacity = lerp(leftPartialState.opacity, hiddenFarLeft.opacity, cardTransitionProgress)
      rotateY = lerp(leftPartialState.rotateY, hiddenFarLeft.rotateY, cardTransitionProgress)
      zIndex = leftPartialState.z
    } else if (index === currentCardIndex + 2) {
      translateX = lerp(hiddenFarRight.x, rightPartialState.x, cardTransitionProgress)
      translateZ = lerp(hiddenFarRight.z, rightPartialState.z, cardTransitionProgress)
      scale = lerp(hiddenFarRight.scale, rightPartialState.scale, cardTransitionProgress)
      opacity = lerp(hiddenFarRight.opacity, rightPartialState.opacity, cardTransitionProgress)
      rotateY = lerp(hiddenFarRight.rotateY, rightPartialState.rotateY, cardTransitionProgress)
      zIndex = 1
    } else {
      opacity = 0
      zIndex = 1
      scale = isMobile ? 0.8 : 0.6
      translateX = index < currentCardIndex ? hiddenFarLeft.x : hiddenFarRight.x
      translateZ = isMobile ? 0 : -400
      rotateY = isMobile ? 0 : index < currentCardIndex ? 35 : -35
    }

    const transform = isMobile
      ? `translateX(-50%) translateY(-50%) translateX(${translateX}px) scale(${scale})`
      : `translateX(-50%) translateY(-50%) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`

    return {
      transform,
      opacity,
      zIndex,
      position: "absolute" as const,
      left: "50%",
      top: "50%",
      width: windowWidth < 768 ? "90vw" : "700px",
      height: windowWidth < 768 ? "70vh" : "500px",
      transition: "none",
      willChange: isMobile ? "transform, opacity" : "transform, opacity, z-index",
      borderRadius: "1rem",
      overflow: "hidden",
      transformStyle: isMobile ? "flat" : "preserve-3d",
      backfaceVisibility: "hidden",
    }
  }

  return (
    <>
      <div className="relative w-full h-full" style={{ perspective: windowWidth < 768 ? "none" : "1500px" }}>
        {lawyers.map((lawyer, index) => (
          <Card key={lawyer.id} className="absolute shadow-xl" style={getCardStyle(index)}>
            <CardContent className="p-0 h-full flex flex-col lg:flex-row">
              <div className="relative w-full h-[70%] lg:w-1/2 lg:h-full bg-cambel-deep">
                <Image
                  src={lawyer.image || "/placeholder.svg"}
                  alt={lawyer.name}
                  fill
                  className="object-cover object-top rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 500px"
                  priority={index === currentCardIndex || index === currentCardIndex + 1}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
              </div>
              <div className="w-full h-[30%] lg:w-1/2 lg:h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center bg-cambel-deep text-white rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none relative">
                <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 sm:mb-2 text-center">{lawyer.name}</h3>
                <p className="text-sm sm:text-base lg:text-xl font-mono uppercase tracking-wider mb-3 sm:mb-6 text-center text-cambel-mist">
                  {lawyer.role}
                </p>

                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex gap-2 sm:gap-3 z-10">
                  {lawyer.linkedin && (
                    <a
                      href={lawyer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-cambel-deep hover:bg-cambel-salmon transition-colors duration-300 rounded-full p-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${lawyer.whatsapp.replace(/[\s\-‑]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cambel-deep hover:bg-cambel-salmon transition-colors duration-300 rounded-full p-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
