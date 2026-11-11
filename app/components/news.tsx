"use client"
import { Card, CardContent } from "@/components/ui/card"
import type React from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { useState, useEffect, useCallback, useRef } from "react"
import { useNews } from "@/app/context/news-context"

const SLIDE_MS = 800
const AUTO_MS = 6000

const News = () => {
  const router = useRouter()
  const { news: allArticles } = useNews()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  const [windowWidth, setWindowWidth] = useState(768)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const totalSlides = allArticles.length

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [isTransitioning, totalSlides])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [isTransitioning, totalSlides])

  // Reset transition state after animation
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, SLIDE_MS)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  // Auto-slide effect
  useEffect(() => {
    const startAutoSlide = () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current)
      }
      autoSlideTimerRef.current = setInterval(nextSlide, AUTO_MS)
    }

    if (totalSlides > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      startAutoSlide()
    }

    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current)
      }
    }
  }, [nextSlide, totalSlides])

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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current)
    }
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX
    const minSwipeDistance = 50

    if (swipeDistance > minSwipeDistance) {
      nextSlide()
    } else if (swipeDistance < -minSwipeDistance) {
      prevSlide()
    }
    setTouchStartX(0)
    setTouchEndX(0)

    restartAutoSlide()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current)
    }
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const restartAutoSlide = () => {
    pauseAutoSlide()
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    autoSlideTimerRef.current = setInterval(nextSlide, AUTO_MS)
  }

  const pauseAutoSlide = () => {
    if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    restartAutoSlide()
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false)
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = x - startX
    const minSwipeDistance = 50

    if (Math.abs(walk) > minSwipeDistance) {
      if (walk > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }

    restartAutoSlide()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
  }

  const getCardStyle = (index: number) => {
    const carouselContainerWidth = carouselRef.current ? carouselRef.current.offsetWidth : windowWidth

    const cardWidthMobile = windowWidth * 0.85
    const cardWidthDesktop = Math.min(carouselContainerWidth * 0.5, 600)

    const cardVisibleWidth = windowWidth < 768 ? cardWidthMobile : cardWidthDesktop
    const cardHeight = windowWidth < 768 ? cardWidthMobile * 0.8 : cardWidthDesktop * 0.65

    let offset = index - currentSlide

    if (offset > totalSlides / 2) {
      offset -= totalSlides
    } else if (offset < -totalSlides / 2) {
      offset += totalSlides
    }

    let translateX = 0
    let scale = 1
    let opacity = 0
    let zIndex = 1
    let rotateY = 0

    const rotationFactor = 25
    const cardSpacing = cardVisibleWidth * 0.85

    if (offset === 0) {
      translateX = 0
      scale = 1
      opacity = 1
      zIndex = 10
      rotateY = 0
    } else if (offset === 1) {
      translateX = cardSpacing
      scale = 0.85
      opacity = 0.7
      zIndex = 9
      rotateY = -rotationFactor
    } else if (offset === -1) {
      translateX = -cardSpacing
      scale = 0.85
      opacity = 0.7
      zIndex = 9
      rotateY = rotationFactor
    } else {
      opacity = 0
      zIndex = 1
      scale = 0.6
      translateX = offset > 0 ? cardSpacing * 1.5 : -cardSpacing * 1.5
      rotateY = offset > 0 ? -rotationFactor * 1.5 : rotationFactor * 1.5
    }

    return {
      transform: `translateX(-50%) translateY(-50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      transition: `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${SLIDE_MS}ms ease, box-shadow ${SLIDE_MS}ms ease`,
      position: "absolute",
      left: "50%",
      top: "50%",
      width: `${cardVisibleWidth}px`,
      height: `${cardHeight}px`,
      willChange: "transform, opacity",
      borderRadius: "1rem",
      overflow: "hidden",
      boxShadow: offset === 0 ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "none",
    }
  }

  if (totalSlides === 0) {
    return (
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Novedades Jurídicas</h2>
          <p className="text-lg text-gray-600">No hay artículos disponibles en este momento</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 lg:py-16 bg-white overflow-hidden flex flex-col items-center">
      <div className="container mx-auto px-4 mb-4 lg:mb-8">
        <div className="text-center" data-reveal-stagger>
          <h2 data-reveal className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Novedades Jurídicas</h2>
          <p data-reveal className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mantente informado sobre nuestras últimas publicaciones, análisis y eventos.
          </p>
        </div>
      </div>
      
      <div data-reveal className="w-full">
      <div
        ref={carouselRef}
        className="relative w-full max-w-7xl mx-auto min-h-[400px] lg:min-h-[500px] flex items-center justify-center transform-style-preserve-3d perspective-[1500px] touch-pan-y cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={pauseAutoSlide}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {allArticles.map((article, index) => (
          <Card
            key={index}
            className={`group shadow-xl overflow-hidden transform-gpu select-none ${
              index === currentSlide ? "cursor-pointer" : ""
            }`}
            style={getCardStyle(index)}
            onClick={() => {
              if (isDragging) return
              if (index === currentSlide) {
                router.push(`/noticias/${article.id}`)
              } else if (index === (currentSlide + 1) % totalSlides) {
                nextSlide()
              } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
                prevSlide()
              }
            }}
          >
            <CardContent className="p-0 h-full flex flex-col lg:flex-row">
              <div className="relative w-full h-[40%] lg:w-1/2 lg:h-full bg-gray-800">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="100vw"
                />
              </div>
              <div className="w-full h-[60%] lg:w-1/2 lg:h-full p-6 sm:p-8 flex flex-col justify-center items-center bg-gray-900 text-white rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 line-clamp-4 lg:line-clamp-3 text-center">
                  {article.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="block h-[2px] w-16 mb-3 bg-cambel-salmon origin-center scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <p className="text-sm sm:text-base lg:text-lg font-semibold mb-4 text-center">
                  {article.type} - {article.category}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </section>
  )
}

export default News
