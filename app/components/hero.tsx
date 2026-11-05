"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [windowWidth, setWindowWidth] = useState(768)
  const scrollAnimationFrameId = useRef<number | null>(null)

  const slides = [
    {
      title: "Soluciones Jurídicas Integrales",
      description: "Conectamos especialidades para brindarte asesoramiento cercano y profesional",
      image: "/images/tribunales-exterior.jpg",
    },
    {
      title: "Red de Saberes",
      description: "Un equipo colaborativo que trabaja en conjunto para potenciar resultados",
      image: "/images/tribunales-exterior-dos.jpg",
    },
    {
      title: "Compromiso y Cercanía",
      description: "Más de una década acompañando a nuestros clientes con dedicación",
      image: "/images/tribunales-interior.jpg",
    },
  ]

  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 300)
  }, [isTransitioning, slides.length])

  useEffect(() => {
    const timer = setInterval(goToNextSlide, 7000)
    return () => clearInterval(timer)
  }, [goToNextSlide])

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return
    if (scrollAnimationFrameId.current) {
      cancelAnimationFrame(scrollAnimationFrameId.current)
    }
    scrollAnimationFrameId.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY)
    })
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth)
      }
    }

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth)
      window.addEventListener("scroll", handleScroll)
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", handleResize)
      }
      if (scrollAnimationFrameId.current) {
        cancelAnimationFrame(scrollAnimationFrameId.current)
      }
    }
  }, [handleScroll])

  const getClipPathAnimation = () => {
    const navbarHeight = 80
    const scrollProgress = Math.min(scrollY / navbarHeight, 1)
    const initialDiagonalTopPercentage = windowWidth < 768 ? 90 : 80
    const currentTopPercentage = initialDiagonalTopPercentage + (100 - initialDiagonalTopPercentage) * scrollProgress

    return {
      clipPath: `polygon(0% ${currentTopPercentage}%, 50% 100%, 100% ${currentTopPercentage}%, 100% 100%, 0% 100%)`,
      transition: "clip-path 0.2s ease-out",
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
      {/* Background Images Carousel */}
      <div className="absolute inset-0 w-full h-screen z-10">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 w-full h-screen bg-cambel-deep/70"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-50 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="overflow-hidden">
              <h1
                className={`text-3xl text-[#E4DFD2] mb-6 transition-all duration-500 ease-in-out md:text-4xl lg:text-6xl ${
                  isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
                }`}
              >
                {slides[currentSlide].title}
              </h1>
            </div>

            <div className="overflow-hidden">
              <p
                className={`text-base text-cambel-warm mb-8 max-w-2xl mx-auto transition-all duration-500 ease-in-out md:text-lg lg:text-xl ${
                  isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
                }`}
              >
                {slides[currentSlide].description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#about" className="btn-primary">
                Conocer más
              </a>
              <a href="#contacto" className="btn-secondary">
                Consultar ahora
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Cut Effect */}
      <div
        className="absolute inset-0 w-full h-full bg-cambel-warm z-40"
        style={{
          ...getClipPathAnimation(),
        }}
      ></div>
    </section>
  )
}
