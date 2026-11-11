"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useNews } from "@/app/context/news-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAdmin, login, logout } = useNews()

  // Login state
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setIsScrolled(window.scrollY > 50)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden"
        document.body.style.position = "fixed"
        document.body.style.width = "100%"
      } else {
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.width = ""
      }
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.width = ""
      }
    }
  }, [isMobileMenuOpen])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const success = await login(username, password)
    if (success) {
      setIsLoginOpen(false)
      setUsername("")
      setPassword("")
    } else {
      setError("Credenciales incorrectas")
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-[9998] transition-all duration-300",
          pathname === "/"
            ? isScrolled
              ? "bg-cambel-deep/95 backdrop-blur-md shadow-lg"
              : "bg-transparent"
            : "bg-cambel-deep/95 backdrop-blur-md shadow-lg",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-cambel-final.png"
                alt="Cambel - Red Jurídica"
                width={315}
                height={90}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 ml-auto text-xl">
              <Link href="/" className="text-white hover:text-cambel-salmon transition-colors font-mono text-sm">
                Inicio
              </Link>
              <Link href="/nosotros" className="text-white hover:text-cambel-salmon transition-colors font-mono text-sm">
                Nosotros
              </Link>
              <Link href="/noticias" className="text-white hover:text-cambel-salmon transition-colors font-mono text-sm">
                Novedades Jurídicas
              </Link>

              {pathname === "/noticias" && !isAdmin && (
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <button className="bg-cambel-salmon text-white px-5 py-2 rounded-lg hover:opacity-90 transition-all font-mono uppercase text-xs tracking-wider">
                      Acceso Admin
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-cambel-warm sm:max-w-[400px] border-cambel-deep/20">
                    <DialogHeader>
                      <DialogTitle className="text-center text-cambel-deep font-serif text-xl">
                        Iniciar Sesión
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="username"
                          className="text-cambel-deep font-medium text-xs uppercase tracking-wider"
                        >
                          Email
                        </Label>
                        <Input
                          id="username"
                          type="email"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Email"
                          className="bg-white/50 border-cambel-deep/20 focus:border-cambel-salmon focus:ring-cambel-salmon text-cambel-deep"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-cambel-deep font-medium text-xs uppercase tracking-wider"
                        >
                          Contraseña
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                          className="bg-white/50 border-cambel-deep/20 focus:border-cambel-salmon focus:ring-cambel-salmon text-cambel-deep"
                        />
                      </div>
                      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                      <Button type="submit" className="w-full bg-cambel-deep hover:bg-cambel-deep/90 text-white">
                        Ingresar
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white z-[10000]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - FUERA del header para mejor z-index */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[9999] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div
        data-lenis-prevent
        className={cn(
          "fixed inset-0 bg-[#0E2537] z-[10000] transition-transform duration-500 ease-in-out lg:hidden overflow-y-auto",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <style jsx>{`
          ::-webkit-scrollbar {
            width: 0;
          }
        `}</style>

        <div className="flex flex-col min-h-screen p-8 pt-24 relative">
          <button
            className="absolute top-6 right-6 text-white z-[10001]"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="mb-8">
            <Image
              src="/images/logo-cambel-final.png"
              alt="Cambel - Red Jurídica"
              width={240}
              height={68}
              className="h-12 w-auto"
            />
          </div>
          <nav className="flex flex-col space-y-6 text-2xl">
            <Link
              href="/"
              className="text-white hover:text-cambel-salmon transition-colors font-mono"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className="text-white hover:text-cambel-salmon transition-colors font-mono"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="/noticias"
              className="text-white hover:text-cambel-salmon transition-colors font-mono"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Novedades Jurídicas
            </Link>

            <Link
              href="/contacto"
              className="inline-block bg-cambel-salmon text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all font-mono uppercase text-sm w-fit"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
