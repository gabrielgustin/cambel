"use client"

import type React from "react"

import { useState } from "react"
import { useNews } from "@/app/context/news-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Trash2, Edit, Plus, LogOut } from "lucide-react"

export default function NewsAdmin() {
  const { news, addNews, updateNews, deleteNews, logout } = useNews()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    type: "ARTÍCULO",
    category: "",
    title: "",
    description: "",
    content: "",
    image: "/images/insight-meeting.webp",
  })

  const resetForm = () =>
    setFormData({
      type: "ARTÍCULO",
      category: "",
      title: "",
      description: "",
      content: "",
      image: "/images/insight-meeting.webp",
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    const success = editingItem
      ? await updateNews(editingItem.id, formData)
      : await addNews(formData)
    setIsSaving(false)

    if (!success) {
      alert("Ocurrió un error al guardar la novedad. Intenta de nuevo.")
      return
    }

    setIsDialogOpen(false)
    setEditingItem(null)
    resetForm()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log("[v0] Starting image upload:", file.name)
    setIsUploading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      console.log("[v0] Image uploaded to Blob:", data.url)
      setFormData({ ...formData, image: data.url })
    } catch (error) {
      console.error("[v0] Upload error:", error)
      alert("Error al subir la imagen. Intenta de nuevo.")
    } finally {
      setIsUploading(false)
    }
  }

  const openEdit = (item: any) => {
    setEditingItem(item)
    setFormData({
      type: item.type,
      category: item.category,
      title: item.title,
      description: item.description || "",
      content: item.content || "",
      image: item.image,
    })
    setIsDialogOpen(true)
  }

  const openNew = () => {
    setEditingItem(null)
    resetForm()
    setIsDialogOpen(true)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 lg:p-8 mb-12 border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-cambel-deep">Panel de Gestión de Novedades Jurídicas</h2>
        <Button
          variant="outline"
          onClick={logout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
        >
          <LogOut className="w-4 h-4" /> Cerrar Sesión
        </Button>
      </div>

      <div className="mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-cambel-deep hover:bg-cambel-deep/90 text-white">
              <Plus className="w-4 h-4 mr-2" /> Nueva Novedad
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-cambel-warm sm:max-w-[500px] border-cambel-deep/20 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-cambel-deep font-serif text-xl">
                {editingItem ? "Editar Novedad Jurídica" : "Nueva Novedad Jurídica"}
              </DialogTitle>
              <DialogDescription className="text-cambel-deep/70">
                {editingItem
                  ? "Modifique los campos necesarios y guarde los cambios."
                  : "Complete los campos para crear una nueva novedad."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-cambel-deep font-medium text-xs uppercase tracking-wider">
                    Tipo
                  </Label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-cambel-deep/20 bg-white/50 px-3 py-2 text-sm text-cambel-deep ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-cambel-deep/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cambel-salmon focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="ARTÍCULO">ARTÍCULO</option>
                    <option value="PUBLICACIÓN">PUBLICACIÓN</option>
                    <option value="ANÁLISIS">ANÁLISIS</option>
                    <option value="WEBINAR">WEBINAR</option>
                    <option value="REPORTE">REPORTE</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-cambel-deep font-medium text-xs uppercase tracking-wider">
                    Categoría
                  </Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Ej: MINERÍA"
                    required
                    className="bg-white/50 border-cambel-deep/20 focus:border-cambel-salmon focus:ring-cambel-salmon text-cambel-deep"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-cambel-deep font-medium text-xs uppercase tracking-wider">
                  Título
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título de la novedad jurídica"
                  required
                  className="bg-white/50 border-cambel-deep/20 focus:border-cambel-salmon focus:ring-cambel-salmon text-cambel-deep"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-cambel-deep font-medium text-xs uppercase tracking-wider">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción de la novedad jurídica"
                  rows={3}
                  className="bg-white/50 border-cambel-deep/20 text-cambel-deep"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content" className="text-cambel-deep font-medium text-xs uppercase tracking-wider">
                  Contenido
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Contenido completo de la novedad (se muestra en el detalle)"
                  rows={5}
                  required
                  className="bg-white/50 border-cambel-deep/20 text-cambel-deep"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="text-cambel-deep font-medium text-xs uppercase tracking-wider">
                  Imagen
                </Label>
                <div className="flex flex-col gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="cursor-pointer file:cursor-pointer file:text-cambel-deep file:font-semibold bg-white/50 border-cambel-deep/20"
                  />
                  {isUploading && <p className="text-sm text-cambel-salmon">Subiendo imagen...</p>}
                  {formData.image && (
                    <div className="relative w-full h-32 rounded-md overflow-hidden border border-cambel-deep/20">
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button type="submit" disabled={isUploading || isSaving} className="w-full bg-cambel-salmon hover:bg-cambel-salmon/90 text-white disabled:opacity-50">
                {isSaving ? "Guardando..." : editingItem ? "Guardar Cambios" : "Crear Novedad"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {news.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors bg-white"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 relative rounded overflow-hidden bg-gray-200 flex-shrink-0">
                <img src={item.image || "/placeholder.svg"} alt="" className="object-cover w-full h-full" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.type} • {item.category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                <Edit className="w-4 h-4 text-blue-600" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteNews(item.id)}>
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
