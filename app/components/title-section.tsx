"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Phone } from "lucide-react"
import { lawyers } from "@/lib/lawyers"

export default function TitleSection() {
  return (
    <section className="py-16 lg:py-24 bg-cambel-warm">
      <div className="container mx-auto px-4">
        <h2 data-reveal className="text-3xl md:text-4xl lg:text-5xl text-black text-center font-sans font-semibold mb-12 lg:mb-16">
          Profesionales
        </h2>
        
        <div data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {lawyers.map((lawyer) => (
            <Card data-reveal key={lawyer.id} className="overflow-hidden bg-[#F3F0E9] border border-cambel-deep/10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-4 lg:p-5 h-full flex flex-col bg-transparent">
                <div data-reveal="photo" className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-5">
                  <Image
                    src={lawyer.image || "/placeholder.svg"}
                    alt={lawyer.name}
                    fill
                    className="object-cover object-top group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-col items-start flex-grow">
                  <h3 className="text-xl lg:text-2xl font-sans font-semibold text-cambel-deep mb-1">
                    {lawyer.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="block h-[2px] w-10 mb-2 bg-cambel-salmon origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                  <p className="text-sm lg:text-base text-cambel-salmon font-medium tracking-wide">
                    {lawyer.role}
                  </p>
                  
                  <div className="flex gap-3 mt-auto pt-4">
                    {lawyer.linkedin ? (
                      <a
                        href={lawyer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-cambel-deep hover:bg-cambel-salmon transition-colors duration-300 rounded-full p-2.5"
                      >
                        <Linkedin className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                      </a>
                    ) : (
                      <div className="bg-cambel-mist/50 rounded-full p-2.5 cursor-not-allowed">
                        <Linkedin className="w-4 h-4 lg:w-5 lg:h-5 text-cambel-mist" />
                      </div>
                    )}
                    <a
                      href={`https://wa.me/${lawyer.whatsapp.replace(/[\s\-‑]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-cambel-deep hover:bg-cambel-salmon transition-colors duration-300 rounded-full p-2.5"
                    >
                      <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
