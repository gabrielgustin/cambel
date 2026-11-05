"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, X } from "lucide-react"

interface Article {
  id: number
  title: string
  description: string
  content: string
  image_url?: string
  created_at: string
}

interface User {
  id: number
  email: string
  name: string
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    type: "Artículo",
    category: "",
  })

  useEffect(() => {
    // Check session via API instead of localStorage
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (!response.ok) {
          window.location.href = "/login"
          return
        }
        const data = await response.json()
        setUser(data.user)
        fetchArticles()
      } catch (error) {
        console.error("[v0] Session check error:", error)
        window.location.href = "/login"
      }
    }

    checkSession()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/news/get")
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error("[v0] Fetch articles error:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    console.log(`[v0] Input changed: ${name} = ${value}`)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating article with data:", formData)
    setLoading(true)

    try {
      const response = await fetch("/api/news/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          imageUrl: formData.imageUrl,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(`Error al crear artículo: ${errorData.error}`)
        return
      }

      console.log("[v0] Article created successfully")
      // Reset form and refresh articles
      setFormData({ title: "", description: "", content: "", imageUrl: "", type: "Artículo", category: "" })
      setShowForm(false)
      fetchArticles()
      alert("Artículo creado exitosamente")
    } catch (error) {
      console.error("[v0] Create article error:", error)
      alert("Error al crear artículo")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteArticle = async (articleId: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este artículo?")) return

    try {
      const response = await fetch(`/api/news/delete?id=${articleId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        alert("Error al eliminar artículo")
        return
      }

      fetchArticles()
      alert("Artículo eliminado exitosamente")
    } catch (error) {
      console.error("[v0] Delete article error:", error)
      alert("Error al eliminar artículo")
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
    window.location.href = "/login"
  }

  if (!user) return <div className="p-4">Cargando...</div>

  return (
    <div className="min-h-screen bg-cambel-warm py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cambel-deep">Panel Administrativo</h1>
            <p className="text-gray-600">Bienvenido, {user.name}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="bg-red-50 hover:bg-red-100 text-red-700">
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            {!showForm ? (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full bg-cambel-deep hover:bg-cambel-deep/90 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nuevo Artículo
              </Button>
            ) : (
              <Card className="h-fit lg:sticky lg:top-8">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Nuevo Artículo</CardTitle>
                    <CardDescription>Crea una nueva novedad jurídica</CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      setShowForm(false)
                      setFormData({ title: "", description: "", content: "", imageUrl: "", type: "Artículo", category: "" })
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateArticle} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Tipo</label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cambel-salmon"
                        >
                          <option>Artículo</option>
                          <option>Novedad</option>
                          <option>Comunicado</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Categoría</label>
                        <Input
                          name="category"
                          placeholder="Ej: Minería"
                          value={formData.category}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Título</label>
                      <Input
                        name="title"
                        placeholder="Título de la novedad jurídica"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Descripción</label>
                      <Textarea
                        name="description"
                        placeholder="Descripción breve del artículo"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">URL de Imagen</label>
                      <Input
                        name="imageUrl"
                        placeholder="https://..."
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                      />
                      {formData.imageUrl && (
                        <div className="mt-2 rounded-lg overflow-hidden">
                          <img src={formData.imageUrl} alt="preview" className="w-full h-32 object-cover rounded-lg" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Contenido</label>
                      <Textarea
                        name="content"
                        placeholder="Contenido completo del artículo"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full bg-cambel-salmon hover:bg-cambel-salmon/90 text-white">
                      {loading ? "Creando..." : "Crear Novedad"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Articles List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Artículos Publicados</CardTitle>
                <CardDescription>{articles.length} artículos en total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {articles.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No hay artículos aún</p>
                  ) : (
                    articles.map((article) => (
                      <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-cambel-deep">{article.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.content}</p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(article.created_at).toLocaleDateString("es-ES")}
                            </p>
                          </div>
                          <Button
                            onClick={() => handleDeleteArticle(article.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
