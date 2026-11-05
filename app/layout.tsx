import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import HeaderWrapper from "@/app/components/header-wrapper"
import FooterWrapper from "@/app/components/footer-wrapper"
import { NewsProvider } from "@/app/context/news-context"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "CAMBEL - Estudio Jurídico",
  description: "Red de saberes jurídicos para soluciones integrales",
  generator: "v0.app",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/images/logo-cambel.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body className={`${montserrat.className} relative`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <NewsProvider>
            <HeaderWrapper />
            {children}
            <FooterWrapper />
          </NewsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
