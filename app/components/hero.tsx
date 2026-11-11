"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

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

  // The diagonal closes over the first 80px of scroll. Written straight to the element so scrolling never re-renders React.
  const diagonalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = diagonalRef.current
      if (!el) return
      const start = window.innerWidth < 768 ? 90 : 80
      const top = start + (100 - start) * Math.min(window.scrollY / 80, 1)
      el.style.clipPath = `polygon(0% ${top}%, 50% 100%, 100% ${top}%, 100% 100%, 0% 100%)`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(frame)
    }
  }, [])

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
              <a href="#nosotros" className="btn-primary">
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
      <div ref={diagonalRef} className="absolute inset-0 w-full h-full bg-cambel-warm z-40 will-change-[clip-path]"></div>
    </section>
  )
}
