"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

export type NewsItem = {
  id: string
  type: string
  category: string
  title: string
  description?: string
  image: string
  date?: string
  content?: string
}

type DbArticle = {
  id: number
  title: string
  content: string
  description: string | null
  image_url: string | null
  type: string | null
  category: string | null
  created_at: string
}

type NewsContextType = {
  news: NewsItem[]
  isLoading: boolean
  addNews: (news: Omit<NewsItem, "id">) => Promise<boolean>
  updateNews: (id: string, news: Partial<NewsItem>) => Promise<boolean>
  deleteNews: (id: string) => Promise<boolean>
  isAdmin: boolean
  login: (email: string, pass: string) => Promise<boolean>
  logout: () => void
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

function mapArticle(article: DbArticle): NewsItem {
  return {
    id: String(article.id),
    type: article.type || "ARTÍCULO",
    category: article.category || "",
    title: article.title,
    description: article.description || "",
    image: article.image_url || "/images/insight-meeting.webp",
    date: new Date(article.created_at).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    content: article.content,
  }
}

const initialNews: NewsItem[] = [
  {
    id: "1",
    type: "ARTÍCULO",
    category: "MINERÍA",
    title: "Mining News - Diciembre 2024 / Marzo 2025",
    description: "Este es el contenido detallado del artículo 'Mining News - Diciembre 2024 / Marzo 2025'. La industria minera ha experimentado un crecimiento significativo en los últimos meses, impulsado por la demanda global de minerales críticos y las nuevas tecnologías de extracción. Se espera que las inversiones en el sector continúen aumentando, con un enfoque particular en la sostenibilidad y la reducción del impacto ambiental. Analistas del mercado predicen un futuro prometedor para la minería en la región, con oportunidades para la innovación y la expansión de operaciones. Este artículo explora las tendencias actuales, los desafíos regulatorios y las perspectivas de crecimiento para el próximo año.",
    image: "/images/insight-mining-aerial.webp",
    date: "6 DE JUNIO DE 2025",
    content: `<p>Este es el contenido detallado del artículo "Mining News - Diciembre 2024 / Marzo 2025".</p><p>La industria minera ha experimentado un crecimiento significativo en los últimos meses, impulsado por la demanda global de minerales críticos y las nuevas tecnologías de extracción.</p><p>Se espera que las inversiones en el sector continúen aumentando, con un enfoque particular en la sostenibilidad y la reducción del impacto ambiental.</p><p>Analistas del mercado predicen un futuro prometedor para la minería en la región, con oportunidades para la innovación y la expansión de operaciones.</p><p>Este artículo explora las tendencias actuales, los desafíos regulatorios y las perspectivas de crecimiento para el próximo año.</p>`,
  },
  {
    id: "2",
    type: "PUBLICACIÓN",
    category: "NEGOCIOS",
    title: "Doing Business in Argentina 2025",
    description: "Análisis completo sobre cómo hacer negocios en Argentina durante 2025, incluyendo regulaciones legales, requisitos administrativos y oportunidades de inversión.",
    image: "/images/insight-meeting.webp",
    date: "3 DE JUNIO DE 2025",
    content: `<p>Este es el contenido detallado de la publicación "Doing Business in Argentina 2025".</p><p>Argentina presenta un panorama de oportunidades y desafíos para los inversores extranjeros en 2025. La publicación analiza el marco legal, las políticas económicas y las tendencias del mercado.</p><p>Se destacan sectores clave como la energía, la agricultura y la tecnología, que ofrecen un alto potencial de crecimiento.</p><p>La guía proporciona información esencial sobre los procedimientos para establecer y operar un negocio en el país, incluyendo aspectos fiscales y laborales.</p><p>Además, se ofrecen recomendaciones estratégicas para navegar el entorno empresarial argentino y maximizar el éxito de las inversiones.</p>`,
  },
  {
    id: "3",
    type: "ANÁLISIS",
    category: "FINANZAS",
    title: "Impacto de la Inflación en Inversiones",
    description: "Examen detallado de cómo los cambios inflacionarios afectan las estrategias de inversión y el mercado financiero regional.",
    image: "/images/insight-graph.webp",
    date: "2 DE JUNIO DE 2025",
    content: `<p>Este es el contenido detallado del análisis "Impacto de la Inflación en Inversiones".</p><p>La inflación sigue siendo un factor crítico a considerar en las decisiones de inversión. Este análisis examina cómo las diferentes clases de activos se comportan en entornos inflacionarios.</p><p>Se discuten estrategias para proteger el capital y generar rendimientos reales, incluyendo la diversificación de carteras y la inversión en activos reales.</p><p>El documento también evalúa el papel de los bancos centrales y las políticas monetarias en la gestión de la inflación y su efecto en los mercados financieros.</p><p>Conclusiones clave y proyecciones futuras se presentan para ayudar a los inversores a tomar decisiones informadas en un entorno económico volátil.</p>`,
  },
  {
    id: "4",
    type: "WEBINAR",
    category: "TECNOLOGÍA",
    title: "Regulación de IA en Latam",
    description: "Exploración de los marcos regulatorios emergentes para la inteligencia artificial en América Latina y sus implicaciones legales.",
    image: "/images/insight-laptop.webp",
    date: "2 DE JUNIO DE 2025",
    content: `<p>Este es el contenido detallado del webinar "Regulación de IA en Latam".</p><p>La inteligencia artificial está transformando rápidamente las industrias, y la necesidad de marcos regulatorios claros es cada vez más apremiante en América Latina.</p><p>Este webinar aborda los desafíos éticos, legales y sociales que plantea la IA, y cómo los gobiernos de la región están respondiendo con nuevas legislaciones.</p><p>Se exploran casos de estudio de diferentes países y se discuten las mejores prácticas para fomentar la innovación responsable.</p><p>Expertos en derecho y tecnología comparten sus perspectivas sobre el futuro de la regulación de IA y su impacto en el desarrollo tecnológico de Latam.</p>`,
  },
  {
    id: "5",
    type: "ARTÍCULO",
    category: "COMERCIO",
    title: "Desafíos Legales en Comercio Internacional",
    description: "Análisis de los principales desafíos legales que enfrentan las empresas en el comercio internacional y estrategias para su resolución.",
    image: "/images/insight-containers.webp",
    date: "1 DE JUNIO DE 2025",
    content: `<p>Este es el contenido detallado del artículo "Desafíos Legales en Comercio Internacional".</p><p>El comercio internacional se enfrenta a un panorama legal complejo, con constantes cambios en las normativas aduanales, acuerdos comerciales y disputas transfronterizas.</p><p>Este artículo analiza los principales desafíos legales que enfrentan las empresas que operan a nivel global, desde la propiedad intelectual hasta las barreras no arancelarias.</p><p>Se ofrecen estrategias para mitigar riesgos y asegurar el cumplimiento normativo en diversas jurisdicciones.</p><p>Además, se examinan las implicaciones de las tensiones geopolíticas y las nuevas tecnologías en el futuro del comercio global.</p>`,
  },
  {
    id: "6",
    type: "REPORTE",
    category: "FINANZAS",
    title: "Guía de Inversiones 2025",
    description: "Guía completa para inversores sobre oportunidades, riesgos y estrategias de inversión para el año 2025.",
    image: "/images/insight-money.webp",
    date: "30 DE MAYO DE 2025",
    content: `<p>Este es el contenido detallado del reporte "Guía de Inversiones 2025".</p><p>La Guía de Inversiones 2025 ofrece un panorama completo de las oportunidades y riesgos en los mercados financieros globales.</p><p>El reporte cubre diversas clases de activos, incluyendo acciones, bonos, bienes raíces y criptomonedas, con análisis de expertos y proyecciones de rendimiento.</p><p>Se presentan modelos de cartera diversificados y consejos prácticos para inversores de todos los niveles de experiencia.</p><p>Además, se abordan temas como la inversión sostenible, el impacto de la tecnología en las finanzas y las tendencias macroeconómicas que influirán en 2025.</p>`,
  },
  {
    id: "7",
    type: "ARTÍCULO",
    category: "AMBIENTAL",
    title: "Nuevas Normativas para la Minería Sostenible",
    description: "Revisión de las nuevas normativas ambientales para operaciones mineras sostenibles en la región.",
    image: "/images/insight-excavator.webp",
    date: "29 DE MAYO DE 2025",
    content: `<p>Este es el contenido detallado del artículo "Nuevas Normativas para la Minería Sostenible".</p><p>La creciente conciencia ambiental ha llevado a la implementación de nuevas y más estrictas normativas para la minería sostenible en todo el mundo.</p><p>Este artículo examina las últimas regulaciones y su impacto en las operaciones mineras, desde la gestión de residuos hasta la rehabilitación de tierras.</p><p>Se discuten las tecnologías innovadoras que están ayudando a la industria a cumplir con los estándares ambientales y a operar de manera más responsable.</p><p>Además, se analizan los beneficios económicos y sociales de adoptar prácticas mineras sostenibles a largo plazo.</p>`,
  },
  {
    id: "8",
    type: "ANÁLISIS",
    category: "CONTABILIDAD",
    title: "Aspectos Contables en Fusiones y Adquisiciones",
    description: "Análisis detallado de los aspectos contables y fiscales involucrados en procesos de fusiones y adquisiciones.",
    image: "/images/insight-calculator-pen.webp",
    date: "28 DE MAYO DE 2025",
    content: `<p>Este es el contenido detallado del análisis "Aspectos Contables en Fusiones y Adquisiciones".</p><p>Las fusiones y adquisiciones (M&A) son operaciones complejas que requieren una cuidadosa consideración de los aspectos contables y financieros.</p><p>Este análisis profundiza en los principios contables aplicables a las transacciones de M&A, incluyendo la valoración de activos, la consolidación de estados financieros y el tratamiento de la plusvalía.</p><p>Se abordan los desafíos comunes y las mejores prácticas para asegurar una integración financiera exitosa.</p><p>El documento también explora las implicaciones fiscales y regulatorias de las operaciones de M&A, proporcionando una guía esencial para profesionales del sector.</p>`,
  },
]

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch("/api/news/get")
      if (!response.ok) return
      const articles: DbArticle[] = await response.json()
      setNews(articles.map(mapArticle))
    } catch (e) {
      console.error("[v0] Failed to fetch news from database", e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Load news from the database and check the admin session on mount
  useEffect(() => {
    fetchNews()

    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session")
        setIsAdmin(response.ok)
      } catch (e) {
        setIsAdmin(false)
      }
    }
    checkSession()
  }, [fetchNews])

  const addNews = async (newItem: Omit<NewsItem, "id">) => {
    try {
      const response = await fetch("/api/news/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newItem.title,
          content: newItem.content || newItem.description || "",
          description: newItem.description,
          imageUrl: newItem.image,
          type: newItem.type,
          category: newItem.category,
        }),
      })
      if (!response.ok) return false
      const article: DbArticle = await response.json()
      setNews((current) => [mapArticle(article), ...current])
      return true
    } catch (e) {
      console.error("[v0] Failed to create news article", e)
      return false
    }
  }

  const updateNews = async (id: string, updatedItem: Partial<NewsItem>) => {
    try {
      const response = await fetch("/api/news/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title: updatedItem.title,
          content: updatedItem.content,
          description: updatedItem.description,
          imageUrl: updatedItem.image,
          type: updatedItem.type,
          category: updatedItem.category,
        }),
      })
      if (!response.ok) return false
      const article: DbArticle = await response.json()
      setNews((current) => current.map((item) => (item.id === id ? mapArticle(article) : item)))
      return true
    } catch (e) {
      console.error("[v0] Failed to update news article", e)
      return false
    }
  }

  const deleteNews = async (id: string) => {
    try {
      const response = await fetch(`/api/news/delete?id=${id}`, { method: "DELETE" })
      if (!response.ok) return false
      setNews((current) => current.filter((item) => item.id !== id))
      return true
    } catch (e) {
      console.error("[v0] Failed to delete news article", e)
      return false
    }
  }

  const login = async (email: string, pass: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      })
      if (!response.ok) return false
      setIsAdmin(true)
      return true
    } catch (e) {
      console.error("[v0] Login failed", e)
      return false
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch (e) {
      console.error("[v0] Logout failed", e)
    }
    setIsAdmin(false)
  }

  return (
    <NewsContext.Provider
      value={{ news, isLoading, addNews, updateNews, deleteNews, isAdmin, login, logout }}
    >
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  const context = useContext(NewsContext)
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider")
  }
  return context
}
